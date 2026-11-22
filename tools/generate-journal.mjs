#!/usr/bin/env node
// Generates the static, crawlable Journal pages, sitemap.xml and robots.txt.
// Source of truth: the ARTICLES and JOURNAL_SEO data in app.js; page shell: index.html.
// Usage:  node tools/generate-journal.mjs          write files
//         node tools/generate-journal.mjs --check  exit 1 if generated files are stale
// Run it after every change to the Journal data, to index.html, or after updating version.json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(join(root, f), 'utf8');
const check = process.argv.includes('--check');
const app = read('app.js'), shell = read('index.html');

const json = (name) => {
  const m = app.match(new RegExp('^const ' + name + '=(.*);$', 'm'));
  if (!m) throw new Error(name + ' not found in app.js');
  return JSON.parse(m[1]);
};
const ARTICLES = json('ARTICLES'), JSEO = json('JOURNAL_SEO');
const pair = key => { const r = [...app.matchAll(new RegExp(key + ":'([^']*)'", 'g'))].map(m => m[1]); if (r.length < 2) throw new Error('copy ' + key); return { en: r[0], el: r[1] }; };
const COPY = Object.fromEntries(['journalTitle', 'journalLead', 'readArticle', 'backJournal', 'relatedNotes'].map(k => [k, pair(k)]));
const navMatches = [...app.matchAll(/nav:\['([^']*)','([^']*)','([^']*)','([^']*)'/g)];
const KICKER = { en: navMatches[0][4], el: navMatches[1][4] };

const origin = (shell.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
if (!origin) throw new Error('canonical not found in index.html');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hub = lang => (lang === 'el' ? 'el/' : '') + 'journal/';
const urlFor = (lang, id) => origin + hub(lang) + (id ? id + '/' : '');
const rel = (lang, id) => (lang === 'el' ? '../' : '') + '../' + (id ? '../' : '');   // path from the page back to the site root

const pad2 = n => String(n).padStart(2, '0');
const byId = id => ARTICLES.find(x => x.id === id);
function articleMain(a, lang) {
  const t = a[lang], e = a.end && a.end[lang], n = ARTICLES.indexOf(a) + 1;
  return `<div class="page-head"><div class="article"><a class="text-link" href="${hub(lang)}">${esc(COPY.backJournal[lang])}</a><p class="eyebrow space-top"><span class="j-no">${pad2(n)} / ${pad2(ARTICLES.length)}</span> · ${esc(t.cat)}</p><h1>${esc(t.title)}</h1><p class="lead">${esc(t.sub)}</p></div></div><article class="article j-article"><div class="j-body">${t.body.map(p => `<p>${esc(p)}</p>`).join('')}${e ? `<p>${esc(e.pre)}<a class="text-link" href="${esc(a.end.href)}">${esc(e.label)}</a>${esc(e.post)}</p>` : ''}</div><span class="j-end" aria-hidden="true"></span><div class="related"><p class="eyebrow">${esc(COPY.relatedNotes[lang])}</p>${a.related.map(byId).map(r => `<p><span class="j-no">${pad2(ARTICLES.indexOf(r) + 1)}</span><a class="text-link" href="${hub(lang)}${r.id}/">${esc(r[lang].title)}</a></p>`).join('')}</div><div class="space-top space-bottom"><div class="actions"><a class="btn outline" href="${hub(lang)}">${esc(COPY.backJournal[lang])}</a></div></div></article>`;
}
function hubMain(lang) {
  return `<div class="page-head"><div class="wrap"><p class="eyebrow">${esc(KICKER[lang])}</p><h1 class="fade-in">${esc(COPY.journalTitle[lang])}</h1><p class="lead">${esc(COPY.journalLead[lang])}</p></div></div><section class="section"><div class="wrap grid journal-grid">${ARTICLES.map((x, i) => `<article class="c4 journal-card"><a class="journal-item" href="${hub(lang)}${x.id}/"><p class="eyebrow j-meta"><span class="j-no">${pad2(i + 1)}</span><span>${esc(x[lang].cat)}</span></p><h3>${esc(x[lang].title)}</h3><p class="meta">${esc(x[lang].sub)}</p><span class="text-link">${esc(COPY.readArticle[lang])}</span></a></article>`).join('')}</div></section>`;
}

function page({ lang, id }) {
  const a = id ? byId(id) : null;
  const title = (a ? a.seo[lang].title : JSEO[lang].title) + ' · DARKSHELTER';
  const desc = a ? a.seo[lang].desc : JSEO[lang].desc;
  const canonical = urlFor(lang, id);
  const image = (shell.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  if (!image) throw new Error('og:image not found in index.html');
  const alternates = ['en', 'el'].map(l => `  <link rel="alternate" hreflang="${l}" href="${urlFor(l, id)}">`).join('\n') + `\n  <link rel="alternate" hreflang="x-default" href="${urlFor('en', id)}">`;
  const ld = a ? `\n  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: a[lang].title, description: desc, inLanguage: lang, image: [image], mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }, author: { '@type': 'Organization', name: 'DARKSHELTER' }, publisher: { '@type': 'Organization', name: 'DARKSHELTER' } }).replace(/</g, '\\u003c')}</script>` : '';
  let h = shell;
  const sub = (re, to) => { if (!re.test(h)) throw new Error('index.html template changed, no match for ' + re); h = h.replace(re, typeof to === 'function' ? to : () => to); };
  sub(/<html lang="en">/, `<html lang="${lang}">`);
  sub(/<meta name="viewport"[^>]*>/, m => `${m}\n  <base href="${rel(lang, id)}">`);
  sub(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  sub(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  sub(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  sub(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${a ? 'article' : 'website'}">\n  <meta property="og:locale" content="${lang === 'el' ? 'el_GR' : 'en_GB'}">`);
  sub(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`);
  sub(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`);
  sub(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">\n${alternates}`);
  sub(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>${ld}`);
  sub(/new URL\('version\.json', location\.href\)/, `new URL('version.json', document.baseURI)`);
  sub(/<main id="main-content" tabindex="-1">[\s\S]*?<\/main>/, `<main id="main-content" tabindex="-1">${a ? articleMain(a, lang) : hubMain(lang)}</main>`);
  return h;
}

const files = {};
for (const lang of ['en', 'el']) {
  files[hub(lang) + 'index.html'] = page({ lang });
  for (const a of ARTICLES) files[hub(lang) + a.id + '/index.html'] = page({ lang, id: a.id });
}
const urlEntry = (loc, idOrNull, hasAlt) => `  <url>\n    <loc>${loc}</loc>${hasAlt ? ['en', 'el'].map(l => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, idOrNull)}"/>`).join('') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', idOrNull)}"/>` : ''}\n  </url>`;
files['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[urlEntry(origin, null, false)].concat(['en', 'el'].flatMap(l => [urlEntry(urlFor(l), null, true)].concat(ARTICLES.map(a => urlEntry(urlFor(l, a.id), a.id, true))))).join('\n')}\n</urlset>\n`;
files['robots.txt'] = `User-agent: *\nAllow: /\n\nSitemap: ${origin}sitemap.xml\n`;

let stale = 0;
for (const [f, content] of Object.entries(files)) {
  const p = join(root, f);
  if (check) { if (!existsSync(p) || readFileSync(p, 'utf8') !== content) { console.error('STALE or missing: ' + f); stale++; } continue; }
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
}
if (check) { if (stale) process.exit(1); console.log('Journal static pages are up to date (' + Object.keys(files).length + ' files).'); }
else console.log('Wrote ' + Object.keys(files).length + ' files (' + Object.keys(files).filter(f => f.endsWith('index.html')).length + ' pages, sitemap.xml, robots.txt).');
