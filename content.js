// Bilingual site content: UI strings, projects, experience and game text in one place.
// Edit this file to update the portfolio; script.js and gamemode.js only render it.

const profileLinks = {
  email: "ozcanbazbilge@gmail.com",
  phoneDisplay: "+39 339 204 7793",
  phone: "+393392047793",
  whatsapp: "https://wa.me/393392047793",
  github: "https://github.com/bilgaaaaa",
  linkedin: "https://www.linkedin.com/in/bilge-ozcanbaz-692652114",
  location: { en: "Padova, Italy", it: "Padova, Italia" }
};

const cvFiles = {
  en: { href: "assets/cv/Bilge_Ozcanbaz_CV_EN.pdf", fileName: "Bilge_Ozcanbaz_CV_EN.pdf" },
  it: { href: "assets/cv/Bilge_Ozcanbaz_CV_IT.pdf", fileName: "Bilge_Ozcanbaz_CV_IT.pdf" }
};

const translations = {
  en: {
    "meta.title": "Bilge Ozcanbaz | Software Developer",
    "meta.description":
      "Bilge Ozcanbaz is a software developer in Padova, Italy, building Android apps, .NET services, RabbitMQ integrations and retail device drivers.",
    "brand.role": "Software developer",
    "nav.label": "Primary navigation",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.beyond": "Beyond code",
    "nav.contact": "Contact",
    "nav.connect": "Let's connect",
    "nav.menu": "Open menu",
    "language.label": "Language selector",
    "social.label": "Social links",

    "hero.eyebrow": "Software developer",
    "hero.titleStart": "I build software that works",
    "hero.titleAccent": "on the shop floor.",
    "hero.intro":
      "Android apps that store teams use every day, and the .NET services, message queues and device drivers behind them — from a barcode scan on a handheld to the receipt the fiscal printer hands the customer.",
    "hero.work": "View my work",
    "hero.about": "About me",
    "hero.status": "Based in Padova, Italy",
    "hero.statusSub": "Building retail software at System Retail.",
    "hero.portraitAlt": "Portrait of Bilge Ozcanbaz",
    "hero.cardExperienceLabel": "Experience",
    "hero.cardExperienceValue": "4+ years",
    "hero.cardExperienceBody": "building retail and enterprise software",
    "hero.cardCraftLabel": "Building",
    "hero.cardCraftBody": "with care and curiosity.",
    "hero.cardFocusLabel": "Focus areas",

    "work.eyebrow": "Selected work",
    "work.titleStart": "Software that",
    "work.titleAccent": "quietly works",
    "work.titleEnd": "every day in stores.",
    "work.viewAll": "View on GitHub",
    "work.open": "Open",
    "work.caseStudy": "Read the case study",
    "work.viewCode": "View code",
    "work.private": "Private codebase",
    "work.moreTitle": "More things I've built",

    "services.eyebrow": "What I do",
    "services.titleStart": "End-to-end software,",
    "services.titleAccent": "from device to database.",
    "services.tools": "Tools I use",

    "about.eyebrow": "About me",
    "about.titleStart": "From Java backends",
    "about.titleAccent": "to the shop floor.",
    "about.p1":
      "I started as a Java backend developer, writing Spring Boot services for electronic invoicing and banking. Today I'm the sole developer of a production Android app for retail chains at System Retail, working directly with the product manager and owning features from the device all the way to the service behind it.",
    "about.p2":
      "When I joined, the app was pure Java. I moved it to Kotlin, rebuilt every screen in Jetpack Compose and migrated the local database from GreenDAO to Room on devices already in stores. The rest of my week goes to .NET microservices, RabbitMQ messaging and drivers for printers, scanners and customer displays.",
    "about.languagesLabel": "Languages",
    "about.educationLabel": "Education",
    "about.cv": "Download CV",

    "experience.eyebrow": "Experience",
    "experience.titleStart": "Where I've been",
    "experience.titleAccent": "building.",
    "experience.tabsLabel": "Companies",

    "process.eyebrow": "My process",
    "process.titleStart": "A",
    "process.titleAccent": "practical",
    "process.titleEnd": "approach to shipping software.",

    "beyond.eyebrow": "Beyond code",
    "beyond.titleStart": "What keeps me",
    "beyond.titleAccent": "curious.",

    "contact.side": "Let's connect",
    "contact.eyebrow": "Say hello",
    "contact.titleStart": "Let's build something",
    "contact.titleAccent": "meaningful",
    "contact.titleEnd": "together.",
    "contact.body":
      "Have a question, an idea, or just want to talk Android, .NET or retail tech? Write me — I'm always happy to connect.",
    "contact.whatsapp": "WhatsApp",
    "contact.nameLabel": "Your name",
    "contact.messageLabel": "Your message",
    "contact.messagePlaceholder": "Tell me what's on your mind",
    "contact.sendWhatsapp": "Send on WhatsApp",
    "contact.sendEmail": "Send by email",
    "contact.greeting": "Hi Bilge, I'm",
    "contact.subject": "Hello from your portfolio",

    "footer.tagline": "Building software that just works, one release at a time.",
    "footer.explore": "Explore",
    "footer.connect": "Let's connect",
    "footer.rights": "© 2026 Bilge Ozcanbaz",
    "footer.credit": "Inspired by gazijarin.com",
    "footer.top": "Back to top",

    "gameMode.toggle": "game mode",
    "gameMode.info": "How to play",
    "gameMode.howTo": "how to play",
    "gameMode.move": "move",
    "gameMode.jump": "jump",
    "gameMode.explore": "explore the page",
    "gameMode.goal": "Squash the 5 bugs hiding on the page. Jump across the text — every heading and paragraph is a platform.",
    "gameMode.counter": "bugs",
    "gameMode.fellTitle": "you fell",
    "gameMode.fellSub": "the bugs got away",
    "gameMode.retry": "try again",
    "gameMode.retryHint": "or press space",
    "gameMode.wonTitle": "all bugs squashed",
    "gameMode.wonSub": "5 of 5 fixed — ready to ship",
    "gameMode.again": "play again",
    "gameMode.left": "Move left",
    "gameMode.right": "Move right",
    "gameMode.jumpButton": "Jump",

    "pt.meta.title": "PaceTasks — case study | Bilge Ozcanbaz",
    "pt.meta.description": "PaceTasks: a task app for people with a fixed work schedule, built by Bilge Ozcanbaz with Expo, React Native, TypeScript and Supabase.",
    "pt.back": "Back to portfolio",
    "pt.eyebrow": "Personal project · in progress",
    "pt.tagline": "A task app for people with a fixed work schedule.",
    "pt.intro": "Capture a task the moment you think of it, knock it out before or after work, and compete only with your own past pace — not anyone else's.",
    "pt.roleLabel": "Role",
    "pt.roleValue": "Solo — product, design, mobile and backend",
    "pt.stackLabel": "Stack",
    "pt.statusLabel": "Status",
    "pt.statusValue": "In active development",
    "pt.problemTitle": "why I built it",
    "pt.problem1": "I work a fixed eight-hour day. Personal tasks pop into my head in the middle of it — book the dentist, pay a bill, call the bank — and most to-do apps ask for a title, a date, a priority and a list before they let me save anything.",
    "pt.problem2": "I wanted the opposite: a capture bar that never blocks, a list that knows whether something belongs before or after work, and stats that only compare me with myself.",
    "pt.featuresTitle": "what it does",
    "pt.architectureTitle": "how it's built",
    "pt.architectureLede": "Three layers, each with one job — so the upcoming Siri shortcut and AI Brain Dump can plug in without touching the screens.",
    "pt.decisionsTitle": "engineering decisions",
    "pt.nextTitle": "what's next",
    "pt.mockupLabel": "PaceTasks today screen, illustrated",
    "pt.cta": "View the code on GitHub",
  },
  it: {
    "meta.title": "Bilge Ozcanbaz | Sviluppatrice Software",
    "meta.description":
      "Bilge Ozcanbaz è una sviluppatrice software a Padova: app Android, servizi .NET, integrazioni RabbitMQ e driver per dispositivi retail.",
    "brand.role": "Sviluppatrice software",
    "nav.label": "Navigazione principale",
    "nav.work": "Progetti",
    "nav.about": "Chi sono",
    "nav.experience": "Esperienza",
    "nav.beyond": "Oltre il codice",
    "nav.contact": "Contatti",
    "nav.connect": "Parliamone",
    "nav.menu": "Apri menu",
    "language.label": "Selettore lingua",
    "social.label": "Link social",

    "hero.eyebrow": "Sviluppatrice software",
    "hero.titleStart": "Sviluppo software che funziona",
    "hero.titleAccent": "in negozio, ogni giorno.",
    "hero.intro":
      "App Android che i team di negozio usano ogni giorno, e i servizi .NET, le code di messaggi e i driver che ci stanno dietro — dalla lettura di un barcode sul palmare allo scontrino che la stampante fiscale consegna al cliente.",
    "hero.work": "Guarda i progetti",
    "hero.about": "Chi sono",
    "hero.status": "Vivo a Padova",
    "hero.statusSub": "Sviluppo software retail in System Retail.",
    "hero.portraitAlt": "Ritratto di Bilge Ozcanbaz",
    "hero.cardExperienceLabel": "Esperienza",
    "hero.cardExperienceValue": "4+ anni",
    "hero.cardExperienceBody": "di software retail ed enterprise",
    "hero.cardCraftLabel": "Sviluppo",
    "hero.cardCraftBody": "con cura e curiosità.",
    "hero.cardFocusLabel": "Aree di lavoro",

    "work.eyebrow": "Progetti scelti",
    "work.titleStart": "Software che",
    "work.titleAccent": "lavora in silenzio",
    "work.titleEnd": "ogni giorno nei negozi.",
    "work.viewAll": "Vedi su GitHub",
    "work.open": "Apri",
    "work.caseStudy": "Leggi il case study",
    "work.viewCode": "Vedi codice",
    "work.private": "Codice privato",
    "work.moreTitle": "Altri progetti",

    "services.eyebrow": "Cosa faccio",
    "services.titleStart": "Software completo,",
    "services.titleAccent": "dal dispositivo al database.",
    "services.tools": "Strumenti",

    "about.eyebrow": "Chi sono",
    "about.titleStart": "Dal backend Java",
    "about.titleAccent": "al negozio.",
    "about.p1":
      "Ho iniziato come sviluppatrice backend Java, scrivendo servizi Spring Boot per la fatturazione elettronica e il settore bancario. Oggi in System Retail sono l'unica sviluppatrice di un'app Android in produzione per catene retail: lavoro a stretto contatto con il product manager e seguo ogni funzionalità dal dispositivo fino al servizio che la supporta.",
    "about.p2":
      "Quando sono arrivata l'app era interamente in Java: l'ho migrata a Kotlin, ho ricostruito tutte le schermate in Jetpack Compose e ho portato il database locale da GreenDAO a Room su dispositivi già installati nei negozi. Il resto della settimana lo dedico a microservizi .NET, messaggistica RabbitMQ e driver per stampanti, scanner e display cliente.",
    "about.languagesLabel": "Lingue",
    "about.educationLabel": "Formazione",
    "about.cv": "Scarica il CV",

    "experience.eyebrow": "Esperienza",
    "experience.titleStart": "Dove ho",
    "experience.titleAccent": "costruito.",
    "experience.tabsLabel": "Aziende",

    "process.eyebrow": "Il mio metodo",
    "process.titleStart": "Un approccio",
    "process.titleAccent": "pratico",
    "process.titleEnd": "per rilasciare software.",

    "beyond.eyebrow": "Oltre il codice",
    "beyond.titleStart": "Cosa mi tiene",
    "beyond.titleAccent": "curiosa.",

    "contact.side": "Parliamone",
    "contact.eyebrow": "Scrivimi",
    "contact.titleStart": "Costruiamo qualcosa di",
    "contact.titleAccent": "significativo",
    "contact.titleEnd": "insieme.",
    "contact.body":
      "Hai una domanda, un'idea o vuoi parlare di Android, .NET o tecnologia per il retail? Scrivimi — mi fa sempre piacere conoscere persone nuove.",
    "contact.whatsapp": "WhatsApp",
    "contact.nameLabel": "Il tuo nome",
    "contact.messageLabel": "Il tuo messaggio",
    "contact.messagePlaceholder": "Raccontami cosa hai in mente",
    "contact.sendWhatsapp": "Invia su WhatsApp",
    "contact.sendEmail": "Invia per email",
    "contact.greeting": "Ciao Bilge, sono",
    "contact.subject": "Ciao dal tuo portfolio",

    "footer.tagline": "Software che funziona, un rilascio alla volta.",
    "footer.explore": "Esplora",
    "footer.connect": "Contatti",
    "footer.rights": "© 2026 Bilge Ozcanbaz",
    "footer.credit": "Ispirato a gazijarin.com",
    "footer.top": "Torna su",

    "gameMode.toggle": "modalità gioco",
    "gameMode.info": "Come si gioca",
    "gameMode.howTo": "come si gioca",
    "gameMode.move": "muoviti",
    "gameMode.jump": "salta",
    "gameMode.explore": "esplora la pagina",
    "gameMode.goal": "Schiaccia i 5 bug nascosti nella pagina. Salta sul testo — ogni titolo e paragrafo è una piattaforma.",
    "gameMode.counter": "bug",
    "gameMode.fellTitle": "Bilge è caduta",
    "gameMode.fellSub": "i bug sono scappati",
    "gameMode.retry": "riprova",
    "gameMode.retryHint": "o premi spazio",
    "gameMode.wonTitle": "tutti i bug schiacciati",
    "gameMode.wonSub": "5 su 5 risolti — pronto per il rilascio",
    "gameMode.again": "gioca ancora",
    "gameMode.left": "Vai a sinistra",
    "gameMode.right": "Vai a destra",
    "gameMode.jumpButton": "Salta",

    "pt.meta.title": "PaceTasks — case study | Bilge Ozcanbaz",
    "pt.meta.description": "PaceTasks: un'app di attività per chi ha un orario di lavoro fisso, sviluppata da Bilge Ozcanbaz con Expo, React Native, TypeScript e Supabase.",
    "pt.back": "Torna al portfolio",
    "pt.eyebrow": "Progetto personale · in corso",
    "pt.tagline": "Un'app di attività per chi ha un orario di lavoro fisso.",
    "pt.intro": "Annota un'attività nel momento in cui ti viene in mente, completala prima o dopo il lavoro e competi solo con il tuo ritmo passato — non con quello degli altri.",
    "pt.roleLabel": "Ruolo",
    "pt.roleValue": "Da sola — prodotto, design, mobile e backend",
    "pt.stackLabel": "Stack",
    "pt.statusLabel": "Stato",
    "pt.statusValue": "In sviluppo attivo",
    "pt.problemTitle": "perché l'ho creata",
    "pt.problem1": "Lavoro otto ore al giorno con orario fisso. Le cose personali mi vengono in mente proprio nel mezzo — prenotare il dentista, pagare una bolletta, chiamare la banca — e la maggior parte delle app chiede titolo, data, priorità e lista prima di salvare qualcosa.",
    "pt.problem2": "Volevo l'opposto: una barra di inserimento che non blocca mai, una lista che sa se un'attività va fatta prima o dopo il lavoro, e statistiche che mi confrontano solo con me stessa.",
    "pt.featuresTitle": "cosa fa",
    "pt.architectureTitle": "come è costruita",
    "pt.architectureLede": "Tre livelli, ciascuno con un solo compito — così la scorciatoia Siri e l'AI Brain Dump in arrivo si collegano senza toccare le schermate.",
    "pt.decisionsTitle": "scelte tecniche",
    "pt.nextTitle": "prossimi passi",
    "pt.mockupLabel": "Schermata Oggi di PaceTasks, illustrata",
    "pt.cta": "Vedi il codice su GitHub",
  }
};

