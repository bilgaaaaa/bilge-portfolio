// Bruno's run: an endless runner through Padova where Bruno jumps over pigeons, bikes and puddles and grabs simit.
// Depends on content.js (translations) and script.js (t, el, format). gamemode.js calls start(onExit) and stop().

const brunoRunGame = (() => {
  const CONFIG = {
    gravity: 2300, // px/s²
    jumpRatio: 0.5, // jump height as a share of the stage height
    jumpCut: 0.45, // letting go early keeps this share of the rising speed, for short hops
    startSpeed: 280, // px/s
    maxSpeed: 640,
    acceleration: 7, // px/s gained every second
    pxPerPoint: 24,
    treatPoints: 10,
    treatChance: 0.45,
    groundOffset: 30, // ground line height above the stage bottom
    brunoX: 72,
    restartDelayMs: 450 // ignores presses right after a crash so a held key doesn't restart at once
  };
  const STORAGE_KEY = "portfolioRunBest";
  const BRUNO_SRC = "assets/bruno/bruno-sit.webp";
  const BRUNO_RATIO = 188 / 212; // width / height of the sitting sticker
  const JUMP_KEYS = ["Space", "ArrowUp", "KeyW"];
  // Drawn sizes; hitboxes are a few px smaller so near misses feel fair.
  const OBSTACLES = {
    pigeon: { width: 30, height: 26 },
    bike: { width: 60, height: 40 },
    puddle: { width: 66, height: 8 }
  };
  const SPAWN_TYPES = ["pigeon", "pigeon", "bike", "puddle"];
  const COLORS = {
    skyTop: "#2b124c",
    skyBottom: "#190019",
    far: "rgba(133, 79, 108, 0.38)",
    near: "#3a1a48",
    road: "#1f0a26",
    line: "rgba(223, 182, 178, 0.7)",
    stones: "rgba(223, 182, 178, 0.16)",
    cream: "#fbe4d8",
    pigeon: "#a99bb8",
    beak: "#f0b27a",
    puddle: "rgba(143, 179, 224, 0.75)",
    simit: "#d9a066",
    cookie: "#e0b07a"
  };

  const state = {
    phase: "ready", // ready | running | paused | over
    width: 0,
    height: 0,
    ground: 0,
    brunoHeight: 54,
    jumpHeight: 0,
    jumpVelocity: 0,
    speed: CONFIG.startSpeed,
    distance: 0,
    treatsEaten: 0,
    best: readBest(),
    lift: 0, // Bruno's height above the ground
    vy: 0, // upward speed
    holding: false,
    obstacles: [],
    treats: [],
    popups: [],
    untilNext: 0,
    overAt: 0,
    message: null, // { title, sub, vars, hint } translation keys, kept for language switches
    lastScore: -1,
    lastFrame: 0,
    frameId: 0,
    onExit: null
  };
  const ui = {};
  let ctx = null;
  let sprite = null;
  let sky = null;
  let popupFont = "";

  // ---------- best score ----------

  function readBest() {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      return 0;
    }
  }

  function saveBest(points) {
    try {
      localStorage.setItem(STORAGE_KEY, String(points));
    } catch {
      // Storage can be blocked (private mode); the best score then lasts until the page closes.
    }
  }

  function score() {
    return Math.floor(state.distance / CONFIG.pxPerPoint) + state.treatsEaten * CONFIG.treatPoints;
  }

  // ---------- flow ----------

  // Sizes the canvas to the stage and derives the ground line and jump strength from its height.
  function resize() {
    if (!state.onExit) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = ui.stage.getBoundingClientRect();
    state.width = rect.width;
    state.height = rect.height;
    state.ground = rect.height - CONFIG.groundOffset;
    state.brunoHeight = rect.height >= 190 ? 54 : 46;
    state.jumpHeight = rect.height * CONFIG.jumpRatio;
    state.jumpVelocity = Math.sqrt(2 * CONFIG.gravity * state.jumpHeight);
    ui.canvas.width = Math.round(rect.width * ratio);
    ui.canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    sky = ctx.createLinearGradient(0, 0, 0, state.ground);
    sky.addColorStop(0, COLORS.skyTop);
    sky.addColorStop(1, COLORS.skyBottom);
  }

  function reset() {
    state.speed = CONFIG.startSpeed;
    state.distance = 0;
    state.treatsEaten = 0;
    state.lift = 0;
    state.vy = 0;
    state.obstacles = [];
    state.treats = [];
    state.popups = [];
    state.untilNext = Math.max(400, state.width * 0.6); // a short run-up before the first obstacle
    renderScore();
  }

  // Space, ↑ or a tap: starts a run, resumes a paused one, or jumps.
  function press() {
    state.holding = true;
    if (state.phase === "running") {
      if (state.lift === 0) state.vy = state.jumpVelocity;
      return;
    }
    if (state.phase === "over" && performance.now() - state.overAt < CONFIG.restartDelayMs) return;
    if (state.phase !== "paused") reset();
    state.phase = "running";
    state.lastFrame = performance.now();
    showMessage(null);
  }

  // Letting go while Bruno is still rising cuts the jump short.
  function release() {
    if (!state.holding) return;
    state.holding = false;
    if (state.vy > 0) state.vy *= CONFIG.jumpCut;
  }

  function pause() {
    if (!state.onExit || state.phase !== "running") return;
    state.phase = "paused";
    state.holding = false;
    showMessage({ title: "runGame.paused" });
  }

  function crash(cause) {
    state.phase = "over";
    state.overAt = performance.now();
    state.holding = false;
    const points = score();
    const isBest = points > state.best;
    if (isBest) {
      state.best = points;
      saveBest(points);
      ui.best.textContent = String(points);
    }
    showMessage({ title: `runGame.${cause}`, sub: isBest ? "runGame.newBest" : "runGame.result", vars: { score: points, best: state.best }, hint: "runGame.again" });
  }

  // ---------- world ----------

  function update(delta) {
    state.speed = Math.min(CONFIG.maxSpeed, state.speed + CONFIG.acceleration * delta);
    const step = state.speed * delta;
    state.distance += step;

    state.vy -= CONFIG.gravity * delta;
    state.lift = Math.max(0, state.lift + state.vy * delta);
    if (state.lift === 0 && state.vy < 0) state.vy = 0;

    state.obstacles.forEach((obstacle) => (obstacle.x -= step));
    state.treats.forEach((treat) => (treat.x -= step));
    state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -20);
    state.treats = state.treats.filter((treat) => !treat.eaten && treat.x > -20);
    state.popups.forEach((popup) => {
      popup.life -= delta;
      popup.y -= 36 * delta;
    });
    state.popups = state.popups.filter((popup) => popup.life > 0);

    state.untilNext -= step;
    if (state.untilNext <= 0) spawn();
    collide();
    renderScore();
  }

  // Places the next obstacle off the right edge; the gap always leaves time to land and jump again.
  function spawn() {
    const type = SPAWN_TYPES[Math.floor(Math.random() * SPAWN_TYPES.length)];
    const obstacle = { type, x: state.width + 20, ...OBSTACLES[type] };
    state.obstacles.push(obstacle);
    if (Math.random() < CONFIG.treatChance) {
      state.treats.push({ kind: Math.random() < 0.5 ? "simit" : "cookie", x: obstacle.x + obstacle.width / 2, eaten: false });
    }
    state.untilNext = obstacle.width + state.speed * (0.8 + Math.random() * 0.7) + 160;
  }

  function treatY() {
    return state.ground - state.jumpHeight * 0.62; // only reachable mid-jump
  }

  function brunoBox() {
    const width = state.brunoHeight * BRUNO_RATIO;
    const bottom = state.ground - state.lift;
    return { left: CONFIG.brunoX + width * 0.18, right: CONFIG.brunoX + width * 0.82, top: bottom - state.brunoHeight * 0.8, bottom: bottom - 2 };
  }

  function obstacleBox(obstacle) {
    const inset = obstacle.type === "puddle" ? 10 : 4;
    return { left: obstacle.x + inset, right: obstacle.x + obstacle.width - inset, top: state.ground - obstacle.height + 2, bottom: state.ground + 2 };
  }

  function overlaps(a, b) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  }

  function collide() {
    const box = brunoBox();
    const hit = state.obstacles.find((obstacle) => overlaps(box, obstacleBox(obstacle)));
    if (hit) {
      crash(hit.type);
      return;
    }
    const y = treatY();
    state.treats.forEach((treat) => {
      if (treat.eaten || !overlaps(box, { left: treat.x - 10, right: treat.x + 10, top: y - 10, bottom: y + 10 })) return;
      treat.eaten = true;
      state.treatsEaten += 1;
      state.popups.push({ text: `+${CONFIG.treatPoints}`, x: treat.x, y: y - 16, life: 0.8 });
    });
  }

  // ---------- drawing ----------

  // Draws a repeating strip of scenery, shifted left by `offset`.
  function repeat(patternWidth, offset, drawPattern) {
    for (let x = -(offset % patternWidth); x < state.width; x += patternWidth) drawPattern(x);
  }

  function drawSky() {
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, state.width, state.ground);
    ctx.fillStyle = "rgba(251, 228, 216, 0.5)";
    for (let i = 0; i < 26; i += 1) ctx.fillRect((i * 137) % state.width, (i * 53) % (state.ground * 0.55), 1.4, 1.4);
    ctx.save();
    ctx.shadowColor = "rgba(251, 228, 216, 0.6)";
    ctx.shadowBlur = 22;
    ctx.fillStyle = COLORS.cream;
    ctx.beginPath();
    ctx.arc(state.width - 90, 40, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Basilica del Santo: a long nave, a row of domes with lanterns and two slim bell towers.
  function drawBasilica(x) {
    const base = state.ground;
    ctx.fillRect(x, base - 48, 180, 48);
    [[34, 18], [74, 24], [118, 24], [156, 18]].forEach(([dx, radius]) => {
      ctx.beginPath();
      ctx.arc(x + dx, base - 48, radius, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(x + dx - 2, base - 56 - radius, 4, 8);
    });
    [6, 166].forEach((dx) => {
      ctx.fillRect(x + dx, base - 112, 8, 64);
      ctx.beginPath();
      ctx.moveTo(x + dx - 2, base - 112);
      ctx.lineTo(x + dx + 4, base - 128);
      ctx.lineTo(x + dx + 10, base - 112);
      ctx.fill();
    });
  }

  // Palazzo della Ragione: a long hall under its upturned-hull roof.
  function drawPalazzo(x) {
    const base = state.ground;
    ctx.fillRect(x, base - 40, 210, 40);
    ctx.beginPath();
    ctx.ellipse(x + 105, base - 40, 110, 30, 0, Math.PI, 0);
    ctx.fill();
  }

  // Torre dell'Orologio with its battlements and round clock face.
  function drawClockTower(x) {
    const base = state.ground;
    ctx.fillRect(x, base - 104, 34, 104);
    for (let dx = 0; dx < 34; dx += 10) ctx.fillRect(x + dx, base - 112, 6, 8);
    ctx.save();
    ctx.fillStyle = "rgba(251, 228, 216, 0.3)";
    ctx.beginPath();
    ctx.arc(x + 17, base - 78, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawRoofs(x) {
    const base = state.ground;
    [[0, 60, 46], [70, 50, 34], [130, 70, 52], [210, 44, 30]].forEach(([dx, width, height]) => {
      ctx.fillRect(x + dx, base - height, width, height);
      ctx.beginPath();
      ctx.moveTo(x + dx - 4, base - height);
      ctx.lineTo(x + dx + width / 2, base - height - 16);
      ctx.lineTo(x + dx + width + 4, base - height);
      ctx.fill();
    });
  }

  // The skyline moves slowly; Prato della Valle's statues and trees pass closer and faster.
  function drawScenery() {
    ctx.fillStyle = COLORS.far;
    repeat(1000, state.distance * 0.12, (x) => {
      drawBasilica(x + 40);
      drawPalazzo(x + 330);
      drawClockTower(x + 640);
      drawRoofs(x + 720);
    });

    const base = state.ground;
    ctx.fillStyle = COLORS.near;
    repeat(420, state.distance * 0.4, (x) => {
      [20, 120, 220].forEach((dx) => {
        ctx.fillRect(x + dx - 7, base - 22, 14, 22); // pedestal
        ctx.fillRect(x + dx - 3, base - 38, 6, 16); // statue
        ctx.beginPath();
        ctx.arc(x + dx, base - 42, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      [70, 320].forEach((dx) => {
        ctx.fillRect(x + dx - 2, base - 24, 4, 24);
        ctx.beginPath();
        ctx.arc(x + dx, base - 34, 15, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  }

  function drawGround() {
    ctx.fillStyle = COLORS.road;
    ctx.fillRect(0, state.ground, state.width, state.height - state.ground);
    ctx.fillStyle = COLORS.line;
    ctx.fillRect(0, state.ground, state.width, 2);
    ctx.fillStyle = COLORS.stones;
    repeat(26, state.distance, (x) => {
      ctx.fillRect(x, state.ground + 9, 16, 4);
      ctx.fillRect(x + 13, state.ground + 19, 16, 4);
    });
  }

  // A pigeon walking towards Bruno, head bobbing.
  function drawPigeon(x, time) {
    const base = state.ground;
    const bob = Math.sin(time / 90 + x) * 1.5;
    ctx.fillStyle = COLORS.pigeon;
    ctx.beginPath();
    ctx.ellipse(x + 17, base - 12, 12, 8, -0.15, 0, Math.PI * 2);
    ctx.moveTo(x + 26, base - 14);
    ctx.lineTo(x + 31, base - 20);
    ctx.lineTo(x + 30, base - 10);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 6 + bob, base - 21, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.beak;
    ctx.beginPath();
    ctx.moveTo(x + 1 + bob, base - 22);
    ctx.lineTo(x - 3 + bob, base - 20);
    ctx.lineTo(x + 1 + bob, base - 19);
    ctx.fill();
    ctx.fillStyle = COLORS.road;
    ctx.fillRect(x + 4 + bob, base - 23, 1.6, 1.6);
    ctx.strokeStyle = COLORS.beak;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x + 14, base - 5);
    ctx.lineTo(x + 13, base);
    ctx.moveTo(x + 20, base - 5);
    ctx.lineTo(x + 21, base);
    ctx.stroke();
  }

  // A parked city bike, Padova's favourite obstacle.
  function drawBike(x) {
    const base = state.ground;
    ctx.strokeStyle = COLORS.cream;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + 12, base - 11, 10, 0, Math.PI * 2);
    ctx.moveTo(x + 58, base - 11);
    ctx.arc(x + 48, base - 11, 10, 0, Math.PI * 2);
    ctx.moveTo(x + 12, base - 11);
    ctx.lineTo(x + 26, base - 27);
    ctx.lineTo(x + 42, base - 27);
    ctx.lineTo(x + 48, base - 11);
    ctx.moveTo(x + 26, base - 27);
    ctx.lineTo(x + 30, base - 11);
    ctx.lineTo(x + 12, base - 11);
    ctx.moveTo(x + 30, base - 11);
    ctx.lineTo(x + 42, base - 27);
    ctx.moveTo(x + 26, base - 27);
    ctx.lineTo(x + 26, base - 32);
    ctx.moveTo(x + 22, base - 32);
    ctx.lineTo(x + 31, base - 32);
    ctx.moveTo(x + 42, base - 27);
    ctx.lineTo(x + 44, base - 38);
    ctx.lineTo(x + 50, base - 38);
    ctx.stroke();
  }

  function drawPuddle(x, width) {
    const base = state.ground;
    ctx.fillStyle = COLORS.puddle;
    ctx.beginPath();
    ctx.ellipse(x + width / 2, base + 2, width / 2, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(251, 228, 216, 0.35)";
    ctx.beginPath();
    ctx.ellipse(x + width * 0.35, base + 1, width * 0.12, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawObstacles(time) {
    state.obstacles.forEach((obstacle) => {
      if (obstacle.type === "pigeon") drawPigeon(obstacle.x, time);
      else if (obstacle.type === "bike") drawBike(obstacle.x);
      else drawPuddle(obstacle.x, obstacle.width);
    });
  }

  // Simit (a sesame ring) or a sugar cookie from Bilge's kitchen, bobbing in the air.
  function drawTreats(time) {
    state.treats.forEach((treat) => {
      const y = treatY() + Math.sin(time / 260 + treat.x / 40) * 3;
      ctx.beginPath();
      if (treat.kind === "simit") {
        ctx.strokeStyle = COLORS.simit;
        ctx.lineWidth = 5;
        ctx.arc(treat.x, y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = COLORS.cream;
        for (let i = 0; i < 8; i += 1) {
          const angle = (Math.PI * 2 * i) / 8;
          ctx.fillRect(treat.x + Math.cos(angle) * 8 - 0.8, y + Math.sin(angle) * 8 - 0.8, 1.6, 1.6);
        }
      } else {
        ctx.fillStyle = COLORS.cookie;
        ctx.arc(treat.x, y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.cream;
        [[-3, -3], [3, -4], [0, 2], [4, 3], [-5, 3]].forEach(([dx, dy]) => ctx.fillRect(treat.x + dx, y + dy, 1.8, 1.8));
      }
    });
  }

  // The sticker faces left, so Bruno is mirrored to run right; he bobs while running and tilts with his jump.
  function drawBruno(time) {
    if (!sprite.complete || !sprite.naturalWidth) return;
    const height = state.brunoHeight;
    const width = height * BRUNO_RATIO;
    const running = state.phase === "running" && state.lift === 0;
    const bob = running ? Math.abs(Math.sin(time / 70)) * 3 : 0;
    const tilt = Math.max(-0.2, Math.min(0.2, state.vy / 3000));
    ctx.save();
    ctx.translate(CONFIG.brunoX + width / 2, state.ground - state.lift - bob);
    ctx.scale(-1, 1);
    ctx.rotate(tilt);
    ctx.imageSmoothingQuality = "high";
    ctx.shadowColor = "rgba(8, 0, 10, 0.5)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(sprite, -width / 2, -height, width, height);
    ctx.restore();
  }

  function drawPopups() {
    ctx.font = popupFont;
    ctx.textAlign = "center";
    ctx.fillStyle = COLORS.cream;
    state.popups.forEach((popup) => {
      ctx.globalAlpha = Math.min(1, popup.life / 0.4);
      ctx.fillText(popup.text, popup.x, popup.y);
    });
    ctx.globalAlpha = 1;
    ctx.textAlign = "start";
  }

  function draw(time) {
    drawSky();
    drawScenery();
    drawGround();
    drawTreats(time);
    drawObstacles(time);
    drawBruno(time);
    drawPopups();
  }

  function loop(time) {
    const delta = Math.min(0.033, (time - state.lastFrame) / 1000 || 0);
    state.lastFrame = time;
    if (state.phase === "running") update(delta);
    draw(time);
    state.frameId = requestAnimationFrame(loop);
  }

  // ---------- texts ----------

  function showMessage(message) {
    state.message = message;
    renderMessage();
  }

  function renderMessage() {
    const message = state.message;
    ui.message.hidden = !message;
    if (!message) return;
    const lines = [
      el("p", { className: "run-message-title", text: t(message.title) }),
      message.sub && el("p", { className: "run-message-sub", text: format(t(message.sub), message.vars) }),
      message.hint && el("p", { className: "run-message-hint", text: t(message.hint) })
    ];
    ui.message.replaceChildren(...lines.filter(Boolean));
  }

  function renderScore() {
    const points = score();
    if (points === state.lastScore) return;
    state.lastScore = points;
    ui.score.textContent = String(points);
  }

  function renderTexts() {
    ui.root.setAttribute("aria-label", t("runGame.name"));
    ui.title.textContent = t("runGame.name");
    ui.scoreLabel.textContent = t("runGame.score");
    ui.bestLabel.textContent = t("runGame.best");
    ui.close.setAttribute("aria-label", t("gameMode.close"));
    renderMessage();
  }

  // ---------- strip ----------

  function build() {
    ui.title = el("p", { className: "run-title" });
    ui.scoreLabel = el("span");
    ui.score = el("strong", { text: "0" });
    ui.bestLabel = el("span");
    ui.best = el("strong", { text: String(state.best) });
    ui.close = el("button", { type: "button", className: "game-close", text: "×" });
    ui.canvas = el("canvas", { className: "run-canvas", "aria-hidden": "true" });
    ui.message = el("div", { className: "run-message", role: "status", "aria-live": "polite" });
    ui.stage = el("div", { className: "run-stage", tabindex: "0" }, [ui.canvas, ui.message]);
    ui.root = el("section", { className: "run-game" }, [
      el("header", { className: "run-head" }, [
        ui.title,
        el("p", { className: "run-score" }, [ui.scoreLabel, ui.score]),
        el("p", { className: "run-score" }, [ui.bestLabel, ui.best]),
        ui.close
      ]),
      ui.stage
    ]);
    ctx = ui.canvas.getContext("2d");
    sprite = Object.assign(new Image(), { src: BRUNO_SRC });

    ui.close.addEventListener("click", () => state.onExit?.());
    ui.stage.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ui.stage.focus({ preventScroll: true });
      press();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => ui.stage.addEventListener(type, release));
  }

  function start(onExit) {
    state.onExit = onExit;
    if (!ui.root) build();
    document.body.append(ui.root);
    popupFont = `600 13px ${getComputedStyle(document.body).fontFamily}`;
    renderTexts();
    resize();
    reset();
    state.phase = "ready";
    showMessage({ title: "runGame.start", sub: "runGame.hint" });
    state.lastFrame = performance.now();
    state.frameId = requestAnimationFrame(loop);
    ui.stage.focus({ preventScroll: true });
  }

  function stop() {
    state.onExit = null;
    state.holding = false;
    cancelAnimationFrame(state.frameId);
    ui.root?.remove();
  }

  // ---------- input & page events ----------

  function isTypingTarget(target) {
    return target.closest?.("input, textarea, select, [contenteditable='true']");
  }

  // Space and ↑ jump anywhere on the page, except while typing or when a button has focus.
  document.addEventListener("keydown", (event) => {
    if (!state.onExit || !JUMP_KEYS.includes(event.code) || isTypingTarget(event.target) || event.target.closest?.("button")) return;
    event.preventDefault(); // keeps Space and ↑ from scrolling the page
    if (!event.repeat) press();
  });

  document.addEventListener("keyup", (event) => {
    if (state.onExit && JUMP_KEYS.includes(event.code)) release();
  });

  window.addEventListener("resize", resize);
  window.addEventListener("blur", pause);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
  });

  document.addEventListener("portfolio:languagechange", () => {
    if (state.onExit) renderTexts();
  });

  return { start, stop };
})();
