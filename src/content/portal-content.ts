export interface DistroInfo {
  id: string;
  title: string;
  sub: string;
  chips: [string, string][];
}

export interface ArchitectureCard {
  title: string;
  chips: string[];
  desc: string;
}

export interface EcosystemCard {
  link: string;
  chips: string[];
  title: string;
  desc: string;
}

export interface PortalStrings {
  lang: "fr" | "en";
  path: string;
  other: string;
  site: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  skip: string;
  brandNote: string;
  nav: [string, string][];
  cta: [string, string];
  menu: string;
  navLabel: string;
  langLabel: string;
  themeLabel: string;
  heroTitle: string;
  heroText: string;
  confLabel: string;
  channel: string;
  channels: [string, string, string][];
  arch: string;
  archs: [string, string][];
  family: string;
  families: DistroInfo[];
  dnfTabs: [string, string][];
  dnfLabel: string;
  copy: string;
  dlTitle: string;
  dlMeta: string;
  dlBtn: string;
  keyFile: string;
  noscriptTitle: string;
  archSection: [string, string, string, string];
  archCards: ArchitectureCard[];
  archLink: [string, string];
  secSection: [string, string, string];
  fpTitle: string;
  fpText: string;
  fpCopy: string;
  inspect: string;
  notes: string;
  notesList: [string, string][];
  ecoSection: [string, string, string];
  eco: EcosystemCard[];
  footerLead: string;
  footerLinks: [string, string][];
  copyStatus: string;
  pong: {
    title: string;
    description: string;
    keywords: string;
    h1: string;
    player: string;
    robot: string;
    winTitle: string;
    winText: string;
    lossTitle: string;
    lossText: string;
    again: string;
    back: string;
    crumbHome: string;
    footer: string;
    contribute: string;
  };
}

