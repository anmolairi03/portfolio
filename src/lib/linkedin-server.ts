export interface LinkedInProfile {
  username: string;
  name: string;
  headline: string;
  about: string;
  profileImage: string;
  bannerImage: string;
}

const CRAWLER_AGENTS = [
  'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  'Twitterbot/1.0',
  'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
];

async function fetchProfileHtml(username: string, userAgent: string): Promise<string | null> {
  const url = `https://www.linkedin.com/in/${encodeURIComponent(username)}/`;
  const res = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': userAgent,
    },
    cache: 'no-store',
    redirect: 'follow',
  });
  if (!res.ok) return null;

  const html = await res.text();
  if (!html || /authwall|sign-in|login/i.test(html.slice(0, 5000))) return null;
  return html;
}

function mergeProfiles(base: LinkedInProfile, next: LinkedInProfile): LinkedInProfile {
  return {
    username: base.username || next.username,
    name: base.name || next.name,
    headline: base.headline || next.headline,
    about: base.about.length >= next.about.length ? base.about : next.about,
    profileImage: base.profileImage || next.profileImage,
    bannerImage: base.bannerImage || next.bannerImage,
  };
}

function profileHasSignal(profile: LinkedInProfile): boolean {
  return Boolean(profile.about || profile.profileImage || profile.bannerImage || profile.name);
}

function decodeJsonString(raw: string): string {
  try {
    return JSON.parse(`"${raw.replace(/"/g, '\\"')}"`);
  } catch {
    return raw
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
}

function metaContent(html: string, property: string): string {
  const patterns = [
    new RegExp(
      `<meta\\s+(?:property|name)=["']${property}["']\\s+content=["']([^"']+)["']`,
      'i'
    ),
    new RegExp(
      `<meta\\s+content=["']([^"']+)["']\\s+(?:property|name)=["']${property}["']`,
      'i'
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1].trim());
  }
  return '';
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractJsonString(html: string, key: string): string {
  const pattern = new RegExp(`"${key}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const match = html.match(pattern);
  return match?.[1] ? decodeJsonString(match[1]) : '';
}

function extractVectorImageUrl(html: string, key: string): string {
  const blockPattern = new RegExp(`"${key}"\\s*:\\s*\\{[\\s\\S]{0,4000}?\\}`, 'i');
  const block = html.match(blockPattern)?.[0];
  if (!block) return '';

  const rootUrl = block.match(/"rootUrl"\s*:\s*"([^"]+)"/)?.[1];
  if (!rootUrl) return '';

  const artifacts = [...block.matchAll(/"fileIdentifyingUrlPathSegment"\s*:\s*"([^"]+)"/g)];
  if (!artifacts.length) return rootUrl;

  const segment = artifacts[artifacts.length - 1][1];
  return `${rootUrl}${segment}`;
}

function extractSummarySection(html: string): string {
  const section = html.match(
    /data-section="summary"[\s\S]*?<div class="core-section-container__content break-words">\s*([\s\S]*?)<\/div>/i
  );
  if (!section?.[1]) return '';

  return decodeHtmlEntities(
    section[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>\s*<p>/gi, '\n\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function extractCoverImage(html: string): string {
  const coverImg = html.match(
    /class="cover-img__image[^"]*"[^>]*src="([^"]+)"/i
  );
  if (coverImg?.[1]) return decodeHtmlEntities(coverImg[1]);

  const background = html.match(
    /https:\/\/media\.licdn\.com\/[^"'\\]+profile-displaybackgroundimage[^"'\\]+/
  );
  return background?.[0] ? decodeHtmlEntities(background[0]) : '';
}

function extractProfileImageUrl(html: string, ogImage: string): string {
  if (ogImage.includes('profile-displayphoto')) return ogImage;

  const imgSrc = html.match(
    /profile-displayphoto[^"']+/i
  );
  if (imgSrc) {
    const full = html.match(
      /https:\/\/media\.licdn\.com\/[^"'\\]+profile-displayphoto[^"'\\]+/
    );
    if (full?.[0]) return decodeHtmlEntities(full[0]);
  }

  return ogImage;
}

function extractHeadlineFromHtml(html: string): string {
  const fromJson =
    extractJsonString(html, 'headline') ||
    extractJsonString(html, 'multiLocaleHeadline') ||
    extractJsonString(html, 'localizedHeadline') ||
    extractJsonString(html, 'tagline') ||
    extractJsonString(html, 'occupation');

  if (fromJson.includes('|')) return fromJson;

  const topCard = html.match(/top-card-layout[\s\S]{0,5000}/i)?.[0];
  if (topCard) {
    const pipeLine = topCard.match(/>([^<]{20,220}\|[^<]{5,220})</);
    if (pipeLine?.[1]) return decodeHtmlEntities(pipeLine[1].trim());
  }

  return fromJson;
}

function extractHeadlineFromOgTitle(ogTitle: string, name: string): string {
  let headline = ogTitle.replace(/\s*\|\s*LinkedIn\s*$/i, '').trim();
  if (name) {
    const prefix = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[-–—|]\\s*`, 'i');
    headline = headline.replace(prefix, '').trim();
  }
  return headline;
}

