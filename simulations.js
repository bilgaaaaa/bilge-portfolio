// Interactive simulations: hero feed and portrait releases, live retail-stack demo, project card demos, skill map,
// job demos, process run, beyond-code photos and demos, and the PaceTasks phone. Re-mounts on every language change.

(() => {
  // Reduced motion keeps every demo working but makes the steps near-instant.
  const SPEED = prefersReducedMotion ? 0.05 : 1;
  const LAB_STEP_MS = 520;
  const LAB_LOG_LIMIT = 60;
  const TICKER_MS = 2800;
  const CARD_HOVER_MS = 1400;
  const PORTRAIT_HOVER_GAP_MS = 900;

  // Bumped on every mount so async demo loops from an older render stop quietly.
  let mountGeneration = 0;
  let tickerTimer = null;
  let phoneTimer = null;
  const hoverTimers = new Set();
  const photoStacks = new WeakMap();

  // Touch screens can't hover, so their hover demos play when the element crosses the middle of the screen.
  const canHover = window.matchMedia("(hover: hover)").matches;
  const viewHandlers = new WeakMap();
  const viewObserver =
    !canHover && "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              const handlers = viewHandlers.get(entry.target);
              const handler = entry.isIntersecting ? handlers?.enter : handlers?.leave;
              handler?.();
            }),
          { rootMargin: "-35% 0px -35% 0px" }
        )
      : null;

  // ---------- helpers ----------

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms * SPEED));

  function locale() {
    return currentLanguage === "it" ? "it-IT" : "en-IE";
  }

  function money(value) {
    return new Intl.NumberFormat(locale(), { style: "currency", currency: "EUR" }).format(value);
  }

  function number(value) {
    return new Intl.NumberFormat(locale()).format(value);
  }

  // Re-triggers a one-shot CSS animation by removing and re-adding its class.
  function restartClass(node, className) {
    if (!node) return;
    node.classList.remove(className);
    void node.offsetWidth;
    node.classList.add(className);
  }

  function button(label, options = {}, children = []) {
    return el("button", { type: "button", className: "button button-ghost button-small", ...options }, [...children, document.createTextNode(label)]);
  }

  function demoHeader(titleKey, bodyKey) {
    return el("div", { className: "demo-head" }, [
      el("p", { className: "demo-title" }, [
        el("span", { className: "demo-badge", title: t("demo.badge"), "aria-hidden": "true" }, [icon("sparkle")]),
        document.createTextNode(t(titleKey))
      ]),
      bodyKey && el("p", { className: "demo-body", text: t(bodyKey) })
    ]);
  }

  const isStale = (generation) => generation !== mountGeneration;

  // Calls `enter` / `leave` as `target` scrolls in and out of view on touch screens; no-op where hover works.
  function onView(target, enter, leave) {
    if (!viewObserver || !target) return;
    viewHandlers.set(target, { enter, leave });
    viewObserver.observe(target);
  }

  // Runs a demo action when a mouse pointer moves onto `target`, or when it scrolls into view on touch screens.
  function playOnHover(target, action) {
    const play = () => !action.disabled && action.click();
    target.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && play());
    onView(target, play);
  }

  // Repeats `step` while the mouse is over `hoverTarget`; the first step runs immediately.
  function loopWhileHovered(hoverTarget, step, intervalMs) {
    let timer = null;
    const start = () => {
      if (timer) return;
      step();
      timer = setInterval(step, intervalMs);
      hoverTimers.add(timer);
    };
    const stop = () => {
      clearInterval(timer);
      hoverTimers.delete(timer);
      timer = null;
    };
    hoverTarget.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && start());
    hoverTarget.addEventListener("pointerleave", stop);
    onView(hoverTarget, start, stop);
    return { start, stop };
  }

  // Hover triggers on static containers are attached once and always run the latest mounted action.
  function onHoverOnce(target, key, run) {
    if (!target) return;
    onView(target, run);
    if (target.dataset[key]) return;
    target.dataset[key] = "true";
    target.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && run());
  }

  // Makes a focusable element run `action` on Enter or Space, like a button.
  function activateOnKeys(target, action) {
    target.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      action();
    });
  }

  // ---------- hero: behind-the-scenes feed ----------

  function mountHeroTicker() {
    const line = document.querySelector("[data-hero-ticker]");
    clearInterval(tickerTimer);
    if (!line) return;

    let index = 0;
    const show = () => {
      line.textContent = localize(heroTicker)[index % localize(heroTicker).length];
      restartClass(line, "is-entering");
      index += 1;
    };
    show();
    tickerTimer = setInterval(show, TICKER_MS);
  }

  // ---------- hero: portrait "releases" ----------

  const portrait = { index: 0, lastHoverAt: 0 };

  // Other looks load lazily: the current one and the next are fetched, so a swap never shows an empty frame.
  function ensureLookLoaded(image, look) {
    if (!image.getAttribute("src")) image.src = look.src;
  }

  function mountPortraitReleases() {
    const stack = document.querySelector("[data-portrait-stack]");
    const card = document.querySelector("[data-release-card]");
    if (!stack || !card) return;

    if (stack.children.length === 1) {
      portraitLooks.slice(1).forEach(() => stack.append(el("img", { className: "portrait", width: "720", height: "886", alt: "", decoding: "async" })));
    }
    const images = [...stack.querySelectorAll("img")];

    const show = (index) => {
      portrait.index = index;
      ensureLookLoaded(images[index], portraitLooks[index]);
      const nextIndex = (index + 1) % portraitLooks.length;
      ensureLookLoaded(images[nextIndex], portraitLooks[nextIndex]);
      images.forEach((image, imageIndex) => {
        const isCurrent = imageIndex === index;
        image.classList.toggle("is-current", isCurrent);
        image.alt = isCurrent ? localize(portraitLooks[imageIndex].alt) : "";
      });
      card.querySelector("[data-release-version]").textContent = portraitLooks[index].version;
      card.querySelector("[data-release-note]").textContent = localize(portraitLooks[index].note);
    };
    const next = () => show((portrait.index + 1) % portraitLooks.length);

    // Listeners are attached once: the hero markup is static and survives language changes.
    if (!stack.dataset.ready) {
      stack.dataset.ready = "true";
      stack.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "mouse" || performance.now() - portrait.lastHoverAt < PORTRAIT_HOVER_GAP_MS) return;
        portrait.lastHoverAt = performance.now();
        next();
      });
      stack.addEventListener("click", (event) => event.pointerType !== "mouse" && next());
      card.querySelector("[data-release-next]").addEventListener("click", next);
    }
    show(portrait.index);
  }

  // ---------- live demo: scan → RabbitMQ → .NET → SQL Server → fiscal printer ----------

  const LAB_NODES = [
    { id: "handheld", icon: "phone", title: "lab.nodeHandheld", sub: "lab.nodeHandheldSub", stat: "lab.statHandheld" },
    { id: "queue", icon: "flow", title: "lab.nodeQueue", sub: "lab.nodeQueueSub", stat: "lab.statQueue" },
    { id: "service", icon: "server", title: "lab.nodeService", sub: "lab.nodeServiceSub", stat: "lab.statService" },
    { id: "database", icon: "database", title: "lab.nodeDatabase", sub: "lab.nodeDatabaseSub", stat: "lab.statDatabase" },
    { id: "printer", icon: "printer", title: "lab.nodePrinter", sub: "lab.nodePrinterSub", stat: "lab.statPrinter" }
  ];

  // Lab state lives outside the DOM so a language switch re-renders without losing the session.
  const lab = {
    cart: [],
    saleNumber: 1042,
    online: true,
    outbox: [],
    queued: 0,
    processed: new Set(),
    duplicates: 0,
    documents: 0,
    receipts: 0,
    lastSale: null,
    receipt: null,
    log: [],
    chain: Promise.resolve(),
    autoPlaying: false,
    scenarioIndex: 0
  };

  // Scenarios played when the mouse arrives on the live demo: a normal sale, an offline sale, then a retried sale.
  const LAB_SCENARIOS = [
    async () => {
      if (!lab.online) labActions.network();
      for (let item = 0; item < 3; item += 1) {
        labActions.scan();
        await wait(420);
      }
      labActions.checkout();
    },
    async () => {
      if (lab.online) labActions.network();
      await wait(500);
      labActions.scan();
      await wait(420);
      labActions.scan();
      await wait(420);
      labActions.checkout();
      await wait(1400);
      labActions.network();
    },
    async () => {
      if (!lab.online) labActions.network();
      labActions.scan();
      await wait(420);
      labActions.checkout();
      await lab.chain;
      await wait(500);
      labActions.retry();
    }
  ];

  async function playLabScenario() {
    if (lab.autoPlaying) return;
    lab.autoPlaying = true;
    try {
      await LAB_SCENARIOS[lab.scenarioIndex % LAB_SCENARIOS.length]();
      lab.scenarioIndex += 1;
      await lab.chain;
    } catch (error) {
      console.error("[lab] scenario failed", error);
    } finally {
      lab.autoPlaying = false;
    }
  }

  function labStatValue(id) {
    return { handheld: lab.outbox.length, queue: lab.queued, service: lab.duplicates, database: lab.documents, printer: lab.receipts }[id];
  }

  // Log entries keep their template key and raw values, so they re-translate on a language switch.
  function addLog(source, key, vars = {}) {
    lab.log.push({ time: new Date(), source, key, vars });
    if (lab.log.length > LAB_LOG_LIMIT) lab.log.shift();
    renderLabLog();
  }

  function resolveLogVars(vars) {
    return Object.fromEntries(
      Object.entries(vars).map(([key, value]) => {
        if (key === "price" || key === "total") return [key, money(value)];
        return [key, localize(value)];
      })
    );
  }

  function renderLab() {
    const root = document.querySelector("[data-lab]");
    if (!root) return;
    onHoverOnce(root, "hoverRun", playLabScenario);

    const pipeline = [];
    LAB_NODES.forEach((node, index) => {
      if (index > 0) pipeline.push(el("div", { className: "lab-wire", "data-lab-wire": index - 1, "aria-hidden": "true" }, [el("span", { className: "lab-packet" })]));
      pipeline.push(
        el("div", { className: "lab-node", "data-lab-node": node.id }, [
          el("span", { className: "icon-ring" }, [icon(node.icon)]),
          el("p", { className: "lab-node-title", text: t(node.title) }),
          el("p", { className: "lab-node-sub", text: t(node.sub) }),
          el("p", { className: "lab-node-stat", "data-lab-stat": node.id })
        ])
      );
    });

    root.replaceChildren(
      el("div", { className: "lab-pipeline" }, pipeline),
      el("div", { className: "lab-panels" }, [
        el("div", { className: "lab-panel lab-device" }, [
          el("p", { className: "card-label", "data-lab-sale": "" }),
          el("ul", { className: "lab-cart", "data-lab-cart": "" }),
          el("p", { className: "lab-total", "data-lab-total": "" }),
          el("div", { className: "lab-actions" }, [
            button(t("lab.scan"), { className: "button button-primary button-small", "data-lab-action": "scan" }),
            button(t("lab.checkout"), { "data-lab-action": "checkout" }),
            button("", { className: "button button-ghost button-small lab-network", "data-lab-action": "network", "aria-pressed": "true" }),
            button(t("lab.retry"), { "data-lab-action": "retry" })
          ])
        ]),
        el("div", { className: "lab-panel" }, [
          el("p", { className: "card-label", text: t("lab.receiptTitle") }),
          el("div", { className: "lab-paper", "data-lab-receipt": "" })
        ]),
        el("div", { className: "lab-panel" }, [
          el("p", { className: "card-label", text: t("lab.logTitle") }),
          el("ol", { className: "lab-log", role: "log", "aria-live": "off", "data-lab-log": "" })
        ])
      ]),
      el("p", { className: "lab-note", text: t("lab.note") })
    );

    root.querySelectorAll("[data-lab-action]").forEach((control) => {
      control.addEventListener("click", () => labActions[control.dataset.labAction]());
    });

    renderLabStats();
    renderLabCart();
    renderLabReceipt();
    renderLabLog();
  }

  function renderLabStats() {
    LAB_NODES.forEach((node) => {
      const stat = document.querySelector(`[data-lab-stat="${node.id}"]`);
      if (stat) stat.textContent = format(t(node.stat), { n: labStatValue(node.id) });
    });

    const handheld = document.querySelector('[data-lab-node="handheld"]');
    handheld?.classList.toggle("is-offline", !lab.online);

    const network = document.querySelector('[data-lab-action="network"]');
    if (network) {
      network.textContent = `${t("lab.networkLabel")}: ${lab.online ? t("lab.online") : t("lab.offline")}`;
      network.setAttribute("aria-pressed", String(lab.online));
    }
  }

  function renderLabCart() {
    const sale = document.querySelector("[data-lab-sale]");
    if (sale) sale.textContent = format(t("lab.handheldTitle"), { id: `#${lab.saleNumber}` });

    const total = lab.cart.reduce((sum, product) => sum + product.price, 0);
    fill(
      "[data-lab-cart]",
      lab.cart.length
        ? lab.cart.map((product) => el("li", {}, [el("span", { text: localize(product.name) }), el("span", { text: money(product.price) })]))
        : [el("li", { className: "lab-empty", text: t("lab.cartEmpty") })]
    );
    const cart = document.querySelector("[data-lab-cart]");
    if (cart) cart.scrollTop = cart.scrollHeight;

    const totalLine = document.querySelector("[data-lab-total]");
    if (totalLine) totalLine.replaceChildren(el("span", { text: t("lab.total") }), el("strong", { text: money(total) }));
  }

  // The receipt prints row by row: `printed` says how many rows the printer has output so far.
  function receiptRows(sale) {
    const time = sale.time.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" });
    return [
      el("p", { className: "receipt-shop", text: t("lab.receiptShop") }),
      el("p", { className: "receipt-meta", text: `${sale.id} · ${time}` }),
      ...sale.lines.map((product) => el("p", { className: "receipt-line" }, [el("span", { text: localize(product.name) }), el("span", { text: money(product.price) })])),
      el("p", { className: "receipt-line receipt-total" }, [el("span", { text: t("lab.total").toUpperCase() }), el("span", { text: money(sale.total) })]),
      el("p", { className: "receipt-barcode", "aria-hidden": "true" }),
      el("p", { className: "receipt-meta", text: t("lab.receiptFooter") })
    ];
  }

  function renderLabReceipt() {
    const paper = document.querySelector("[data-lab-receipt]");
    if (!paper) return;
    if (!lab.receipt) {
      paper.replaceChildren(el("p", { className: "lab-empty", text: t("lab.receiptEmpty") }));
      return;
    }
    paper.replaceChildren(...receiptRows(lab.receipt.sale).slice(0, lab.receipt.printed));
  }

  function renderLabLog() {
    const list = document.querySelector("[data-lab-log]");
    if (!list) return;
    list.replaceChildren(
      ...(lab.log.length
        ? lab.log.map((entry) =>
            el("li", {}, [
              el("time", { text: entry.time.toLocaleTimeString(locale(), { hour12: false }) }),
              el("span", { className: `lab-log-source source-${entry.source}`, text: entry.source }),
              el("span", { text: format(t(entry.key), resolveLogVars(entry.vars)) })
            ])
          )
        : [el("li", { className: "lab-empty", text: t("lab.logEmpty") })])
    );
    list.scrollTop = list.scrollHeight;
  }

  // Moves a packet along the wire, then lights up the node it reaches.
  async function flowTo(wireIndex, nodeId) {
    restartClass(document.querySelector(`[data-lab-wire="${wireIndex}"]`), "is-flowing");
    await wait(LAB_STEP_MS);
    restartClass(document.querySelector(`[data-lab-node="${nodeId}"]`), "is-active");
  }

  function publishSale(sale) {
    if (!lab.online) {
      lab.outbox.push(sale);
      addLog("room", "lab.log.offline", { id: sale.id, n: lab.outbox.length });
      renderLabStats();
      return;
    }

    lab.queued += 1;
    addLog("rabbitmq", "lab.log.publish", { id: sale.id });
    renderLabStats();
    flowTo(0, "queue");
    lab.chain = lab.chain.then(() => consumeSale(sale)).catch((error) => console.error("[lab] pipeline step failed", error));
  }

  // The consumer is idempotent: a sale id it has already stored is acknowledged and skipped.
  async function consumeSale(sale) {
    await wait(LAB_STEP_MS);
    await flowTo(1, "service");
    lab.queued -= 1;

    if (lab.processed.has(sale.id)) {
      lab.duplicates += 1;
      addLog("service", "lab.log.duplicate", { id: sale.id });
      renderLabStats();
      return;
    }

    lab.processed.add(sale.id);
    addLog("service", "lab.log.consume", { id: sale.id, lines: sale.lines.length, total: sale.total });
    renderLabStats();

    await flowTo(2, "database");
    lab.documents += 1;
    addLog("sql", "lab.log.saved", { id: sale.id });
    renderLabStats();

    await flowTo(3, "printer");
    lab.receipt = { sale, printed: 0 };
    const rowCount = sale.lines.length + 5;
    for (let row = 1; row <= rowCount; row += 1) {
      lab.receipt.printed = row;
      renderLabReceipt();
      await wait(110);
    }
    lab.receipts += 1;
    addLog("printer", "lab.log.printed", { id: sale.id });
    renderLabStats();
  }

  const labActions = {
    scan() {
      const product = labProducts[Math.floor(Math.random() * labProducts.length)];
      lab.cart.push(product);
      restartClass(document.querySelector('[data-lab-node="handheld"]'), "is-active");
      addLog("handheld", "lab.log.scan", { ean: product.ean, name: product.name, price: product.price });
      renderLabCart();
    },

    checkout() {
      if (!lab.cart.length) {
        addLog("handheld", "lab.log.cartEmpty");
        return;
      }
      const lines = [...lab.cart];
      const sale = { id: `sale-${lab.saleNumber}`, lines, total: lines.reduce((sum, product) => sum + product.price, 0), time: new Date() };
      lab.saleNumber += 1;
      lab.cart = [];
      lab.lastSale = sale;
      renderLabCart();
      publishSale(sale);
    },

    network() {
      lab.online = !lab.online;
      if (!lab.online) {
        addLog("room", "lab.log.networkOff");
        renderLabStats();
        return;
      }
      const pending = lab.outbox.splice(0);
      addLog("room", "lab.log.networkOn", { n: pending.length });
      renderLabStats();
      pending.forEach(publishSale);
    },

    // Simulates a client retry after a timeout, which the service must not save twice.
    retry() {
      if (!lab.lastSale) {
        addLog("handheld", "lab.log.nothingToRetry");
        return;
      }
      addLog("handheld", "lab.log.retry", { id: lab.lastSale.id });
      publishSale(lab.lastSale);
    }
  };

  // ---------- project cards: illustrations that play on hover ----------

  const cardDemos = {
    handheld(visual, readout) {
      let index = 0;
      return () => {
        const product = labProducts[index % labProducts.length];
        index += 1;
        restartClass(visual, "is-scanning");
        readout.replaceChildren(el("strong", { text: `${localize(product.name)} · ${money(product.price)}` }), el("small", { text: product.ean }));
      };
    },

    receipt(visual, readout) {
      return () => {
        restartClass(visual, "is-printing");
        readout.textContent = t("demo.receiptReadout");
      };
    },

    chart(visual, readout) {
      let index = 0;
      const bars = [...visual.querySelectorAll("span")].slice(0, 6);
      return () => {
        index = (index + 1) % chartStores.length;
        const store = chartStores[index];
        bars.forEach((bar, barIndex) => (bar.style.height = `${store.bars[barIndex]}%`));
        readout.textContent = format(t("demo.chartReadout"), { store: store.name });
      };
    },

    tasks(visual, readout) {
      const rows = [...visual.querySelectorAll("span")].slice(2, 6);
      let done = 0;
      return () => {
        done = done >= rows.length ? 0 : done + 1;
        rows.forEach((row, rowIndex) => row.classList.toggle("is-checked", rowIndex < done));
        readout.textContent = format(t("demo.tasksReadout"), { done, total: rows.length });
      };
    }
  };

  function mountCardDemos() {
    document.querySelectorAll("[data-featured-list] .case-card").forEach((card) => {
      const visual = card.querySelector("[data-visual]");
      const createDemo = visual && cardDemos[visual.dataset.visual];
      if (!createDemo) return;

      const readout = el("p", { className: "visual-readout", "aria-live": "polite" });
      visual.append(readout);
      visual.removeAttribute("aria-hidden");
      visual.setAttribute("role", "button");
      visual.setAttribute("tabindex", "0");
      visual.setAttribute("aria-label", format(t("demo.label"), { name: card.querySelector(".case-title").textContent }));

      // Hovering the card (or focusing its visual) keeps the demo moving; a tap or Enter plays one step.
      const activate = createDemo(visual, readout);
      const loop = loopWhileHovered(card, activate, CARD_HOVER_MS);
      visual.addEventListener("focus", loop.start);
      visual.addEventListener("blur", loop.stop);
      visual.addEventListener("click", (event) => event.pointerType !== "mouse" && activate());
      activateOnKeys(visual, activate);
    });
  }

  // ---------- skill map ----------

  let selectedSkill = null;

  // Resolves an id from `usedIn` to an experience tab or a project card.
  function skillTarget(id) {
    const job = experience.find((item) => item.id === id);
    if (job) return { id, kind: "job", label: localize(job.tab) };
    const project = [...featuredProjects, ...otherProjects].find((item) => item.id === id);
    return project ? { id, kind: "project", label: localize(project.title) } : null;
  }

  function highlightSkill(skill) {
    const ids = new Set(skill?.usedIn ?? []);
    document.querySelectorAll("[data-project-id]").forEach((card) => card.classList.toggle("is-matched", ids.has(card.dataset.projectId)));
    document.querySelectorAll("[data-tab-list] [role=tab]").forEach((tab) => tab.classList.toggle("is-matched", ids.has(tab.dataset.id)));
  }

  function openTarget(target) {
    if (target.kind === "job") {
      selectExperience(target.id);
      document.getElementById("experience")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      return;
    }
    const card = document.querySelector(`[data-project-id="${target.id}"]`);
    if (!card) return;
    card.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    restartClass(card, "is-flash");
  }

  function renderSkillUsage() {
    const usage = document.querySelector("[data-skill-usage]");
    if (!usage || !selectedSkill) return;
    const targets = selectedSkill.usedIn.map(skillTarget).filter(Boolean);
    usage.replaceChildren(
      el("p", { className: "card-label", text: format(t("skills.usedIn"), { skill: localize(selectedSkill.name) }) }),
      el(
        "ul",
        { className: "skill-usage-list" },
        targets.map((target) =>
          el("li", {}, [
            el("button", { type: "button", className: `skill-target target-${target.kind}` }, [
              icon(target.kind === "job" ? "user" : "folder"),
              document.createTextNode(target.label)
            ])
          ])
        )
      )
    );
    usage.querySelectorAll(".skill-target").forEach((control, index) => control.addEventListener("click", () => openTarget(targets[index])));
  }

  function mountSkillMap() {
    const root = document.querySelector("[data-skill-map]");
    if (!root) return;
    selectedSkill = selectedSkill ?? skillGroups[0].skills[0];

    root.replaceChildren(
      el("div", { className: "skill-map-head" }, [el("p", { className: "eyebrow", text: t("skills.title") }), el("p", { className: "skill-map-hint", text: t("skills.hint") })]),
      el(
        "div",
        { className: "skill-groups" },
        skillGroups.map((group) =>
          el("div", { className: "skill-group" }, [
            el("p", { className: "card-label", text: localize(group.title) }),
            el(
              "ul",
              { className: "skill-chips" },
              group.skills.map((skill) =>
                el("li", {}, [el("button", { type: "button", className: "skill-chip", "aria-pressed": String(skill === selectedSkill), text: localize(skill.name) })])
              )
            )
          ])
        )
      ),
      el("div", { className: "skill-usage", "aria-live": "polite", "data-skill-usage": "" })
    );

    const chips = [...root.querySelectorAll(".skill-chip")];
    const skills = skillGroups.flatMap((group) => group.skills);
    const selectChip = (chip, index) => {
      if (selectedSkill === skills[index]) return;
      selectedSkill = skills[index];
      chips.forEach((other) => other.setAttribute("aria-pressed", String(other === chip)));
      highlightSkill(selectedSkill);
      renderSkillUsage();
    };
    chips.forEach((chip, index) => {
      chip.addEventListener("click", () => selectChip(chip, index));
      chip.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && selectChip(chip, index));
    });

    highlightSkill(selectedSkill);
    renderSkillUsage();
  }

  // ---------- experience demos ----------

  // Current job: devices on mixed Room schema versions each run only the migrations they are missing.
  function mountMigrationDemo(container, generation) {
    const TARGET_VERSION = 4;
    const DEVICE_COUNT = 8;
    let devices = [];
    let running = false;

    const createDevices = () =>
      Array.from({ length: DEVICE_COUNT }, (_, index) => ({
        store: String(index + 1).padStart(2, "0"),
        version: 1 + Math.floor(Math.random() * (TARGET_VERSION - 1)),
        rows: 900 + Math.floor(Math.random() * 2400),
        step: ""
      }));

    const grid = el("ul", { className: "device-grid" });
    const status = el("p", { className: "demo-status", "aria-live": "polite" });
    const action = button(t("demo.migration.ship"), { className: "button button-primary button-small" });

    const allUpdated = () => devices.every((device) => device.version === TARGET_VERSION);

    function render() {
      grid.replaceChildren(
        ...devices.map((device) =>
          el("li", { className: `device ${device.step ? "is-running" : ""} ${device.version === TARGET_VERSION ? "is-current" : ""}` }, [
            el("span", { className: "device-name", text: format(t("demo.migration.device"), { n: device.store }) }),
            el("strong", { className: "device-version", text: device.step || `v${device.version}` })
          ])
        )
      );
      const rows = devices.reduce((sum, device) => sum + device.rows, 0);
      const pending = devices.filter((device) => device.version < TARGET_VERSION).length;
      status.textContent = allUpdated()
        ? format(t("demo.migration.done"), { total: DEVICE_COUNT, rows: number(rows) })
        : format(t("demo.migration.idle"), { n: pending, total: DEVICE_COUNT });
      action.disabled = running;
    }

    async function migrate(device, delay) {
      await wait(delay);
      while (device.version < TARGET_VERSION) {
        if (isStale(generation)) return;
        device.step = `v${device.version} → v${device.version + 1}`;
        render();
        await wait(520);
        device.version += 1;
        device.step = "";
        render();
      }
    }

    // Each run starts from a fresh mix of versions once every device has been updated.
    action.addEventListener("click", async () => {
      running = true;
      if (allUpdated()) {
        devices = createDevices();
        render();
        await wait(450);
      }
      render();
      await Promise.all(devices.map((device, index) => migrate(device, index * 140)));
      if (isStale(generation)) return;
      running = false;
      render();
    });

    devices = createDevices();
    playOnHover(container, action);
    container.replaceChildren(demoHeader("demo.migration.title", "demo.migration.body"), grid, el("div", { className: "demo-actions" }, [action, status]));
    render();
  }

  // E-invoicing job: an invoice moves through the e-invoicing steps; a missing VAT number stops it at validation.
  function mountInvoiceDemo(container, generation) {
    const steps = el("ol", { className: "demo-steps" }, invoiceSteps.map((step) => el("li", { "data-state": "idle", text: localize(step.name) })));
    const breakToggle = el("input", { type: "checkbox" });
    const status = el("p", { className: "demo-status", "aria-live": "polite" });
    const action = button(t("demo.invoice.send"), { className: "button button-primary button-small" });

    action.addEventListener("click", async () => {
      action.disabled = true;
      status.textContent = "";
      const items = [...steps.children];
      items.forEach((item) => (item.dataset.state = "idle"));

      for (const [index, step] of invoiceSteps.entries()) {
        items[index].dataset.state = "active";
        await wait(480);
        if (isStale(generation)) return;
        if (step.id === "validation" && breakToggle.checked) {
          items[index].dataset.state = "error";
          status.textContent = t("demo.invoice.error");
          action.disabled = false;
          return;
        }
        items[index].dataset.state = "done";
      }
      const hash = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      status.textContent = format(t("demo.invoice.ok"), { hash });
      action.disabled = false;
    });

    // Hovering alternates a valid invoice and one with the VAT number left empty, so both outcomes show.
    let hoverRuns = 0;
    const playNext = () => {
      if (action.disabled) return;
      breakToggle.checked = hoverRuns % 2 === 1;
      hoverRuns += 1;
      action.click();
    };
    container.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && playNext());
    onView(container, playNext);

    container.replaceChildren(
      demoHeader("demo.invoice.title", "demo.invoice.body"),
      steps,
      el("div", { className: "demo-actions" }, [
        action,
        el("label", { className: "demo-check" }, [breakToggle, document.createTextNode(t("demo.invoice.break"))]),
        status
      ])
    );
  }

  // Banking internship: a simplified debt-to-income rule, clearly not the bank's real policy.
  function mountCreditDemo(container) {
    const MAX_RATIO = 0.4;
    const REVIEW_RATIO = 0.3;
    const LIMIT_MONTHS = 6;
    const SLIDE_MS = 700;
    // Applicants the sliders glide to on hover: one per verdict, then a comfortable one.
    const SCENARIOS = [
      { income: 3200, commitments: 400 },
      { income: 2600, commitments: 900 },
      { income: 1800, commitments: 850 },
      { income: 5200, commitments: 700 }
    ];
    let scenarioIndex = 0;
    let sliding = false;

    const slider = (labelKey, min, max, step, value) => {
      const input = el("input", { type: "range", min, max, step, value });
      const output = el("output");
      return { input, output, field: el("label", { className: "demo-range" }, [el("span", { text: t(labelKey) }), input, output]) };
    };
    const income = slider("demo.credit.income", 1000, 8000, 100, 2400);
    const commitments = slider("demo.credit.commitments", 0, 3000, 50, 450);
    const meterFill = el("span", { className: "demo-meter-fill" });
    const ratioValue = el("strong");
    const limitValue = el("strong", { className: "demo-big" });
    const verdict = el("p", { className: "demo-verdict", "aria-live": "polite" });

    function update() {
      const monthlyIncome = Number(income.input.value);
      const monthlyCommitments = Number(commitments.input.value);
      const ratio = monthlyCommitments / monthlyIncome;
      const limit = Math.max(0, Math.floor(((monthlyIncome * MAX_RATIO - monthlyCommitments) * LIMIT_MONTHS) / 100) * 100);
      const state = ratio < REVIEW_RATIO ? "approved" : ratio < MAX_RATIO ? "review" : "declined";

      income.output.textContent = money(monthlyIncome);
      commitments.output.textContent = money(monthlyCommitments);
      ratioValue.textContent = `${Math.round(ratio * 100)}%`;
      meterFill.style.width = `${Math.min(100, (ratio / (MAX_RATIO * 1.5)) * 100)}%`;
      limitValue.textContent = money(limit);
      verdict.dataset.state = state;
      verdict.textContent = t(`demo.credit.${state}`);
    }

    // Eases both sliders to the next applicant so the meter and verdict update live.
    function slideToNextScenario() {
      if (sliding) return;
      sliding = true;
      const target = SCENARIOS[scenarioIndex % SCENARIOS.length];
      scenarioIndex += 1;
      const from = { income: Number(income.input.value), commitments: Number(commitments.input.value) };
      const startedAt = performance.now();
      const duration = SLIDE_MS * SPEED;

      const step = (now) => {
        const progress = duration ? Math.min((now - startedAt) / duration, 1) : 1;
        const eased = 1 - (1 - progress) ** 3;
        income.input.value = Math.round(from.income + (target.income - from.income) * eased);
        commitments.input.value = Math.round(from.commitments + (target.commitments - from.commitments) * eased);
        update();
        if (progress < 1) requestAnimationFrame(step);
        else sliding = false;
      };
      requestAnimationFrame(step);
    }

    [income.input, commitments.input].forEach((input) => input.addEventListener("input", update));
    container.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && slideToNextScenario());
    onView(container, slideToNextScenario);
    container.replaceChildren(
      demoHeader("demo.credit.title", "demo.credit.body"),
      el("div", { className: "demo-credit" }, [
        el("div", { className: "demo-ranges" }, [income.field, commitments.field]),
        el("div", { className: "demo-result" }, [
          el("p", { className: "card-label", text: t("demo.credit.ratio") }),
          el("div", { className: "demo-meter" }, [meterFill]),
          ratioValue,
          el("p", { className: "card-label", text: t("demo.credit.limit") }),
          limitValue,
          verdict
        ])
      ])
    );
    update();
  }

  // Thesis internship: 12 tests on one local browser vs two remote browsers with a little network overhead each.
  function mountTestsDemo(container, generation) {
    const TEST_COUNT = 12;
    const LOCAL_MINUTES = 1;
    const REMOTE_MINUTES = 1.5;
    const REMOTE_BROWSERS = 2;
    const TICK_MS = 230;

    const lane = (labelKey) => {
      const dots = el("ol", { className: "test-dots" }, Array.from({ length: TEST_COUNT }, () => el("li")));
      const clock = el("strong", { className: "test-clock", text: format(t("demo.tests.minutes"), { n: 0 }) });
      return { dots, clock, row: el("div", { className: "test-lane" }, [el("span", { className: "test-lane-name", text: t(labelKey) }), dots, clock]) };
    };
    const local = lane("demo.tests.local");
    const remote = lane("demo.tests.remote");
    const status = el("p", { className: "demo-status", "aria-live": "polite" });
    const action = button(t("demo.tests.run"), { className: "button button-primary button-small" });

    async function runLane(target, perTest, parallel) {
      let minutes = 0;
      for (let index = 0; index < TEST_COUNT; index += parallel) {
        await wait(TICK_MS * perTest);
        if (isStale(generation)) return minutes;
        minutes += perTest;
        [...target.dots.children].slice(index, index + parallel).forEach((dot) => dot.classList.add("is-passed"));
        target.clock.textContent = format(t("demo.tests.minutes"), { n: number(minutes) });
      }
      return minutes;
    }

    action.addEventListener("click", async () => {
      action.disabled = true;
      status.textContent = "";
      [local, remote].forEach((target) => {
        [...target.dots.children].forEach((dot) => dot.classList.remove("is-passed"));
        target.clock.textContent = format(t("demo.tests.minutes"), { n: 0 });
      });
      const [localMinutes, remoteMinutes] = await Promise.all([
        runLane(local, LOCAL_MINUTES, 1),
        runLane(remote, REMOTE_MINUTES, REMOTE_BROWSERS)
      ]);
      if (isStale(generation)) return;
      status.textContent = format(t("demo.tests.result"), { saved: Math.round((1 - remoteMinutes / localMinutes) * 100) });
      action.disabled = false;
    });

    playOnHover(container, action);
    container.replaceChildren(
      demoHeader("demo.tests.title", "demo.tests.body"),
      el("div", { className: "test-lanes" }, [local.row, remote.row]),
      el("div", { className: "demo-actions" }, [action, status])
    );
  }

  const jobDemos = { migration: mountMigrationDemo, invoice: mountInvoiceDemo, credit: mountCreditDemo, tests: mountTestsDemo };

  function mountJobDemos(generation) {
    document.querySelectorAll("[data-job-demo]").forEach((container) => jobDemos[container.dataset.jobDemo]?.(container, generation));
  }

  // ---------- process: one example ticket walks through the steps ----------

  let processAction = null;

  function mountProcessRun(generation) {
    const root = document.querySelector("[data-process-run]");
    if (!root) return;

    const log = el("ol", { className: "process-log", "aria-live": "polite" });
    const action = button(t("process.run"), { className: "button button-primary button-small" }, [icon("rocket")]);
    const steps = () => [...document.querySelectorAll("[data-process-steps] .process-step")];
    processAction = action;
    onHoverOnce(root.closest(".process"), "hoverRun", () => !processAction.disabled && processAction.click());

    action.addEventListener("click", async () => {
      action.disabled = true;
      log.replaceChildren();
      steps().forEach((step) => step.classList.remove("is-active", "is-done"));

      for (const [index, step] of processSteps.entries()) {
        if (isStale(generation)) return;
        const items = steps();
        items.forEach((item, itemIndex) => {
          item.classList.toggle("is-active", itemIndex === index);
          item.classList.toggle("is-done", itemIndex < index);
        });
        log.append(el("li", {}, [el("strong", { text: localize(step.title) }), document.createTextNode(localize(step.log))]));
        await wait(1100);
      }
      if (isStale(generation)) return;
      steps().forEach((item) => {
        item.classList.remove("is-active");
        item.classList.add("is-done");
      });
      action.lastChild.textContent = t("process.runAgain");
      action.disabled = false;
    });

    root.replaceChildren(el("div", { className: "process-run-head" }, [action, el("p", { className: "demo-body", text: t("process.example") })]), log);
  }

  // ---------- beyond code ----------

  // Climbing: the first attempt falls, the next one tops out — read, try, fall, adjust.
  function mountClimbDemo(container, generation) {
    const HOLDS = [
      { x: 30, y: 82 },
      { x: 62, y: 64 },
      { x: 36, y: 46 },
      { x: 66, y: 28 },
      { x: 44, y: 10 }
    ];
    const FALL_AT = 3;
    let attempts = 0;

    const climber = el("span", { className: "climb-climber" });
    const wall = el("div", { className: "climb-wall", "aria-hidden": "true" }, [...HOLDS.map((hold) => el("span", { className: "climb-hold", style: `left:${hold.x}%;top:${hold.y}%` })), climber]);
    const status = el("p", { className: "demo-status", "aria-live": "polite", text: t("beyond.climb.idle") });
    const action = button(t("beyond.climb.try"));

    const place = (point) => {
      climber.style.left = `${point.x}%`;
      climber.style.top = `${point.y}%`;
    };

    action.addEventListener("click", async () => {
      action.disabled = true;
      attempts += 1;
      const falls = attempts % 2 === 1;
      climber.classList.remove("is-falling", "is-topped");
      place({ x: 50, y: 96 });
      await wait(300);

      for (const [index, hold] of HOLDS.entries()) {
        if (isStale(generation)) return;
        place(hold);
        await wait(420);
        if (falls && index + 1 === FALL_AT) {
          climber.classList.add("is-falling");
          place({ x: hold.x, y: 96 });
          status.textContent = format(t("beyond.climb.fell"), { n: FALL_AT });
          action.disabled = false;
          return;
        }
      }
      climber.classList.add("is-topped");
      status.textContent = t("beyond.climb.sent");
      action.disabled = false;
    });

    place({ x: 50, y: 96 });
    playOnHover(container.closest(".beyond-card") ?? wall, action);
    container.replaceChildren(wall, el("div", { className: "demo-actions" }, [action, status]));
  }

  // Crochet: every third row picks up an extra stitch, and the next tap frogs and redoes it.
  function mountStitchDemo(container) {
    const STITCHES = 10;
    const MAX_ROWS = 5;
    const rows = [];
    let rowNumber = 0;

    const rowList = el("ol", { className: "stitch-rows", "aria-hidden": "true" });
    const status = el("p", { className: "demo-status", "aria-live": "polite", text: t("beyond.stitch.idle") });
    const action = button(t("beyond.stitch.add"));

    function render() {
      rowList.replaceChildren(
        ...rows.map((row) => el("li", { className: row.bug ? "is-bug" : "" }, Array.from({ length: row.bug ? STITCHES + 1 : STITCHES }, () => el("span"))))
      );
      action.textContent = rows.at(-1)?.bug ? t("beyond.stitch.fix") : t("beyond.stitch.add");
    }

    action.addEventListener("click", () => {
      const last = rows.at(-1);
      if (last?.bug) {
        last.bug = false;
        status.textContent = format(t("beyond.stitch.fixed"), { n: last.number });
      } else {
        rowNumber += 1;
        const bug = rowNumber % 3 === 0;
        rows.push({ number: rowNumber, bug });
        if (rows.length > MAX_ROWS) rows.shift();
        status.textContent = format(t(bug ? "beyond.stitch.bug" : "beyond.stitch.ok"), { n: rowNumber });
      }
      render();
    });

    playOnHover(container.closest(".beyond-card") ?? rowList, action);
    container.replaceChildren(rowList, el("div", { className: "demo-actions" }, [action, status]));
    render();
  }

  // Bruno's card: every treat gets a reply and a heart on the photo.
  function mountTreatDemo(container) {
    let treats = 0;
    const status = el("p", { className: "demo-status", "aria-live": "polite" });
    const action = button(t("beyond.treat.give"), { className: "button button-primary button-small" }, [icon("heart")]);
    const stack = container.closest(".beyond-card")?.querySelector("[data-photo-stack]");

    action.addEventListener("click", () => {
      treats += 1;
      const lines = localize(brunoTreatLines);
      status.textContent = format(lines[Math.min(treats, lines.length) - 1], { n: treats });
      if (!stack) return;
      const heart = el("span", { className: "heart-pop", "aria-hidden": "true" }, [icon("heart")]);
      heart.addEventListener("animationend", () => heart.remove());
      stack.append(heart);
    });

    playOnHover(container.closest(".beyond-body") ?? container, action);
    container.replaceChildren(el("div", { className: "demo-actions" }, [action, status]));
  }

  // Baking: preheat, bake with a progress bar, then "ship" the next photo as the new build.
  function mountBakeDemo(container, generation) {
    const PREHEAT_MS = 600;
    const STEP_MS = 160;
    const fillBar = el("span", { className: "oven-fill" });
    const status = el("p", { className: "demo-status", "aria-live": "polite" });
    const action = button(t("beyond.bake.start"), {}, [icon("bake")]);
    const stack = container.closest(".beyond-card")?.querySelector("[data-photo-stack]");

    action.addEventListener("click", async () => {
      action.disabled = true;
      fillBar.style.width = "0%";
      status.textContent = t("beyond.bake.preheat");
      await wait(PREHEAT_MS);
      for (let percent = 10; percent <= 100; percent += 10) {
        if (isStale(generation)) return;
        fillBar.style.width = `${percent}%`;
        status.textContent = format(t("beyond.bake.baking"), { n: percent });
        await wait(STEP_MS);
      }
      if (isStale(generation)) return;
      const index = photoStacks.get(stack)?.next() ?? 0;
      status.textContent = format(t("beyond.bake.done"), { build: `Build #${index + 1}` });
      action.disabled = false;
    });

    playOnHover(container.closest(".beyond-body") ?? container, action);
    container.replaceChildren(el("div", { className: "oven", "aria-hidden": "true" }, [fillBar]), el("div", { className: "demo-actions" }, [action, status]));
  }

  // Photo stacks cross-fade to the next photo each time the mouse arrives, on tap, or with Enter.
  function mountPhotoStacks() {
    document.querySelectorAll("[data-photo-stack]").forEach((stack) => {
      const images = [...stack.querySelectorAll("img")];
      const caption = stack.querySelector(".photo-caption");
      let index = 0;

      const next = () => {
        images[index].classList.remove("is-current");
        index = (index + 1) % images.length;
        images[index].classList.add("is-current");
        caption.textContent = images[index].alt;
        return index;
      };

      stack.setAttribute("role", "button");
      stack.setAttribute("tabindex", "0");
      stack.setAttribute("aria-label", t("beyond.photoNext"));
      stack.addEventListener("pointerenter", (event) => event.pointerType === "mouse" && next());
      stack.addEventListener("click", (event) => event.pointerType !== "mouse" && next());
      activateOnKeys(stack, next);
      photoStacks.set(stack, { next });
    });
  }

  const beyondDemos = { climb: mountClimbDemo, stitch: mountStitchDemo, treat: mountTreatDemo, bake: mountBakeDemo };

  function mountBeyondDemos(generation) {
    document.querySelectorAll("[data-beyond-demo]").forEach((container) => beyondDemos[container.dataset.beyondDemo]?.(container, generation));
  }

  // ---------- PaceTasks: interactive "Today" screen ----------

  const phone = { tasks: null, seconds: 12 * 60 + 40, playing: false, demoIndex: 0 };
  const PHONE_TYPE_MS = 55;
  const PHONE_MAX_TASKS = 7;

  function formatTimer(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  }

  // Finished tasks sink to the bottom, keeping the original order otherwise.
  function sortedTasks() {
    return [...phone.tasks.filter((task) => !task.done), ...phone.tasks.filter((task) => task.done)];
  }

  function renderPhone() {
    const root = document.querySelector("[data-phone-mockup]");
    if (!root) return;
    const { mockup } = pacetasksCaseStudy;

    const taskRow = (task) =>
      el("li", {}, [
        el("button", { type: "button", className: `pt-task ${task.done ? "is-done" : ""}`, "aria-pressed": String(Boolean(task.done)) }, [
          el("span", { className: "pt-check", "aria-hidden": "true" }),
          el("span", { className: "pt-task-text" }, [
            el("span", { className: "pt-task-title", text: localize(task.title) }),
            el("span", { className: "pt-task-meta" }, [el("span", { className: `pt-dot cat-${task.category}`, "aria-hidden": "true" }), document.createTextNode(localize(task.meta))])
          ]),
          task.focus && !task.done && el("span", { className: "pt-badge", text: "FOCUS" }),
          task.running && !task.done && el("span", { className: "pt-timer", "data-pt-timer": "", text: formatTimer(phone.seconds) })
        ])
      ]);

    const quickAdd = el("input", { className: "pt-quickadd", type: "text", maxlength: "40", placeholder: localize(mockup.placeholder), "aria-label": localize(mockup.placeholder) });
    const tasks = sortedTasks();

    root.replaceChildren(
      el("div", { className: "pt-screen" }, [
        el("p", { className: "pt-eyebrow", text: localize(mockup.greeting).toUpperCase() }),
        el("p", { className: "pt-title", text: localize(mockup.title) }),
        quickAdd,
        el("ul", { className: "pt-tasks" }, tasks.map(taskRow)),
        el("div", { className: "pt-tabbar" }, localize(mockup.tabs).map((tab, index) => el("span", { className: index === 0 ? "is-active" : "", text: tab })))
      ])
    );

    root.querySelectorAll(".pt-task").forEach((row, index) =>
      row.addEventListener("click", () => {
        tasks[index].done = !tasks[index].done;
        renderPhone();
      })
    );

    quickAdd.addEventListener("keydown", (event) => {
      const title = quickAdd.value.trim();
      if (event.key !== "Enter" || !title) return;
      phone.tasks.unshift({ title, meta: { en: translations.en["pt.newTaskMeta"], it: translations.it["pt.newTaskMeta"] }, category: "personal" });
      renderPhone();
      document.querySelector("[data-phone-mockup] .pt-quickadd")?.focus();
    });
  }

  // Types a new task into quick add, saves it, then finishes the oldest open task.
  async function playPhoneDemo() {
    if (phone.playing) return;
    phone.playing = true;
    try {
      const titles = localize(pacetasksCaseStudy.mockup.demoTasks);
      const title = titles[phone.demoIndex % titles.length];
      phone.demoIndex += 1;

      for (let length = 1; length <= title.length; length += 1) {
        const field = document.querySelector("[data-phone-mockup] .pt-quickadd");
        if (field) field.value = title.slice(0, length);
        await wait(PHONE_TYPE_MS);
      }
      await wait(300);
      phone.tasks.unshift({ title, meta: { en: translations.en["pt.newTaskMeta"], it: translations.it["pt.newTaskMeta"] }, category: "personal" });
      renderPhone();

      await wait(800);
      const open = sortedTasks().filter((task) => !task.done);
      if (open.length > 1) open[open.length - 1].done = true;
      // Keep the list short: the oldest finished task scrolls off.
      if (phone.tasks.length > PHONE_MAX_TASKS) {
        const lastDone = phone.tasks.findLastIndex((task) => task.done);
        if (lastDone >= 0) phone.tasks.splice(lastDone, 1);
      }
      renderPhone();
    } finally {
      phone.playing = false;
    }
  }

  function mountPhone() {
    const root = document.querySelector("[data-phone-mockup]");
    if (!root) return;
    phone.tasks = phone.tasks ?? pacetasksCaseStudy.mockup.tasks.map((task) => ({ ...task }));
    renderPhone();
    onHoverOnce(root, "hoverRun", playPhoneDemo);

    // The running task counts down live, like the app's range timer.
    clearInterval(phoneTimer);
    phoneTimer = setInterval(() => {
      const isRunning = phone.tasks.some((task) => task.running && !task.done);
      if (document.hidden || !isRunning || phone.seconds === 0) return;
      phone.seconds -= 1;
      const timer = document.querySelector("[data-pt-timer]");
      if (timer) timer.textContent = formatTimer(phone.seconds);
    }, 1000);
  }

  // ---------- boot ----------

  function mountAll() {
    mountGeneration += 1;
    hoverTimers.forEach(clearInterval);
    hoverTimers.clear();
    // Mounts below re-observe their current elements, so detached ones from the last render are dropped.
    viewObserver?.disconnect();
    const generation = mountGeneration;
    try {
      mountHeroTicker();
      mountPortraitReleases();
      renderLab();
      mountCardDemos();
      mountSkillMap();
      mountJobDemos(generation);
      mountProcessRun(generation);
      mountPhotoStacks();
      mountBeyondDemos(generation);
      mountPhone();
    } catch (error) {
      console.error("[simulations] mount failed", error);
    }
  }

  document.addEventListener("portfolio:languagechange", mountAll);
  mountAll();
})();
