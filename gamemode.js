// Game mode: Bruno, Bilge's dog, runs and jumps across the page's lines of text to squash 5 hidden bugs.
// Depends on content.js (translations, brunoLines) and script.js (t, el, localize). The page stays fully usable while it runs.

(() => {
  const root = document.querySelector("[data-game-mode]");
  if (!root) return;

  const CONFIG = {
    gravity: 1900, // px/s²
    jumpVelocity: 640,
    moveSpeed: 230,
    maxFallSpeed: 950,
    coyoteTime: 0.09, // seconds you can still jump after walking off a ledge
    jumpBuffer: 0.12, // seconds a jump press is remembered before landing
    pixel: 2, // size of one bug-sprite pixel in CSS px
    bugCount: 5,
    bugSpeed: 34,
    stompBounce: 0.72,
    napAfter: 7, // seconds standing still before Bruno lies down for a nap
    bubbleTime: 1.8, // seconds a speech bubble stays up
    platformRefreshMs: 700,
    followMarginTop: 110,
    followMarginBottom: 160,
    minPlatformWidth: 24
  };

  // Where the 5 bugs hide: one per section, so squashing them tours the whole page.
  const BUG_SECTIONS = ["#work", "#about", "#experience", ".process", "#contact"];
  const PLATFORM_SELECTOR = [
    "main h1", "main h2", "main h3", "main h4", "main p", "main li", "main .button",
    "main input", "main textarea", ".site-footer p", ".site-footer a"
  ].join(",");

  // Bug sprites: one character per pixel, "." is transparent.
  const BUG_COLORS = { G: "#7dd87d", D: "#2e6b2e", L: "#190019" };
  const BUG_FRAMES = [
    ["..L.L..", ".GGGGG.", "GGDGDGG", ".GGGGG.", "L.L.L.L"],
    ["..L.L..", ".GGGGG.", "GGDGDGG", ".GGGGG.", ".L.L.L."]
  ];

  // Bruno's hitbox: his sitting sticker (188×212) drawn 56px tall.
  const playerSize = { width: 50, height: 56 };
  const bugSize = { width: BUG_FRAMES[0][0].length * CONFIG.pixel, height: BUG_FRAMES[0].length * CONFIG.pixel };

  // Photo stickers of the real Bruno, facing left: sitting (also while he runs and jumps) and lying down for naps.
  const BRUNO_POSES = {
    awake: { src: "assets/bruno/bruno-sit.webp", height: playerSize.height },
    nap: { src: "assets/bruno/bruno-nap.webp", height: 46 }
  };
  const NAP_BUBBLE = "z z z";

  const ui = {
    toggle: root.querySelector("[data-game-toggle]"),
    infoButton: root.querySelector("[data-game-info-button]"),
    info: root.querySelector("[data-game-info]"),
    canvas: null,
    counter: null,
    status: null,
    touch: null
  };

  const state = {
    active: false,
    phase: "playing", // playing | lost | won
    platforms: [],
    bugs: [],
    particles: [],
    squashed: 0,
    player: null,
    bubble: null,
    input: { left: false, right: false },
    jumpBufferedFor: 0,
    lastFrame: 0,
    walkClock: 0,
    frameId: 0,
    refreshTimer: 0
  };

  let ctx = null;
  let bubbleFont = "";
  const sprites = {};
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  // ---------- platforms ----------

  // Every rendered line of text becomes a one-way platform, in document coordinates.
  function collectPlatforms() {
    const platforms = [];
    const seen = new Set();
    const range = document.createRange();

    document.querySelectorAll(PLATFORM_SELECTOR).forEach((element, elementIndex) => {
      if (element.closest("[data-game-mode], .site-header, [hidden]")) return;
      const isField = element.matches("input, textarea, .button");
      let rects;
      if (isField) {
        rects = [element.getBoundingClientRect()];
      } else {
        range.selectNodeContents(element);
        rects = [...range.getClientRects()];
      }

      rects.forEach((rect, lineIndex) => {
        if (rect.width < CONFIG.minPlatformWidth || rect.height < 6) return;
        const top = Math.round(rect.top + window.scrollY);
        const left = Math.round(rect.left + window.scrollX);
        const key = `${top}:${left}`;
        if (seen.has(key)) return; // nested elements report the same line twice
        seen.add(key);
        platforms.push({ id: `${elementIndex}:${lineIndex}`, top, left, right: left + rect.width });
      });
    });

    return platforms;
  }

  function refreshPlatforms() {
    state.platforms = collectPlatforms();
    const byId = new Map(state.platforms.map((platform) => [platform.id, platform]));

    // Keep each bug on its line even if the layout shifted.
    state.bugs.forEach((bug) => {
      const platform = byId.get(bug.platform.id);
      if (!platform) return;
      const offset = bug.x - bug.platform.left;
      bug.platform = platform;
      bug.x = Math.min(Math.max(platform.left, platform.left + offset), platform.right - bugSize.width);
    });
  }

  function sectionRect(selector) {
    const section = document.querySelector(selector);
    if (!section) return null;
    const rect = section.getBoundingClientRect();
    return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
  }

  // A line is "open" when no other line sits just above it, so Bruno can actually land on it.
  function hasHeadroom(platform) {
    const clearance = playerSize.height + 16;
    return !state.platforms.some(
      (other) =>
        other !== platform &&
        other.top < platform.top &&
        other.top > platform.top - clearance &&
        Math.min(other.right, platform.right) - Math.max(other.left, platform.left) > 20
    );
  }

  // One bug per section, on a random open line wide enough to patrol.
  function placeBugs() {
    state.bugs = BUG_SECTIONS.slice(0, CONFIG.bugCount)
      .map((selector) => {
        const bounds = sectionRect(selector);
        if (!bounds) return null;
        const candidates = state.platforms.filter(
          (platform) =>
            platform.top > bounds.top &&
            platform.top < bounds.bottom &&
            platform.right - platform.left > 110 &&
            hasHeadroom(platform)
        );
        if (!candidates.length) return null;
        const platform = candidates[Math.floor(Math.random() * candidates.length)];
        return {
          platform,
          x: platform.left + Math.random() * (platform.right - platform.left - bugSize.width),
          direction: Math.random() < 0.5 ? -1 : 1
        };
      })
      .filter(Boolean);
  }

  // ---------- player ----------

  // Drops Bruno onto the first line in the upper part of the current view.
  function spawnPlayer() {
    const viewTop = window.scrollY;
    const target =
      state.platforms.find((platform) => platform.top > viewTop + 90 && platform.top < viewTop + window.innerHeight * 0.6) ||
      state.platforms.find((platform) => platform.top > viewTop) ||
      state.platforms[0];

    state.player = {
      x: target ? target.left + 8 : 40,
      y: target ? target.top - playerSize.height - 60 : viewTop + 120,
      vx: 0,
      vy: 0,
      grounded: false,
      coyote: 0,
      facing: 1,
      squash: 0, // 1 right after landing, eases back to 0
      idleFor: 0,
      napping: false
    };
  }

  function jump() {
    state.jumpBufferedFor = CONFIG.jumpBuffer;
  }

  function updatePlayer(delta) {
    const player = state.player;
    const wasGrounded = player.grounded;
    const direction = (state.input.right ? 1 : 0) - (state.input.left ? 1 : 0);
    player.vx = direction * CONFIG.moveSpeed;
    if (direction) player.facing = direction;

    state.jumpBufferedFor = Math.max(0, state.jumpBufferedFor - delta);
    player.coyote = player.grounded ? CONFIG.coyoteTime : Math.max(0, player.coyote - delta);
    if (state.jumpBufferedFor > 0 && player.coyote > 0) {
      player.vy = -CONFIG.jumpVelocity;
      player.grounded = false;
      player.coyote = 0;
      state.jumpBufferedFor = 0;
    }

    player.vy = Math.min(CONFIG.maxFallSpeed, player.vy + CONFIG.gravity * delta);
    const previousBottom = player.y + playerSize.height;
    player.x += player.vx * delta;
    player.y += player.vy * delta;

    const pageWidth = document.documentElement.scrollWidth;
    player.x = Math.min(Math.max(0, player.x), pageWidth - playerSize.width);

    // One-way landing: only when falling through a line's top edge from above.
    player.grounded = false;
    if (player.vy >= 0) {
      const bottom = player.y + playerSize.height;
      for (const platform of state.platforms) {
        const overlaps = player.x + playerSize.width > platform.left + 3 && player.x < platform.right - 3;
        if (overlaps && previousBottom <= platform.top + 1 && bottom >= platform.top) {
          player.y = platform.top - playerSize.height;
          player.vy = 0;
          player.grounded = true;
          break;
        }
      }
    }

    player.squash = player.grounded && !wasGrounded ? 1 : Math.max(0, player.squash - delta * 7);
    if (direction && player.grounded) state.walkClock += delta;
    updateNap(player, direction, delta);
    if (player.y > document.documentElement.scrollHeight + 40) lose();
  }

  // Standing still for a while sends Bruno to sleep; moving or jumping wakes him up.
  function updateNap(player, direction, delta) {
    const resting = player.grounded && !direction;
    player.idleFor = resting ? player.idleFor + delta : 0;
    if (!player.napping && player.idleFor > CONFIG.napAfter) {
      player.napping = true;
      say(NAP_BUBBLE, Infinity);
    } else if (player.napping && !resting) {
      player.napping = false;
      if (state.bubble?.text === NAP_BUBBLE) state.bubble = null;
    }
  }

  // Scrolls the page to keep a moving Bruno on screen; an idle Bruno lets the visitor scroll freely.
  function followPlayer() {
    const player = state.player;
    const isMoving = player.vx !== 0 || !player.grounded;
    if (!isMoving) return;
    const screenY = player.y - window.scrollY;
    if (screenY > window.innerHeight - CONFIG.followMarginBottom) {
      window.scrollTo(window.scrollX, player.y - window.innerHeight + CONFIG.followMarginBottom);
    } else if (screenY < CONFIG.followMarginTop) {
      window.scrollTo(window.scrollX, Math.max(0, player.y - CONFIG.followMarginTop));
    }
  }

  // ---------- speech bubbles ----------

  function say(text, duration = CONFIG.bubbleTime) {
    state.bubble = { text, life: duration };
  }

  // A random line from brunoLines, never the one already showing.
  function sayRandomLine() {
    const lines = localize(brunoLines).filter((line) => line !== state.bubble?.text);
    say(lines[Math.floor(Math.random() * lines.length)]);
  }

  function updateBubble(delta) {
    if (!state.bubble) return;
    state.bubble.life -= delta;
    if (state.bubble.life <= 0) state.bubble = null;
  }

  // ---------- bugs ----------

  function updateBugs(delta) {
    const player = state.player;
    state.bugs.forEach((bug) => {
      if (bug.squashed) return;
      bug.x += bug.direction * CONFIG.bugSpeed * delta;
      if (bug.x <= bug.platform.left || bug.x >= bug.platform.right - bugSize.width) {
        bug.direction *= -1;
        bug.x = Math.min(Math.max(bug.x, bug.platform.left), bug.platform.right - bugSize.width);
      }

      const bugTop = bug.platform.top - bugSize.height;
      const overlapsX = player.x + playerSize.width > bug.x + 2 && player.x < bug.x + bugSize.width - 2;
      const overlapsY = player.y + playerSize.height > bugTop && player.y < bug.platform.top;
      if (!overlapsX || !overlapsY) return;

      // Landing on top squashes; touching from the side knocks Bruno off.
      const feet = player.y + playerSize.height;
      if (player.vy > 0 && feet - bugTop < 12) squash(bug);
      else lose();
    });
  }

  function squash(bug) {
    bug.squashed = true;
    state.squashed += 1;
    state.player.vy = -CONFIG.jumpVelocity * CONFIG.stompBounce;
    burst(bug.x + bugSize.width / 2, bug.platform.top - bugSize.height / 2);
    sayRandomLine();
    updateCounter();
    if (state.squashed >= state.bugs.length) win();
  }

  function burst(x, y) {
    const colors = ["#dfb6b2", "#fbe4d8", "#7dd87d", "#854f6c"];
    for (let i = 0; i < 14; i += 1) {
      const angle = (Math.PI * 2 * i) / 14;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * (60 + Math.random() * 90),
        vy: Math.sin(angle) * (60 + Math.random() * 90) - 60,
        life: 0.7,
        color: colors[i % colors.length]
      });
    }
  }

  function updateParticles(delta) {
    state.particles.forEach((particle) => {
      particle.life -= delta;
      particle.vy += CONFIG.gravity * 0.4 * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
    });
    state.particles = state.particles.filter((particle) => particle.life > 0);
  }

  // ---------- drawing ----------

  // Bruno's stickers load the first time the game starts; drawPlayer skips frames until they are ready.
  function loadSprites() {
    Object.entries(BRUNO_POSES).forEach(([pose, { src }]) => {
      sprites[pose] ??= Object.assign(new Image(), { src });
    });
  }

  function drawSprite(rows, colors, x, y, mirror = false) {
    const size = CONFIG.pixel;
    rows.forEach((row, rowIndex) => {
      [...row].forEach((code, columnIndex) => {
        if (code === ".") return;
        const column = mirror ? row.length - 1 - columnIndex : columnIndex;
        ctx.fillStyle = colors[code];
        ctx.fillRect(Math.round(x + column * size), Math.round(y + rowIndex * size), size, size);
      });
    });
  }

  // The stickers face left, so Bruno is mirrored while heading right; he hops while running, leans into jumps and squashes on landing.
  function drawPlayer(time) {
    const player = state.player;
    const pose = player.napping ? "nap" : "awake";
    const image = sprites[pose];
    if (!image?.complete || !image.naturalWidth) return;

    const height = BRUNO_POSES[pose].height;
    const width = (image.naturalWidth / image.naturalHeight) * height;
    const running = player.grounded && player.vx !== 0;
    const step = Math.sin(state.walkClock * 14);
    const hop = running ? Math.abs(step) * 4 : 0;
    const lean = player.grounded ? (running ? step * 0.06 : 0) : Math.min(0.22, Math.max(-0.22, -player.vy / 2600));
    const breath = player.napping ? Math.sin(time / 450) * 0.03 : 0;

    ctx.save();
    ctx.translate(player.x + playerSize.width / 2, player.y + playerSize.height - hop); // pivot between his paws
    if (player.facing > 0) ctx.scale(-1, 1);
    ctx.rotate(lean);
    ctx.scale(1 + player.squash * 0.12, 1 - player.squash * 0.14 + breath);
    ctx.imageSmoothingQuality = "high";
    ctx.shadowColor = "rgba(8, 0, 10, 0.55)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.drawImage(image, -width / 2, -height, width, height);
    ctx.restore();
  }

  // Speech bubble above Bruno, kept inside the screen; it fades out in its last quarter second.
  function drawBubble() {
    const { bubble, player } = state;
    if (!bubble || !player) return;
    ctx.font = bubbleFont;
    const width = ctx.measureText(bubble.text).width + 22;
    const height = 24;
    const centre = player.x + playerSize.width / 2 - width / 2;
    const left = Math.min(Math.max(centre, window.scrollX + 8), window.scrollX + window.innerWidth - width - 8);
    const top = player.y - height - 6;

    ctx.globalAlpha = Math.min(1, bubble.life / 0.25);
    ctx.beginPath();
    ctx.roundRect(left, top, width, height, height / 2);
    ctx.fillStyle = "rgba(25, 0, 25, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(223, 182, 178, 0.45)";
    ctx.stroke();
    ctx.fillStyle = "#fbe4d8";
    ctx.textBaseline = "middle";
    ctx.fillText(bubble.text, left + 11, top + height / 2 + 1);
    ctx.globalAlpha = 1;
  }

  function drawBugs(time) {
    const frame = BUG_FRAMES[Math.floor(time / 180) % 2];
    state.bugs.forEach((bug) => {
      if (!bug.squashed) drawSprite(frame, BUG_COLORS, bug.x, bug.platform.top - bugSize.height, bug.direction < 0);
    });
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      ctx.globalAlpha = Math.max(0, particle.life / 0.7);
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });
    ctx.globalAlpha = 1;
  }

  function draw(time) {
    const ratio = window.devicePixelRatio || 1;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.translate(-window.scrollX, -window.scrollY); // world is the document; the canvas is the viewport
    drawBugs(time);
    drawParticles();
    if (state.player) drawPlayer(time);
    drawBubble();
  }

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    ui.canvas.width = Math.round(window.innerWidth * ratio);
    ui.canvas.height = Math.round(window.innerHeight * ratio);
    ui.canvas.style.width = `${window.innerWidth}px`;
    ui.canvas.style.height = `${window.innerHeight}px`;
  }

  // ---------- loop & flow ----------

  function loop(time) {
    if (!state.active) return;
    const delta = Math.min(0.033, (time - state.lastFrame) / 1000 || 0);
    state.lastFrame = time;

    if (state.phase === "playing") {
      updatePlayer(delta);
      updateBugs(delta);
      followPlayer();
    }
    updateParticles(delta);
    updateBubble(delta);
    draw(time);
    state.frameId = requestAnimationFrame(loop);
  }

  function startRound() {
    state.phase = "playing";
    state.squashed = 0;
    state.particles = [];
    state.bubble = null;
    state.input.left = false;
    state.input.right = false;
    refreshPlatforms();
    placeBugs();
    spawnPlayer();
    updateCounter();
    hideStatus();
  }

  function lose() {
    if (state.phase !== "playing") return;
    state.phase = "lost";
    showStatus("gameMode.fellTitle", "gameMode.fellSub", "gameMode.retry");
  }

  function win() {
    state.phase = "won";
    showStatus("gameMode.wonTitle", "gameMode.wonSub", "gameMode.again");
  }

  function activate() {
    state.active = true;
    document.body.classList.add("game-active");
    ui.toggle.setAttribute("aria-pressed", "true");
    ui.infoButton.hidden = false;
    loadSprites();
    buildOverlay();
    resizeCanvas();
    startRound();
    say(t("gameMode.hello"));
    setInfoOpen(true);
    state.lastFrame = performance.now();
    state.frameId = requestAnimationFrame(loop);
    state.refreshTimer = setInterval(refreshPlatforms, CONFIG.platformRefreshMs);
  }

  function deactivate() {
    state.active = false;
    cancelAnimationFrame(state.frameId);
    clearInterval(state.refreshTimer);
    document.body.classList.remove("game-active");
    ui.toggle.setAttribute("aria-pressed", "false");
    ui.infoButton.hidden = true;
    setInfoOpen(false);
    [ui.canvas, ui.counter, ui.status, ui.touch].forEach((node) => node?.remove());
    ui.canvas = ui.counter = ui.status = ui.touch = null;
    state.player = null;
    state.bubble = null;
    state.bugs = [];
  }

  // ---------- overlay UI ----------

  function buildOverlay() {
    ui.canvas = el("canvas", { className: "game-canvas", "aria-hidden": "true" });
    ctx = ui.canvas.getContext("2d");
    bubbleFont = `500 12px ${getComputedStyle(document.body).fontFamily}`;

    ui.counter = el("p", { className: "game-counter", role: "status", "aria-live": "polite" });
    ui.status = el("div", { className: "game-status", role: "alertdialog", hidden: "" });

    document.body.append(ui.canvas, ui.counter, ui.status);
    if (isTouchDevice) {
      ui.touch = buildTouchControls();
      document.body.append(ui.touch);
    }
  }

  // Hold-to-move buttons for phones and tablets.
  function buildTouchControls() {
    const hold = (button, key) => {
      const set = (value) => (event) => {
        event.preventDefault();
        state.input[key] = value;
        if (value) setInfoOpen(false);
      };
      button.addEventListener("pointerdown", set(true));
      ["pointerup", "pointercancel", "pointerleave"].forEach((type) => button.addEventListener(type, set(false)));
      return button;
    };
    const jumpButton = el("button", { type: "button", className: "game-touch-jump", text: t("gameMode.jumpButton") });
    jumpButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      jump();
      setInfoOpen(false);
    });
    return el("div", { className: "game-touch" }, [
      hold(el("button", { type: "button", "aria-label": t("gameMode.left"), text: "←" }), "left"),
      hold(el("button", { type: "button", "aria-label": t("gameMode.right"), text: "→" }), "right"),
      jumpButton
    ]);
  }

  function updateCounter() {
    if (!ui.counter) return;
    ui.counter.replaceChildren(
      el("span", { className: "game-counter-pip", "aria-hidden": "true" }),
      document.createTextNode(`${state.squashed} / ${state.bugs.length} ${t("gameMode.counter")}`)
    );
  }

  function showStatus(titleKey, subKey, buttonKey) {
    const button = el("button", { type: "button", className: "button button-primary", text: t(buttonKey) });
    button.addEventListener("click", startRound);
    ui.status.dataset.keys = [titleKey, subKey, buttonKey].join(",");
    ui.status.replaceChildren(
      el("p", { className: "game-status-title", text: t(titleKey) }),
      el("p", { className: "game-status-sub", text: t(subKey) }),
      button,
      el("p", { className: "game-status-hint", text: t("gameMode.retryHint") })
    );
    ui.status.hidden = false;
    button.focus({ preventScroll: true });
  }

  function hideStatus() {
    if (ui.status) ui.status.hidden = true;
  }

  function setInfoOpen(open) {
    ui.info.hidden = !open;
    ui.infoButton.setAttribute("aria-expanded", String(open));
  }

  // ---------- input ----------

  const MOVE_KEYS = { ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right" };
  const JUMP_KEYS = ["Space", "ArrowUp", "KeyW"];

  function isTypingTarget(target) {
    return target.closest("input, textarea, select, [contenteditable='true']");
  }

  document.addEventListener("keydown", (event) => {
    if (!state.active || isTypingTarget(event.target)) return;
    if (event.key === "Escape") {
      deactivate();
      return;
    }
    if (state.phase !== "playing") {
      if (event.code === "Space" || event.key === "Enter") {
        event.preventDefault();
        startRound();
      }
      return;
    }
    if (MOVE_KEYS[event.code]) {
      event.preventDefault();
      state.input[MOVE_KEYS[event.code]] = true;
      setInfoOpen(false);
    } else if (JUMP_KEYS.includes(event.code)) {
      event.preventDefault(); // stops Space and Up from scrolling the page
      if (!event.repeat) jump();
      setInfoOpen(false);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (MOVE_KEYS[event.code]) state.input[MOVE_KEYS[event.code]] = false;
  });

  ui.toggle.addEventListener("click", () => (state.active ? deactivate() : activate()));
  ui.infoButton.addEventListener("click", () => setInfoOpen(ui.info.hidden));

  window.addEventListener("resize", () => {
    if (!state.active) return;
    resizeCanvas();
    refreshPlatforms();
  });

  // Pauses input when the tab is hidden so Bruno doesn't keep running off-screen.
  document.addEventListener("visibilitychange", () => {
    state.input.left = false;
    state.input.right = false;
    state.lastFrame = performance.now();
  });

  document.addEventListener("portfolio:languagechange", () => {
    if (!state.active) return;
    updateCounter();
    if (ui.status && !ui.status.hidden) showStatus(...ui.status.dataset.keys.split(","));
    if (ui.touch) {
      ui.touch.remove();
      ui.touch = buildTouchControls();
      document.body.append(ui.touch);
    }
  });
})();