export const PORTAL_DATA: Record<"fr" | "en", PortalStrings> = {
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
    channels: [
      ["stable", "Stable (recommandé)", "/assets/channels/bobine-stable.webp"],
      ["beta", "Bêta", "/assets/channels/bobine-beta.webp"],
      ["canary", "Canary", "/assets/channels/bobine-canary.webp"],
    ],
    arch: "Architecture",
    archs: [
      ["x86_64", "x86_64 / amd64 (Intel, AMD)"],
      ["arm64", "ARM64 / aarch64"],
    ],
    family: "Famille de distribution",
    families: [
      {
        id: "debian",
        title: "Debian, Ubuntu et dérivées",
        sub: "APT · mises à jour avec apt upgrade",
        chips: [
          ["debian", "Debian 13+"],
          ["ubuntu", "Ubuntu 24.04+"],
          ["linuxmint", "Linux Mint 22+"],
          ["popos", "Pop!_OS 24.04+"],
          ["zorin", "Zorin OS 18+"],
          ["raspberrypi", "Raspberry Pi OS (Trixie+)"],
        ],
      },
      {
        id: "fedora",
        title: "Fedora, RHEL et Enterprise Linux",
        sub: "DNF · mises à jour avec dnf upgrade",
        chips: [
          ["fedora", "Fedora"],
          ["nobara", "Nobara"],
          ["rhel", "RHEL 10+"],
          ["almalinux", "AlmaLinux 10+"],
          ["rockylinux", "Rocky Linux 10+"],
        ],
      },
      {
        id: "arch",
        title: "Arch Linux et dérivées",
        sub: "Pacman · mises à jour avec pacman -Syu",
        chips: [
          ["arch", "Arch Linux"],
          ["endeavouros", "EndeavourOS"],
          ["cachyos", "CachyOS"],
          ["manjaro", "Manjaro"],
        ],
      },
    ],
    dnfTabs: [
      ["dnf5", "Fedora 41+ (DNF 5)"],
      ["dnf4", "RHEL, Alma, Rocky (DNF 4)"],
    ],
    dnfLabel: "Version de DNF",
    copy: "Copier les commandes",
    dlTitle: "Paquet direct (.deb, amd64)",
    dlMeta: "Installation hors ligne : sudo apt install ./fichier.deb",
    dlBtn: "Télécharger le .deb",
    keyFile: "bobine.gpg",
    noscriptTitle: "Sans JavaScript : Debian et Ubuntu, canal Stable",
    archSection: [
      "Architectures",
      "Processeurs visés",
      "Bobine est compilé nativement pour x86_64 (amd64) et ARM64 (aarch64), sans émulation.",
      "Les listes de compatibilité sont des cibles, pas des validations sur matériel : un appareil n'est annoncé validé qu'après un essai sur le matériel réel. Détails sur le site de Bobine.",
    ],
    archCards: [
      {
        title: "x86_64 (Intel et AMD)",
        chips: ["intel", "amd"],
        desc: "Processeurs Intel Core, Core Ultra et série N, AMD Ryzen, clients légers de type Dell Wyse 5070 et mini PC pour un usage 24/7.",
      },
      {
        title: "ARM64 (Snapdragon, Apple Silicon, cartes monocartes)",
        chips: ["snapdragon", "apple", "raspberrypi"],
        desc: "Portables Snapdragon X, tablettes ARM avec sortie vidéo USB-C, Raspberry Pi 5 et cartes similaires.",
      },
    ],
    archLink: ["https://bobine.fit/fr/telechargement", "Voir les pages de téléchargement"],
    secSection: [
      "Sécurité",
      "Une seule signature OpenPGP pour tous les dépôts",
      "Les index des dépôts (InRelease, repomd.xml.asc, bobine.db.sig) et les paquets sont signés avec la même clé. Votre gestionnaire de paquets refuse un fichier altéré.",
    ],
    fpTitle: "Empreinte de la clé de signature",
    fpText: "Vérifiez que l'empreinte affichée par votre gestionnaire de paquets correspond à celle-ci :",
    fpCopy: "Copier l'empreinte",
    inspect: "Inspecter la clé directement :",
    notes: "Notes par distribution",
    notesList: [
      ["Fedora et RPM Fusion", "Fedora fournit ffmpeg-free par défaut. Activez RPM Fusion puis lancez sudo dnf swap ffmpeg-free ffmpeg --allowerasing pour disposer de tous les codecs."],
      ["RHEL 10+, AlmaLinux 10+, Rocky Linux 10+", "Activez d'abord EPEL (sudo dnf install epel-release) pour que les dépendances multimédia et WebKitGTK soient résolues."],
      ["Mises à jour depuis l'application", "Bobine détecte s'il a été installé avec dpkg/apt, rpm/dnf ou pacman et se met à jour dans le même format, via Polkit."],
    ],
    ecoSection: [
      "Autres plateformes",
      "Windows, macOS, Android et navigateurs",
      "Bobine s'installe aussi sur d'autres systèmes et se pilote depuis n'importe quel navigateur moderne du réseau local.",
    ],
    eco: [
      {
        link: "https://bobine.fit/fr/telechargement",
        chips: ["windows", "apple"],
        title: "Windows et macOS",
        desc: "Installateurs Windows (x86_64, ARM64) et image disque pour les Mac Apple Silicon.",
      },
      {
        link: "https://bobine.fit/fr/telechargement",
        chips: ["android", "androidtv"],
        title: "Android et Android TV",
        desc: "Un APK pour les tablettes, Google Books et bornes ARM, et un APK pour les boîtiers Android TV et Google TV.",
      },
      {
        link: "https://bobine.fit/fr/documentation",
        chips: ["chrome", "firefox", "safari", "edge", "brave", "opera", "torbrowser"],
        title: "Navigateurs et Tor",
        desc: "Pilotage depuis Chrome, Firefox, Safari, Edge, Brave, Opera et Tor Browser, avec un miroir Tor du site et de ces dépôts.",
      },
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
      player: "Joueur",
      robot: "Robot",
      winTitle: "Victoire !",
      winText: "Vous avez remporté la manche à 7 points face au robot.",
      lossTitle: "Défaite",
      lossText: "Le robot a atteint 7 points.",
      again: "Recommencer",
      back: "Retour aux dépôts Linux",
      crumbHome: "Paquets",
      footer: "Bobine, logiciel libre sous AGPL-3.0.",
      contribute: "Si vous pouvez lire ceci, le projet Linux vous intéresse. Venez m'aider à construire Bobine :",
    },
  },
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
    channels: [
      ["stable", "Stable (recommended)", "/assets/channels/bobine-stable.webp"],
      ["beta", "Beta", "/assets/channels/bobine-beta.webp"],
      ["canary", "Canary", "/assets/channels/bobine-canary.webp"],
    ],
    arch: "Architecture",
    archs: [
      ["x86_64", "x86_64 / amd64 (Intel, AMD)"],
      ["arm64", "ARM64 / aarch64"],
    ],
    family: "Distribution family",
    families: [
      {
        id: "debian",
        title: "Debian, Ubuntu and derivatives",
        sub: "APT · updates with apt upgrade",
        chips: [
          ["debian", "Debian 13+"],
          ["ubuntu", "Ubuntu 24.04+"],
          ["linuxmint", "Linux Mint 22+"],
          ["popos", "Pop!_OS 24.04+"],
          ["zorin", "Zorin OS 18+"],
          ["raspberrypi", "Raspberry Pi OS (Trixie+)"],
        ],
      },
      {
        id: "fedora",
        title: "Fedora, RHEL and Enterprise Linux",
        sub: "DNF · updates with dnf upgrade",
        chips: [
          ["fedora", "Fedora"],
          ["nobara", "Nobara"],
          ["rhel", "RHEL 10+"],
          ["almalinux", "AlmaLinux 10+"],
          ["rockylinux", "Rocky Linux 10+"],
        ],
      },
      {
        id: "arch",
        title: "Arch Linux and derivatives",
        sub: "Pacman · updates with pacman -Syu",
        chips: [
          ["arch", "Arch Linux"],
          ["endeavouros", "EndeavourOS"],
          ["cachyos", "CachyOS"],
          ["manjaro", "Manjaro"],
        ],
      },
    ],
    dnfTabs: [
      ["dnf5", "Fedora 41+ (DNF 5)"],
      ["dnf4", "RHEL, Alma, Rocky (DNF 4)"],
    ],
    dnfLabel: "DNF version",
    copy: "Copy commands",
    dlTitle: "Direct package (.deb, amd64)",
    dlMeta: "Offline install: sudo apt install ./file.deb",
    dlBtn: "Download .deb",
    keyFile: "bobine.gpg",
    noscriptTitle: "Without JavaScript: Debian and Ubuntu, stable channel",
    archSection: [
      "Architectures",
      "Targeted processors",
      "Bobine is built natively for x86_64 (amd64) and ARM64 (aarch64), without emulation.",
      "Compatibility lists are targets, not hardware validations: each device is validated on real hardware before it is announced as validated. Details on the Bobine site.",
    ],
    archCards: [
      {
        title: "x86_64 (Intel and AMD)",
        chips: ["intel", "amd"],
        desc: "Intel Core, Core Ultra and N-series processors, AMD Ryzen, Dell Wyse 5070 class thin clients and mini PCs for 24/7 use.",
      },
      {
        title: "ARM64 (Snapdragon, Apple Silicon, single-board computers)",
        chips: ["snapdragon", "apple", "raspberrypi"],
        desc: "Snapdragon X laptops, ARM tablets with USB-C video output, Raspberry Pi 5 and similar boards.",
      },
    ],
    archLink: ["https://bobine.fit/en/download", "See the compatibility pages"],
    secSection: [
      "Security",
      "One OpenPGP signature for every repository",
      "Repository indexes (InRelease, repomd.xml.asc, bobine.db.sig) and packages are signed with the same key. Your package manager rejects a file that was altered.",
    ],
    fpTitle: "Signing key fingerprint",
    fpText: "Check that the fingerprint shown by your package manager matches this one:",
    fpCopy: "Copy fingerprint",
    inspect: "Inspect the key directly:",
    notes: "Distribution notes",
    notesList: [
      ["Fedora and RPM Fusion", "Fedora ships ffmpeg-free by default. Enable RPM Fusion, then run sudo dnf swap ffmpeg-free ffmpeg --allowerasing for the full codec set."],
      ["RHEL 10+, AlmaLinux 10+, Rocky Linux 10+", "Enable EPEL first (sudo dnf install epel-release) so the multimedia and WebKitGTK dependencies resolve."],
      ["Updates from the app", "Bobine detects whether it was installed with dpkg/apt, rpm/dnf or pacman and updates itself in the same format, through Polkit."],
    ],
    ecoSection: [
      "Other platforms",
      "Windows, macOS, Android and browsers",
      "Bobine also installs on other systems and is controlled from any modern browser on the local network.",
    ],
    eco: [
      {
        link: "https://bobine.fit/en/download",
        chips: ["windows", "apple"],
        title: "Windows and macOS",
        desc: "Installers for Windows (x86_64, ARM64) and a disk image for Apple Silicon Macs.",
      },
      {
        link: "https://bobine.fit/en/download",
        chips: ["android", "androidtv"],
        title: "Android and Android TV",
        desc: "An APK for tablets, Google Books and ARM kiosks, and an APK for Android TV and Google TV boxes.",
      },
      {
        link: "https://bobine.fit/en/documentation",
        chips: ["chrome", "firefox", "safari", "edge", "brave", "opera", "torbrowser"],
        title: "Browsers and Tor",
        desc: "Remote control from Chrome, Firefox, Safari, Edge, Brave, Opera and Tor Browser, with a Tor mirror of the site and of these repositories.",
      },
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
      description: "Pong, the classic arcade game, in your browser: first to 7 points wins against the robot. Arrow keys, W/S, mouse or touch; no account and no tracking.",
      keywords: "Pong, arcade game, retro game, Bobine",
      h1: "Pong",
      player: "Player",
      robot: "Robot",
      winTitle: "Victory!",
      winText: "You won the 7-point match against the robot.",
      lossTitle: "Defeat",
      lossText: "The robot reached 7 points.",
      again: "Play again",
      back: "Back to the package hub",
      crumbHome: "Packages",
      footer: "Bobine, free software under AGPL-3.0.",
      contribute: "If you can read this, you are interested in the Linux project. Come and help me build Bobine:",
    },
  },
};

export const SIGNING_KEY_FINGERPRINT = "B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A";
export const RELEASES_BASE = "https://github.com/FantasmaGlad/Bobine/releases/download";
