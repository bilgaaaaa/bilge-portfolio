// Game mode: the button opens a menu of Bruno's games; a game runs until its close button or Escape.
// Depends on game-walk.js (brunoWalkGame) and game-run.js (brunoRunGame), which both expose start(onExit) and stop().

(() => {
  const root = document.querySelector("[data-game-mode]");
  if (!root) return;

  const GAMES = { walk: brunoWalkGame, run: brunoRunGame };
  const ui = {
    toggle: root.querySelector("[data-game-toggle]"),
    menu: root.querySelector("[data-game-menu]")
  };
  let current = null;

  function setMenuOpen(open) {
    ui.menu.hidden = !open;
    ui.toggle.setAttribute("aria-expanded", String(open));
  }

  function startGame(id) {
    setMenuOpen(false);
    current = GAMES[id];
    document.body.classList.add("game-active");
    current.start(endGame);
  }

  // Called by a game's own close button, and by Escape; safe to call twice.
  function endGame() {
    if (!current) return;
    const game = current;
    current = null;
    game.stop();
    document.body.classList.remove("game-active");
    ui.toggle.focus({ preventScroll: true });
  }

  ui.toggle.addEventListener("click", () => setMenuOpen(ui.menu.hidden));
  root.querySelectorAll("[data-game-start]").forEach((button) => {
    button.addEventListener("click", () => startGame(button.dataset.gameStart));
  });

  // A click anywhere else closes the menu.
  document.addEventListener("click", (event) => {
    if (!ui.menu.hidden && !root.contains(event.target)) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (current) endGame();
    else if (!ui.menu.hidden) {
      setMenuOpen(false);
      ui.toggle.focus({ preventScroll: true });
    }
  });
})();
