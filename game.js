// Scan Rush: a one-button checkout game — scan each product as its barcode crosses the laser.
// Depends on content.js (scanRushProducts, translations) and script.js (t, localize, currentLanguage).

(() => {
  const root = document.querySelector("[data-game]");
  if (!root) return;

  const CONFIG = {
    lives: 3,
    startSpeed: 200, // belt speed in px/s
    maxSpeed: 520,
    speedStep: 9, // added after every successful scan
    perfectWindow: 10, // px between barcode centre and laser
    goodWindow: 30,
    minGap: 70, // px between products
    maxGap: 200,
    points: { perfect: 100, good: 50 },
    comboStep: 5, // scans in a row needed to raise the multiplier
    maxMultiplier: 5,
    receiptLines: 6,
    compactReceiptLines: 3, // used on narrow screens
    compactWidth: 500
  };
  const BEST_SCORE_KEY = "scanRushBest";
  const SOUND_KEY = "scanRushSound";

  const canvas = root.querySelector("[data-game-canvas]");
  const ctx = canvas.getContext("2d");
  const ui = {
    stage: root.querySelector("[data-game-stage]"),
    score: root.querySelector("[data-game-score]"),
    combo: root.querySelector("[data-game-combo]"),
    lives: root.querySelector("[data-game-lives]"),
    best: root.querySelector("[data-game-best]"),
    startOverlay: root.querySelector("[data-game-start]"),
    overOverlay: root.querySelector("[data-game-over]"),
    receipt: root.querySelector("[data-game-receipt]"),
    soundToggle: root.querySelector("[data-game-sound]"),
    playButtons: root.querySelectorAll("[data-game-play]")
  };

  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const colors = {
    belt: cssVar("--navy-light"),
    beltLine: cssVar("--navy-lighter"),
    text: cssVar("--slate-lightest"),
    muted: cssVar("--slate"),
    accent: cssVar("--accent"),
    laser: "#ff4d5e",
    label: "#f6f8f1",
    ink: "#0a192f"
  };

  const state = {
    phase: "idle", // idle | running | paused | over
    products: [],
    effects: [],
    scannedItems: [],
    score: 0,
    combo: 0,
    bestCombo: 0,
    lives: CONFIG.lives,
    speed: CONFIG.startSpeed,
    distanceToSpawn: 0,
    beltOffset: 0,
    laserFlash: 0,
    missFlash: 0,
    lastFrame: 0,
    best: readNumber(BEST_SCORE_KEY),
    soundOn: readSetting(SOUND_KEY) !== "off",
    isNewBest: false
  };

  const size = { width: 0, height: 0, laserX: 0, beltY: 0 };
  let audioContext = null;
  let frameId = 0;

  // ---------- storage ----------

  function readSetting(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function readNumber(key) {
    return Number(readSetting(key)) || 0;
  }

  function writeSetting(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Storage may be blocked; the game works without persistence.
    }
  }

  // ---------- helpers ----------

  const random = (min, max) => min + Math.random() * (max - min);
  const multiplier = () => Math.min(CONFIG.maxMultiplier, 1 + Math.floor(state.combo / CONFIG.comboStep));
  const productCenter = (product) => product.x + product.width / 2;

  function formatMoney(value) {
    const locale = currentLanguage === "it" ? "it-IT" : "en-IE";
    return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
  }

  // Short scanner beep through Web Audio; created lazily on the first user gesture.
  function beep(frequency, duration = 0.07, type = "square") {
    if (!state.soundOn) return;
    try {
      audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      // Audio is optional; ignore browsers that block it.
    }
  }

  // ---------- products ----------

  const SHAPE_SIZES = {
    box: [78, 62],
    bottle: [44, 92],
    can: [52, 68],
    bag: [86, 56],
    round: [60, 60]
  };

  function createProduct() {
    const template = scanRushProducts[Math.floor(Math.random() * scanRushProducts.length)];
    const [width, height] = SHAPE_SIZES[template.shape];
    return {
      template,
      width,
      height,
      x: size.width + 10,
      bars: Array.from({ length: 11 }, () => (Math.random() < 0.5 ? 1 : 2)),
      status: "pending" // pending | scanned | lost
    };
  }

  // Unscanned product whose barcode is closest to the laser.
  function nearestPendingProduct() {
    let nearest = null;
    let nearestDistance = Infinity;
    state.products.forEach((product) => {
      if (product.status !== "pending") return;
      const distance = Math.abs(productCenter(product) - size.laserX);
      if (distance < nearestDistance) {
        nearest = product;
        nearestDistance = distance;
      }
    });
    return { product: nearest, distance: nearestDistance };
  }

  // ---------- game flow ----------

  function startGame() {
    Object.assign(state, {
      phase: "running",
      products: [],
      effects: [],
      scannedItems: [],
      score: 0,
      combo: 0,
      bestCombo: 0,
      lives: CONFIG.lives,
      speed: CONFIG.startSpeed,
      distanceToSpawn: 0,
      isNewBest: false
    });
    ui.startOverlay.hidden = true;
    ui.overOverlay.hidden = true;
    updateHud();
    beep(880, 0.05);
    canvas.focus({ preventScroll: true });
    resumeLoop();
  }

  function endGame() {
    state.phase = "over";
    cancelAnimationFrame(frameId);
    if (state.score > state.best) {
      state.best = state.score;
      state.isNewBest = true;
      writeSetting(BEST_SCORE_KEY, state.best);
    }
    updateHud();
    renderReceipt();
    ui.overOverlay.hidden = false;
    ui.overOverlay.querySelector("[data-game-play]")?.focus({ preventScroll: true });
    draw();
  }

  function pauseGame() {
    if (state.phase !== "running") return;
    state.phase = "paused";
    cancelAnimationFrame(frameId);
    draw();
  }

  function resumeLoop() {
    state.phase = "running";
    state.lastFrame = performance.now();
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(loop);
  }

  // Single input action: scan while running, resume while paused.
  function handleAction() {
    if (state.phase === "paused") {
      resumeLoop();
      return;
    }
    if (state.phase !== "running") return;

    const { product, distance } = nearestPendingProduct();
    if (product && distance <= CONFIG.goodWindow) {
      registerScan(product, distance <= CONFIG.perfectWindow ? "perfect" : "good");
    } else {
      registerMistake(size.laserX, t("game.miss"));
    }
  }

  function registerScan(product, quality) {
    product.status = "scanned";
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    const points = CONFIG.points[quality] * multiplier();
    state.score += points;
    state.speed = Math.min(CONFIG.maxSpeed, state.speed + CONFIG.speedStep);
    state.scannedItems.push(product.template);
    state.laserFlash = 1;
    addEffect(productCenter(product), `+${points} ${t(`game.${quality}`)}`, quality === "perfect" ? colors.accent : colors.text);
    beep(quality === "perfect" ? 1900 : 1500);
    updateHud();
  }

  function registerMistake(x, label) {
    state.lives -= 1;
    state.combo = 0;
    state.missFlash = 1;
    addEffect(x, label, colors.laser);
    beep(160, 0.18, "sawtooth");
    updateHud();
    if (state.lives <= 0) endGame();
  }

  function addEffect(x, text, color) {
    state.effects.push({ x, y: size.beltY - 110, text, color, life: 1 });
  }

  // ---------- loop ----------

  function update(delta) {
    const travel = state.speed * delta;
    state.beltOffset = (state.beltOffset + travel) % 40;
    state.laserFlash = Math.max(0, state.laserFlash - delta * 4);
    state.missFlash = Math.max(0, state.missFlash - delta * 3);

    state.distanceToSpawn -= travel;
    if (state.distanceToSpawn <= 0) {
      const product = createProduct();
      state.products.push(product);
      state.distanceToSpawn = product.width + random(CONFIG.minGap, CONFIG.maxGap);
    }

    state.products.forEach((product) => {
      product.x -= travel;
      const passedLaser = productCenter(product) < size.laserX - CONFIG.goodWindow - 4;
      if (product.status === "pending" && passedLaser) {
        product.status = "lost";
        registerMistake(productCenter(product), t("game.missed"));
      }
    });
    state.products = state.products.filter((product) => product.x + product.width > -20);

    state.effects.forEach((effect) => {
      effect.life -= delta * 1.2;
      effect.y -= delta * 40;
    });
    state.effects = state.effects.filter((effect) => effect.life > 0);
  }

  function loop(now) {
    if (state.phase !== "running") return;
    const delta = Math.min(0.05, (now - state.lastFrame) / 1000);
    state.lastFrame = now;
    update(delta);
    draw();
    if (state.phase === "running") frameId = requestAnimationFrame(loop);
  }

  // ---------- drawing ----------

  function drawBelt() {
    const { width, beltY } = size;
    ctx.fillStyle = colors.belt;
    ctx.fillRect(0, beltY, width, 26);
    ctx.strokeStyle = colors.beltLine;
    ctx.lineWidth = 2;
    for (let x = -state.beltOffset; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, beltY + 4);
      ctx.lineTo(x + 14, beltY + 22);
      ctx.stroke();
    }
    ctx.fillStyle = colors.beltLine;
    ctx.fillRect(0, beltY + 26, width, 4);
  }

  function drawLaser() {
    const { laserX, beltY } = size;
    const top = 26;
    const glow = 0.35 + state.laserFlash * 0.65;

    // Scanner housing above the belt.
    ctx.fillStyle = colors.beltLine;
    ctx.beginPath();
    ctx.roundRect(laserX - 26, top - 18, 52, 18, 6);
    ctx.fill();

    ctx.save();
    ctx.shadowColor = colors.laser;
    ctx.shadowBlur = 12 + state.laserFlash * 20;
    ctx.strokeStyle = colors.laser;
    ctx.globalAlpha = glow;
    ctx.lineWidth = 2 + state.laserFlash * 3;
    ctx.beginPath();
    ctx.moveTo(laserX, top);
    ctx.lineTo(laserX, beltY);
    ctx.stroke();
    ctx.restore();

    // Scan window marker on the belt.
    ctx.fillStyle = colors.laser;
    ctx.globalAlpha = 0.18;
    ctx.fillRect(laserX - CONFIG.goodWindow, beltY - 4, CONFIG.goodWindow * 2, 4);
    ctx.globalAlpha = 1;
  }

  function drawProductBody(product, x, y) {
    const { width, height, template } = product;
    ctx.fillStyle = template.color;
    ctx.beginPath();
    switch (template.shape) {
      case "bottle":
        ctx.roundRect(x + width * 0.3, y, width * 0.4, height * 0.22, 3);
        ctx.roundRect(x, y + height * 0.2, width, height * 0.8, 10);
        break;
      case "can":
        ctx.roundRect(x, y, width, height, 8);
        break;
      case "bag":
        ctx.roundRect(x, y + 6, width, height - 6, [4, 4, 12, 12]);
        break;
      case "round":
        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
        break;
      default:
        ctx.roundRect(x, y, width, height, 4);
    }
    ctx.fill();
  }

  function drawBarcode(product, x, y) {
    const labelWidth = 32;
    const labelHeight = 22;
    const labelX = x + product.width / 2 - labelWidth / 2;
    const labelY = y + product.height * 0.55 - labelHeight / 2;
    ctx.fillStyle = colors.label;
    ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
    ctx.fillStyle = colors.ink;
    let barX = labelX + 3;
    product.bars.forEach((barWidth) => {
      ctx.fillRect(barX, labelY + 3, barWidth, labelHeight - 6);
      barX += barWidth + 1;
    });
  }

  function drawProducts() {
    state.products.forEach((product) => {
      const x = product.x;
      const y = size.beltY - product.height;
      ctx.globalAlpha = product.status === "lost" ? 0.35 : 1;
      drawProductBody(product, x, y);
      drawBarcode(product, x, y);

      if (product.status === "scanned") {
        ctx.fillStyle = colors.accent;
        ctx.beginPath();
        ctx.arc(x + product.width - 4, y + 4, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x + product.width - 8, y + 4);
        ctx.lineTo(x + product.width - 5, y + 7);
        ctx.lineTo(x + product.width + 1, y + 1);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
  }

  function drawEffects() {
    ctx.textAlign = "center";
    ctx.font = `600 13px ${cssVar("--font-mono")}`;
    state.effects.forEach((effect) => {
      ctx.globalAlpha = Math.max(0, effect.life);
      ctx.fillStyle = effect.color;
      ctx.fillText(effect.text, effect.x, effect.y);
    });
    ctx.globalAlpha = 1;
  }

  function drawPaused() {
    ctx.fillStyle = "rgba(10, 25, 47, 0.7)";
    ctx.fillRect(0, 0, size.width, size.height);
    ctx.fillStyle = colors.text;
    ctx.textAlign = "center";
    ctx.font = `500 15px ${cssVar("--font-mono")}`;
    ctx.fillText(t("game.paused"), size.width / 2, size.height / 2);
  }

  function draw() {
    ctx.clearRect(0, 0, size.width, size.height);
    if (state.missFlash > 0) {
      ctx.fillStyle = `rgba(255, 77, 94, ${state.missFlash * 0.12})`;
      ctx.fillRect(0, 0, size.width, size.height);
    }
    drawBelt();
    drawProducts();
    drawLaser();
    drawEffects();
    if (state.phase === "paused") drawPaused();
  }

  // Matches the canvas backing store to its CSS size for crisp drawing on retina screens.
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    size.width = rect.width;
    size.height = rect.height;
    size.laserX = Math.round(rect.width * 0.32);
    size.beltY = Math.round(rect.height * 0.8);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  // ---------- HUD & receipt ----------

  function updateHud() {
    ui.score.textContent = state.score;
    ui.combo.textContent = `${state.combo} · x${multiplier()}`;
    ui.lives.textContent = "●".repeat(Math.max(0, state.lives)) + "○".repeat(CONFIG.lives - Math.max(0, state.lives));
    ui.best.textContent = state.best;
  }

  function receiptRow(label, value, className = "") {
    return el("li", { className }, [el("span", { text: label }), el("span", { text: value })]);
  }

  function renderReceipt() {
    if (state.phase !== "over") return;
    const items = state.scannedItems;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const maxLines = size.width < CONFIG.compactWidth ? CONFIG.compactReceiptLines : CONFIG.receiptLines;
    const visible = items.slice(-maxLines);
    const hiddenCount = items.length - visible.length;

    const lines = [
      el("p", { className: "receipt-title", text: t("game.receiptTitle") }),
      el("p", { className: "receipt-date", text: new Date().toLocaleString(currentLanguage === "it" ? "it-IT" : "en-GB") }),
      items.length > 0 &&
        el("ul", { className: "receipt-lines" }, [
          hiddenCount > 0 && receiptRow(`… +${hiddenCount}`, ""),
          ...visible.map((item) => receiptRow(localize(item.name), formatMoney(item.price)))
        ]),
      el("ul", { className: "receipt-lines receipt-summary" }, [
        receiptRow(`${t("game.totalLabel")} (${items.length} ${t("game.itemsLabel")})`, formatMoney(total), "receipt-total"),
        receiptRow(t("game.scoreLabel"), String(state.score)),
        receiptRow(t("game.comboLabel"), String(state.bestCombo))
      ]),
      state.isNewBest && el("p", { className: "receipt-best", text: t("game.newBest") }),
      el("p", { className: "receipt-thanks", text: t("game.thanks") })
    ];
    // replaceChildren would print `false` as text, so drop the optional lines that are off.
    ui.receipt.replaceChildren(...lines.filter(Boolean));
  }

  function updateSoundToggle() {
    ui.soundToggle.setAttribute("aria-pressed", String(state.soundOn));
    ui.soundToggle.classList.toggle("is-off", !state.soundOn);
  }

  // ---------- input ----------

  ui.playButtons.forEach((button) => button.addEventListener("click", startGame));

  ui.stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    event.preventDefault();
    handleAction();
  });

  canvas.addEventListener("keydown", (event) => {
    if (event.code !== "Space" && event.key !== "Enter") return;
    event.preventDefault();
    if (!event.repeat) handleAction();
  });

  ui.soundToggle.addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    writeSetting(SOUND_KEY, state.soundOn ? "on" : "off");
    updateSoundToggle();
  });

  // Pause when the tab is hidden or the game scrolls out of view, so no lives are lost unseen.
  document.addEventListener("visibilitychange", () => document.hidden && pauseGame());
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => !entry.isIntersecting && pauseGame(), { threshold: 0.3 }).observe(ui.stage);
  }

  document.addEventListener("portfolio:languagechange", () => {
    renderReceipt();
    draw();
  });

  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  window.addEventListener("resize", resize);

  // Places a few products on the belt so the idle screen previews the game.
  function seedIdleScene() {
    [0.12, 0.5, 0.78].forEach((position) => {
      const product = createProduct();
      product.x = size.width * position;
      state.products.push(product);
    });
  }

  resize();
  seedIdleScene();
  draw();
  updateHud();
  updateSoundToggle();
})();
