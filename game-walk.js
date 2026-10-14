// Bruno's walk: a coding puzzle in the Play section where visitors write a tiny Kotlin-style program that walks Bruno to his treats.
// Depends on content.js (translations) and script.js (t, el, icon, format). Keyboard shortcuts work while the game has focus.

(() => {
  const root = document.querySelector("[data-walk-game]");
  if (!root) return;

  const STEP_MS = 360;
  const MAX_WALK = 9; // walk(n) stops growing at 9
  const MAX_LINES = 14; // keeps the code panel short on levels without their own limit
  const REPEAT_RANGE = { min: 2, max: 5 };
  const BRUNO_SRC = "assets/bruno/bruno-sit.webp";
  const TURNS = ["up", "right", "down", "left"]; // clockwise, so a right turn is +1
  const MOVES = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
  const ANGLES = { up: -90, right: 0, down: 90, left: 180 };
  const COMMAND_KEYS = { ArrowUp: "walk", ArrowLeft: "left", ArrowRight: "right", KeyR: "repeat" };
  const COMMANDS = [
    { type: "walk", label: "walk()", key: "ArrowUp" },
    { type: "left", label: "turnLeft()", key: "ArrowLeft" },
    { type: "right", label: "turnRight()", key: "ArrowRight" },
    { type: "repeat", label: "repeat {", key: "R" },
    { type: "close", label: "}", key: "}" }
  ];

  // Park maps: "B" Bruno's start, "T" a treat, "~" a puddle, "." grass. `lines` caps the program, `loops` unlocks repeat().
  const LEVELS = [
    { map: ["......", "......", "B...T.", "......", "......", "......"], facing: "right" },
    { map: ["B.....", "......", "......", "...T..", "......", "......"], facing: "right" },
    { map: ["B..~..", "~~.~..", ".....~", ".~~~.~", "...~.T", "......"], facing: "right" },
    { map: ["B.~~~~", "~..~~~", "~~..~~", "~~~..~", "~~~~..", "~~~~~T"], facing: "right", lines: 5, loops: true },
    { map: ["B....T", ".~~~~.", ".~~~~.", ".~~~~.", ".~~~~.", "T....T"], facing: "right", lines: 4, loops: true }
  ];

  const state = {
    levelIndex: 0,
    solved: new Set(),
    program: [], // { type: "walk", count } | { type: "left" } | { type: "right" } | { type: "repeat", times, body }
    openLoop: null, // the repeat() block that new commands go into
    runId: 0, // bumped to cancel a running program
    running: false,
    bruno: null, // { x, y, facing, angle, flipped }
    treats: [], // { x, y, eaten, node }
    status: null, // { key, vars, tone }, kept so it can be translated again
    usingKeyboard: false // decides whether "Next level" takes focus after a win
  };
  const ui = {};

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const level = () => LEVELS[state.levelIndex];

  // ---------- program ----------

  // Each command is one line; a repeat() counts its header plus the lines inside it.
  function countLines(list = state.program) {
    return list.reduce((sum, command) => sum + 1 + (command.body ? countLines(command.body) : 0), 0);
  }

  function lineLimit() {
    return level().lines ?? MAX_LINES;
  }

  function addCommand(type) {
    if (state.running || (type === "repeat" && (!level().loops || state.openLoop))) return;
    const target = state.openLoop?.body ?? state.program;
    const last = target[target.length - 1];

    if (type === "walk" && last?.type === "walk" && last.count < MAX_WALK) {
      last.count += 1; // walk() twice reads as walk(2), still one line
    } else if (countLines() >= lineLimit()) {
      showStatus(level().lines ? "walkGame.limit" : "walkGame.full", { max: lineLimit() }, "error");
      return;
    } else if (type === "repeat") {
      state.openLoop = { type, times: REPEAT_RANGE.min, body: [] };
      target.push(state.openLoop);
    } else {
      target.push(type === "walk" ? { type, count: 1 } : { type });
    }
    edited();
  }

  // An empty repeat() would do nothing, so closing it removes it.
  function closeLoop() {
    if (!state.openLoop) return;
    if (!state.openLoop.body.length) state.program.pop();
    state.openLoop = null;
    edited();
  }

  // Takes back the last thing typed: one step of walk(n), a turn, or a whole empty repeat().
  function undo() {
    if (state.running) return;
    const target = state.openLoop?.body ?? state.program;
    const last = target[target.length - 1];

    if (!last && state.openLoop) {
      state.program.pop();
      state.openLoop = null;
    } else if (last?.type === "repeat") {
      state.openLoop = last; // step back inside the block before removing its lines
    } else if (last?.type === "walk" && last.count > 1) {
      last.count -= 1;
    } else if (last) {
      target.pop();
    } else {
      return;
    }
    edited();
  }

  function clearProgram() {
    if (state.running) return;
    state.program = [];
    state.openLoop = null;
    edited();
  }

  // Cycles repeat(2) → repeat(5) → repeat(2); keyboard users keep focus on the number.
  function cycleTimes(loop) {
    if (state.running) return;
    const hadFocus = document.activeElement?.classList.contains("walk-count");
    loop.times = loop.times >= REPEAT_RANGE.max ? REPEAT_RANGE.min : loop.times + 1;
    edited();
    if (hadFocus) ui.code.querySelector(`[data-loop="${state.program.indexOf(loop)}"]`)?.focus();
  }

  // Any edit stops a run, puts Bruno back on his start tile and clears the last result.
  function edited() {
    stopRun();
    resetBoard();
    state.status = null;
    renderCode();
    renderTools();
    renderStatus();
  }

  // Numbers the lines the way the code panel shows them, repeat() headers included.
  function numberLines(list, next = { value: 1 }) {
    list.forEach((command) => {
      command.line = next.value;
      next.value += 1;
      if (command.body) numberLines(command.body, next);
    });
  }

  // Unrolls repeat() and walk(n) into single steps that remember their line.
  function expand(list, steps = []) {
    list.forEach((command) => {
      if (command.type === "repeat") {
        for (let round = 0; round < command.times; round += 1) expand(command.body, steps);
        return;
      }
      for (let step = 0; step < (command.count ?? 1); step += 1) steps.push({ type: command.type, line: command.line });
    });
    return steps;
  }

  // ---------- running ----------

  async function run() {
    if (state.running) {
      edited(); // the Run button doubles as Stop
      return;
    }
    closeLoop();
    numberLines(state.program);
    const steps = expand(state.program);
    if (!steps.length) {
      showStatus("walkGame.empty", {}, "error");
      return;
    }

    resetBoard();
    state.status = null;
    renderStatus();
    state.running = true;
    const runId = ++state.runId;
    renderTools();

    let moves = 0;
    for (const step of steps) {
      markLine(step.line, "is-running");
      const outcome = applyStep(step);
      if (step.type === "walk") moves += 1;
      await wait(STEP_MS);
      if (runId !== state.runId) return; // edited or stopped meanwhile
      if (outcome !== "ok") return finish(outcome, step.line);
      if (state.treats.every((treat) => treat.eaten)) return finish("passed", step.line, moves);
    }
    finish("short");
  }

  function stopRun() {
    state.runId += 1;
    state.running = false;
  }

  // Moves or turns Bruno by one step; returns "ok", "puddle" or "fence".
  function applyStep(step) {
    const bruno = state.bruno;
    if (step.type !== "walk") {
      const turn = step.type === "right" ? 1 : -1;
      bruno.facing = TURNS[(TURNS.indexOf(bruno.facing) + turn + TURNS.length) % TURNS.length];
      bruno.angle += turn * 90;
      placeBruno();
      return "ok";
    }

    const [dx, dy] = MOVES[bruno.facing];
    const cell = level().map[bruno.y + dy]?.[bruno.x + dx];
    if (cell === undefined) {
      ui.bruno.animate([{ translate: "0 0" }, { translate: `${dx * 10}px ${dy * 10}px` }, { translate: "0 0" }], { duration: 280 });
      return "fence";
    }

    leavePaw(bruno.x, bruno.y, bruno.facing);
    bruno.x += dx;
    bruno.y += dy;
    placeBruno();
    if (cell === "~") {
      ui.tiles[bruno.y][bruno.x].classList.add("is-splashed");
      return "puddle";
    }
    eatTreat(bruno.x, bruno.y);
    return "ok";
  }

  function finish(result, line, moves) {
    state.running = false;
    renderTools();

    if (result === "passed") {
      markLine(null, "is-passed");
      state.solved.add(state.levelIndex);
      renderLevels();
      hop();
      const isLast = state.levelIndex === LEVELS.length - 1;
      showStatus(isLast ? "walkGame.done" : "walkGame.passed", { steps: moves }, "success");
      if (state.usingKeyboard && root.contains(document.activeElement)) ui.status.querySelector("button")?.focus({ preventScroll: true });
      return;
    }
    if (result === "short") {
      const waiting = state.treats.filter((treat) => !treat.eaten).length;
      showStatus(waiting === 1 ? "walkGame.shortOne" : "walkGame.shortMany", { n: waiting }, "error");
      return;
    }
    markLine(line, "is-error");
    showStatus(`walkGame.${result}`, { line }, "error");
  }

  function goToLevel(index) {
    const hadFocus = root.contains(document.activeElement);
    stopRun();
    state.levelIndex = index;
    state.program = [];
    state.openLoop = null;
    renderBoard();
    renderLevels();
    renderTexts();
    edited();
    if (hadFocus) root.focus({ preventScroll: true });
  }

  // ---------- board ----------

  function place(node, x, y) {
    node.style.setProperty("--x", x);
    node.style.setProperty("--y", y);
  }

  function findStart() {
    const y = level().map.findIndex((row) => row.includes("B"));
    return { x: level().map[y].indexOf("B"), y };
  }

  function renderBoard() {
    const { map } = level();
    ui.tiles = map.map((row) => [...row].map((cell) => el("span", { className: cell === "~" ? "walk-tile is-puddle" : "walk-tile" })));
    state.treats = [];
    map.forEach((row, y) =>
      [...row].forEach((cell, x) => {
        if (cell !== "T") return;
        const node = el("span", { className: "walk-treat" }, [icon("bone")]);
        place(node, x, y);
        state.treats.push({ x, y, eaten: false, node });
      })
    );
    ui.bruno = el("span", { className: "walk-bruno" }, [
      el("img", { src: BRUNO_SRC, alt: "", draggable: "false" }),
      el("span", { className: "walk-heading" })
    ]);
    ui.board.style.setProperty("--columns", map[0].length);
    ui.board.replaceChildren(...ui.tiles.flat(), ...state.treats.map((treat) => treat.node), ui.bruno);
    resetBoard();
  }

  // Bruno back on his start tile, treats back in the park, paw prints and line marks gone.
  function resetBoard() {
    const { facing } = level();
    state.bruno = { ...findStart(), facing, angle: ANGLES[facing], flipped: facing === "right" };
    state.treats.forEach((treat) => {
      treat.eaten = false;
      treat.node.classList.remove("is-eaten");
    });
    ui.board.querySelectorAll(".walk-paw, .walk-heart").forEach((node) => node.remove());
    ui.board.querySelectorAll(".is-splashed").forEach((node) => node.classList.remove("is-splashed"));
    ui.bruno.classList.add("is-resetting"); // jumps back instead of sliding across the park
    placeBruno();
    void ui.bruno.offsetWidth;
    ui.bruno.classList.remove("is-resetting");
    markLine(-1);
  }

  // The sticker faces left, so Bruno is mirrored while heading right; the arrow at his paws shows where he faces.
  function placeBruno() {
    const bruno = state.bruno;
    if (bruno.facing === "left" || bruno.facing === "right") bruno.flipped = bruno.facing === "right";
    place(ui.bruno, bruno.x, bruno.y);
    ui.bruno.style.setProperty("--angle", `${bruno.angle}deg`);
    ui.bruno.classList.toggle("is-flipped", bruno.flipped);
  }

  // A happy little jump: when a level passes and when the mouse arrives on the park.
  function hop() {
    ui.bruno.animate([{ translate: "0 0" }, { translate: "0 -14px" }, { translate: "0 0" }, { translate: "0 -8px" }, { translate: "0 0" }], { duration: 700 });
  }

  // A paw print on the tile Bruno just left, toes pointing the way he went.
  function leavePaw(x, y, facing) {
    const paw = icon("paw", "walk-paw");
    paw.style.setProperty("--angle", `${ANGLES[facing] + 90}deg`);
    ui.tiles[y][x].append(paw);
  }

  function eatTreat(x, y) {
    const treat = state.treats.find((item) => !item.eaten && item.x === x && item.y === y);
    if (!treat) return;
    treat.eaten = true;
    treat.node.classList.add("is-eaten");
    const heart = icon("heart", "walk-heart");
    place(heart, x, y);
    heart.addEventListener("animationend", () => heart.remove());
    ui.board.append(heart);
  }

  // ---------- code panel ----------

  function token(className, text) {
    return el("span", { className, text });
  }

  function codeRow(line, depth, children) {
    return el("p", { className: "walk-code-row", "data-line": line ?? undefined, style: `--depth: ${depth}` }, [
      el("span", { className: "walk-line-no", text: line ? String(line) : "", "aria-hidden": "true" }),
      el("span", { className: "walk-line-code" }, children)
    ]);
  }

  function caretRow(depth) {
    return codeRow(null, depth, [el("span", { className: "walk-caret", "aria-hidden": "true" })]);
  }

  function commandRows(command, depth) {
    if (command.type === "walk") {
      return [codeRow(command.line, depth, [token("tok-fn", "walk"), "(", command.count > 1 && token("tok-num", String(command.count)), ")"])];
    }
    if (command.type !== "repeat") {
      return [codeRow(command.line, depth, [token("tok-fn", command.type === "left" ? "turnLeft" : "turnRight"), "()"])];
    }

    const count = el("button", {
      type: "button",
      className: "walk-count",
      text: String(command.times),
      "data-loop": String(state.program.indexOf(command)),
      "aria-label": format(t("walkGame.repeatTimes"), { n: command.times })
    });
    count.addEventListener("click", () => cycleTimes(command));
    const rows = [codeRow(command.line, depth, [token("tok-fn", "repeat"), "(", count, ") {"])];
    command.body.forEach((inner) => rows.push(...commandRows(inner, depth + 1)));
    if (command === state.openLoop) rows.push(caretRow(depth + 1));
    rows.push(codeRow(null, depth, ["}"]));
    return rows;
  }

  function renderCode() {
    numberLines(state.program);
    const rows = [codeRow(null, 0, [token("tok-kw", "fun "), token("tok-fn", "walkBruno"), "() {"])];
    if (!state.program.length) rows.push(codeRow(null, 1, [token("tok-comment", t("walkGame.placeholder"))]));
    state.program.forEach((command) => rows.push(...commandRows(command, 1)));
    if (state.program.length && !state.openLoop) rows.push(caretRow(1));
    rows.push(codeRow(null, 0, ["}"]));
    ui.code.replaceChildren(...rows);

    const limit = level().lines;
    ui.lines.hidden = !limit;
    ui.lines.textContent = limit ? format(t("walkGame.lines"), { n: countLines(), max: limit }) : "";
    ui.lines.classList.toggle("is-full", Boolean(limit) && countLines() >= limit);
  }

  // Highlights one line (or every line when `line` is null) and keeps it in view; -1 just clears.
  function markLine(line, className) {
    ui.code.querySelectorAll(".walk-code-row").forEach((row) => {
      row.classList.remove("is-running", "is-error", "is-passed");
      if (!row.dataset.line || line === -1) return;
      if (line === null || Number(row.dataset.line) === line) row.classList.add(className);
    });
    const row = line > 0 && ui.code.querySelector(`[data-line="${line}"]`);
    if (row && (row.offsetTop < ui.code.scrollTop || row.offsetTop > ui.code.scrollTop + ui.code.clientHeight - row.offsetHeight)) {
      ui.code.scrollTop = row.offsetTop - ui.code.clientHeight / 2;
    }
  }

  // ---------- texts & controls ----------

  function showStatus(key, vars, tone) {
    state.status = { key, vars, tone };
    renderStatus();
  }

  function renderStatus() {
    const status = state.status;
    ui.status.className = status ? `walk-status is-${status.tone}` : "walk-status";
    if (!status) {
      ui.status.replaceChildren();
      return;
    }
    const children = [el("span", { text: format(t(status.key), status.vars) })];
    if (status.tone === "success") {
      const isLast = state.levelIndex === LEVELS.length - 1;
      const next = el("button", { type: "button", className: "button button-primary button-small", text: t(isLast ? "walkGame.again" : "walkGame.next") });
      next.addEventListener("click", () => goToLevel(isLast ? 0 : state.levelIndex + 1));
      children.push(next);
    }
    ui.status.replaceChildren(...children);
  }

  function renderLevels() {
    ui.levels.replaceChildren(
      ...LEVELS.map((_, index) => {
        const button = el("button", {
          type: "button",
          className: state.solved.has(index) ? "walk-level is-solved" : "walk-level",
          text: String(index + 1),
          "aria-label": format(t("walkGame.levelButton"), { n: index + 1 }),
          "aria-current": index === state.levelIndex ? "step" : undefined
        });
        button.addEventListener("click", () => goToLevel(index));
        return button;
      })
    );
  }

  function renderTexts() {
    root.setAttribute("aria-label", t("walkGame.name"));
    ui.eyebrow.textContent = format(t("walkGame.level"), { n: state.levelIndex + 1, total: LEVELS.length });
    ui.hint.textContent = t(`walkGame.hint${state.levelIndex + 1}`);
    ui.keys.textContent = t("walkGame.keys");
    ui.board.setAttribute("aria-label", t("walkGame.board"));
    ui.code.setAttribute("aria-label", t("walkGame.code"));
    ui.undo.textContent = t("walkGame.undo");
    ui.clear.textContent = t("walkGame.clear");
    ui.commands.find(({ type }) => type === "close").button.setAttribute("aria-label", t("walkGame.closeLoop"));
  }

  function renderTools() {
    root.classList.toggle("is-running", state.running);
    ui.commands.forEach(({ type, button }) => {
      button.hidden = (type === "repeat" && !level().loops) || (type === "close" && !state.openLoop);
      button.disabled = state.running || (type === "repeat" && Boolean(state.openLoop));
    });
    ui.undo.disabled = state.running || !state.program.length;
    ui.clear.disabled = state.running || !state.program.length;
    ui.run.textContent = t(state.running ? "walkGame.stop" : "walkGame.run");
  }

  // ---------- mount ----------

  function build() {
    ui.eyebrow = el("p", { className: "walk-eyebrow" });
    ui.levels = el("div", { className: "walk-levels" });
    ui.hint = el("p", { className: "walk-hint" });
    ui.board = el("div", { className: "walk-board", role: "img" });
    ui.code = el("div", { className: "walk-code" });
    ui.lines = el("p", { className: "walk-lines" });
    ui.commands = COMMANDS.map(({ type, label, key }) => {
      const button = el("button", { type: "button", className: "walk-command", text: label, "aria-keyshortcuts": key });
      button.addEventListener("click", () => (type === "close" ? closeLoop() : addCommand(type)));
      return { type, button };
    });
    ui.undo = el("button", { type: "button", className: "button button-ghost button-small" });
    ui.clear = el("button", { type: "button", className: "button button-ghost button-small" });
    ui.run = el("button", { type: "button", className: "button button-primary button-small", "aria-keyshortcuts": "Enter" });
    ui.status = el("p", { className: "walk-status", role: "status", "aria-live": "polite" });
    ui.keys = el("p", { className: "walk-keys", id: "walkGameKeys" });

    root.tabIndex = 0;
    root.setAttribute("aria-describedby", "walkGameKeys");
    root.replaceChildren(
      el("div", { className: "walk-head" }, [ui.eyebrow, ui.levels]),
      ui.hint,
      el("div", { className: "walk-body" }, [ui.board, el("div", { className: "walk-code-panel" }, [ui.code, ui.lines])]),
      el("div", { className: "walk-tools" }, [
        ...ui.commands.map(({ button }) => button),
        el("div", { className: "walk-actions" }, [ui.undo, ui.clear, ui.run])
      ]),
      ui.status,
      ui.keys
    );

    ui.undo.addEventListener("click", undo);
    ui.clear.addEventListener("click", clearProgram);
    ui.run.addEventListener("click", run);
    ui.board.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && !state.running) hop();
    });
  }

  // Mouse clicks keep focus on the game itself, so the keys below keep working and Enter keeps meaning Run.
  root.addEventListener("mousedown", (event) => {
    state.usingKeyboard = false;
    if (event.target.closest("button")) event.preventDefault();
    root.focus({ preventScroll: true });
  });

  // ↑ walk, ← → turn, R repeat, } close the block, Backspace undo, Enter run.
  root.addEventListener("keydown", (event) => {
    state.usingKeyboard = true;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (COMMAND_KEYS[event.code]) {
      event.preventDefault();
      addCommand(COMMAND_KEYS[event.code]);
    } else if (event.key === "}" || event.key === "]") {
      event.preventDefault();
      closeLoop();
    } else if (event.key === "Backspace") {
      event.preventDefault();
      undo();
    } else if (event.key === "Enter" && !event.target.closest("button")) {
      event.preventDefault();
      run();
    }
  });

  document.addEventListener("portfolio:languagechange", () => {
    renderTexts();
    renderLevels();
    renderCode();
    renderTools();
    renderStatus();
  });

  build();
  goToLevel(0);
})();