function extractCurrentRoleHeadline(html: string): string {
  const block =
    html.match(/data-section="currentPositionsDetails"[\s\S]{0,6000}/i)?.[0] ||
    html.match(/experience-item[\s\S]{0,6000}/i)?.[0];
  if (!block) return '';

  const role = block.match(/experience-item__title">\s*([^<]+)/i)?.[1]?.trim();
  const company = block.match(/experience-item__subtitle">\s*([^<]+)/i)?.[1]?.trim();

  if (role && company) {
    return `${decodeHtmlEntities(role)} at ${decodeHtmlEntities(company)}`;
  }
  if (role) return decodeHtmlEntities(role);
  if (company) return decodeHtmlEntities(company);
  return '';
}
function headlineFromDescription(description: string): string {
  const stopMarkers = [' · Experience', ' · Education', ' · Location', ' View '];
  let headline = description;
  for (const marker of stopMarkers) {
    const idx = headline.indexOf(marker);
    if (idx > 0) {
      headline = headline.slice(0, idx);
      break;
    }
  }
  return headline.trim();
}

function extractPersonFromJsonLd(html: string): Partial<LinkedInProfile> {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const script of scripts) {
    try {
      const data = JSON.parse(script[1]) as {
        '@type'?: string;
        name?: string;
        description?: string;
        image?: string | { url?: string };
      };
      if (data['@type'] !== 'Person') continue;
      const image =
        typeof data.image === 'string'
          ? data.image
          : typeof data.image?.url === 'string'
            ? data.image.url
            : '';
      return {
        name: data.name ?? '',
        about: data.description ?? '',
        profileImage: image,
      };
    } catch {
      continue;
    }
  }
  return {};
}

export function parseLinkedInHtml(html: string, username: string): LinkedInProfile {
  const jsonLd = extractPersonFromJsonLd(html);
  const ogTitle = metaContent(html, 'og:title');
  const ogDescription = metaContent(html, 'og:description');
  const ogImage = metaContent(html, 'og:image');
  const firstNameMeta = metaContent(html, 'profile:first_name');
  const lastNameMeta = metaContent(html, 'profile:last_name');

  const summarySection = extractSummarySection(html);
  const summary =
    summarySection ||
    extractJsonString(html, 'summary') ||
    extractJsonString(html, 'about') ||
    jsonLd.about ||
    headlineFromDescription(ogDescription);

  const firstName = extractJsonString(html, 'firstName');
  const lastName = extractJsonString(html, 'lastName');
  const name =
    jsonLd.name ||
    (firstName && lastName ? `${firstName} ${lastName}`.trim() : '') ||
    (firstNameMeta && lastNameMeta ? `${firstNameMeta} ${lastNameMeta}`.trim() : '') ||
    ogTitle.replace(/\s*[|\-–—].*$/, '').trim();

  const headline =
    extractHeadlineFromHtml(html) ||
    extractCurrentRoleHeadline(html) ||
    extractHeadlineFromOgTitle(ogTitle, name);

  const resolvedHeadline =
    headline &&
    summary &&
    (headline === summary || summary.startsWith(headline) || headline.startsWith(summary))
      ? extractHeadlineFromHtml(html) ||
        extractCurrentRoleHeadline(html) ||
        extractHeadlineFromOgTitle(ogTitle, name) ||
        ''
      : headline;

  const profileImage =
    jsonLd.profileImage ||
    extractProfileImageUrl(html, ogImage) ||
    extractVectorImageUrl(html, 'profilePicture') ||
    extractVectorImageUrl(html, 'displayImageReference');

  const bannerImage =
    extractCoverImage(html) ||
    extractVectorImageUrl(html, 'backgroundImage') ||
    extractVectorImageUrl(html, 'backgroundCoverImage');

  return {
    username,
    name: name || username,
    headline: resolvedHeadline,
    about: summary,
    profileImage,
    bannerImage,
  };
}

export async function fetchLinkedInProfileFromWeb(
  username: string
): Promise<LinkedInProfile | null> {
  let merged: LinkedInProfile | null = null;

  for (const userAgent of CRAWLER_AGENTS) {
    const html = await fetchProfileHtml(username, userAgent);
    if (!html) continue;

    const profile = parseLinkedInHtml(html, username);
    if (!profileHasSignal(profile)) continue;

    merged = merged ? mergeProfiles(merged, profile) : profile;
    if (merged.about && merged.profileImage && merged.bannerImage) break;
  }

  return merged;
}
