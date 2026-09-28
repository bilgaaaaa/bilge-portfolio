// Bilingual site content: UI strings, experience, education and projects in one place.
// Edit this file to update the portfolio text; script.js only renders it.

const profileLinks = {
  email: "ozcanbazbilge@gmail.com",
  github: "https://github.com/bilgaaaaa",
  linkedin: "https://www.linkedin.com/in/bilge-ozcanbaz-692652114",
  tiktok: "https://www.tiktok.com/@bilgalog"
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
    "nav.label": "Primary navigation",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.work": "Software",
    "nav.beyond": "Beyond code",
    "nav.contact": "Contact",
    "nav.menu": "Open menu",
    "language.label": "Language selector",
    "social.label": "Social links",
    "hero.greeting": [{ text: "hi, " }, { text: "bilge", accent: true }, { text: " here." }],
    "hero.subtitle": "I build software that has to work on the shop floor.",
    "hero.intro":
      "I'm a software developer in Padova, Italy. I build the Android app store teams use every day, and the .NET services, message queues and device drivers behind it — from a barcode scan on a handheld to the receipt the fiscal printer hands the customer.",
    "hero.cta": "Say hi",
    "hero.cv": "Download CV",
    "about.title": "about me",
    "about.p1":
      "I started as a Java backend developer, writing Spring Boot services for electronic invoicing and banking. Today I'm the sole developer of a production Android app for retail chains at System Retail, working directly with the product manager and owning features from the device all the way to the service behind it.",
    "about.p2":
      "When I joined, the app was pure Java. I moved it to Kotlin, rebuilt every screen in Jetpack Compose and migrated the local database from GreenDAO to Room on devices already in stores. The rest of my week goes to .NET microservices, RabbitMQ messaging and drivers for printers, scanners and customer displays.",
    "about.p3": "Here are some technologies I've been working with:",
    "about.p4":
      "Outside of work I climb, crochet, and collect business cards from the restaurants and pasticcerie I love around Italy.",
    "about.photoAlt": "Portrait of Bilge Ozcanbaz",
    "experience.title": "experience",
    "experience.tabsLabel": "Companies",
    "education.title": "education",
    "work.title": "software creations",
    "work.featuredLabel": "Featured project",
    "work.otherTitle": "other things I've built",
    "work.privateNote": "Private codebase — details shared in interviews.",
    "work.viewCode": "View code",
    "work.caseStudy": "Read the case study",
    "work.personalLabel": "Personal project",
    "nav.home": "Home",
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
    "beyond.title": "beyond code",
    "beyond.lede": "The things that keep me curious when the IDE is closed.",
    "contact.eyebrow": "What's next?",
    "contact.title": "Get in touch",
    "contact.body":
      "I'm interested in Android, backend and product engineering roles where mobile and services sit close together — remote-first or hybrid from Padova. My inbox is always open, whether it's a role, a question or just to say hi.",
    "contact.cta": "Say hello",
    "footer.body": "Designed and built by Bilge Ozcanbaz · Inspired by gazijarin.com",
    "footer.top": "Back to top"
  },
  it: {
    "meta.title": "Bilge Ozcanbaz | Sviluppatrice Software",
    "meta.description":
      "Bilge Ozcanbaz è una sviluppatrice software a Padova: app Android, servizi .NET, integrazioni RabbitMQ e driver per dispositivi retail.",
    "nav.label": "Navigazione principale",
    "nav.about": "Chi sono",
    "nav.experience": "Esperienza",
    "nav.work": "Software",
    "nav.beyond": "Oltre il codice",
    "nav.contact": "Contatti",
    "nav.menu": "Apri menu",
    "language.label": "Selettore lingua",
    "social.label": "Link social",
    "hero.greeting": [{ text: "ciao, sono " }, { text: "bilge", accent: true }, { text: "." }],
    "hero.subtitle": "Sviluppo software che deve funzionare in negozio.",
    "hero.intro":
      "Sono una sviluppatrice software a Padova. Sviluppo l'app Android che i team di negozio usano ogni giorno, insieme ai servizi .NET, alle code di messaggi e ai driver che ci stanno dietro — dalla lettura di un barcode sul palmare allo scontrino che la stampante fiscale consegna al cliente.",
    "hero.cta": "Scrivimi",
    "hero.cv": "Scarica CV",
    "about.title": "chi sono",
    "about.p1":
      "Ho iniziato come sviluppatrice backend Java, scrivendo servizi Spring Boot per la fatturazione elettronica e il settore bancario. Oggi in System Retail sono l'unica sviluppatrice di un'app Android in produzione per catene retail: lavoro a stretto contatto con il product manager e seguo ogni funzionalità dal dispositivo fino al servizio che la supporta.",
    "about.p2":
      "Quando sono arrivata l'app era interamente in Java: l'ho migrata a Kotlin, ho ricostruito tutte le schermate in Jetpack Compose e ho portato il database locale da GreenDAO a Room su dispositivi già installati nei negozi. Il resto della settimana lo dedico a microservizi .NET, messaggistica RabbitMQ e driver per stampanti, scanner e display cliente.",
    "about.p3": "Alcune tecnologie con cui lavoro:",
    "about.p4":
      "Fuori dal lavoro arrampico, lavoro all'uncinetto e colleziono i biglietti da visita dei ristoranti e delle pasticcerie che amo in giro per l'Italia.",
    "about.photoAlt": "Ritratto di Bilge Ozcanbaz",
    "experience.title": "esperienza",
    "experience.tabsLabel": "Aziende",
    "education.title": "formazione",
    "work.title": "progetti software",
    "work.featuredLabel": "Progetto in evidenza",
    "work.otherTitle": "altri progetti",
    "work.privateNote": "Codice privato — dettagli disponibili in colloquio.",
    "work.viewCode": "Vedi codice",
    "work.caseStudy": "Leggi il case study",
    "work.personalLabel": "Progetto personale",
    "nav.home": "Home",
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
    "beyond.title": "oltre il codice",
    "beyond.lede": "Quello che mi tiene curiosa quando l'IDE è chiuso.",
    "contact.eyebrow": "E adesso?",
    "contact.title": "Contattami",
    "contact.body":
      "Mi interessano ruoli Android, backend e product engineering dove mobile e servizi lavorano fianco a fianco — full remote o ibridi da Padova. Scrivimi per un'opportunità, una domanda o anche solo per un saluto.",
    "contact.cta": "Scrivimi",
    "footer.body": "Progettato e sviluppato da Bilge Ozcanbaz · Ispirato a gazijarin.com",
    "footer.top": "Torna su"
  }
};

