// Renders every page from content.js and wires up language, typing, tabs, menu and scroll reveal.
// Each page sets <body data-page="..."> so only its own renderers run.

const STORAGE_KEY = "portfolioLanguage";
const SUPPORTED_LANGUAGES = ["en", "it"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const currentPage = document.body.dataset.page || "home";

let currentLanguage = "en";
let activeExperienceId = experience[0].id;
let hasTypedGreeting = false;

// ---------- helpers ----------

// Resolves a value that is either a plain string or a { en, it } object.
function localize(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage] ?? value.en;
  }
  return value;
}

function t(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? "";
}

// Small element factory to keep rendering code readable.
function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(options).forEach(([name, value]) => {
    if (value === undefined || value === null || value === false) return;
    if (name === "className") node.className = value;
    else if (name === "text") node.textContent = value;
    else node.setAttribute(name, value);
  });
  children.forEach((child) => child && node.append(child));
  return node;
}

function icon(name, className = "icon") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `assets/icons.svg#icon-${name}`);
  svg.append(use);
  return svg;
}

// Replaces the children of the element matching `selector`, if that element exists on this page.
function fill(selector, children) {
  const target = document.querySelector(selector);
  if (target) target.replaceChildren(...children);
  return target;
}

function externalLink(href, children, options = {}) {
  return el("a", { href, target: "_blank", rel: "noopener", ...options }, children);
}

function readSavedLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Storage can be blocked (private mode); the site still works without it.
  }
}

function getInitialLanguage() {
  const saved = readSavedLanguage();
  if (SUPPORTED_LANGUAGES.includes(saved)) return saved;
  return navigator.language?.toLowerCase().startsWith("it") ? "it" : "en";
}

// ---------- shared renderers ----------

function renderSocialLists() {
  const items = [
    { name: "github", href: profileLinks.github, label: "GitHub" },
    { name: "linkedin", href: profileLinks.linkedin, label: "LinkedIn" },
    { name: "tiktok", href: profileLinks.tiktok, label: "TikTok" },
    { name: "mail", href: `mailto:${profileLinks.email}`, label: "Email" }
  ];

  document.querySelectorAll("[data-social-list]").forEach((list) => {
    list.replaceChildren(
      ...items.map((item) =>
        el("li", {}, [
          item.name === "mail"
            ? el("a", { href: item.href, "aria-label": item.label }, [icon(item.name)])
            : externalLink(item.href, [icon(item.name)], { "aria-label": item.label })
        ])
      )
    );
  });
}

function techList(items, className = "project-tech") {
  return el("ul", { className }, items.map((item) => el("li", { text: item })));
}

// ---------- home: hero greeting ----------

function renderGreeting(segments, charCount = Infinity) {
  const target = document.getElementById("heroGreeting");
  target.replaceChildren();
  let remaining = charCount;
  segments.forEach((segment) => {
    if (remaining <= 0) return;
    const text = segment.text.slice(0, remaining);
    remaining -= text.length;
    target.append(segment.accent ? el("span", { className: "accent", text }) : document.createTextNode(text));
  });
}

// Types the greeting once on first load; later language switches render it instantly.
function typeGreeting() {
  if (!document.getElementById("heroGreeting")) return;
  const segments = t("hero.greeting");
  const total = segments.reduce((sum, segment) => sum + segment.text.length, 0);

  if (hasTypedGreeting || prefersReducedMotion) {
    renderGreeting(segments);
    return;
  }

  hasTypedGreeting = true;
  let typed = 0;
  const timer = setInterval(() => {
    typed += 1;
    renderGreeting(t("hero.greeting"), typed);
    if (typed >= total) clearInterval(timer);
  }, 85);
}

// ---------- home: sections ----------

function renderTechnologies() {
  fill("[data-tech-list]", technologies.map((name) => el("li", { text: name })));
  const languages = document.querySelector("[data-languages]");
  if (languages) languages.textContent = localize(languagesSpoken);
}