// Short labels for the hero "focus areas" card.
const focusAreas = {
  en: ["Android apps", ".NET services", "Device drivers", "Messaging & data"],
  it: ["App Android", "Servizi .NET", "Driver per dispositivi", "Messaggistica e dati"]
};

// Case-study cards in "Selected work"; `visual` picks the CSS illustration.
const featuredProjects = [
  {
    id: "smart",
    title: "ONEStore SMART",
    subtitle: { en: "Retail handheld app", it: "App per palmari retail" },
    visual: "handheld",
    tech: ["Kotlin", "Compose", "Room"],
    description: {
      en: "The Android app store staff use for inventory, receiving, price checks and label printing — moved from Java + GreenDAO to Kotlin, Compose and Room without breaking devices in the field.",
      it: "L'app Android per inventari, ricevimento merci, verifica prezzi e stampa etichette — portata da Java + GreenDAO a Kotlin, Compose e Room senza fermare i dispositivi in campo."
    }
  },
  {
    id: "pos-drivers",
    title: { en: "POS drivers", it: "Driver di cassa" },
    subtitle: { en: "Printers, scanners, displays", it: "Stampanti, scanner, display" },
    visual: "receipt",
    tech: ["C#", ".NET", "TCP / serial"],
    description: {
      en: "Direct drivers replacing OPOS for fiscal and receipt printers, scanners and customer displays — payment tenders, logos and CRC-checked image transfer, verified on real hardware.",
      it: "Driver diretti al posto di OPOS per stampanti fiscali e di scontrini, scanner e display cliente — forme di pagamento, loghi e trasferimento immagini con CRC, verificati su hardware reale."
    }
  },
  {
    id: "analytics",
    title: { en: "Store analytics", it: "Analisi negozi" },
    subtitle: { en: "Multi-store web app", it: "Web app multi-negozio" },
    visual: "chart",
    tech: ["Blazor", "DevExpress", "SQL Server"],
    description: {
      en: "A Blazor and DevExpress web app, now in production, that lets retail chains analyse and compare performance across their stores.",
      it: "Un'applicazione web Blazor e DevExpress, oggi in produzione, per analizzare e confrontare le performance dei negozi di una catena."
    }
  },
  {
    id: "pacetasks",
    title: "PaceTasks",
    subtitle: { en: "Personal mobile app", it: "App mobile personale" },
    visual: "tasks",
    caseStudy: "pacetasks.html",
    repo: "https://github.com/bilgaaaaa/pacetasks",
    tech: ["Expo", "TypeScript", "Supabase"],
    description: {
      en: "My own task app for people with a fixed work schedule: quick capture that never blocks, a timer that learns how long tasks really take, and stats that compare you only with yourself.",
      it: "La mia app di attività per chi ha un orario fisso: inserimento rapido che non blocca mai, un timer che impara quanto durano davvero le attività e statistiche che misurano solo i tuoi progressi."
    }
  }
];

