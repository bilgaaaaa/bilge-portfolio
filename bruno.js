// Bruno, Bilge's dog, hops after the mouse (or to where you tap), sits when it stops and naps when you idle.
// Depends on content.js (translations, brunoLines) and script.js (t, el, localize, prefersReducedMotion).

(() => {
  const STORAGE_KEY = "portfolioBruno";
  const SIZE = { width: 72, height: 76 };
  const CONFIG = {
    maxSpeed: 520, // px/s
    acceleration: 7, // how quickly he catches up, per second
    arriveDistance: 6,
    sleepAfterMs: 9000,
    bubbleMs: 2200,
    chatChance: 0.3,
    trailOffsetX: 52,
    trailOffsetY: 14,
    edgeMargin: 36,
    bubbleEdge: 90
  };

  // Photo stickers of the real Bruno: sitting (awake, also used while he hops along) and lying down (napping).
  const POSES = [
    { mood: "awake", src: "assets/bruno/bruno-sit.webp" },
    { mood: "nap", src: "assets/bruno/bruno-nap.webp" }
  ];
  const AVATAR = "assets/bruno/bruno-avatar.webp";

  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const state = {
    enabled: readEnabled(),
    x: window.innerWidth - 90,
    y: window.innerHeight - 70,
    targetX: window.innerWidth - 90,
    targetY: window.innerHeight - 70,
    facing: -1,
    pointerSeen: false,
    lastMoveAt: performance.now(),
    mood: "sitting", // running | sitting | sleeping
    bubbleTimer: 0,
    frameId: 0,
    lastFrame: 0
  };

  const ui = {
    root: el("div", { className: "bruno", "aria-hidden": "true" }),
    bubble: el("span", { className: "bruno-bubble" }),
    toggle: el("button", { className: "bruno-toggle", type: "button", "aria-pressed": "true" })
  };

  // ---------- storage ----------

  function readEnabled() {
    try {
      return localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      return true;
    }
  }

  function saveEnabled(enabled) {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
    } catch {
      // Storage can be blocked (private mode); Bruno just forgets the choice.
    }
  }

  // ---------- speech bubbles ----------

  function say(text) {
    ui.bubble.textContent = text;
    ui.root.classList.add("has-bubble");
    clearTimeout(state.bubbleTimer);
    state.bubbleTimer = setTimeout(() => ui.root.classList.remove("has-bubble"), CONFIG.bubbleMs);
  }

  function sayRandomLine() {
    const lines = localize(brunoLines);
    say(lines[Math.floor(Math.random() * lines.length)]);
  }

  // ---------- movement ----------

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // He stops a little behind the pointer so he never covers what you are pointing at.
  function setTarget(pointerX, pointerY) {
    const behind = pointerX >= state.x ? -1 : 1;
    state.targetX = clamp(pointerX + behind * CONFIG.trailOffsetX, CONFIG.edgeMargin, window.innerWidth - CONFIG.edgeMargin);
    state.targetY = clamp(pointerY + CONFIG.trailOffsetY + SIZE.height / 2, SIZE.height + 8, window.innerHeight - 4);
    state.lastMoveAt = performance.now();
    if (!state.pointerSeen) {
      state.pointerSeen = true;
      say(t("bruno.hello"));
    }
  }

  function setMood(mood) {
    if (state.mood === mood) return;
    const wasRunning = state.mood === "running";
    state.mood = mood;
    ui.root.dataset.mood = mood;
    if (mood === "sitting" && wasRunning && Math.random() < CONFIG.chatChance) sayRandomLine();
    if (mood === "sleeping") say("z z z");
  }

  function render() {
    ui.root.style.transform = `translate3d(${state.x - SIZE.width / 2}px, ${state.y - SIZE.height}px, 0)`;
    // The photo faces left, so he is mirrored while heading right.
    ui.root.classList.toggle("is-flipped", state.facing > 0);
    // Keep the speech bubble on screen when Bruno is close to an edge.
    ui.root.classList.toggle("bubble-start", state.x < CONFIG.bubbleEdge);
    ui.root.classList.toggle("bubble-end", state.x > window.innerWidth - CONFIG.bubbleEdge);
  }

  function tick(now) {
    const dt = Math.min((now - state.lastFrame) / 1000, 0.05);
    state.lastFrame = now;

    const dx = state.targetX - state.x;
    const dy = state.targetY - state.y;
    const distance = Math.hypot(dx, dy);

    if (distance > CONFIG.arriveDistance) {
      const speed = Math.min(distance * CONFIG.acceleration, CONFIG.maxSpeed);
      state.x += (dx / distance) * speed * dt;
      state.y += (dy / distance) * speed * dt;
      if (Math.abs(dx) > 2) state.facing = dx > 0 ? 1 : -1;
      setMood("running");
    } else {
      setMood(now - state.lastMoveAt > CONFIG.sleepAfterMs ? "sleeping" : "sitting");
    }

    render();
    state.frameId = requestAnimationFrame(tick);
  }

  function start() {
    cancelAnimationFrame(state.frameId);
    state.lastFrame = performance.now();
    state.frameId = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(state.frameId);
  }

  // ---------- events ----------

  function handlePointerMove(event) {
    if (!state.enabled || event.pointerType !== "mouse") return;
    setTarget(event.clientX, event.clientY);
    if (state.mood === "sleeping") say(t("bruno.hello"));
  }

  // On touch screens he walks to wherever you tap.
  function handlePointerDown(event) {
    if (!state.enabled || event.pointerType === "mouse") return;
    setTarget(event.clientX, event.clientY);
  }

  function handleTreat() {
    if (!state.enabled) return;
    restartClass(ui.root, "is-happy");
    say(t("bruno.treat"));
    state.lastMoveAt = performance.now();
    if (state.mood === "sleeping") setMood("sitting");
  }

  function restartClass(node, className) {
    node.classList.remove(className);
    void node.offsetWidth;
    node.classList.add(className);
  }

  function applyEnabled() {
    ui.root.hidden = !state.enabled;
    ui.toggle.setAttribute("aria-pressed", String(state.enabled));
    ui.toggle.title = state.enabled ? t("bruno.toggleOn") : t("bruno.toggleOff");
    ui.toggle.setAttribute("aria-label", ui.toggle.title);
    if (state.enabled && !prefersReducedMotion) start();
    else stop();
  }

  function renderToggle() {
    ui.toggle.replaceChildren(
      el("img", { className: "bruno-toggle-avatar", src: AVATAR, alt: "", width: "26", height: "26" }),
      el("span", { text: t("bruno.toggle") }),
      el("span", { className: "bruno-toggle-dot", "aria-hidden": "true" })
    );
    applyEnabled();
  }

  // ---------- boot ----------

  ui.root.append(
    el("div", { className: "bruno-sprite" }, POSES.map((pose) => el("img", { className: `bruno-pose pose-${pose.mood}`, src: pose.src, alt: "", draggable: "false" }))),
    ui.bubble
  );
  ui.root.dataset.mood = state.mood;
  document.body.append(ui.root, ui.toggle);
  render();

  ui.toggle.addEventListener("click", () => {
    state.enabled = !state.enabled;
    saveEnabled(state.enabled);
    applyEnabled();
    if (state.enabled) say(t("bruno.hello"));
  });

  // Reduced motion: Bruno stays seated in his corner instead of following the pointer.
  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
  }
  window.addEventListener("resize", () => {
    state.targetX = clamp(state.targetX, CONFIG.edgeMargin, window.innerWidth - CONFIG.edgeMargin);
    state.targetY = clamp(state.targetY, SIZE.height + 8, window.innerHeight - 4);
  });
  document.addEventListener("bruno:treat", handleTreat);
  document.addEventListener("portfolio:languagechange", renderToggle);

  if (!isFinePointer && state.enabled) say(t("bruno.hello"));
  renderToggle();
})();