function selectExperience(id, focusTab = false) {
  activeExperienceId = id;
  document.querySelectorAll("[data-tab-list] [role=tab]").forEach((tab) => {
    const isActive = tab.dataset.id === id;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && focusTab) tab.focus();
  });
  document.querySelectorAll("[data-tab-panels] [role=tabpanel]").forEach((panel) => {
    panel.hidden = panel.dataset.id !== id;
  });

  // Moves the highlight bar under the selected tab.
  const index = experience.findIndex((job) => job.id === id);
  document.querySelector("[data-tab-list]").style.setProperty("--active-index", index);
}

function renderExperience() {
  const tabList = fill("[data-tab-list]", [
    ...experience.map((job) =>
      el("button", { type: "button", role: "tab", id: `tab-${job.id}`, "aria-controls": `panel-${job.id}`, "data-id": job.id, text: job.tab })
    ),
    el("span", { className: "tab-highlight", "aria-hidden": "true" })
  ]);
  if (!tabList) return;

  fill(
    "[data-tab-panels]",
    experience.map((job) =>
      el("div", { role: "tabpanel", id: `panel-${job.id}`, "aria-labelledby": `tab-${job.id}`, "data-id": job.id, tabindex: "0" }, [
        el("h3", { className: "job-title" }, [
          document.createTextNode(`${localize(job.role)} `),
          el("span", { className: "accent", text: `@ ${job.company}` })
        ]),
        el("p", { className: "job-meta", text: `${localize(job.dates)} · ${localize(job.location)}` }),
        el("ul", { className: "arrow-list" }, localize(job.bullets).map((bullet) => el("li", { text: bullet })))
      ])
    )
  );

  tabList.querySelectorAll("[role=tab]").forEach((tab) => tab.addEventListener("click", () => selectExperience(tab.dataset.id)));
  selectExperience(activeExperienceId);

  fill(
    "[data-education-list]",
    education.map((item) =>
      el("li", {}, [
        el("span", { className: "education-degree", text: localize(item.degree) }),
        el("span", { className: "education-school", text: localize(item.school) }),
        el("span", { className: "education-dates", text: item.dates })
      ])
    )
  );
}

// Arrow keys move between experience tabs, following the WAI-ARIA tabs pattern.
function handleTabKeys(event) {
  const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const index = experience.findIndex((job) => job.id === activeExperienceId);
  const last = experience.length - 1;
  const next = {
    ArrowUp: index - 1, ArrowLeft: index - 1, ArrowDown: index + 1, ArrowRight: index + 1, Home: 0, End: last
  }[event.key];
  selectExperience(experience[(next + experience.length) % experience.length].id, true);
}

// Decorative illustrations for featured projects, drawn with CSS spans.
function projectVisual(kind) {
  const spanCount = { handheld: 6, receipt: 7, chart: 7, tasks: 7 };
  const visual = el("div", { className: `project-visual visual-${kind}`, "aria-hidden": "true" });
  for (let i = 0; i < spanCount[kind]; i += 1) visual.append(el("span"));
  return visual;
}

// Public projects get case-study and code links; work projects get a private-code note.
function featuredFooter(project) {
  if (!project.caseStudy && !project.repo) {
    return el("p", { className: "featured-private" }, [icon("lock"), document.createTextNode(t("work.privateNote"))]);
  }
  return el("div", { className: "featured-links" }, [
    project.caseStudy && el("a", { className: "button small", href: project.caseStudy, text: t("work.caseStudy") }),
    project.repo && externalLink(project.repo, [icon("github")], { className: "icon-link", "aria-label": `${t("work.viewCode")}: ${localize(project.title)}` })
  ]);
}

