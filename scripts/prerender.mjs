import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const template = fs.readFileSync(path.join(root, 'scripts/template.html'), 'utf8');
const source = ['privacy-content.js', 'map-url.js', 'site.js'].map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const routes = [
  '/', '/事業案内/', '/services/', '/事業案内/service1/', '/事業案内/service2/', '/事業案内/service3/',
  '/company/', '/access/', '/recruit/', '/contact/', '/contact/question/', '/info/', '/contact/info/',
  '/privacy-policy/', '/contact/privacy-policy/', '/2026/04/20/gw休業のお知らせ/', '/news/2026-gw/',
  '/2022/12/28/テスト投稿⑥/', '/news/renewal/'
];

for (const route of routes) {
  const app = { innerHTML: '' };
  const document = {
    title: '',
    getElementById: () => app,
    querySelector: selector => selector === 'h1'
      ? { textContent: app.innerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '') ?? '' }
      : { addEventListener: () => {} }
  };
  vm.runInNewContext(source, { document, location: { pathname: route } }, { filename: 'site.js' });
  if (!app.innerHTML || app.innerHTML.includes('ページが見つかりません')) throw new Error(`Route missing: ${route}`);
  const html = template
    .replace('<div id="app"></div>', `<div id="app">${app.innerHTML}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${document.title}</title>`);
  const target = path.join(root, decodeURI(route), 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}
console.log(`Rendered ${routes.length} public routes.`);
