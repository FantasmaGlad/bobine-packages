#!/usr/bin/env node
// Contrôle du portail : (1) aucune couleur, aucun flou en pixels et aucune ancienne appellation dans les sources ;
// (2) pages générées à jour ; (3) avec un serveur local et Chromium (PORTAL_URL, CHROME_BIN), géométrie à 360, 390, 640x360,
// 768 et 1280 px : pas de débordement horizontal, cibles tactiles d'au moins 44 px, arène de Pong d'au moins 80 % de la
// hauteur à 360x640. Chromium mesure des mises en page, pas du matériel.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const errors = [];
const fail = (m) => errors.push(m);
const read = (f) => readFileSync(join(root, f), "utf8");

// 1. Valeurs figées ------------------------------------------------------------------------------------------------
for (const f of ["assets/site.css", "assets/pong.css"]) {
  const css = read(f).replace(/\/\*[\s\S]*?\*\//g, "");
  if (/#[0-9a-fA-F]{3,8}\b/.test(css)) fail(`${f} : couleur hexadécimale figée`);
  if (/\brgba?\(/.test(css)) fail(`${f} : rgb() figé`);
  if (/blur\(\s*\d+px/.test(css)) fail(`${f} : flou en pixels, utiliser un jeton`);
}
for (const f of ["assets/site.js", "assets/pong.js"]) {
  const js = read(f).replace(/\/\*[\s\S]*?\*\//g, "");
  if (/['"]#[0-9a-fA-F]{3,8}['"]/.test(js)) fail(`${f} : couleur figée dans le script`);
}
for (const f of ["index.html", "fr/index.html", "pong/index.html", "fr/pong/index.html", "llms.txt", "sitemap.xml", "README.md", "README.fr.md"]) {
  const text = read(f);
  if (/Arcade Pong/i.test(text)) fail(`${f} : « Arcade Pong » (le jeu s'appelle Pong)`);
  if (/<style[\s>]/.test(text)) fail(`${f} : feuille de style en ligne`);
  if (/\bstyle="[^"]*(?:#[0-9a-fA-F]{3,8}|rgb)/.test(text)) fail(`${f} : couleur en ligne`);
}

// 2. Pages générées à jour -----------------------------------------------------------------------------------------
for (const page of ["index.html", "fr/index.html", "pong/index.html", "fr/pong/index.html"]) {
  for (const match of read(page).matchAll(/<img[^>]+src="(\/icons\/[^" ]+)"/g)) {
    try { if (!read(match[1].slice(1)).includes("<svg")) fail(`${page}: logo SVG invalide ${match[1]}`); }
    catch { fail(`${page}: logo absent ${match[1]}`); }
  }
  if (read(page).includes('id="themeSelect"') || read(page).includes('class="lang-switch"')) fail(`${page}: sélecteur distinct du site principal`);
}
const gen = spawnSync(process.execPath, [join(root, "scripts/build-portal.mjs"), "--check"], { encoding: "utf8" });
if (gen.status !== 0) fail(`pages générées périmées : ${gen.stderr.trim()}`);

// 3. Géométrie -----------------------------------------------------------------------------------------------------
const url = process.env.PORTAL_URL;
if (url) {
  const { delay, launchChrome } = await import("./cdp.mjs");
  const browser = await launchChrome();
  const { send, evaluate } = browser;
  try {
    await send("Page.enable");
    await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    let views = 0;
    for (const path of ["/", "/fr/", "/pong/", "/fr/pong/"]) {
      for (const [width, height] of [[360, 640], [390, 800], [640, 360], [768, 1024], [1280, 800]]) {
        await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
        await send("Page.navigate", { url: url + path });
        for (let i = 0; i < 100; i++) { if (await evaluate("document.readyState === 'complete'")) break; await delay(100); }
        await delay(500);
        for (const theme of ["lavande", "orchidee"]) {
          await evaluate(`document.documentElement.setAttribute('data-theme', ${JSON.stringify(theme)}); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`);
          const r = await evaluate(`(() => {
            const root = document.documentElement;
            const small = [...document.querySelectorAll('a, button, select, summary')].filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' && !e.closest('.sr-only') && !e.closest('p, li') && !e.classList.contains('skip-link')).flatMap((e) => { const b = e.getBoundingClientRect(); return b.width < 43.9 || b.height < 43.9 ? [e.tagName + ':' + e.textContent.trim().slice(0, 24) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)] : []; });
            const arena = document.querySelector('.pong-main');
            const header = document.querySelector('.site-header').getBoundingClientRect().height;
            const wide = root.scrollWidth <= root.clientWidth ? [] : [...document.querySelectorAll('body *')].filter((e) => { const d = e.style.display; e.style.display = 'none'; const fixed = root.scrollWidth <= root.clientWidth; e.style.display = d; return fixed; }).slice(0, 5).map((e) => e.tagName + '.' + String(e.className).slice(0, 40) + ' ' + e.textContent.trim().slice(0, 30));
            return { scroll: root.scrollWidth, width: root.clientWidth, wide, small, arena: arena ? arena.getBoundingClientRect().height / innerHeight : null, header };
          })()`);
          views++;
          const where = `${path} ${width}x${height} ${theme}`;
          if (r.scroll > r.width) fail(`${where} : débordement horizontal (${r.scroll} > ${r.width}) ${r.wide.join(', ')}`);
          if (r.small.length) fail(`${where} : cibles sous 44 px : ${r.small.slice(0, 4).join(", ")}`);
          if (r.arena !== null && width === 360 && r.arena < 0.8) fail(`${where} : arène à ${Math.round(r.arena * 100)} % de la hauteur (minimum 80 %)`);
          if (r.arena !== null && height === 360 && r.arena < 0.55) fail(`${where} : arène à ${Math.round(r.arena * 100)} % de la hauteur en paysage`);
        }
      }
    }
    // Les commandes doivent aussi fonctionner une fois le menu et la palette ouverts.
    let palettes = 0;
    for (const path of ["/", "/fr/", "/pong/", "/fr/pong/"]) for (const [width, height] of [[360, 640], [640, 360], [1280, 800]]) {
      await send("Emulation.setDeviceMetricsOverride", {width, height, deviceScaleFactor:1, mobile:width < 768});
      await send("Page.navigate", {url:url + path});
      for (let i = 0; i < 100; i++) { if (await evaluate("document.readyState === 'complete' && !!document.getElementById('themeToggle')")) break; await delay(100); }
      await evaluate(`(() => { const menu=document.getElementById('menuBtn'); if(getComputedStyle(menu).display!=='none') menu.click(); document.getElementById('themeToggle').click(); })()`);
      await delay(200);
      const palette = await evaluate(`(() => {const p=document.getElementById('themePalette'), r=p.getBoundingClientRect(); return {hidden:p.hidden,left:r.left,right:r.right,top:r.top,bottom:r.bottom,small:[...p.querySelectorAll('button')].filter(e=>!e.hidden&&e.getClientRects().length).some(e=>{const b=e.getBoundingClientRect();return b.width<43.9||b.height<43.9})};})()`);
      if (palette.hidden || palette.left < 0 || palette.right > width + 1 || palette.top < 0 || palette.bottom > height + 1 || palette.small) fail(`${path} ${width}x${height}: palette hors écran ou cibles trop petites ${JSON.stringify(palette)}`);
      await evaluate(`document.querySelector('[data-theme-group="dark"]').click(); document.querySelector('[data-theme-value="orchidee"]').click()`);
      const selected = await evaluate(`document.documentElement.dataset.theme === 'orchidee' && document.getElementById('themePalette').hidden && localStorage.getItem('bobineweb-theme') === 'orchidee' && document.cookie.includes('bobine-theme=orchidee')`);
      if (!selected) fail(`${path}: sélection et stockage du thème`);
      await evaluate(`document.getElementById('themeToggle').click()`);
      await send('Input.dispatchKeyEvent', {type:'keyDown', key:'Escape', code:'Escape', windowsVirtualKeyCode:27});
      await send('Input.dispatchKeyEvent', {type:'keyUp', key:'Escape', code:'Escape', windowsVirtualKeyCode:27});
      if (!await evaluate(`document.getElementById('themePalette').hidden && document.activeElement.id === 'themeToggle'`)) fail(`${path}: fermeture clavier et retour du focus`);
      const broken = await evaluate(`Array.from(document.querySelectorAll('img.brand-icon')).filter(e=>e.complete&&e.naturalWidth===0).length`);
      if (broken) fail(`${path}: ${broken} logos introuvables`);
      palettes++;
    }
    console.log(`check-portal : ${palettes} palettes ouvertes, sélection, stockage et fermeture clavier vérifiés.`);
    console.log(`check-portal : ${views} vues mesurées.`);
  } finally {
    await browser.close();
  }
}

if (errors.length) { console.error(errors.map((e) => `::error::${e}`).join("\n")); process.exit(1); }
console.log("check-portal : sources conformes, pages générées à jour.");