const otherProjects = [
  {
    title: { en: "Handheld sync service", it: "Sincronizzazione palmari" },
    tech: [".NET", "RabbitMQ", "EF Core"],
    description: {
      en: "The daemon that turns handheld messages into back-office documents, with server-side deduplication of inventory documents.",
      it: "Il demone che trasforma i messaggi dei palmari in documenti di back-office, con deduplicazione lato server degli inventari."
    }
  },
  {
    title: "Invoice Channel",
    tech: ["Java 17", "Spring Boot", "Maven"],
    description: {
      en: "Electronic invoicing microservices with ERP integration: Ant → Maven, Java 8 → 17 and legal-archive integration.",
      it: "Microservizi di fatturazione elettronica integrati con gli ERP: Ant → Maven, Java 8 → 17 e conservazione sostitutiva."
    }
  },
  {
    title: { en: "Credit limit calculator", it: "Calcolo del fido" },
    tech: ["Spring Boot", "Hibernate"],
    description: {
      en: "A banking application with user data management, a credit limit calculator and secure authentication.",
      it: "Un'applicazione bancaria con gestione dati utente, calcolo del fido e autenticazione sicura."
    }
  },
  {
    title: { en: "Remote test automation", it: "Automazione test remota" },
    tech: ["Test automation", "Remote browsers"],
    description: {
      en: "My MSc thesis: moving browser tests from local machines to remote browsers, cutting testing effort by 25%.",
      it: "La mia tesi magistrale: test spostati da browser locali a remoti, con il 25% di sforzo in meno."
    }
  },
  {
    title: { en: "This portfolio", it: "Questo portfolio" },
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/bilgaaaaa/bilge-portfolio",
    description: {
      en: "A dependency-free, bilingual static site — with a game mode hidden in the corner.",
      it: "Un sito statico bilingue senza dipendenze — con una modalità gioco nascosta nell'angolo."
    }
  }
];

