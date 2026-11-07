#!/usr/bin/env node
// Génère les deux pages du portail (anglais à la racine, français sous /fr/) : HTML statique, sans script ni style
// intégré. Le bloc d'installation est délimité par <!-- install --> et <!-- /install --> : le miroir Tor le remplace.
// `--check` échoue si une page suivie par Git n'est pas à jour.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://packages.bobine.fit";
const FP = "B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A";
const FP_RAW = FP.replace(/ /g, "");

const APT = `sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL ${SITE}/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] ${SITE}/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list
sudo apt update && sudo apt install bobine`;
const DNF5 = `sudo dnf config-manager addrepo --from-repofile=${SITE}/fedora/bobine-stable.repo
sudo dnf install bobine`;
const DNF4 = `sudo dnf config-manager --add-repo ${SITE}/fedora/bobine-stable.repo
sudo dnf install bobine`;
const PACMAN_KEY = `curl -fsSL ${SITE}/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key ${FP_RAW}`;
const PACMAN_CONF = `[bobine]
SigLevel = Required DatabaseOptional
Server = ${SITE}/arch/stable/$arch`;

const L = {
  en: {
    path: "/",
    other: "/fr/",
    otherLabel: "Français",
    title: "Bobine Linux packages",
    description: "Signed APT, DNF and Pacman repositories for Bobine, on x86_64 and aarch64, with stable, beta and canary channels.",
    lead: "Signed package repositories for Bobine, free software (AGPL-3.0) for video and audio playout in gyms.",
    key: "Signing key:",
    fingerprint: "Fingerprint:",
    security: "Security",
    apt: "Debian, Ubuntu (APT)",
    dnf: "Fedora, RHEL (DNF)",
    dnf5: "DNF 5 (Fedora 41 and later, RHEL 10):",
    dnf4: "DNF 4 (Fedora 40 and earlier, RHEL 9):",
    pacman: "Arch Linux (Pacman)",
    pacmanConf: "Add to /etc/pacman.conf, then run sudo pacman -Syu bobine:",
    channels: "Channels",
    channelsText: "Replace stable with beta or canary to follow another channel. Architectures: x86_64 and aarch64.",
    indexes: "Repository indexes",
    docs: ["https://bobine.fit/en/documentation", "Documentation"],
  },
  fr: {
    path: "/fr/",
    other: "/",
    otherLabel: "English",
    title: "Paquets Linux Bobine",
    description: "Dépôts APT, DNF et Pacman signés pour Bobine, en x86_64 et aarch64, avec les canaux stable, beta et canary.",
    lead: "Dépôts de paquets signés pour Bobine, logiciel libre (AGPL-3.0) de diffusion vidéo et audio pour les salles de sport.",
    key: "Clé de signature :",
    fingerprint: "Empreinte :",
    security: "Sécurité",
    apt: "Debian, Ubuntu (APT)",
    dnf: "Fedora, RHEL (DNF)",
    dnf5: "DNF 5 (Fedora 41 et suivantes, RHEL 10) :",
    dnf4: "DNF 4 (Fedora 40 et précédentes, RHEL 9) :",
    pacman: "Arch Linux (Pacman)",
    pacmanConf: "Ajoutez à /etc/pacman.conf, puis lancez sudo pacman -Syu bobine :",
    channels: "Canaux",
    channelsText: "Remplacez stable par beta ou canary pour suivre un autre canal. Architectures : x86_64 et aarch64.",
    indexes: "Index des dépôts",
    docs: ["https://bobine.fit/fr/documentation", "Documentation"],
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pre = (s) => `<pre><code>${esc(s)}</code></pre>`;

function page(lang) {
  const t = L[lang];
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<link rel="canonical" href="${SITE}${t.path}">
<link rel="alternate" hreflang="en" href="${SITE}/">
<link rel="alternate" hreflang="fr" href="${SITE}/fr/">
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/assets/site.css">
<script src="/assets/copy.js" defer></script>
</head>
<body>
<main>
<header>
<h1>${esc(t.title)}</h1>
<p class="lead">${esc(t.lead)}</p>
<p class="key">${esc(t.key)} <a href="/bobine.gpg">bobine.gpg</a> · ${esc(t.fingerprint)} <code>${FP}</code></p>
</header>
<div>
<!-- install -->
<section>
<h2>${t.apt}</h2>
${pre(APT)}
</section>
<section>
<h2>${t.dnf}</h2>
<p>${esc(t.dnf5)}</p>
${pre(DNF5)}
<p>${esc(t.dnf4)}</p>
${pre(DNF4)}
</section>
<section>
<h2>${t.pacman}</h2>
${pre(PACMAN_KEY)}
<p>${esc(t.pacmanConf)}</p>
${pre(PACMAN_CONF)}
</section>
<!-- /install -->
</div>
<div>
<section>
<h2>${t.channels}</h2>
<p>${esc(t.channelsText)}</p>
</section>
<section>
<h2>${t.indexes}</h2>
<p><a href="/debian/">debian/</a> · <a href="/fedora/">fedora/</a> · <a href="/arch/">arch/</a></p>
</section>
</div>
</main>
<footer>
<p><a href="https://bobine.fit">bobine.fit</a> · <a href="${t.docs[0]}">${t.docs[1]}</a> · <a href="https://security.bobine.fit">${t.security}</a> · <a href="https://github.com/FantasmaGlad/Bobine">GitHub</a> · <a href="${t.other}">${t.otherLabel}</a></p>
</footer>
</body>
</html>
`;
}

const outputs = { "index.html": page("en"), "fr/index.html": page("fr") };
const check = process.argv.includes("--check");
let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const target = join(root, file);
  if (check) {
    let current = "";
    try { current = readFileSync(target, "utf8"); } catch { /* absent : périmé */ }
    if (current !== content) { console.error(`${file} périmé : node scripts/build-portal.mjs`); stale++; }
  } else {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
}
if (stale) process.exit(1);
console.log(check ? "Pages du portail à jour." : "Pages du portail générées.");