const technologies = [
  "Kotlin & Jetpack Compose",
  "Java & Spring Boot",
  "C# / .NET 8",
  "Room & SQLite",
  "Blazor & DevExpress",
  "SQL Server & PostgreSQL",
  "RabbitMQ",
  "Docker & Azure Pipelines"
];

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

const featuredProjects = [
  {
    id: "smart",
    title: "ONEStore SMART",
    visual: "handheld",
    tech: ["Kotlin", "Jetpack Compose", "Room", "RabbitMQ", "Ktor"],
    description: {
      en: "The handheld Android app store staff use for inventory, receiving, price checks, label printing and stock movements. I took it from Java + GreenDAO to Kotlin, Compose and Room without breaking the devices already in the field.",
      it: "L'app Android per palmari usata dal personale di negozio per inventari, ricevimento merci, verifica prezzi, stampa etichette e movimenti di magazzino. L'ho portata da Java + GreenDAO a Kotlin, Compose e Room senza interrompere i dispositivi già in campo."
    }
  },
  {
    id: "pos-drivers",
    title: { en: "POS device drivers", it: "Driver per dispositivi di cassa" },
    visual: "receipt",
    tech: ["C#", ".NET", "Spring.NET", "TCP / serial"],
    description: {
      en: "Direct drivers that replace OPOS for fiscal printers, receipt printers, scanners and customer displays in the OneStore POS — payment tenders, printer status, logos and a CRC-checked image transfer, all verified on real hardware.",
      it: "Driver diretti che sostituiscono OPOS per stampanti fiscali, stampanti di scontrini, scanner e display cliente nella cassa OneStore — forme di pagamento, stato stampante, loghi e trasferimento immagini con verifica CRC, tutto verificato su hardware reale."
    }
  },
  {
    id: "analytics",
    title: { en: "Multi-store analytics", it: "Analisi multi-negozio" },
    visual: "chart",
    tech: ["Blazor", "DevExpress", "EF Core", "SQL Server"],
    description: {
      en: "A Blazor and DevExpress web app, now in production, that lets retail chains analyse and compare performance across their stores.",
      it: "Un'applicazione web Blazor e DevExpress, oggi in produzione, che permette alle catene retail di analizzare e confrontare le performance dei propri negozi."
    }
  },
  {
    id: "pacetasks",
    title: "PaceTasks",
    visual: "tasks",
    personal: true,
    caseStudy: "pacetasks.html",
    repo: "https://github.com/bilgaaaaa/pacetasks",
    tech: ["Expo", "React Native", "TypeScript", "Supabase"],
    description: {
      en: "My own mobile app: a calm task list for people with a fixed work schedule. Quick capture that never blocks, a timer that learns how long each task really takes, and stats that only compare you with yourself.",
      it: "La mia app mobile: una lista di attività tranquilla per chi ha un orario di lavoro fisso. Inserimento rapido che non blocca mai, un timer che impara quanto dura davvero ogni attività e statistiche che ti confrontano solo con te stessa."
    }
  }
];