// "What I do" columns; `icon` refers to a symbol in assets/icons.svg.
const services = [
  {
    icon: "phone",
    title: { en: "Android apps", it: "App Android" },
    body: { en: "Kotlin, Jetpack Compose and Room apps that keep working offline on busy shop floors.", it: "App Kotlin, Jetpack Compose e Room che funzionano anche offline nei negozi." }
  },
  {
    icon: "server",
    title: { en: "Backend services", it: "Servizi backend" },
    body: { en: ".NET and Spring Boot services and REST APIs behind the devices.", it: "Servizi .NET e Spring Boot e API REST dietro ai dispositivi." }
  },
  {
    icon: "printer",
    title: { en: "Device integration", it: "Integrazione dispositivi" },
    body: { en: "Drivers for fiscal printers, scanners and customer displays over TCP and serial.", it: "Driver per stampanti fiscali, scanner e display cliente via TCP e seriale." }
  },
  {
    icon: "flow",
    title: { en: "Messaging & data", it: "Messaggistica e dati" },
    body: { en: "RabbitMQ pipelines and SQL databases connecting stores to the back office.", it: "Pipeline RabbitMQ e database SQL che collegano i negozi al back-office." }
  }
];

// Tool tiles: a short monogram and a tint from the palette.
const tools = [
  { short: "Kt", name: "Kotlin", tint: "#854F6C" },
  { short: "Jc", name: "Compose", tint: "#522B5B" },
  { short: "Jv", name: "Java", tint: "#DFB6B2" },
  { short: "C#", name: "C#", tint: "#854F6C" },
  { short: ".N", name: ".NET", tint: "#522B5B" },
  { short: "Bz", name: "Blazor", tint: "#DFB6B2" },
  { short: "Sq", name: "SQL", tint: "#854F6C" },
  { short: "Mq", name: "RabbitMQ", tint: "#522B5B" },
  { short: "Dk", name: "Docker", tint: "#DFB6B2" }
];

