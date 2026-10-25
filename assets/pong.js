/* Pong : jeu contre un robot. Couleurs lues dans les jetons du thème, vitesse indépendante de la fréquence d'écran,
   démarrage par un geste (débloque aussi le son), clavier, souris et tactile. */
(function () {
  'use strict';
  var S = JSON.parse(document.getElementById('pong-strings').textContent);
  var canvas = document.getElementById('pongCanvas');
  var ctx = canvas.getContext('2d');
  var area = document.getElementById('gameArea');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlayTitle');
  var overlayText = document.getElementById('overlayText');
  var overlayBtn = document.getElementById('overlayBtn');
  var WIN = 7;

  // Ancien lien bilingue : /pong/?lang=fr
  if (/[?&]lang=fr\b/.test(location.search) && document.documentElement.lang !== 'fr') { location.replace('/fr/pong/'); return; }

  // --- Couleurs du thème : un élément sonde résout les jetons (color-mix compris) en rgb() ---
  var probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden';
  document.body.appendChild(probe);
  var colors = { arena: '', net: '', ink: '' };
  function resolve(token) { probe.style.backgroundColor = 'var(' + token + ')'; return getComputedStyle(probe).backgroundColor; }
  function readColors() { colors.arena = resolve('--bg-card'); colors.net = resolve('--border-subtle'); colors.ink = resolve('--text-heading'); }
  readColors();
  new MutationObserver(readColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // --- Sons (Web Audio), créés au premier geste ---
  var audio = null;
  function tone(freq, type, dur, vol) {
    try {
      if (!audio) { var C = window.AudioContext || window.webkitAudioContext; if (!C) return; audio = new C(); }
      if (audio.state === 'suspended') audio.resume();
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, audio.currentTime);
      g.gain.setValueAtTime(vol, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
      o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + dur);
    } catch (e) { /* son indisponible */ }
  }
  function seq(list, type, dur, vol, gap) { list.forEach(function (f, i) { setTimeout(function () { tone(f, type, dur, vol); }, i * gap); }); }

  // --- État du jeu (unités : pixels, temps en images de 1/60 s) ---
  var W = 800, H = 600;
  var player = { x: 28, y: 200, w: 12, h: 90 };
  var bot = { x: 760, y: 200, w: 12, h: 90 };
  var ball = { x: 400, y: 300, size: 12, vx: 6, vy: 2, speed: 6.5 };
  var score = { player: 0, bot: 0 };
  var running = false;
  var keys = { up: false, down: false };

  function resize() {
    var r = area.getBoundingClientRect();
    var pad = 8;
    W = Math.max(280, Math.floor(r.width - pad * 2));
    H = Math.max(200, Math.floor(r.height - pad * 2));
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    player.h = bot.h = Math.max(56, Math.min(120, Math.round(H * 0.18)));
    player.x = Math.max(16, Math.round(W * 0.03));
    bot.x = W - player.x - bot.w;
    player.y = Math.max(0, Math.min(H - player.h, player.y));
    bot.y = Math.max(0, Math.min(H - bot.h, bot.y));
    ball.x = Math.max(0, Math.min(W - ball.size, ball.x));
    ball.y = Math.max(0, Math.min(H - ball.size, ball.y));
  }
  window.addEventListener('resize', resize);

  function serve(dir) {
    ball.x = W / 2 - ball.size / 2; ball.y = H / 2 - ball.size / 2;
    ball.speed = Math.max(5, Math.min(9, W * 0.007));
    var a = (Math.random() * 0.6 - 0.3) * Math.PI;
    ball.vx = Math.cos(a) * ball.speed * dir; ball.vy = Math.sin(a) * ball.speed;
  }
  function showOverlay(title, text, label) { overlayTitle.textContent = title; overlayText.textContent = text; overlayBtn.textContent = label; overlay.classList.add('is-visible'); overlayBtn.focus(); }
  function start() {
    score.player = 0; score.bot = 0;
    document.getElementById('scorePlayer').textContent = '0'; document.getElementById('scoreBot').textContent = '0';
    player.y = H / 2 - player.h / 2; bot.y = H / 2 - bot.h / 2;
    serve(Math.random() > 0.5 ? 1 : -1);
    overlay.classList.remove('is-visible');
    running = true;
    tone(440, 'square', 0.05, 0.05);
  }
  overlayBtn.addEventListener('click', start);

  // --- Commandes : clavier, souris, doigt (pointer events sur l'arène) ---
  window.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'KeyZ') { keys.up = true; e.preventDefault(); }
    if (e.code === 'ArrowDown' || e.code === 'KeyS') { keys.down = true; e.preventDefault(); }
    if (!running && e.code === 'Enter' && document.activeElement !== overlayBtn) { e.preventDefault(); start(); }
  });
  window.addEventListener('keyup', function (e) {
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'KeyZ') keys.up = false;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') keys.down = false;
  });
  function pointer(e) {
    if (!running) return;
    var r = canvas.getBoundingClientRect();
    player.y = Math.max(0, Math.min(H - player.h, e.clientY - r.top - player.h / 2));
  }
  canvas.addEventListener('pointermove', pointer);
  canvas.addEventListener('pointerdown', pointer);

  // --- Mise à jour : k = nombre d'images de 1/60 s écoulées (plafonné pour ne jamais « sauter » la balle) ---
  function update(k) {
    var step = 9 * k;
    if (keys.up) player.y = Math.max(0, player.y - step);
    if (keys.down) player.y = Math.min(H - player.h, player.y + step);

    var center = bot.y + bot.h / 2, target = ball.y + ball.size / 2, d = target - center;
    var botSpeed = Math.max(4.6, Math.min(8, H * 0.01)) * k;
    if (ball.vx > 0) {
      var m = Math.min(botSpeed, Math.abs(d));
      if (d > 6) bot.y = Math.min(H - bot.h, bot.y + m); else if (d < -6) bot.y = Math.max(0, bot.y - m);
    } else {
      var back = H / 2 - center;
      if (Math.abs(back) > 20) bot.y += Math.sign(back) * 1.5 * k;
    }

    ball.x += ball.vx * k; ball.y += ball.vy * k;
    if (ball.y <= 0) { ball.y = 0; ball.vy = Math.abs(ball.vy); tone(260, 'square', 0.04, 0.05); }
    else if (ball.y + ball.size >= H) { ball.y = H - ball.size; ball.vy = -Math.abs(ball.vy); tone(260, 'square', 0.04, 0.05); }

    function paddle(p, dir) {
      var off = (ball.y + ball.size / 2 - (p.y + p.h / 2)) / (p.h / 2);
      var angle = Math.max(-0.95, Math.min(0.95, off)) * (5 * Math.PI) / 12;
      ball.speed = Math.min(16, ball.speed + 0.4);
      ball.vx = dir * Math.abs(Math.cos(angle) * ball.speed); ball.vy = Math.sin(angle) * ball.speed;
      tone(440, 'square', 0.05, 0.06);
    }
    if (ball.vx < 0 && ball.x <= player.x + player.w && ball.x + ball.size >= player.x && ball.y + ball.size >= player.y && ball.y <= player.y + player.h) { ball.x = player.x + player.w; paddle(player, 1); }
    if (ball.vx > 0 && ball.x + ball.size >= bot.x && ball.x <= bot.x + bot.w && ball.y + ball.size >= bot.y && ball.y <= bot.y + bot.h) { ball.x = bot.x - ball.size; paddle(bot, -1); }

    if (ball.x > W) point('player', -1);
    else if (ball.x + ball.size < 0) point('bot', 1);
  }
  function point(who, dir) {
    score[who]++;
    document.getElementById(who === 'player' ? 'scorePlayer' : 'scoreBot').textContent = String(score[who]);
    tone(784, 'sine', 0.16, 0.08);
    if (score[who] >= WIN) {
      running = false;
      if (who === 'player') { seq([523, 659, 784, 1046], 'sine', 0.14, 0.08, 100); showOverlay(S.winTitle, S.winText, document.documentElement.lang === 'fr' ? 'Recommencer' : 'Play again'); }
      else { seq([392, 330, 261, 220], 'sawtooth', 0.18, 0.07, 120); showOverlay(S.lossTitle, S.lossText, document.documentElement.lang === 'fr' ? 'Recommencer' : 'Play again'); }
    } else serve(dir);
  }

  function rounded(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function render() {
    ctx.fillStyle = colors.arena; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = colors.net;
    for (var y = 10; y < H - 10; y += 22) ctx.fillRect(Math.round(W / 2 - 1.5), y, 3, 12);
    ctx.fillStyle = colors.ink;
    rounded(player.x, player.y, player.w, player.h, 3); ctx.fill();
    rounded(bot.x, bot.y, bot.w, bot.h, 3); ctx.fill();
    rounded(ball.x, ball.y, ball.size, ball.size, 2); ctx.fill();
  }

  var last = 0;
  function loop(now) {
    var k = last ? Math.min(3, (now - last) / 16.667) : 1;
    last = now;
    if (running) update(k);
    render();
    requestAnimationFrame(loop);
  }
  resize();
  serve(1);
  requestAnimationFrame(loop);
})();
