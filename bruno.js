// Bruno, Bilge's dog, trots after the mouse (or to where you tap), sits when it stops and naps when you idle.
// Depends on content.js (translations, brunoLines) and script.js (t, el, icon, localize, prefersReducedMotion).

(() => {
  const STORAGE_KEY = "portfolioBruno";
  const SIZE = { width: 80, height: 60 };
  const CONFIG = {
    maxSpeed: 520, // px/s
    acceleration: 7, // how quickly he catches up, per second
    arriveDistance: 6,
    sleepAfterMs: 9000,
    bubbleMs: 2200,
    chatChance: 0.3,
    trailOffsetX: 54,
    trailOffsetY: 14,
    edgeMargin: 36,
    bubbleEdge: 90
  };

  // Fur colours sampled from Bruno's photos: caramel-grey curls, darker ears, black nose.
  const SPRITE = `
    <svg class="bruno-sprite" viewBox="0 0 64 48" aria-hidden="true">
      <g class="bruno-tail">
        <circle cx="11" cy="20" r="4.6" fill="#b49a86" />
        <circle cx="8.5" cy="17" r="3.4" fill="#c9b3a1" />
        <circle cx="13.5" cy="23.5" r="3.6" fill="#a58b78" />
      </g>
      <rect class="bruno-leg leg-back-far" x="16" y="29" width="5.5" height="13" rx="2.8" fill="#8c705e" />
      <rect class="bruno-leg leg-front-far" x="37" y="29" width="5.5" height="13" rx="2.8" fill="#8c705e" />
      <g class="bruno-body">
        <circle cx="20" cy="26" r="8.5" fill="#a58b78" />
        <circle cx="29" cy="24.5" r="9.5" fill="#a58b78" />
        <circle cx="37" cy="26" r="8.5" fill="#a58b78" />
        <circle cx="18" cy="22" r="3.2" fill="#c9b3a1" />
        <circle cx="26" cy="19" r="3.4" fill="#c9b3a1" />
        <circle cx="33" cy="20" r="3" fill="#c9b3a1" />
        <circle cx="23" cy="29" r="2.6" fill="#b49a86" />
        <circle cx="31" cy="30" r="2.8" fill="#b49a86" />
      </g>
      <rect class="bruno-leg leg-back-near" x="21" y="30" width="6" height="13" rx="3" fill="#a58b78" />
      <rect class="bruno-leg leg-front-near" x="41" y="30" width="6" height="13" rx="3" fill="#a58b78" />
      <g class="bruno-head">
        <path d="M37 25c3 2.4 7 2.6 10 .6" stroke="#c2566b" stroke-width="2.6" fill="none" stroke-linecap="round" />
        <circle cx="45" cy="27.2" r="1.5" fill="#f3c9cf" />
        <circle cx="46" cy="15.5" r="9.5" fill="#a58b78" />
        <circle cx="41.5" cy="8" r="4.6" fill="#c9b3a1" />
        <circle cx="47.5" cy="6.2" r="4.8" fill="#c9b3a1" />
        <circle cx="53" cy="9" r="4" fill="#b49a86" />
        <ellipse cx="39.5" cy="18.5" rx="4.6" ry="7.5" fill="#7d6454" />
        <ellipse cx="54.5" cy="19.5" rx="6.2" ry="5" fill="#c9b3a1" />
        <circle cx="59.6" cy="18" r="2.3" fill="#241418" />
        <g class="bruno-eye-open">
          <circle cx="50" cy="13.6" r="1.8" fill="#241418" />
          <circle cx="50.6" cy="13" r="0.55" fill="#fbe4d8" />
        </g>
        <path class="bruno-eye-closed" d="M48.3 14c1 .9 2.4.9 3.4 0" stroke="#241418" stroke-width="1.2" fill="none" stroke-linecap="round" />
        <ellipse class="bruno-tongue" cx="56.5" cy="24.5" rx="2" ry="2.8" fill="#e07a8a" />
      </g>
    </svg>`;

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
    ui.root.classList.toggle("is-left", state.facing < 0);
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
    ui.toggle.replaceChildren(icon("paw"), el("span", { text: t("bruno.toggle") }), el("span", { className: "bruno-toggle-dot", "aria-hidden": "true" }));
    applyEnabled();
  }

  // ---------- boot ----------

  ui.root.innerHTML = SPRITE;
  ui.root.append(ui.bubble);
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