const processSteps = [
  {
    icon: "search",
    title: { en: "Understand", it: "Capire" },
    body: { en: "Learn the real workflow and the people who depend on it.", it: "Capire il flusso reale e chi ci lavora ogni giorno." }
  },
  {
    icon: "pen",
    title: { en: "Design", it: "Progettare" },
    body: { en: "Map the data flow and the edge cases before writing code.", it: "Disegnare il flusso dei dati e i casi limite prima del codice." }
  },
  {
    icon: "code",
    title: { en: "Build", it: "Sviluppare" },
    body: { en: "Small, reviewable steps with clean and consistent naming.", it: "Passi piccoli e revisionabili, con nomi chiari e coerenti." }
  },
  {
    icon: "check",
    title: { en: "Test", it: "Testare" },
    body: { en: "Unit tests, then real hardware on the bench — not just the emulator.", it: "Test unitari, poi hardware reale sul banco — non solo l'emulatore." }
  },
  {
    icon: "rocket",
    title: { en: "Ship & support", it: "Rilasciare e supportare" },
    body: { en: "Release, watch the logs and fix fast in production.", it: "Rilasciare, leggere i log e correggere in fretta in produzione." }
  }
];

const beyondItems = [
  {
    icon: "climb",
    title: { en: "Climbing", it: "Arrampicata" },
    description: {
      en: "Bouldering problems are just debugging with chalk: read the route, try, fall, adjust.",
      it: "Un blocco di boulder è debugging con la magnesite: leggi la via, prova, cadi, correggi."
    }
  },
  {
    icon: "yarn",
    title: { en: "Crochet & knitting", it: "Uncinetto e maglia" },
    description: {
      en: "Patterns, loops and the occasional off-by-one stitch — the most relaxing kind of code.",
      it: "Schemi, cicli e ogni tanto un punto sbagliato di uno — il codice più rilassante che ci sia."
    }
  },
  {
    icon: "card",
    title: { en: "A card collection", it: "Una collezione di biglietti" },
    description: {
      en: "Business cards from every restaurant and pasticceria in Italy worth remembering.",
      it: "Biglietti da visita di ogni ristorante e pasticceria d'Italia che vale la pena ricordare."
    }
  }
];

