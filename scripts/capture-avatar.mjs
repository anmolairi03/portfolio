import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outHtml = join(root, 'public', '_avatar_capture.html');
const outPng = join(
  'C:/Users/Lenovo/.cursor/projects/c-Users-Lenovo-Documents-portfolio/assets',
  'avatar-ref.png',
);

const html = `<!DOCTYPE html>
<html>
<body style="margin:0;background:#23262e;display:flex;align-items:center;justify-content:center;height:100vh">
<canvas id="c" width="800" height="800"></canvas>
<script type="importmap">
{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js","three/addons/":"https://unpkg.com/three@0.160.0/examples/jsm/"}}
</script>
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(800, 800);
renderer.setPixelRatio(1);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
camera.position.set(0, 1.4, 2.4);
camera.lookAt(0, 1.25, 0);
scene.add(new THREE.AmbientLight(0xffffff, 1.1));
const d = new THREE.DirectionalLight(0xffffff, 1.3);
d.position.set(2, 5, 3);
scene.add(d);
new GLTFLoader().load(
  '/Animated_RPM_Wave.glb',
  (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    window.__done = true;
  },
  undefined,
  (e) => {
    window.__err = String(e);
    window.__done = true;
  },
);
</script>
</body>
</html>`;

writeFileSync(outHtml, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 800, height: 800 } });
await page.goto('http://localhost:5175/_avatar_capture.html', {
  waitUntil: 'networkidle',
  timeout: 60000,
});
await page.waitForFunction(() => window.__done === true, { timeout: 60000 });
const err = await page.evaluate(() => window.__err);
if (err) console.error('ERR', err);
await page.locator('#c').screenshot({ path: outPng });
console.log('saved', outPng);
await browser.close();