const otherProjects = [
  {
    title: { en: "Handheld sync service", it: "Servizio di sincronizzazione palmari" },
    tech: [".NET", "RabbitMQ", "EF Core"],
    description: {
      en: "The daemon that turns handheld messages into back-office documents. Fixed duplicate inventory documents with server-side deduplication.",
      it: "Il demone che trasforma i messaggi dei palmari in documenti di back-office. Ho eliminato i documenti di inventario duplicati con una deduplicazione lato server."
    }
  },
  {
    title: "Invoice Channel",
    tech: ["Java 17", "Spring Boot", "Hibernate", "Maven"],
    description: {
      en: "Electronic invoicing microservices with ERP integration. Led the Ant → Maven and Java 8 → 17 upgrade and added legal-archive integration.",
      it: "Microservizi di fatturazione elettronica integrati con gli ERP. Ho guidato il passaggio Ant → Maven e Java 8 → 17 e aggiunto l'integrazione con la conservazione sostitutiva."
    }
  },
  {
    title: { en: "Credit limit calculator", it: "Calcolo del fido" },
    tech: ["Spring Boot", "Hibernate", "Java"],
    description: {
      en: "A banking application with user data management, a credit limit calculator and secure authentication, built during my internship at Iason.",
      it: "Un'applicazione bancaria con gestione dati utente, calcolo del fido e autenticazione sicura, sviluppata durante lo stage in Iason."
    }
  },
  {
    title: { en: "Remote test automation", it: "Automazione test remota" },
    tech: ["Test automation", "Remote browsers"],
    description: {
      en: "My MSc thesis: moving browser test execution from local machines to remote browsers, cutting testing effort by 25%.",
      it: "La mia tesi magistrale: spostare l'esecuzione dei test da browser locali a remoti, riducendo del 25% lo sforzo di test."
    }
  },
  {
    title: { en: "This portfolio", it: "Questo portfolio" },
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/bilgaaaaa/bilge-portfolio",
    description: {
      en: "A dependency-free, bilingual static site. No framework, no build step — just fast.",
      it: "Un sito statico bilingue senza dipendenze. Nessun framework, nessuna build — solo veloce."
    }
  }
];

const beyondItems = [
  {
    icon: "climb",
    title: { en: "Climbing", it: "Arrampicata" },
    description: {
      en: "Bouldering problems are just debugging with chalk.",
      it: "Un blocco di boulder è solo debugging con la magnesite."
    }
  },
  {
    icon: "yarn",
    title: { en: "Crochet & knitting", it: "Uncinetto e maglia" },
    description: {
      en: "Patterns, loops and the occasional off-by-one stitch.",
      it: "Schemi, cicli e ogni tanto un punto sbagliato di uno."
    }
  },
  {
    icon: "card",
    title: { en: "A card collection", it: "Una collezione di biglietti" },
    description: {
      en: "Business cards from every restaurant and pasticceria worth remembering.",
      it: "Biglietti da visita di ogni ristorante e pasticceria da ricordare."
    }
  },
  {
    icon: "video",
    title: "bilgalog",
    link: profileLinks.tiktok,
    description: {
      en: "Short videos about building apps, developer life and everyday Italy.",
      it: "Brevi video sullo sviluppo di app, la vita da developer e l'Italia di tutti i giorni."
    }
  }
];

const languagesSpoken = {
  en: "Turkish (native) · English (professional) · Italian (B1–B2, daily at work)",
  it: "Turco (madrelingua) · Inglese (professionale) · Italiano (B1–B2, uso quotidiano al lavoro)"
};

// PaceTasks case-study page (pacetasks.html).
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
        it: "Serie, giorno migliore, precisione delle stime e una mappa di 13 settimane — l'unica avversaria sei tu."
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
