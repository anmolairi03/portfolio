import React, { useEffect } from 'react';
import { ArrowLeft, Github, Mail, Plug } from 'lucide-react';

interface NotFoundProps {
  /** Shown when we land here from a thrown error rather than a bad URL. */
  reason?: 'route' | 'error' | 'unset';
  detail?: string;
}

const COPY: Record<string, { code: string; title: string; body: string }> = {
  route: {
    code: '404',
    title: 'This wire goes nowhere',
    body: 'The page you asked for is not wired up yet. The caveman is still figuring out electricity.',
  },
  unset: {
    code: '404',
    title: 'That link is not connected',
    body: 'This link has not been plugged in yet. Nothing is broken. It just leads nowhere for now.',
  },
  error: {
    code: '500',
    title: 'Something shorted out',
    body: 'An unexpected error tripped the breaker. Reloading usually gets the lights back on.',
  },
};

const NotFound: React.FC<NotFoundProps> = ({ reason = 'route', detail }) => {
  const copy = COPY[reason] ?? COPY.route;

  // This page renders outside the loader, so clear the boot splash itself.
  useEffect(() => {
    document.body.classList.remove('is-booting');
    document.getElementById('boot-splash')?.remove();
  }, []);

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <main className="notfound" role="main">
      <div className="notfound__inner">
        <figure className="notfound__art">
          <img
            src="/caveman-electrician.png"
            alt="A caveman holding two loose electrical wires, unsure how to connect them"
            width={960}
            height={720}
            loading="eager"
            decoding="async"
          />
        </figure>

        <div className="notfound__copy">
          <p className="notfound__code font-mono">
            <Plug className="w-3.5 h-3.5" aria-hidden="true" />
            ERROR {copy.code}
          </p>
          <h1 className="notfound__title">{copy.title}</h1>
          <p className="notfound__body">{copy.body}</p>

          {detail && <p className="notfound__detail font-mono">{detail}</p>}

          <div className="notfound__actions">
            <button type="button" className="notfound__btn notfound__btn--primary" onClick={goHome}>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to the portfolio
            </button>
            <a
              className="notfound__btn"
              href="https://github.com/anmolairi03"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a className="notfound__btn" href="mailto:anmolandananay@gmail.com">
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email me
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;