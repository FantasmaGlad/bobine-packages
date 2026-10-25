/* Portail packages.bobine.fit : thème partagé avec bobine.fit (cookie du domaine) et configurateur de dépôts. */
(function () {
  'use strict';
  var options = Array.from(document.querySelectorAll('[data-theme-value]'));
  var THEMES = options.map(function (option) { return option.dataset.themeValue; });
  var LANG = document.documentElement.lang === 'fr' ? 'fr' : 'en';

  // --- Thème : cookie bobine-theme sur .bobine.fit (lu aussi par le site), localStorage en repli ---
  function storedTheme() {
    var match = document.cookie.match(/(?:^|; )bobine-theme=([\w-]+)/);
    var value = match ? match[1] : null;
    try { value = value || localStorage.getItem('bobineweb-theme'); } catch (e) { /* stockage indisponible */ }
    return THEMES.indexOf(value) >= 0 ? value : 'lavande';
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var host = location.hostname;
    var domain = /(^|\.)bobine\.fit$/.test(host) ? '; domain=.bobine.fit' : '';
    document.cookie = 'bobine-theme=' + theme + domain + '; path=/; max-age=31536000; samesite=lax' + (location.protocol === 'https:' ? '; secure' : '');
    try { localStorage.setItem('bobineweb-theme', theme); } catch (e) { /* stockage indisponible */ }
    options.forEach(function (option) {
      var active = option.dataset.themeValue === theme;
      option.setAttribute('aria-selected', String(active));
      option.classList.toggle('is-active', active);
      if (active) {
        document.querySelector('.theme-switcher-btn__label').textContent = option.dataset.label;
        document.querySelector('.theme-swatch-icon').dataset.theme = theme;
        document.getElementById('themeCycle').setAttribute('aria-label', (LANG === 'fr' ? 'Thème actif : ' : 'Current theme: ') + option.dataset.label + (LANG === 'fr' ? '. Thème suivant' : '. Next theme'));
      }
    });
  }
  var picker = document.getElementById('themePicker');
  var palette = document.getElementById('themePalette');
  var toggle = document.getElementById('themeToggle');
  function setGroup(dark) {
    options.forEach(function (option) { option.hidden = (option.dataset.dark === 'true') !== dark; });
    document.querySelectorAll('[data-theme-group]').forEach(function (tab) {
      var active = (tab.dataset.themeGroup === 'dark') === dark;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }
  function closePalette(focus) {
    palette.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('svg').classList.remove('is-open');
    if (focus) toggle.focus();
  }
  toggle.addEventListener('click', function () {
    if (!palette.hidden) { closePalette(false); return; }
    var selected = options.find(function (o) { return o.dataset.themeValue === storedTheme(); });
    setGroup(selected.dataset.dark === 'true');
    palette.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.querySelector('svg').classList.add('is-open');
    selected.focus();
  });
  document.getElementById('themeCycle').addEventListener('click', function () {
    applyTheme(THEMES[(THEMES.indexOf(storedTheme()) + 1) % THEMES.length]);
  });
  options.forEach(function (option) { option.addEventListener('click', function () {
    applyTheme(option.dataset.themeValue); closePalette(true);
  }); });
  document.querySelectorAll('[data-theme-group]').forEach(function (tab) { tab.addEventListener('click', function () { setGroup(tab.dataset.themeGroup === 'dark'); }); });
  document.addEventListener('click', function (event) { if (!picker.contains(event.target)) closePalette(false); });
  document.addEventListener('keydown', function (event) {
    if (palette.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closePalette(true); return; }
    if (!event.target.matches('[data-theme-value]')) return;
    var visible = options.filter(function (option) { return !option.hidden; });
    var index = visible.indexOf(event.target);
    var offset = {ArrowRight:1, ArrowLeft:-1, ArrowDown:2, ArrowUp:-2}[event.key];
    if (offset !== undefined) { event.preventDefault(); visible[(index + offset + visible.length) % visible.length].focus(); }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); visible[event.key === 'Home' ? 0 : visible.length - 1].focus(); }
  });
  picker.addEventListener('focusout', function (event) { if (event.relatedTarget && !picker.contains(event.relatedTarget)) closePalette(false); });
  applyTheme(storedTheme());

  // --- Menu des petits écrans ---
  var menuBtn = document.getElementById('menuBtn');
  var siteNav = document.getElementById('siteNav');
  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) { siteNav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
    });
  }

  // --- Copie dans le presse-papiers avec annonce pour les lecteurs d'écran ---
  var status = document.getElementById('copyStatus');
  function copy(text, label) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      if (status) { status.textContent = LANG === 'fr' ? 'Copié dans le presse-papiers' : 'Copied to the clipboard'; setTimeout(function () { status.textContent = ''; }, 2500); }
      if (label) { var old = label.textContent; label.textContent = LANG === 'fr' ? 'Copié' : 'Copied'; setTimeout(function () { label.textContent = old; }, 2000); }
    });
  }
  var fpBtn = document.getElementById('copyFp');
  if (fpBtn) fpBtn.addEventListener('click', function () { copy(document.getElementById('gpgFp').textContent, fpBtn.querySelector('span')); });

  // --- Configurateur ---
  var root = document.getElementById('configurator');
  if (!root) return;
  var T = {
    en: {
      step1Deb: '# 1. Import the official OpenPGP signing key into the system keyring',
      step2Deb: function (ch) { return '# 2. Add the signed APT repository (amd64 and arm64, ' + ch + ' channel)'; },
      step3Deb: '# 3. Update the package index and install Bobine',
      step1Rpm: function (ch) { return '# 1. Add the signed DNF repository (x86_64 and aarch64, ' + ch + ' channel)'; },
      step2Rpm: '# 2. Install Bobine (check the key fingerprint when prompted)',
      step3Rpm: '# 3. Recommended on Fedora: full ffmpeg through RPM Fusion',
      step1Arch: '# 1. Import and locally sign the OpenPGP key in the pacman keyring',
      step2Arch: function (ch) { return '# 2. Add the [bobine] section to /etc/pacman.conf (' + ch + ' channel)'; },
      step3Arch: '# 3. Synchronize the databases and install Bobine',
      names: { debian: 'APT repository (Debian / Ubuntu)', fedora: 'DNF repository (Fedora / RHEL)', arch: 'Pacman repository (Arch Linux)' },
      channels: { stable: 'Stable channel', beta: 'Beta channel', canary: 'Canary channel' },
      dlTitle: function (ext, arch) { return 'Direct package (' + ext + ', ' + arch + ')'; },
      dlMeta: { debian: 'Offline install: sudo apt install ./file.deb', fedora: 'Offline install: sudo dnf install ./file.rpm', arch: 'Offline install: sudo pacman -U ./file.pkg.tar.zst' },
      dlBtn: function (ext) { return 'Download ' + ext; },
      copyDone: 'Commands copied', copy: 'Copy commands'
    },
    fr: {
      step1Deb: '# 1. Importer la clé de signature OpenPGP officielle dans le trousseau du système',
      step2Deb: function (ch) { return '# 2. Ajouter le dépôt APT signé (amd64 et arm64, canal ' + ch + ')'; },
      step3Deb: '# 3. Mettre à jour l\'index des paquets et installer Bobine',
      step1Rpm: function (ch) { return '# 1. Ajouter le dépôt DNF signé (x86_64 et aarch64, canal ' + ch + ')'; },
      step2Rpm: '# 2. Installer Bobine (vérifier l\'empreinte de la clé à la demande)',
      step3Rpm: '# 3. Recommandé sur Fedora : ffmpeg complet via RPM Fusion',
      step1Arch: '# 1. Importer et signer localement la clé OpenPGP dans le trousseau pacman',
      step2Arch: function (ch) { return '# 2. Ajouter la section [bobine] à /etc/pacman.conf (canal ' + ch + ')'; },
      step3Arch: '# 3. Synchroniser les bases et installer Bobine',
      names: { debian: 'Dépôt APT (Debian / Ubuntu)', fedora: 'Dépôt DNF (Fedora / RHEL)', arch: 'Dépôt Pacman (Arch Linux)' },
      channels: { stable: 'Canal Stable', beta: 'Canal Bêta', canary: 'Canal Canary' },
      dlTitle: function (ext, arch) { return 'Paquet direct (' + ext + ', ' + arch + ')'; },
      dlMeta: { debian: 'Installation hors ligne : sudo apt install ./fichier.deb', fedora: 'Installation hors ligne : sudo dnf install ./fichier.rpm', arch: 'Installation hors ligne : sudo pacman -U ./fichier.pkg.tar.zst' },
      dlBtn: function (ext) { return 'Télécharger le ' + ext; },
      copyDone: 'Commandes copiées', copy: 'Copier les commandes'
    }
  }[LANG];

  var RELEASES = 'https://github.com/FantasmaGlad/Bobine/releases/download';
  var state = { distro: 'debian', channel: 'stable', arch: 'x86_64', dnf: 'dnf5', version: '5.0.5' };

  function commands() {
    var ch = state.channel;
    if (state.distro === 'debian') {
      return [
        { comment: T.step1Deb, cmd: 'sudo install -m 0755 -d /etc/apt/keyrings\ncurl -fsSL https://packages.bobine.fit/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg' },
        { comment: T.step2Deb(ch), cmd: 'echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian ' + ch + ' main" | sudo tee /etc/apt/sources.list.d/bobine.list' },
        { comment: T.step3Deb, cmd: 'sudo apt update && sudo apt install bobine' }
      ];
    }
    if (state.distro === 'fedora') {
      var add = state.dnf === 'dnf5'
        ? 'sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-' + ch + '.repo'
        : 'sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-' + ch + '.repo';
      return [
        { comment: T.step1Rpm(ch), cmd: add },
        { comment: T.step2Rpm, cmd: 'sudo dnf install bobine' },
        { comment: T.step3Rpm, cmd: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing' }
      ];
    }
    return [
      { comment: T.step1Arch, cmd: 'curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -\nsudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A' },
      { comment: T.step2Arch(ch), cmd: "sudo tee -a /etc/pacman.conf << 'EOF'\n\n[bobine]\nSigLevel = Required DatabaseOptional\nServer = https://packages.bobine.fit/arch/" + ch + "/$arch\nEOF" },
      { comment: T.step3Arch, cmd: 'sudo pacman -Syu bobine' }
    ];
  }

  // Noms de fichiers publiés par la CI de Bobine (mêmes conventions que le site bobine.fit).
  function direct() {
    var ch = state.channel, v = state.version, arm = state.arch === 'arm64';
    var tag = ch === 'stable' ? 'V' + v : ch;
    var ver = ch === 'stable' ? v : ch;
    if (state.distro === 'debian') {
      var a = arm ? 'arm64' : 'amd64';
      return { ext: '.deb', arch: a, url: RELEASES + '/' + tag + '/bobine_' + ver + '_' + a + '.deb' };
    }
    var n = arm ? 'aarch64' : 'x86_64';
    if (state.distro === 'fedora') {
      return { ext: '.rpm', arch: n, url: RELEASES + '/' + tag + '/bobine-' + ver + (ch === 'stable' ? '-1.' : '.') + n + '.rpm' };
    }
    return { ext: '.pkg.tar.zst', arch: n, url: RELEASES + '/' + tag + '/bobine-' + ver + (ch === 'stable' ? '-1-' : '-') + n + '.pkg.tar.zst' };
  }

  function render() {
    document.getElementById('terminalTitle').textContent = 'bash · ' + T.names[state.distro] + ' · ' + T.channels[state.channel];
    document.getElementById('dnfTabs').classList.toggle('hidden', state.distro !== 'fedora');
    var steps = document.getElementById('terminalSteps');
    steps.textContent = '';
    commands().forEach(function (s) {
      var div = document.createElement('div');
      div.className = 'step';
      var comment = document.createElement('div');
      comment.className = 'step__comment';
      comment.textContent = s.comment;
      var cmd = document.createElement('pre');
      cmd.className = 'step__cmd';
      cmd.textContent = s.cmd;
      div.appendChild(comment);
      div.appendChild(cmd);
      steps.appendChild(div);
    });
    var d = direct();
    document.getElementById('dlTitle').textContent = T.dlTitle(d.ext, d.arch);
    document.getElementById('dlMeta').textContent = T.dlMeta[state.distro];
    document.getElementById('dlBtnText').textContent = T.dlBtn(d.ext);
    document.getElementById('dlLink').href = d.url;
  }

  function bind(selector, key, attr) {
    root.querySelectorAll(selector).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state[key] = btn.getAttribute(attr);
        root.querySelectorAll(selector).forEach(function (other) { other.setAttribute('aria-pressed', other === btn ? 'true' : 'false'); });
        render();
      });
    });
  }
  bind('[data-channel]', 'channel', 'data-channel');
  bind('[data-arch]', 'arch', 'data-arch');
  bind('[data-distro]', 'distro', 'data-distro');
  bind('[data-dnf]', 'dnf', 'data-dnf');

  var copyBtn = document.getElementById('copyCommands');
  copyBtn.addEventListener('click', function () {
    copy(commands().map(function (s) { return s.cmd; }).join('\n\n'), copyBtn.querySelector('span'));
  });

  // Version Stable publiée : latest.json est écrit par la CI après vérification des dépôts.
  fetch('/latest.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (data) {
      if (data && /^\d+\.\d+\.\d+$/.test(String(data.version || '').replace(/^v/i, ''))) {
        state.version = String(data.version).replace(/^v/i, '');
        render();
      }
    })
    .catch(function () { /* la version de repli reste affichée */ });

  render();
})();