function renderFeaturedProjects() {
  fill(
    "[data-featured-list]",
    featuredProjects.map((project, index) =>
      el("article", { className: `featured-project reveal ${index % 2 ? "is-flipped" : ""}` }, [
        projectVisual(project.visual),
        el("div", { className: "featured-content" }, [
          el("p", { className: "featured-label", text: t(project.personal ? "work.personalLabel" : "work.featuredLabel") }),
          el("h3", { className: "featured-title" }, [
            project.caseStudy ? el("a", { href: project.caseStudy, text: localize(project.title) }) : document.createTextNode(localize(project.title))
          ]),
          el("div", { className: "featured-description" }, [el("p", { text: localize(project.description) })]),
          techList(project.tech),
          featuredFooter(project)
        ])
      ])
    )
  );
}

function renderOtherProjects() {
  fill(
    "[data-project-grid]",
    otherProjects.map((project) => {
      const title = localize(project.title);
      const header = el("div", { className: "card-top" }, [
        icon("folder", "icon folder-icon"),
        project.link
          ? externalLink(project.link, [icon("github")], { "aria-label": `${t("work.viewCode")}: ${title}` })
          : icon("lock", "icon muted-icon")
      ]);
      return el("li", { className: "project-card reveal" }, [
        header,
        el("h4", { className: "card-title", text: title }),
        el("p", { className: "card-description", text: localize(project.description) }),
        techList(project.tech, "card-tech")
      ]);
    })
  );
}

function renderBeyond() {
  fill(
    "[data-beyond-list]",
    beyondItems.map((item) => {
      const body = [icon(item.icon, "icon beyond-icon"), el("h3", { text: localize(item.title) }), el("p", { text: localize(item.description) })];
      const content = item.link ? [externalLink(item.link, [...body, icon("external", "icon corner-icon")], { className: "beyond-link" })] : body;
      return el("li", { className: "beyond-card reveal" }, content);
    })
  );
}

function renderHome() {
  typeGreeting();
  renderTechnologies();
  renderExperience();
  renderFeaturedProjects();
  renderOtherProjects();
  renderBeyond();
}

// ---------- PaceTasks case study ----------

// Illustrated "Today" screen in the app's own sage/cream theme.
function renderPhoneMockup() {
  const { mockup } = pacetasksCaseStudy;
  const taskRow = (task) =>
    el("li", { className: `pt-task ${task.done ? "is-done" : ""}` }, [
      el("span", { className: "pt-check", "aria-hidden": "true" }),
      el("span", { className: "pt-task-text" }, [
        el("span", { className: "pt-task-title", text: localize(task.title) }),
        el("span", { className: "pt-task-meta" }, [
          el("span", { className: `pt-dot cat-${task.category}`, "aria-hidden": "true" }),
          document.createTextNode(localize(task.meta))
        ])
      ]),
      task.focus && el("span", { className: "pt-badge", text: "FOCUS" }),
      task.running && el("span", { className: "pt-timer", text: "12:40" })
    ]);

  fill("[data-phone-mockup]", [
    el("div", { className: "pt-screen" }, [
      el("p", { className: "pt-eyebrow", text: localize(mockup.greeting).toUpperCase() }),
      el("p", { className: "pt-title", text: localize(mockup.title) }),
      el("div", { className: "pt-quickadd", text: localize(mockup.placeholder) }),
      el("ul", { className: "pt-tasks" }, mockup.tasks.map(taskRow)),
      el("div", { className: "pt-tabbar" }, localize(mockup.tabs).map((tab, index) => el("span", { className: index === 0 ? "is-active" : "", text: tab })))
    ])
  ]);
}