const languagesSpoken = {
  en: "Turkish (native) · English (professional) · Italian (B1–B2, daily at work)",
  it: "Turco (madrelingua) · Inglese (professionale) · Italiano (B1–B2, uso quotidiano al lavoro)"
};

const experience = [
  {
    id: "system-retail",
    tab: "System Retail",
    company: "System Retail",
    location: { en: "Padova, Italy", it: "Padova" },
    role: { en: "Software Development Specialist", it: "Software Development Specialist" },
    dates: { en: "Jun 2024 – Present", it: "Giu 2024 – Oggi" },
    bullets: {
      en: [
        "Sole developer of a production Android app for retail chains, working directly with the product manager and owning delivery end to end.",
        "Migrated the app from Java to Kotlin and rebuilt the entire screen layer in Jetpack Compose with an MVVM architecture.",
        "Planned and shipped the local database migration from GreenDAO to Room, including SQLite schema migrations on devices already in the field.",
        "Build and maintain .NET (C#) microservices, REST APIs and a RabbitMQ pipeline connecting handhelds, in-store POS and back-office services.",
        "Write drivers for Epson and Custom peripherals — fiscal and receipt printers, barcode scanners and customer displays — over TCP and serial.",
        "Developed a Blazor + DevExpress web app, now in production, for multi-store performance analysis; support releases with Azure Pipelines and Docker."
      ],
      it: [
        "Unica sviluppatrice di un'app Android in produzione per catene retail, in diretto raccordo con il product manager e responsabile della consegna end to end.",
        "Ho migrato l'app da Java a Kotlin e ricostruito l'intero livello di interfaccia in Jetpack Compose con architettura MVVM.",
        "Ho pianificato e realizzato la migrazione del database locale da GreenDAO a Room, incluse le migrazioni di schema SQLite sui dispositivi già in campo.",
        "Sviluppo e mantengo microservizi .NET (C#), API REST e una pipeline RabbitMQ che collega palmari, casse in negozio e servizi di back-office.",
        "Scrivo driver per periferiche Epson e Custom — stampanti fiscali e di scontrini, scanner barcode e display cliente — via TCP e seriale.",
        "Ho sviluppato un'applicazione web Blazor + DevExpress, oggi in produzione, per l'analisi delle performance multi-negozio; supporto i rilasci con Azure Pipelines e Docker."
      ]
    }
  },
  {
    id: "ifin",
    tab: "Ifin Sistemi",
    company: "Ifin Sistemi",
    location: { en: "Padova, Italy", it: "Padova" },
    role: { en: "Software Developer", it: "Sviluppatrice Software" },
    dates: { en: "Mar 2023 – Apr 2024", it: "Mar 2023 – Apr 2024" },
    bullets: {
      en: [
        "Backend development on Invoice Channel, an electronic invoicing platform built as Java microservices with ERP integration (Spring Boot, Hibernate, PostgreSQL, MySQL).",
        "Migrated the build system from Ant to Maven and upgraded the platform from Java 8 to Java 17.",
        "Implemented the integration with legal archiving software to support digital preservation compliance.",
        "Wrote unit and UI tests, fixed critical production bugs and improved the client onboarding workflow in an Agile team."
      ],
      it: [
        "Sviluppo backend su Invoice Channel, piattaforma di fatturazione elettronica a microservizi Java integrata con gli ERP (Spring Boot, Hibernate, PostgreSQL, MySQL).",
        "Ho migrato il sistema di build da Ant a Maven e aggiornato la piattaforma da Java 8 a Java 17.",
        "Ho realizzato l'integrazione con il software di conservazione sostitutiva per la conformità normativa.",
        "Ho scritto test unitari e di interfaccia, risolto bug critici in produzione e migliorato l'onboarding dei clienti in un team Agile."
      ]
    }
  },
  {
    id: "iason",
    tab: "Iason",
    company: "Iason",
    location: { en: "Milan, Italy", it: "Milano" },
    role: { en: "Intern Developer", it: "Sviluppatrice (stage)" },
    dates: { en: "Sep 2022 – Jan 2023", it: "Set 2022 – Gen 2023" },
    bullets: {
      en: [
        "Built a Spring Boot and Hibernate application for a banking system: user data management, a credit limit calculator, authentication and secure access configuration."
      ],
      it: [
        "Ho sviluppato un'applicazione Spring Boot e Hibernate per un sistema bancario: gestione dati utente, calcolo del fido, autenticazione e configurazione degli accessi sicuri."
      ]
    }
  },
  {
    id: "ifin-thesis",
    tab: "Ifin (MSc thesis)",
    company: "Ifin Sistemi",
    location: { en: "Padova, Italy", it: "Padova" },
    role: { en: "Intern — MSc thesis project", it: "Stage — progetto di tesi magistrale" },
    dates: { en: "Feb 2022 – Jul 2022", it: "Feb 2022 – Lug 2022" },
    bullets: {
      en: [
        "Improved test automation for the electronic invoicing software, moving test execution from local to remote browsers and increasing testing efficiency by 25%.",
        "Contributed to documentation and cross-team QA activities."
      ],
      it: [
        "Ho migliorato l'automazione dei test del software di fatturazione elettronica, spostando l'esecuzione da browser locali a remoti con un aumento del 25% dell'efficienza.",
        "Ho contribuito alla documentazione e alle attività di QA tra team."
      ]
    }
  }
];

