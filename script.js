// Renders every page from content.js and wires up language, tabs, menu, contact form and scroll reveal.
// Each page sets <body data-page="..."> so only its own renderers run.

const STORAGE_KEY = "portfolioLanguage";
const SUPPORTED_LANGUAGES = ["en", "it"];
const ICON_SPRITE = "assets/icons.svg";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const currentPage = document.body.dataset.page || "home";

let currentLanguage = "en";
let activeExperienceId = experience[0].id;

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

// Small element factory to keep rendering code readable; falsy children are skipped.
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
  use.setAttribute("href", `${ICON_SPRITE}#icon-${name}`);
  svg.append(use);
  return svg;
}

// Replaces the children of the element matching `selector`, if that element exists on this page.
function fill(selector, children) {
  const target = document.querySelector(selector);
  if (target) target.replaceChildren(...children.filter(Boolean));
  return target;
}

function externalLink(href, children, options = {}) {
  return el("a", { href, target: "_blank", rel: "noopener", ...options }, children);
}

function tagList(items, className = "tag-list") {
  return el("ul", { className }, items.map((item) => el("li", { text: item })));
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
    { name: "github", href: profileLinks.github, label: "GitHub", external: true },
    { name: "linkedin", href: profileLinks.linkedin, label: "LinkedIn", external: true },
    { name: "whatsapp", href: profileLinks.whatsapp, label: "WhatsApp", external: true },
    { name: "mail", href: `mailto:${profileLinks.email}`, label: "Email", external: false }
  ];

  document.querySelectorAll("[data-social-list]").forEach((list) => {
    list.replaceChildren(
      ...items.map((item) => {
        const content = [icon(item.name)];
        const options = { "aria-label": item.label, className: "icon-button" };
        return el("li", {}, [item.external ? externalLink(item.href, content, options) : el("a", { href: item.href, ...options }, content)]);
      })
    );
  });
}

// ---------- home: hero & about ----------

function renderHeroCards() {
  fill("[data-focus-list]", localize(focusAreas).map((area) => el("li", { text: area })));
}

function renderAbout() {
  const languages = document.querySelector("[data-languages]");
  if (languages) languages.textContent = localize(languagesSpoken);

  fill(
    "[data-education-list]",
    education.map((item) =>
      el("li", {}, [
        el("span", { className: "facts-strong", text: localize(item.degree) }),
        el("span", { text: `${localize(item.school)} · ${item.dates}` })
      ])
    )
  );
}

// ---------- home: work ----------

// Decorative illustrations for project cards, drawn with CSS spans.
function projectVisual(kind) {
  const spanCount = { handheld: 6, receipt: 7, chart: 7, tasks: 7 };
  const visual = el("div", { className: `case-visual visual-${kind}`, "aria-hidden": "true" });
  for (let i = 0; i < spanCount[kind]; i += 1) visual.append(el("span"));
  return visual;
}

// Public projects link to their case study and code; work projects show a private-code note.
function caseCardFooter(project) {
  const title = localize(project.title);
  if (!project.caseStudy) {
    return el("p", { className: "case-private" }, [icon("lock"), document.createTextNode(t("work.private"))]);
  }
  return el("div", { className: "case-links" }, [
    project.repo && externalLink(project.repo, [icon("github")], { className: "icon-button", "aria-label": `${t("work.viewCode")}: ${title}` }),
    el("a", { className: "round-arrow", href: project.caseStudy, "aria-label": `${t("work.caseStudy")}: ${title}` }, [icon("arrow")])
  ]);
}