function renderCaseStudy() {
  const study = pacetasksCaseStudy;
  renderPhoneMockup();
  fill("[data-pt-stack]", study.stack.map((item) => el("li", { text: item })));

  fill(
    "[data-pt-features]",
    study.features.map((feature, index) =>
      el("li", { className: "pt-feature reveal" }, [
        el("span", { className: "pt-feature-index", text: String(index + 1).padStart(2, "0") }),
        el("h3", { text: localize(feature.title) }),
        el("p", { text: localize(feature.body) })
      ])
    )
  );

  fill(
    "[data-pt-layers]",
    study.layers.map((layer) =>
      el("li", { className: "pt-layer reveal" }, [
        el("h3", { text: localize(layer.name) }),
        el("p", { text: localize(layer.detail) }),
        el("ul", {}, layer.items.map((item) => el("li", { text: item })))
      ])
    )
  );

  fill("[data-pt-decisions]", study.decisions.map((decision) => el("li", { text: localize(decision) })));
  fill("[data-pt-next]", study.next.map((item) => el("li", { text: localize(item) })));
  document.querySelectorAll("[data-pt-repo]").forEach((link) => (link.href = study.repo));
}

// ---------- language ----------

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t(node.dataset.i18n);
    if (typeof value === "string" && value) node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, key] = pair.split(":").map((part) => part.trim());
      const value = t(key);
      if (attribute && value) node.setAttribute(attribute, value);
    });
  });

  document.querySelectorAll("[data-cv-link]").forEach((link) => {
    link.href = cvFiles[currentLanguage].href;
    link.download = cvFiles[currentLanguage].fileName;
  });

  // Each page declares which translation keys hold its title and description.
  const metaPrefix = document.body.dataset.metaPrefix || "meta";
  document.title = t(`${metaPrefix}.title`);
  document.querySelector('meta[name="description"]').setAttribute("content", t(`${metaPrefix}.description`));
}

const pageRenderers = {
  home: renderHome,
  pacetasks: renderCaseStudy
};

function setLanguage(language) {
  currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : "en";
  document.documentElement.lang = currentLanguage;

  applyStaticTranslations();
  pageRenderers[currentPage]?.();
  observeReveals();

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  });

  saveLanguage(currentLanguage);

  // Lets standalone widgets (e.g. the game) re-translate their dynamic text.
  document.dispatchEvent(new CustomEvent("portfolio:languagechange", { detail: { language: currentLanguage } }));
}

// ---------- scroll behaviour ----------

const revealObserver =
  "IntersectionObserver" in window && !prefersReducedMotion
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Also reveal elements the user already scrolled past (fast scroll or anchor jump).
            if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
            revealNode(entry.target);
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

function revealNode(node) {
  node.classList.add("is-visible");
  revealObserver?.unobserve(node);
}

// Fades sections in as they enter the viewport; re-run after each render.
function observeReveals() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((node) => {
    if (revealObserver) revealObserver.observe(node);
    else node.classList.add("is-visible");
  });
}

// At the very bottom of the page nothing can scroll further into view, so show what remains.
function revealRemainingAtBottom() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) document.querySelectorAll(".reveal:not(.is-visible)").forEach(revealNode);
}

// Hides the header while scrolling down and shows it again when scrolling up.
function setupHeaderScroll() {
  const header = document.getElementById("siteHeader");
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 10);
      header.classList.toggle("is-hidden", y > lastY && y > 120 && !document.body.classList.contains("menu-open"));
      lastY = y;
      revealRemainingAtBottom();
    },
    { passive: true }
  );
}

// Highlights the nav link of the section currently on screen (in-page links only).
function setupScrollSpy() {
  if (!("IntersectionObserver" in window)) return;
  const links = [...document.querySelectorAll(".header-panel nav a")].filter((link) => link.getAttribute("href").startsWith("#"));
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("is-current", link.hash === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) spy.observe(section);
  });
}

function setupMenu() {
  const toggle = document.getElementById("menuToggle");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".header-panel nav a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => event.key === "Escape" && closeMenu());
}

// ---------- boot ----------

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});
document.querySelector("[data-tab-list]")?.addEventListener("keydown", handleTabKeys);

renderSocialLists();
setupMenu();
setupHeaderScroll();
setupScrollSpy();
setLanguage(getInitialLanguage());