const education = [
  {
    degree: { en: "MSc, ICT for Internet and Multimedia", it: "Laurea Magistrale in ICT for Internet and Multimedia" },
    school: { en: "University of Padova", it: "Università degli Studi di Padova" },
    dates: "2020 – 2022"
  },
  {
    degree: { en: "BSc, Electrical & Electronics Engineering", it: "Laurea in Ingegneria Elettrica ed Elettronica" },
    school: { en: "University of Turkish Aeronautical Association, Ankara", it: "University of Turkish Aeronautical Association, Ankara" },
    dates: "2014 – 2018"
  }
];

const pacetasksCaseStudy = {
  repo: "https://github.com/bilgaaaaa/pacetasks",
  stack: ["Expo SDK 57", "React Native 0.86", "TypeScript", "Supabase", "Postgres + RLS", "Realtime", "Jest", "pgTAP"],
  mockup: {
    greeting: { en: "Tuesday · good morning", it: "Martedì · buongiorno" },
    title: { en: "Today", it: "Oggi" },
    placeholder: { en: "What's on your mind?", it: "Cosa ti viene in mente?" },
    tasks: [
      { title: { en: "Book the dentist", it: "Prenotare il dentista" }, meta: { en: "Before work · 10 min", it: "Prima del lavoro · 10 min" }, category: "health" },
      { title: { en: "Groceries", it: "Spesa" }, meta: { en: "After work · 25–40 min", it: "Dopo il lavoro · 25–40 min" }, category: "shopping", running: true },
      { title: { en: "Portfolio: add case study", it: "Portfolio: aggiungere case study" }, meta: { en: "After work · 18:30", it: "Dopo il lavoro · 18:30" }, category: "personal", focus: true },
      { title: { en: "Pay the electricity bill", it: "Pagare la bolletta" }, meta: { en: "Anytime · 5 min", it: "Quando vuoi · 5 min" }, category: "home", done: true }
    ],
    tabs: { en: ["Tasks", "Stats", "Settings"], it: ["Attività", "Statistiche", "Impostazioni"] }
  },
  features: [
    {
      title: { en: "Quick add with memory", it: "Inserimento rapido con memoria" },
      body: {
        en: "Only the name is needed. Type a task you've done before and it autocompletes, then fills in its usual timing and suggests its min / last / max time.",
        it: "Serve solo il nome. Se scrivi un'attività già fatta, viene completata in automatico con la sua fascia abituale e il tempo minimo / ultimo / massimo."
      }
    },
    {
      title: { en: "Range timer", it: "Timer a intervallo" },
      body: {
        en: "Tap the minutes pill to count down from the time a task usually takes at most. It turns green once you pass the minimum, so you know you're on pace.",
        it: "Tocca i minuti per un conto alla rovescia dal tempo massimo abituale. Diventa verde quando superi il minimo, così sai di essere nei tempi."
      }
    },
    {
      title: { en: "Focus sessions", it: "Sessioni di concentrazione" },
      body: {
        en: "Give a task a fixed time and it becomes a Pomodoro focus session with a full-screen countdown that logs the real minutes spent.",
        it: "Assegna un orario fisso e l'attività diventa una sessione Pomodoro a schermo intero che registra i minuti reali."
      }
    },
    {
      title: { en: "One calm list", it: "Una sola lista tranquilla" },
      body: {
        en: "Today's tasks ordered before work → anytime → after work. Finished ones sink to the bottom; future ones stay hidden until their day.",
        it: "Le attività di oggi ordinate prima del lavoro → quando vuoi → dopo il lavoro. Quelle completate scendono in fondo, quelle future restano nascoste fino al loro giorno."
      }
    },
    {
      title: { en: "Your pace", it: "Il tuo ritmo" },
      body: {
        en: "Streaks, best day, estimate accuracy and a 13-week weekday heatmap — the only competitor is you.",
        it: "Serie, giorno migliore, precisione delle stime e una mappa di 13 settimane — gareggi solo contro il tuo passato."
      }
    },
    {
      title: { en: "Live sync", it: "Sincronizzazione live" },
      body: {
        en: "Tasks added from another device appear instantly through Supabase Realtime, without duplicates from your own writes.",
        it: "Le attività aggiunte da un altro dispositivo compaiono subito grazie a Supabase Realtime, senza duplicati delle proprie scritture."
      }
    }
  ],
  layers: [
    {
      name: { en: "App", it: "App" },
      detail: { en: "Screens → hooks → API modules", it: "Schermate → hook → moduli API" },
      items: ["TaskListScreen", "useTasks · useSettings", "tasksApi · settingsApi"]
    },
    {
      name: { en: "Shared domain", it: "Dominio condiviso" },
      detail: { en: "Pure TypeScript, no dependencies", it: "TypeScript puro, senza dipendenze" },
      items: ["task model", "local dates", "task history"]
    },
    {
      name: { en: "Supabase", it: "Supabase" },
      detail: { en: "Postgres, RLS, Realtime", it: "Postgres, RLS, Realtime" },
      items: ["create_task RPC", "migrations", "pgTAP tests"]
    }
  ],
  decisions: [
    {
      en: "One way in: every task is created through a single create_task database function, so the app, the upcoming Siri shortcut and AI Brain Dump all share the same rules.",
      it: "Un solo ingresso: ogni attività nasce da un'unica funzione create_task nel database, così app, scorciatoia Siri e AI Brain Dump condividono le stesse regole."
    },
    {
      en: "Domain logic lives in a pure TypeScript module that both the React Native app and Supabase Edge Functions import — one source of truth for what \"today\" means.",
      it: "La logica di dominio vive in un modulo TypeScript puro importato sia dall'app React Native sia dalle Edge Function di Supabase — un'unica fonte di verità su cosa significa \"oggi\"."
    },
    {
      en: "\"Today\" is always the phone's local calendar day, never a UTC slice — tests run pinned to Europe/Rome to catch midnight bugs.",
      it: "\"Oggi\" è sempre il giorno locale del telefono, mai una data UTC — i test girano con fuso Europe/Rome per scovare i bug di mezzanotte."
    },
    {
      en: "No login screen: each device signs in anonymously, row-level security isolates every user, and only the publishable key ships in the app.",
      it: "Nessuna schermata di login: ogni dispositivo accede in modo anonimo, la row-level security isola ogni utente e nell'app c'è solo la chiave pubblica."
    },
    {
      en: "Screens stay dumb: all data access goes through hooks and API modules, and every colour and spacing value comes from one theme file.",
      it: "Schermate semplici: l'accesso ai dati passa solo da hook e moduli API, e ogni colore e spaziatura arriva da un unico file di tema."
    }
  ],
  next: [
    {
      en: "AI Brain Dump — type or say everything on your mind and get it back as sorted tasks.",
      it: "AI Brain Dump — scrivi o detta tutto quello che hai in testa e ricevilo come attività già ordinate."
    },
    {
      en: "Siri shortcut — \"Hey Siri, add groceries after work\".",
      it: "Scorciatoia Siri — \"Ehi Siri, aggiungi la spesa dopo il lavoro\"."
    }
  ]
};
