#!/usr/bin/env node
// Génère les pages du portail (accueil EN/FR et Pong EN/FR) à partir d'un seul contenu bilingue,
// pour que les deux langues ne divergent jamais. Les pages générées sont suivies par Git ; la CI refuse un fichier
// périmé (node scripts/build-portal.mjs --check). Aucun style ni script en ligne : tout vient de assets/.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://packages.bobine.fit";
const FP = "B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A";
const THEMES = [
  ["charbon", "Charbon"], ["clair", "Carmin"], ["miel", "Ambre"], ["menthe", "Sauge"], ["ciel", "Azur"], ["lavande", "Lavande"], ["beige", "Sable"], ["coco", "Cacao"],
  ["les-mills-sombre", "Onyx"], ["charbon-sombre", "Graphite"], ["automne", "Cuivre"], ["hiver", "Abysse"], ["lune", "Indigo"], ["chili", "Rubis"], ["orchidee", "Orchidée"], ["taupe", "Moka"],
];

const L = {
  en: {
    lang: "en",
    path: "/",
    other: "/fr/",
    site: "https://bobine.fit/en",
    title: "Bobine Linux packages: signed APT, DNF and Pacman repositories",
    description: "Official OpenPGP-signed repositories for Bobine on Debian, Ubuntu, Fedora, RHEL and Arch Linux, in x86_64 and ARM64, with stable, beta and canary channels.",
    keywords: "Bobine, Linux, APT repository, DNF repository, Pacman repository, Debian, Ubuntu, Fedora, Arch Linux, ARM64, x86_64, AGPL-3.0",
    ogTitle: "Bobine Linux packages: signed APT, DNF and Pacman repositories",
    ogDescription: "Install Bobine on Debian, Ubuntu, Fedora and Arch Linux from OpenPGP-signed repositories, on x86_64 and ARM64.",
    skip: "Skip to content",
    brandNote: "Signed Linux packages",
    nav: [
      ["https://bobine.fit/en/documentation", "Documentation"],
      ["https://bobine.fit/en/linux", "Linux"],
      ["/pong/", "Pong"],
    ],
    cta: ["https://bobine.fit/en/download", "Download"],
    menu: "Menu",
    navLabel: "Main navigation",
    langLabel: "Language",
    themeLabel: "Theme",
    heroTitle: "Bobine, installed and updated with your Linux system.",
    heroText: "Choose your distribution family, release channel and architecture. Packages and repository indexes are signed with the same OpenPGP key and update with your package manager on x86_64 and ARM64.",
    confLabel: "Linux installation configurator",
    channel: "Channel",
    channels: [["stable", "Stable (recommended)"], ["beta", "Beta"], ["canary", "Canary"]],
    arch: "Architecture",
    archs: [["x86_64", "x86_64 / amd64 (Intel, AMD)"], ["arm64", "ARM64 / aarch64"]],
    family: "Distribution family",
    families: [
      ["debian", "Debian, Ubuntu and derivatives", "APT · updates with apt upgrade", [["debian", "Debian 12/13"], ["ubuntu", "Ubuntu 22.04/24.04"], ["linuxmint", "Linux Mint"], ["popos", "Pop!_OS"], ["zorin", "Zorin OS"], ["raspberrypi", "Raspberry Pi OS"]]],
      ["fedora", "Fedora, RHEL and Enterprise Linux", "DNF · updates with dnf upgrade", [["fedora", "Fedora"], ["nobara", "Nobara"], ["rhel", "RHEL 9"], ["almalinux", "AlmaLinux"], ["rockylinux", "Rocky Linux"], ["opensuse", "openSUSE"]]],
      ["arch", "Arch Linux and derivatives", "Pacman · updates with pacman -Syu", [["arch", "Arch Linux"], ["endeavouros", "EndeavourOS"], ["cachyos", "CachyOS"], ["manjaro", "Manjaro"]]],
    ],
    dnfTabs: [["dnf5", "Fedora 41+ (DNF 5)"], ["dnf4", "RHEL, Alma, Rocky (DNF 4)"]],
    dnfLabel: "DNF version",
    copy: "Copy commands",
    dlTitle: "Direct package (.deb, amd64)",
    dlMeta: "Offline install: sudo apt install ./file.deb",
    dlBtn: "Download .deb",
    keyFile: "bobine.gpg",
    noscriptTitle: "Without JavaScript: Debian and Ubuntu, stable channel",
    archSection: ["Architectures", "Targeted processors", "Bobine is built natively for x86_64 (amd64) and ARM64 (aarch64), without emulation.", "Compatibility lists are targets, not hardware validations: each device is validated on real hardware before it is announced as validated. Details on the Bobine site."],
    archCards: [
      ["x86_64 (Intel and AMD)", ["intel", "amd"], "Intel Core, Core Ultra and N-series processors, AMD Ryzen, Dell Wyse 5070 class thin clients and mini PCs for 24/7 use."],
      ["ARM64 (Snapdragon, Apple Silicon, single-board computers)", ["snapdragon", "apple", "raspberrypi"], "Snapdragon X laptops, ARM tablets with USB-C video output, Raspberry Pi 5 and similar boards."],
    ],
    archLink: ["https://bobine.fit/en/computer", "See the compatibility pages"],
    secSection: ["Security", "One OpenPGP signature for every repository", "Repository indexes (InRelease, repomd.xml.asc, bobine.db.sig) and packages are signed with the same key. Your package manager rejects a file that was altered."],
    fpTitle: "Signing key fingerprint",
    fpText: "Check that the fingerprint shown by your package manager matches this one:",
    fpCopy: "Copy fingerprint",
    inspect: "Inspect the key directly:",
    notes: "Distribution notes",
    notesList: [
      ["Fedora and RPM Fusion", "Fedora ships ffmpeg-free by default. Enable RPM Fusion, then run sudo dnf swap ffmpeg-free ffmpeg --allowerasing for the full codec set."],
      ["RHEL 9, AlmaLinux, Rocky Linux", "Enable EPEL first (sudo dnf install epel-release) so the multimedia and WebKitGTK dependencies resolve."],
      ["Updates from the app", "Bobine detects whether it was installed with dpkg/apt, rpm/dnf or pacman and updates itself in the same format, through Polkit."],
    ],
    ecoSection: ["Other platforms", "Windows, macOS, Android and browsers", "Bobine also installs on other systems and is controlled from any modern browser on the local network."],
    eco: [
      ["https://bobine.fit/en/computer", ["windows", "apple"], "Windows and macOS", "Installers for Windows (x86_64, ARM64) and a disk image for Apple Silicon Macs."],
      ["https://bobine.fit/en/google-book", ["android", "androidtv"], "Android, Google Book and Android TV", "An APK for tablets and Google Book, and an APK for Android TV and Google TV boxes."],
      ["https://bobine.fit/en/documentation", ["firefox", "chrome", "safari"], "Browsers and Tor", "Remote control from Firefox, Chrome, Edge, Brave, Safari and Tor Browser, with a Tor mirror of the site and of these repositories."],
    ],
    footerLead: "Autonomous video and audio playout, free software under AGPL-3.0. OpenPGP key 829EE15A.",
    footerLinks: [
      ["https://bobine.fit/en", "bobine.fit"],
      ["https://bobine.fit/en/linux", "Linux"],
      ["https://bobine.fit/en/documentation", "Documentation"],
      ["https://security.bobine.fit", "Security"],
      ["/pong/", "Pong"],
      ["/llms.txt", "llms.txt"],
      ["https://github.com/FantasmaGlad/Bobine", "GitHub"],
    ],
    copyStatus: "Copy status",
    pong: {
      title: "Pong: play against the robot",
      description: "Pong, the classic arcade game, in your browser: first to 7 points wins against the robot. Keyboard, mouse or touch, no account and no tracking.",
      keywords: "Pong, arcade game, retro game, Bobine",
      h1: "Pong",
      player: "Player", robot: "Robot",
      startTitle: "Ready to play?", startText: "First to 7 points wins. Move with the arrow keys, W/S, the mouse or your finger.", start: "Start",
      winTitle: "Victory!", winText: "You won the 7-point match against the robot.",
      lossTitle: "Defeat", lossText: "The robot reached 7 points.", again: "Play again",
      back: "Back to the package hub", crumbHome: "Packages",
      footer: "Bobine, free software under AGPL-3.0.",
      contribute: "If you can read this, you are interested in the Linux project. Come and help me build Bobine:",
    },
  },
  fr: {
    lang: "fr",
    path: "/fr/",
    other: "/",
    site: "https://bobine.fit/fr",
    title: "Paquets Linux Bobine : dépôts APT, DNF et Pacman signés",
    description: "Dépôts officiels signés OpenPGP pour Bobine sur Debian, Ubuntu, Fedora, RHEL et Arch Linux, en x86_64 et ARM64, avec les canaux Stable, Bêta et Canary.",
    keywords: "Bobine, Linux, dépôt APT, dépôt DNF, dépôt Pacman, Debian, Ubuntu, Fedora, Arch Linux, ARM64, x86_64, AGPL-3.0",
    ogTitle: "Paquets Linux Bobine : dépôts APT, DNF et Pacman signés",
    ogDescription: "Installez Bobine sur Debian, Ubuntu, Fedora et Arch Linux depuis des dépôts signés OpenPGP, en x86_64 et ARM64.",
    skip: "Aller au contenu",
    brandNote: "Paquets Linux signés",
    nav: [
      ["https://bobine.fit/fr/documentation", "Documentation"],
      ["https://bobine.fit/fr/linux", "Linux"],
      ["/fr/pong/", "Pong"],
    ],
    cta: ["https://bobine.fit/fr/telechargement", "Télécharger"],
    menu: "Menu",
    navLabel: "Navigation principale",
    langLabel: "Langue",
    themeLabel: "Thème",
    heroTitle: "Bobine, installé et mis à jour avec votre système Linux.",
    heroText: "Choisissez votre famille de distribution, votre canal et votre architecture. Les paquets et les index des dépôts sont signés avec la même clé OpenPGP et se mettent à jour avec votre gestionnaire de paquets, en x86_64 et en ARM64.",
    confLabel: "Configurateur d'installation Linux",
    channel: "Canal",
    channels: [["stable", "Stable (recommandé)"], ["beta", "Bêta"], ["canary", "Canary"]],
    arch: "Architecture",
    archs: [["x86_64", "x86_64 / amd64 (Intel, AMD)"], ["arm64", "ARM64 / aarch64"]],
    family: "Famille de distribution",
    families: [
      ["debian", "Debian, Ubuntu et dérivées", "APT · mises à jour avec apt upgrade", [["debian", "Debian 12/13"], ["ubuntu", "Ubuntu 22.04/24.04"], ["linuxmint", "Linux Mint"], ["popos", "Pop!_OS"], ["zorin", "Zorin OS"], ["raspberrypi", "Raspberry Pi OS"]]],
      ["fedora", "Fedora, RHEL et Enterprise Linux", "DNF · mises à jour avec dnf upgrade", [["fedora", "Fedora"], ["nobara", "Nobara"], ["rhel", "RHEL 9"], ["almalinux", "AlmaLinux"], ["rockylinux", "Rocky Linux"], ["opensuse", "openSUSE"]]],
      ["arch", "Arch Linux et dérivées", "Pacman · mises à jour avec pacman -Syu", [["arch", "Arch Linux"], ["endeavouros", "EndeavourOS"], ["cachyos", "CachyOS"], ["manjaro", "Manjaro"]]],
    ],
    dnfTabs: [["dnf5", "Fedora 41+ (DNF 5)"], ["dnf4", "RHEL, Alma, Rocky (DNF 4)"]],
    dnfLabel: "Version de DNF",
    copy: "Copier les commandes",
    dlTitle: "Paquet direct (.deb, amd64)",
    dlMeta: "Installation hors ligne : sudo apt install ./fichier.deb",
    dlBtn: "Télécharger le .deb",
    keyFile: "bobine.gpg",
    noscriptTitle: "Sans JavaScript : Debian et Ubuntu, canal Stable",
    archSection: ["Architectures", "Processeurs visés", "Bobine est compilé nativement pour x86_64 (amd64) et ARM64 (aarch64), sans émulation.", "Les listes de compatibilité sont des cibles, pas des validations sur matériel : un appareil n'est annoncé validé qu'après un essai sur le matériel réel. Détails sur le site de Bobine."],
    archCards: [
      ["x86_64 (Intel et AMD)", ["intel", "amd"], "Processeurs Intel Core, Core Ultra et série N, AMD Ryzen, clients légers de type Dell Wyse 5070 et mini PC pour un usage 24/7."],
      ["ARM64 (Snapdragon, Apple Silicon, cartes monocartes)", ["snapdragon", "apple", "raspberrypi"], "Portables Snapdragon X, tablettes ARM avec sortie vidéo USB-C, Raspberry Pi 5 et cartes similaires."],
    ],
    archLink: ["https://bobine.fit/fr/ordinateur", "Voir les pages de compatibilité"],
    secSection: ["Sécurité", "Une seule signature OpenPGP pour tous les dépôts", "Les index des dépôts (InRelease, repomd.xml.asc, bobine.db.sig) et les paquets sont signés avec la même clé. Votre gestionnaire de paquets refuse un fichier altéré."],
    fpTitle: "Empreinte de la clé de signature",
    fpText: "Vérifiez que l'empreinte affichée par votre gestionnaire de paquets correspond à celle-ci :",
    fpCopy: "Copier l'empreinte",
    inspect: "Inspecter la clé directement :",
    notes: "Notes par distribution",
    notesList: [
      ["Fedora et RPM Fusion", "Fedora fournit ffmpeg-free par défaut. Activez RPM Fusion puis lancez sudo dnf swap ffmpeg-free ffmpeg --allowerasing pour disposer de tous les codecs."],
      ["RHEL 9, AlmaLinux, Rocky Linux", "Activez d'abord EPEL (sudo dnf install epel-release) pour que les dépendances multimédia et WebKitGTK soient résolues."],
      ["Mises à jour depuis l'application", "Bobine détecte s'il a été installé avec dpkg/apt, rpm/dnf ou pacman et se met à jour dans le même format, via Polkit."],
    ],
    ecoSection: ["Autres plateformes", "Windows, macOS, Android et navigateurs", "Bobine s'installe aussi sur d'autres systèmes et se pilote depuis n'importe quel navigateur moderne du réseau local."],
    eco: [
      ["https://bobine.fit/fr/ordinateur", ["windows", "apple"], "Windows et macOS", "Installateurs Windows (x86_64, ARM64) et image disque pour les Mac Apple Silicon."],
      ["https://bobine.fit/fr/google-book", ["android", "androidtv"], "Android, Google Book et Android TV", "Un APK pour les tablettes et Google Book, et un APK pour les boîtiers Android TV et Google TV."],
      ["https://bobine.fit/fr/documentation", ["firefox", "chrome", "safari"], "Navigateurs et Tor", "Pilotage depuis Firefox, Chrome, Edge, Brave, Safari et Tor Browser, avec un miroir Tor du site et de ces dépôts."],
    ],
    footerLead: "Régie vidéo et audio autonome, logiciel libre sous AGPL-3.0. Clé OpenPGP 829EE15A.",
    footerLinks: [
      ["https://bobine.fit/fr", "bobine.fit"],
      ["https://bobine.fit/fr/linux", "Linux"],
      ["https://bobine.fit/fr/documentation", "Documentation"],
      ["https://security.bobine.fit", "Sécurité"],
      ["/fr/pong/", "Pong"],
      ["/llms.txt", "llms.txt"],
      ["https://github.com/FantasmaGlad/Bobine", "GitHub"],
    ],
    copyStatus: "État de la copie",
    pong: {
      title: "Pong : jouez contre le robot",
      description: "Pong, le classique de l'arcade, dans votre navigateur : le premier à 7 points gagne contre le robot. Clavier, souris ou tactile, sans compte ni suivi.",
      keywords: "Pong, jeu d'arcade, jeu rétro, Bobine",
      h1: "Pong",
      player: "Joueur", robot: "Robot",
      startTitle: "Prêt à jouer ?", startText: "Le premier à 7 points gagne. Déplacez-vous avec les flèches, W/S (Z/S), la souris ou le doigt.", start: "Commencer",
      winTitle: "Victoire !", winText: "Vous avez remporté la manche à 7 points face au robot.",
      lossTitle: "Défaite", lossText: "Le robot a atteint 7 points.", again: "Recommencer",
      back: "Retour aux dépôts Linux", crumbHome: "Paquets",
      footer: "Bobine, logiciel libre sous AGPL-3.0.",
      contribute: "Si vous pouvez lire ceci, le projet Linux vous intéresse. Venez m'aider à construire Bobine :",
    },
  },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const icon = (kind, name) => `<span class="icon-mask" style="--src:url(/icons/${kind}/${name}.svg)" aria-hidden="true"></span>`;
const iconOf = (name) => (["windows", "apple", "android", "androidtv", "framework", "tor", "linux"].includes(name) ? icon("os", name) : ["intel", "amd", "snapdragon"].includes(name) ? icon("chips", name) : ["firefox", "chrome", "safari", "edge", "brave", "torbrowser"].includes(name) ? icon("browsers", name) : icon("distros", name));

/** Balises communes de <head> : métadonnées, jetons, feuilles de style et script d'anti-clignotement du thème. */
function head(t, o) {
  const alt = t.lang === "en" ? "fr" : "en";
  const url = `${SITE}${o.path}`;
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(o.title)}</title>
  <meta name="description" content="${esc(o.description)}">
  <meta name="keywords" content="${esc(o.keywords)}">
  <meta name="robots" content="index, follow">
  <link rel="icon" href="/favicon.ico">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="${t.lang}" href="${url}">
  <link rel="alternate" hreflang="${alt}" href="${SITE}${o.otherPath}">
  <link rel="alternate" hreflang="x-default" href="${SITE}${o.defaultPath}">
  <meta property="og:title" content="${esc(o.ogTitle ?? o.title)}">
  <meta property="og:description" content="${esc(o.ogDescription ?? o.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Bobine Linux Packages">
  <meta property="og:locale" content="${t.lang === "en" ? "en_US" : "fr_FR"}">
  <meta property="og:image" content="${SITE}/og-image.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(o.ogTitle ?? o.title)}">
  <meta name="twitter:description" content="${esc(o.ogDescription ?? o.description)}">
  <meta name="twitter:image" content="${SITE}/og-image.webp">
  <script>document.documentElement.className='js';(function(){try{var m=document.cookie.match(/(?:^|; )bobine-theme=([\w-]+)/);var t=(m&&m[1])||localStorage.getItem('bobineweb-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})()</script>
  <link rel="stylesheet" href="/assets/bobine-tokens.css">
  <link rel="stylesheet" href="/assets/site.css">${o.extraCss ? `\n  <link rel="stylesheet" href="${o.extraCss}">` : ""}
  <script type="application/ld+json">${JSON.stringify(o.jsonLd)}</script>`;
}

/** En-tête commun : marque, navigation, langue, thème ; `langLinks` = [adresse EN, adresse FR]. */
function header(t, langLinks) {
  const options = THEMES.map(([id, label]) => `<option value="${id}">${esc(label)}</option>`).join("");
  const controls = `
          <div class="header-controls">
            <div class="lang-switch" role="group" aria-label="${esc(t.langLabel)}">
              <a href="${langLinks[0]}" ${t.lang === "en" ? 'aria-current="page"' : ""}>EN</a>
              <a href="${langLinks[1]}" ${t.lang === "fr" ? 'aria-current="page"' : ""}>FR</a>
            </div>
            <label class="sr-only" for="themeSelect">${esc(t.themeLabel)}</label>
            <select id="themeSelect" class="theme-select" aria-label="${esc(t.themeLabel)}">${options}</select>
          </div>`;
  const nav = `${t.nav.map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join("\n          ")}
          <a href="/bobine.gpg" download>${esc(t.keyFile)}</a>
          <a class="btn" href="${t.cta[0]}">${esc(t.cta[1])}</a>${controls}`;
  return `<header class="site-header">
    <div class="site-header__inner">
      <a href="${t.site}" class="brand" aria-label="Bobine">
        <img src="/logo_bobine_entier.png" alt="Bobine" width="112" height="28">
        <span>${esc(t.brandNote)}</span>
      </a>
      <button type="button" class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="siteNav" aria-label="${esc(t.menu)}"><span class="icon-mask" style="--src:url(/icons/ui/menu.svg)" aria-hidden="true"></span></button>
      <nav class="header-nav" id="siteNav" aria-label="${esc(t.navLabel)}">
          ${nav}
      </nav>
    </div>
  </header>`;
}

function footer(t) {
  return `<footer class="site-footer">
    <div class="site-footer__inner">
      <div>${esc(t.footerLead)}</div>
      <nav class="footer-links" aria-label="Footer">
        ${t.footerLinks.map(([href, label]) => `<a href="${href}"${href.startsWith("http") && !href.includes("bobine.fit") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}</a>`).join("\n        ")}
      </nav>
    </div>
  </footer>`;
}

function page(t) {
  const url = `${SITE}${t.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Bobine Linux packages", description: t.description, inLanguage: ["en", "fr"] },
      {
        "@type": "SoftwareApplication", "@id": "https://bobine.fit/#software", name: "Bobine",
        operatingSystem: "Debian, Ubuntu, Linux Mint, Fedora, RHEL, AlmaLinux, Rocky Linux, Arch Linux, Windows, macOS, Android, Android TV",
        applicationCategory: "MultimediaApplication", license: "https://www.gnu.org/licenses/agpl-3.0.html",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@type": "Organization", name: "Bobine", url: "https://bobine.fit" },
        downloadUrl: `${SITE}/debian/`,
      },
    ],
  };
  const families = t.families.map(([id, title, sub, chips], i) => `
        <button type="button" class="distro" data-distro="${id}" aria-pressed="${i === 0}">
          <span class="distro__title">${esc(title)}</span>
          <span class="distro__sub">${esc(sub)}</span>
          <span class="distro__chips">${chips.map(([ic, label]) => `<span>${iconOf(ic)}${esc(label)}</span>`).join("")}</span>
        </button>`).join("");
  const seg = (items, attr, selected) => items.map(([v, label]) => `<button type="button" ${attr}="${v}" aria-pressed="${v === selected}">${esc(label)}</button>`).join("");
  return `<!DOCTYPE html>
<html lang="${t.lang}" data-theme="lavande">
<head>
  ${head(t, { path: t.path, otherPath: t.other, defaultPath: "/", title: t.title, description: t.description, keywords: t.keywords, ogTitle: t.ogTitle, ogDescription: t.ogDescription, jsonLd })}
</head>
<body>
  <a class="skip-link" href="#main">${esc(t.skip)}</a>
  ${header(t, ["/", "/fr/"])}

  <main id="main" class="container">
    <section class="hero">
      <h1>${esc(t.heroTitle)}</h1>
      <p>${esc(t.heroText)}</p>
    </section>

    <section id="configurator" class="glass workspace" aria-label="${esc(t.confLabel)}">
      <div class="controls">
        <div class="control" role="group" aria-label="${esc(t.channel)}">
          <span class="control__label">${esc(t.channel)}</span>
          <div class="seg">${seg(t.channels, "data-channel", "stable")}</div>
        </div>
        <div class="control" role="group" aria-label="${esc(t.arch)}">
          <span class="control__label">${esc(t.arch)}</span>
          <div class="seg">${seg(t.archs, "data-arch", "x86_64")}</div>
        </div>
      </div>

      <div class="control" role="group" aria-label="${esc(t.family)}">
        <span class="control__label">${esc(t.family)}</span>
        <div class="distros">${families}
        </div>
      </div>

      <div class="terminal">
        <div class="terminal__bar">
          <span id="terminalTitle"></span>
          <span class="actions">
            <span id="dnfTabs" class="seg hidden" role="group" aria-label="${esc(t.dnfLabel)}">${seg(t.dnfTabs, "data-dnf", "dnf5")}</span>
            <button type="button" id="copyCommands" class="btn"><span>${esc(t.copy)}</span></button>
          </span>
        </div>
        <div class="terminal__body" id="terminalSteps"></div>
      </div>

      <div class="dl-bar">
        <div>
          <div class="dl-bar__title" id="dlTitle">${esc(t.dlTitle)}</div>
          <div class="dl-bar__meta" id="dlMeta">${esc(t.dlMeta)}</div>
        </div>
        <div class="actions">
          <a href="/bobine.gpg" class="btn" download>${esc(t.keyFile)}</a>
          <a href="https://github.com/FantasmaGlad/Bobine/releases" id="dlLink" class="btn btn--primary"><span id="dlBtnText">${esc(t.dlBtn)}</span></a>
        </div>
      </div>
      <noscript>
        <div class="noscript"><strong>${esc(t.noscriptTitle)}</strong>
<pre>sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list
sudo apt update &amp;&amp; sudo apt install bobine</pre></div>
      </noscript>
    </section>

    <section class="section" id="architectures">
      <div class="section__eyebrow">${esc(t.archSection[0])}</div>
      <h2>${esc(t.archSection[1])}</h2>
      <p class="section__desc">${esc(t.archSection[2])}</p>
      <div class="grid-2">${t.archCards.map(([title, icons, text]) => `
        <article class="glass card"><h3>${icons.map(iconOf).join("")}${esc(title)}</h3><p>${esc(text)}</p></article>`).join("")}
      </div>
      <p class="section__desc">${esc(t.archSection[3])} <a href="${t.archLink[0]}">${esc(t.archLink[1])}</a>.</p>
    </section>

    <section class="section" id="security">
      <div class="section__eyebrow">${esc(t.secSection[0])}</div>
      <h2>${esc(t.secSection[1])}</h2>
      <p class="section__desc">${esc(t.secSection[2])}</p>
      <div class="grid-2">
        <article class="glass card">
          <h3>${esc(t.fpTitle)}</h3>
          <p>${esc(t.fpText)}</p>
          <div class="gpg"><code id="gpgFp">${FP}</code><button type="button" class="btn" id="copyFp"><span>${esc(t.fpCopy)}</span></button></div>
          <p>${esc(t.inspect)} <code>curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys</code></p>
        </article>
        <article class="glass card">
          <h3>${esc(t.notes)}</h3>
          <ul>${t.notesList.map(([title, text]) => `<li><strong>${esc(title)} :</strong> ${esc(text)}</li>`).join("")}</ul>
        </article>
      </div>
    </section>

    <section class="section" id="ecosystem">
      <div class="section__eyebrow">${esc(t.ecoSection[0])}</div>
      <h2>${esc(t.ecoSection[1])}</h2>
      <p class="section__desc">${esc(t.ecoSection[2])}</p>
      <div class="grid-2">${t.eco.map(([href, icons, title, text]) => `
        <a class="glass card" href="${href}"><h3>${icons.map(iconOf).join("")}${esc(title)}</h3><p>${esc(text)}</p></a>`).join("")}
      </div>
    </section>
    <p id="copyStatus" class="sr-only" role="status" aria-live="polite" aria-label="${esc(t.copyStatus)}"></p>
  </main>

  ${footer(t)}
  <script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/** Page du jeu Pong : une page par langue, titre « Pong », couleurs lues dans les jetons du thème. */
function pongPage(t) {
  const p = t.pong;
  const path = t.lang === "en" ? "/pong/" : "/fr/pong/";
  const otherPath = t.lang === "en" ? "/fr/pong/" : "/pong/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Pong",
    url: `${SITE}${path}`,
    description: p.description,
    inLanguage: t.lang,
    genre: ["Arcade", "Retro"],
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "Bobine", url: "https://bobine.fit" },
  };
  const strings = { player: p.player, robot: p.robot, winTitle: p.winTitle, winText: p.winText, lossTitle: p.lossTitle, lossText: p.lossText };
  return `<!DOCTYPE html>
<html lang="${t.lang}" data-theme="lavande">
<head>
  ${head(t, { path, otherPath, defaultPath: "/pong/", title: p.title, description: p.description, keywords: p.keywords, jsonLd, extraCss: "/assets/pong.css" })}
</head>
<body class="pong-page">
  <a class="skip-link" href="#gameArea">${esc(t.skip)}</a>
  ${header(t, ["/pong/", "/fr/pong/"])}

  <main class="pong-main" id="gameArea">
    <h1 class="sr-only">${esc(p.h1)}</h1>
    <div class="pong-score" aria-label="${esc(p.player)} / ${esc(p.robot)}">
      <div class="pong-score__box"><span class="pong-score__label">${esc(p.player)}</span><span class="pong-score__val" id="scorePlayer">0</span></div>
      <span class="pong-score__colon" aria-hidden="true">:</span>
      <div class="pong-score__box"><span class="pong-score__label">${esc(p.robot)}</span><span class="pong-score__val" id="scoreBot">0</span></div>
    </div>
    <canvas id="pongCanvas" aria-label="Pong"></canvas>
    <div class="pong-overlay is-visible" id="overlay" role="dialog" aria-modal="false" aria-labelledby="overlayTitle">
      <h2 id="overlayTitle">${esc(p.startTitle)}</h2>
      <p id="overlayText">${esc(p.startText)}</p>
      <button type="button" class="btn btn--primary" id="overlayBtn">${esc(p.start)}</button>
    </div>
    <noscript><p class="pong-noscript">JavaScript required.</p></noscript>
  </main>

  <footer class="site-footer site-footer--compact">
    <div class="site-footer__inner">
      <a href="${t.lang === "fr" ? "/fr/" : "/"}">${esc(p.back)}</a>
      <span>${esc(p.footer)} <a href="mailto:clement.barillot@bobine.fit">${esc(p.contribute)} clement.barillot@bobine.fit</a></span>
    </div>
  </footer>
  <script type="application/json" id="pong-strings">${JSON.stringify(strings).replace(/</g, "\\u003c")}</script>
  <script src="/assets/site.js" defer></script>
  <script src="/assets/pong.js" defer></script>
</body>
</html>
`;
}

const outputs = { "index.html": page(L.en), "fr/index.html": page(L.fr), "pong/index.html": pongPage(L.en), "fr/pong/index.html": pongPage(L.fr) };
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