function renderFeaturedProjects() {
  fill(
    "[data-featured-list]",
    featuredProjects.map((project, index) =>
      el("article", { className: "case-card reveal" }, [
        projectVisual(project.visual),
        el("div", { className: "case-body" }, [
          el("p", { className: "case-index", text: String(index + 1).padStart(2, "0") }),
          el("h3", { className: "case-title" }, [
            project.caseStudy ? el("a", { href: project.caseStudy, text: localize(project.title) }) : document.createTextNode(localize(project.title))
          ]),
          el("p", { className: "case-subtitle", text: localize(project.subtitle) }),
          el("p", { className: "case-description", text: localize(project.description) }),
          el("div", { className: "case-footer" }, [tagList(project.tech), caseCardFooter(project)])
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
      return el("li", { className: "mini-card reveal" }, [
        el("div", { className: "mini-card-top" }, [
          icon("folder", "icon folder-icon"),
          project.link
            ? externalLink(project.link, [icon("github")], { className: "icon-button", "aria-label": `${t("work.viewCode")}: ${title}` })
            : icon("lock", "icon muted-icon")
        ]),
        el("h4", { className: "mini-card-title", text: title }),
        el("p", { text: localize(project.description) }),
        tagList(project.tech, "tag-list tag-list-plain")
      ]);
    })
  );
}

// ---------- home: services, process, beyond ----------

function renderServices() {
  fill(
    "[data-services-list]",
    services.map((service) =>
      el("li", { className: "service" }, [
        el("span", { className: "icon-ring" }, [icon(service.icon)]),
        el("h3", { text: localize(service.title) }),
        el("p", { text: localize(service.body) })
      ])
    )
  );

  fill(
    "[data-tool-grid]",
    tools.map((tool) =>
      el("li", { className: "tool", style: `--tint: ${tool.tint}` }, [
        el("span", { className: "tool-mark", text: tool.short, "aria-hidden": "true" }),
        el("span", { className: "tool-name", text: tool.name })
      ])
    )
  );
}

function renderProcess() {
  fill(
    "[data-process-steps]",
    processSteps.map((step, index) =>
      el("li", { className: "process-step reveal" }, [
        el("span", { className: "icon-ring icon-ring-large" }, [icon(step.icon)]),
        el("p", { className: "process-title" }, [
          el("span", { className: "process-index", text: String(index + 1).padStart(2, "0") }),
          document.createTextNode(localize(step.title))
        ]),
        el("p", { className: "process-body", text: localize(step.body) })
      ])
    )
  );
}

function renderBeyond() {
  fill(
    "[data-beyond-list]",
    beyondItems.map((item) =>
      el("li", { className: "glass-card beyond-card reveal" }, [
        el("span", { className: "icon-ring" }, [icon(item.icon)]),
        el("h3", { text: localize(item.title) }),
        el("p", { text: localize(item.description) })
      ])
    )
  );
}

// ---------- home: experience tabs ----------

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

  // Moves the highlight bar next to the selected tab.
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
          el("em", { text: `@ ${job.company}` })
        ]),
        el("p", { className: "job-meta", text: `${localize(job.dates)} · ${localize(job.location)}` }),
        el("ul", { className: "bullet-list job-bullets" }, localize(job.bullets).map((bullet) => el("li", { text: bullet })))
      ])
    )
  );

  tabList.querySelectorAll("[role=tab]").forEach((tab) => tab.addEventListener("click", () => selectExperience(tab.dataset.id)));
  selectExperience(activeExperienceId);
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

// ---------- home: contact ----------

function renderContactList() {
  fill("[data-contact-list]", [
    el("li", {}, [el("a", { href: `mailto:${profileLinks.email}` }, [icon("mail"), document.createTextNode(profileLinks.email)])]),
    el("li", {}, [externalLink(profileLinks.whatsapp, [icon("whatsapp"), document.createTextNode(`${t("contact.whatsapp")} · ${profileLinks.phoneDisplay}`)])]),
    el("li", {}, [el("span", {}, [icon("pin"), document.createTextNode(localize(profileLinks.location))])])
  ]);
}

// The form has no backend: it opens WhatsApp or the mail app with the message pre-filled.
function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const channel = event.submitter?.dataset.send || "whatsapp";
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    const text = [name && `${t("contact.greeting")} ${name}.`, message].filter(Boolean).join("\n\n");

    if (channel === "email") {
      const params = new URLSearchParams({ subject: t("contact.subject"), body: text });
      window.location.href = `mailto:${profileLinks.email}?${params.toString().replace(/\+/g, "%20")}`;
    } else {
      window.open(`${profileLinks.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    }
  });
}

function renderHome() {
  renderHeroCards();
  renderFeaturedProjects();
  renderOtherProjects();
  renderServices();
  renderAbout();
  renderExperience();
  renderProcess();
  renderBeyond();
  renderContactList();
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
      el("li", { className: "glass-card pt-feature reveal" }, [
        el("span", { className: "case-index", text: String(index + 1).padStart(2, "0") }),
        el("h3", { text: localize(feature.title) }),
        el("p", { text: localize(feature.body) })
      ])
    )
  );

  fill(
    "[data-pt-layers]",
    study.layers.map((layer) =>
      el("li", { className: "glass-card pt-layer reveal" }, [
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

  // Lets standalone widgets (e.g. game mode) re-translate their dynamic text.
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

// Adds a backdrop once scrolled, and hides the header while scrolling down (unless game mode needs it).
function setupHeaderScroll() {
  const header = document.getElementById("siteHeader");
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const keepVisible = document.body.classList.contains("menu-open");
      header.classList.toggle("is-scrolled", y > 10);
      header.classList.toggle("is-hidden", y > lastY && y > 120 && !keepVisible);
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
  document.querySelectorAll(".header-panel a").forEach((link) => link.addEventListener("click", closeMenu));
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
setupContactForm();
setLanguage(getInitialLanguage());
