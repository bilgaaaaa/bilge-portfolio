// Bilingual site content: UI strings, projects, experience and game text in one place.
// Edit this file to update the portfolio; script.js, simulations.js and game-walk.js only render it.

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
      "Bilge Ozcanbaz is a software developer in Padova, Italy, building Android apps, .NET and Java backend services, message queues and device integrations.",
    "brand.role": "Software developer",
    "brand.aka": "aka bilga",
    "brand.akaTitle": "Friends call me Bilga — you'll find me online as bilga, bilgaaa or bilgaaaaa",
    "nav.label": "Primary navigation",
    "nav.work": "Work",
    "nav.lab": "Live demo",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.beyond": "Beyond code",
    "nav.play": "Play",
    "nav.contact": "Contact",
    "nav.connect": "Let's connect",
    "nav.menu": "Open menu",
    "language.label": "Language selector",
    "social.label": "Social links",

    "hero.eyebrow": "Software developer",
    "hero.titleStart": "I build software that just works,",
    "hero.titleAccent": "from device to database.",
    "hero.intro":
      "Android apps people rely on every day, and the backend services, message queues and integrations behind them. Today that means retail software; before, it was electronic invoicing and banking.",
    "hero.work": "View my work",
    "hero.about": "About me",
    "hero.status": "Based in Padova, Italy",
    "hero.statusSub": "Currently a developer at a retail software company.",
    "hero.portraitAlt": "Portrait of Bilge Ozcanbaz",
    "hero.cardExperienceLabel": "Experience",
    "hero.cardExperienceValue": "4+ years",
    "hero.cardExperienceBody": "building mobile and backend software",
    "hero.releaseLabel": "release notes",
    "hero.releaseNext": "next release",
    "hero.releaseNextLabel": "Show the next version of me",
    "hero.cardFocusLabel": "Focus areas",
    "hero.tickerLabel": "behind the scenes",

    "work.eyebrow": "Selected work",
    "work.titleStart": "Software that",
    "work.titleAccent": "quietly works",
    "work.titleEnd": "every day.",
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
    "about.titleAccent": "to Android and beyond.",
    "about.p1":
      "I started as a Java backend developer, writing Spring Boot services for electronic invoicing and banking. Today I'm the sole developer of a production Android app used by retail chains, working directly with the product manager and owning features from the device all the way to the service behind it.",
    "about.p2":
      "When I joined, the app was pure Java. I moved it to Kotlin, rebuilt every screen in Jetpack Compose and migrated the local database from GreenDAO to Room on devices already in stores. The rest of my week goes to .NET microservices, RabbitMQ messaging and drivers for printers, scanners and customer displays.",
    "about.p3":
      "Friends call me Bilga — it's also my handle almost everywhere online: bilga, bilgaaa or bilgaaaaa, depending on how early I got there.",
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
      "Have a question, an idea, or just want to talk Android, .NET or backend systems? Write me — I'm always happy to connect.",
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
    "footer.credit": "Built in a few hours with AI (ChatGPT & Claude) — directed, reviewed and tested by me · Inspired by gazijarin.com",
    "footer.top": "Back to top",

    "play.eyebrow": "Play",
    "play.titleStart": "Take Bruno for a walk,",
    "play.titleAccent": "in code.",
    "play.lede": "A tiny puzzle in Kotlin-style code: tap the commands, press Run and fix the bugs before Bruno gets his paws wet.",

    "walkGame.name": "Bruno's walk",
    "walkGame.level": "level {n} of {total}",
    "walkGame.levelButton": "Go to level {n}",
    "walkGame.hint1": "Tap walk() until Bruno reaches his treat, then press Run.",
    "walkGame.hint2": "turnRight() turns Bruno on the spot — the arrow at his paws shows where he is facing.",
    "walkGame.hint3": "Puddles are bugs: one wet paw and the build fails.",
    "walkGame.hint4": "Only 5 lines allowed. repeat() runs the lines inside it again and again.",
    "walkGame.hint5": "Collect all 3 treats in 4 lines or fewer.",
    "walkGame.board": "Park map",
    "walkGame.code": "Your program",
    "walkGame.placeholder": "// tap a command below",
    "walkGame.lines": "lines {n} / {max}",
    "walkGame.limit": "This level allows {max} lines — try repeat().",
    "walkGame.full": "The program is full — run it or undo a line.",
    "walkGame.repeatTimes": "Repeat {n} times, click to change",
    "walkGame.closeLoop": "Close the repeat block",
    "walkGame.undo": "Undo",
    "walkGame.clear": "Clear",
    "walkGame.run": "Run",
    "walkGame.stop": "Stop",
    "walkGame.keys": "Keyboard: click the game, then ↑ walk · ← → turn · R repeat · Enter run · ⌫ undo",
    "walkGame.empty": "Write some code first: tap walk().",
    "walkGame.passed": "Build passed ✓ Bruno got there in {steps} steps.",
    "walkGame.done": "All 5 levels green ✓ Bruno is officially a good boy.",
    "walkGame.puddle": "Bug on line {line}: Bruno stepped in a puddle.",
    "walkGame.fence": "Bug on line {line}: Bruno walked into the fence.",
    "walkGame.shortOne": "Bruno stopped too early — his treat is still waiting.",
    "walkGame.shortMany": "Bruno stopped too early — {n} treats are still waiting.",
    "walkGame.next": "Next level",
    "walkGame.again": "Play again",

    "lab.eyebrow": "Live demo",
    "lab.titleStart": "Follow one sale",
    "lab.titleAccent": "from scan to receipt.",
    "lab.lede":
      "An interactive, made-up model of a typical retail stack, built from the kind of tools I use: an Android handheld that keeps selling offline, a RabbitMQ queue, a .NET service that never saves the same message twice and a fiscal printer at the end of the line. Move your mouse over it to watch a sale, an offline sale and a retry — or drive it yourself with the buttons.",
    "lab.note": "An illustrative model, not any real company's system — it runs entirely in your browser.",
    "lab.nodeHandheld": "Handheld",
    "lab.nodeHandheldSub": "Android · Room",
    "lab.nodeQueue": "RabbitMQ",
    "lab.nodeQueueSub": "demo.events → sales",
    "lab.nodeService": ".NET service",
    "lab.nodeServiceSub": "C# consumer",
    "lab.nodeDatabase": "SQL Server",
    "lab.nodeDatabaseSub": "Back office",
    "lab.nodePrinter": "Fiscal printer",
    "lab.nodePrinterSub": "RT · TCP",
    "lab.statHandheld": "{n} in outbox",
    "lab.statQueue": "{n} queued",
    "lab.statService": "duplicates skipped: {n}",
    "lab.statDatabase": "documents: {n}",
    "lab.statPrinter": "receipts: {n}",
    "lab.handheldTitle": "Sale {id}",
    "lab.cartEmpty": "Scan an item to start a sale.",
    "lab.total": "Total",
    "lab.scan": "Scan item",
    "lab.checkout": "Checkout",
    "lab.online": "Wi-Fi on",
    "lab.offline": "Wi-Fi off",
    "lab.networkLabel": "Store Wi-Fi",
    "lab.retry": "Resend last sale",
    "lab.receiptTitle": "Receipt",
    "lab.receiptEmpty": "Receipts print here.",
    "lab.receiptShop": "BILGA MARKET · PADOVA",
    "lab.receiptFooter": "Thank you, see you soon",
    "lab.logTitle": "Event log",
    "lab.logEmpty": "Events will appear here.",
    "lab.log.scan": "scan {ean} → {name} {price}",
    "lab.log.cartEmpty": "nothing to check out — scan an item first",
    "lab.log.publish": "publish {id} · exchange demo.events · key sale.created",
    "lab.log.offline": "no network — {id} saved to the Room outbox ({n} pending)",
    "lab.log.networkOff": "store Wi-Fi off — the app keeps working offline",
    "lab.log.networkOn": "store Wi-Fi back — syncing {n} pending",
    "lab.log.consume": "consumed {id} · total {total} · lines: {lines}",
    "lab.log.duplicate": "{id} already processed — duplicate skipped, ack sent",
    "lab.log.saved": "INSERT sales_document {id}",
    "lab.log.printed": "receipt {id} printed · CRC ok",
    "lab.log.retry": "network timeout — resending {id}",
    "lab.log.nothingToRetry": "no sale sent yet",

    "demo.label": "Interactive demo: {name}",
    "demo.receiptReadout": "Logo sent · CRC ✓",
    "demo.chartReadout": "Store {store} · last 6 weeks",
    "demo.tasksReadout": "{done} of {total} done · on pace",
    "demo.badge": "Interactive",

    "demo.migration.title": "Try it: ship a Room schema migration",
    "demo.migration.body": "Handhelds in stores sit on different schema versions. Ship v4 and watch each device run only the migrations it is missing — without losing a row.",
    "demo.migration.ship": "Ship release v4",
    "demo.migration.device": "Store {n}",
    "demo.migration.idle": "{n} of {total} devices need the update",
    "demo.migration.done": "{total} of {total} devices on v4 · {rows} rows kept",

    "demo.invoice.title": "Try it: send an electronic invoice",
    "demo.invoice.body": "An invoice leaves the ERP as FatturaPA XML, gets validated, delivered and preserved in the legal archive. Break it on purpose to see validation stop it.",
    "demo.invoice.send": "Send invoice",
    "demo.invoice.break": "Leave the VAT number empty",
    "demo.invoice.ok": "Delivered and preserved · hash {hash}",
    "demo.invoice.error": "Stopped at validation: the VAT number is missing.",

    "demo.credit.title": "Try it: a credit limit calculator",
    "demo.credit.body": "A simplified version of the idea — not the bank's real rules.",
    "demo.credit.income": "Monthly net income",
    "demo.credit.commitments": "Monthly commitments",
    "demo.credit.ratio": "Debt-to-income",
    "demo.credit.limit": "Suggested credit limit",
    "demo.credit.approved": "Within policy",
    "demo.credit.review": "Needs manual review",
    "demo.credit.declined": "Over the limit",

    "demo.tests.title": "Try it: local vs remote browsers",
    "demo.tests.body": "The same 12 UI tests, first on one local browser, then on two remote browsers in parallel — and no developer machine blocked while they run.",
    "demo.tests.run": "Run 12 tests",
    "demo.tests.local": "Local browser",
    "demo.tests.remote": "Remote browsers ×2",
    "demo.tests.minutes": "{n} min",
    "demo.tests.result": "Remote run: {saved}% less time",

    "skills.title": "Skill map",
    "skills.hint": "Pick a skill to see where I've used it.",
    "skills.usedIn": "Where I used {skill}",

    "process.run": "Ship a feature",
    "process.runAgain": "Ship another",
    "process.example": "An example ticket, step by step",

    "beyond.climb.try": "Attempt the route",
    "beyond.climb.idle": "Five holds, one problem.",
    "beyond.climb.fell": "Fell at hold {n} — read the route again, adjust.",
    "beyond.climb.sent": "Sent it! Debugging works.",
    "beyond.stitch.add": "Crochet a row",
    "beyond.stitch.fix": "Frog the row",
    "beyond.stitch.idle": "Every row should have 10 stitches.",
    "beyond.stitch.ok": "Row {n}: 10 stitches",
    "beyond.stitch.bug": "Row {n}: 11 stitches — off by one!",
    "beyond.stitch.fixed": "Row {n} redone: 10 stitches",
    "beyond.cards.draw": "Draw a card",
    "beyond.cards.idle": "A box full of cards, one per memorable meal.",
    "beyond.photoNext": "Show the next photo",
    "beyond.treat.give": "Give Bruno a treat",
    "beyond.bake.start": "Bake a batch",
    "beyond.bake.preheat": "Preheating to 180°C…",
    "beyond.bake.baking": "Baking… {n}%",
    "beyond.bake.done": "{build} passed: golden brown ✓",

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
    "pt.mockupLabel": "PaceTasks today screen, interactive",
    "pt.mockupHint": "Move your mouse over the phone to watch it work, or tap a task to finish it.",
    "pt.newTaskMeta": "Anytime · new",
    "pt.cta": "View the code on GitHub",
  },
  it: {
    "meta.title": "Bilge Ozcanbaz | Sviluppatrice Software",
    "meta.description":
      "Bilge Ozcanbaz è una sviluppatrice software a Padova: app Android, servizi backend .NET e Java, code di messaggi e integrazioni con dispositivi.",
    "brand.role": "Sviluppatrice software",
    "brand.aka": "detta bilga",
    "brand.akaTitle": "Gli amici mi chiamano Bilga — online mi trovi come bilga, bilgaaa o bilgaaaaa",
    "nav.label": "Navigazione principale",
    "nav.work": "Progetti",
    "nav.lab": "Demo live",
    "nav.about": "Chi sono",
    "nav.experience": "Esperienza",
    "nav.beyond": "Oltre il codice",
    "nav.play": "Gioca",
    "nav.contact": "Contatti",
    "nav.connect": "Parliamone",
    "nav.menu": "Apri menu",
    "language.label": "Selettore lingua",
    "social.label": "Link social",

    "hero.eyebrow": "Sviluppatrice software",
    "hero.titleStart": "Sviluppo software che funziona,",
    "hero.titleAccent": "dal dispositivo al database.",
    "hero.intro":
      "App Android su cui le persone contano ogni giorno, e i servizi backend, le code di messaggi e le integrazioni che ci stanno dietro. Oggi lavoro nel software per il retail; prima, nella fatturazione elettronica e nel settore bancario.",
    "hero.work": "Guarda i progetti",
    "hero.about": "Chi sono",
    "hero.status": "Vivo a Padova",
    "hero.statusSub": "Oggi sviluppatrice in un'azienda di software per il retail.",
    "hero.portraitAlt": "Ritratto di Bilge Ozcanbaz",
    "hero.cardExperienceLabel": "Esperienza",
    "hero.cardExperienceValue": "4+ anni",
    "hero.cardExperienceBody": "di software mobile e backend",
    "hero.releaseLabel": "note di rilascio",
    "hero.releaseNext": "prossima versione",
    "hero.releaseNextLabel": "Mostra la prossima versione di me",
    "hero.cardFocusLabel": "Aree di lavoro",
    "hero.tickerLabel": "dietro le quinte",

    "work.eyebrow": "Progetti scelti",
    "work.titleStart": "Software che",
    "work.titleAccent": "lavora in silenzio",
    "work.titleEnd": "ogni giorno.",
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
    "about.titleAccent": "ad Android e oltre.",
    "about.p1":
      "Ho iniziato come sviluppatrice backend Java, scrivendo servizi Spring Boot per la fatturazione elettronica e il settore bancario. Oggi sono l'unica sviluppatrice di un'app Android in produzione usata da catene retail: lavoro a stretto contatto con il product manager e seguo ogni funzionalità dal dispositivo fino al servizio che la supporta.",
    "about.p2":
      "Quando sono arrivata l'app era interamente in Java: l'ho migrata a Kotlin, ho ricostruito tutte le schermate in Jetpack Compose e ho portato il database locale da GreenDAO a Room su dispositivi già installati nei negozi. Il resto della settimana lo dedico a microservizi .NET, messaggistica RabbitMQ e driver per stampanti, scanner e display cliente.",
    "about.p3":
      "Gli amici mi chiamano Bilga — ed è anche il mio nome quasi ovunque online: bilga, bilgaaa o bilgaaaaa, a seconda di quanto presto sono arrivata.",
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
      "Hai una domanda, un'idea o vuoi parlare di Android, .NET o sistemi backend? Scrivimi — mi fa sempre piacere conoscere persone nuove.",
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
    "footer.credit": "Costruito in poche ore con l'AI (ChatGPT e Claude) — guidata, revisionata e testata da me · Ispirato a gazijarin.com",
    "footer.top": "Torna su",

    "play.eyebrow": "Gioca",
    "play.titleStart": "Porta Bruno a passeggio,",
    "play.titleAccent": "con il codice.",
    "play.lede": "Un piccolo puzzle in stile Kotlin: tocca i comandi, premi Esegui e correggi i bug prima che Bruno si bagni le zampe.",

    "walkGame.name": "La passeggiata di Bruno",
    "walkGame.level": "livello {n} di {total}",
    "walkGame.levelButton": "Vai al livello {n}",
    "walkGame.hint1": "Tocca walk() finché Bruno arriva al biscottino, poi premi Esegui.",
    "walkGame.hint2": "turnRight() fa girare Bruno sul posto — la freccia ai suoi piedi indica dove guarda.",
    "walkGame.hint3": "Le pozzanghere sono bug: una zampa bagnata e la build fallisce.",
    "walkGame.hint4": "Massimo 5 righe. repeat() esegue più volte le righe al suo interno.",
    "walkGame.hint5": "Raccogli tutti e 3 i biscottini in 4 righe al massimo.",
    "walkGame.board": "Mappa del parco",
    "walkGame.code": "Il tuo programma",
    "walkGame.placeholder": "// tocca un comando qui sotto",
    "walkGame.lines": "righe {n} / {max}",
    "walkGame.limit": "Questo livello permette {max} righe — prova repeat().",
    "walkGame.full": "Il programma è pieno — eseguilo o annulla una riga.",
    "walkGame.repeatTimes": "Ripeti {n} volte, clicca per cambiare",
    "walkGame.closeLoop": "Chiudi il blocco repeat",
    "walkGame.undo": "Annulla",
    "walkGame.clear": "Cancella",
    "walkGame.run": "Esegui",
    "walkGame.stop": "Ferma",
    "walkGame.keys": "Tastiera: clicca sul gioco, poi ↑ cammina · ← → gira · R repeat · Invio esegui · ⌫ annulla",
    "walkGame.empty": "Prima scrivi un po' di codice: tocca walk().",
    "walkGame.passed": "Build superata ✓ Bruno è arrivato in {steps} passi.",
    "walkGame.done": "Tutti e 5 i livelli verdi ✓ Bruno è ufficialmente un bravo cane.",
    "walkGame.puddle": "Bug alla riga {line}: Bruno è finito in una pozzanghera.",
    "walkGame.fence": "Bug alla riga {line}: Bruno ha sbattuto contro il recinto.",
    "walkGame.shortOne": "Bruno si è fermato troppo presto — il suo biscottino lo aspetta ancora.",
    "walkGame.shortMany": "Bruno si è fermato troppo presto — {n} biscottini lo aspettano ancora.",
    "walkGame.next": "Livello successivo",
    "walkGame.again": "Gioca ancora",

    "lab.eyebrow": "Demo live",
    "lab.titleStart": "Segui una vendita",
    "lab.titleAccent": "dalla scansione allo scontrino.",
    "lab.lede":
      "Un modello interattivo e inventato di un tipico stack retail, costruito con il tipo di strumenti che uso: un palmare Android che continua a vendere anche offline, una coda RabbitMQ, un servizio .NET che non salva mai due volte lo stesso messaggio e una stampante fiscale in fondo alla catena. Passa il mouse sopra per vedere una vendita, una vendita offline e un nuovo invio — oppure guidala tu con i pulsanti.",
    "lab.note": "Un modello illustrativo, non il sistema di un'azienda reale — gira interamente nel tuo browser.",
    "lab.nodeHandheld": "Palmare",
    "lab.nodeHandheldSub": "Android · Room",
    "lab.nodeQueue": "RabbitMQ",
    "lab.nodeQueueSub": "demo.events → sales",
    "lab.nodeService": "Servizio .NET",
    "lab.nodeServiceSub": "Consumer C#",
    "lab.nodeDatabase": "SQL Server",
    "lab.nodeDatabaseSub": "Back-office",
    "lab.nodePrinter": "Stampante fiscale",
    "lab.nodePrinterSub": "RT · TCP",
    "lab.statHandheld": "{n} in outbox",
    "lab.statQueue": "{n} in coda",
    "lab.statService": "duplicati scartati: {n}",
    "lab.statDatabase": "documenti: {n}",
    "lab.statPrinter": "scontrini: {n}",
    "lab.handheldTitle": "Vendita {id}",
    "lab.cartEmpty": "Scansiona un articolo per iniziare una vendita.",
    "lab.total": "Totale",
    "lab.scan": "Scansiona",
    "lab.checkout": "Chiudi vendita",
    "lab.online": "Wi-Fi attivo",
    "lab.offline": "Wi-Fi spento",
    "lab.networkLabel": "Wi-Fi del negozio",
    "lab.retry": "Reinvia l'ultima vendita",
    "lab.receiptTitle": "Scontrino",
    "lab.receiptEmpty": "Gli scontrini escono qui.",
    "lab.receiptShop": "BILGA MARKET · PADOVA",
    "lab.receiptFooter": "Grazie e arrivederci",
    "lab.logTitle": "Registro eventi",
    "lab.logEmpty": "Qui compariranno gli eventi.",
    "lab.log.scan": "scansione {ean} → {name} {price}",
    "lab.log.cartEmpty": "niente da chiudere — scansiona prima un articolo",
    "lab.log.publish": "pubblica {id} · exchange demo.events · chiave sale.created",
    "lab.log.offline": "rete assente — {id} salvata nell'outbox Room ({n} in attesa)",
    "lab.log.networkOff": "Wi-Fi spento — l'app continua a funzionare offline",
    "lab.log.networkOn": "Wi-Fi tornato — sincronizzo {n} in attesa",
    "lab.log.consume": "consumata {id} · totale {total} · righe: {lines}",
    "lab.log.duplicate": "{id} già elaborata — duplicato scartato, ack inviato",
    "lab.log.saved": "INSERT sales_document {id}",
    "lab.log.printed": "scontrino {id} stampato · CRC ok",
    "lab.log.retry": "timeout di rete — reinvio {id}",
    "lab.log.nothingToRetry": "nessuna vendita ancora inviata",

    "demo.label": "Demo interattiva: {name}",
    "demo.receiptReadout": "Logo inviato · CRC ✓",
    "demo.chartReadout": "Negozio {store} · ultime 6 settimane",
    "demo.tasksReadout": "{done} su {total} fatte · nei tempi",
    "demo.badge": "Interattiva",

    "demo.migration.title": "Prova: rilascia una migrazione di schema Room",
    "demo.migration.body": "I palmari nei negozi sono su versioni di schema diverse. Rilascia la v4 e guarda ogni dispositivo eseguire solo le migrazioni che gli mancano — senza perdere una riga.",
    "demo.migration.ship": "Rilascia la v4",
    "demo.migration.device": "Negozio {n}",
    "demo.migration.idle": "{n} dispositivi su {total} da aggiornare",
    "demo.migration.done": "{total} dispositivi su {total} sulla v4 · {rows} righe conservate",

    "demo.invoice.title": "Prova: invia una fattura elettronica",
    "demo.invoice.body": "La fattura esce dall'ERP come XML FatturaPA, viene validata, consegnata e messa in conservazione. Rompila apposta per vedere la validazione fermarla.",
    "demo.invoice.send": "Invia fattura",
    "demo.invoice.break": "Lascia vuota la partita IVA",
    "demo.invoice.ok": "Consegnata e conservata · hash {hash}",
    "demo.invoice.error": "Bloccata in validazione: manca la partita IVA.",

    "demo.credit.title": "Prova: un calcolatore del fido",
    "demo.credit.body": "Una versione semplificata dell'idea — non le regole reali della banca.",
    "demo.credit.income": "Reddito netto mensile",
    "demo.credit.commitments": "Impegni mensili",
    "demo.credit.ratio": "Rapporto rate/reddito",
    "demo.credit.limit": "Fido suggerito",
    "demo.credit.approved": "Nei limiti",
    "demo.credit.review": "Da valutare manualmente",
    "demo.credit.declined": "Oltre il limite",

    "demo.tests.title": "Prova: browser locali o remoti",
    "demo.tests.body": "Gli stessi 12 test di interfaccia, prima su un browser locale, poi su due browser remoti in parallelo — senza bloccare il computer di chi sviluppa.",
    "demo.tests.run": "Esegui 12 test",
    "demo.tests.local": "Browser locale",
    "demo.tests.remote": "Browser remoti ×2",
    "demo.tests.minutes": "{n} min",
    "demo.tests.result": "Esecuzione remota: {saved}% di tempo in meno",

    "skills.title": "Mappa delle competenze",
    "skills.hint": "Scegli una competenza per vedere dove l'ho usata.",
    "skills.usedIn": "Dove ho usato {skill}",

    "process.run": "Rilascia una funzionalità",
    "process.runAgain": "Rilasciane un'altra",
    "process.example": "Un ticket d'esempio, passo dopo passo",

    "beyond.climb.try": "Prova la via",
    "beyond.climb.idle": "Cinque prese, un problema.",
    "beyond.climb.fell": "Caduta alla presa {n} — rileggo la via e correggo.",
    "beyond.climb.sent": "Chiusa! Il debugging funziona.",
    "beyond.stitch.add": "Fai un giro",
    "beyond.stitch.fix": "Disfa il giro",
    "beyond.stitch.idle": "Ogni giro deve avere 10 punti.",
    "beyond.stitch.ok": "Giro {n}: 10 punti",
    "beyond.stitch.bug": "Giro {n}: 11 punti — uno di troppo!",
    "beyond.stitch.fixed": "Giro {n} rifatto: 10 punti",
    "beyond.cards.draw": "Pesca un biglietto",
    "beyond.cards.idle": "Una scatola piena di biglietti, uno per ogni pasto da ricordare.",
    "beyond.photoNext": "Mostra la foto successiva",
    "beyond.treat.give": "Dai un biscottino a Bruno",
    "beyond.bake.start": "Inforna una teglia",
    "beyond.bake.preheat": "Preriscaldo a 180°C…",
    "beyond.bake.baking": "In forno… {n}%",
    "beyond.bake.done": "{build} superata: ben dorata ✓",

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
    "pt.mockupLabel": "Schermata Oggi di PaceTasks, interattiva",
    "pt.mockupHint": "Passa il mouse sul telefono per vederlo in azione, o tocca un'attività per completarla.",
    "pt.newTaskMeta": "Quando vuoi · nuova",
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
    id: "handheld-app",
    title: { en: "Retail handheld app", it: "App per palmari retail" },
    subtitle: { en: "Android · in production", it: "Android · in produzione" },
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
    id: "sync-service",
    title: { en: "Handheld sync service", it: "Sincronizzazione palmari" },
    tech: [".NET", "RabbitMQ", "EF Core"],
    description: {
      en: "The daemon that turns handheld messages into back-office documents, with server-side deduplication of inventory documents.",
      it: "Il demone che trasforma i messaggi dei palmari in documenti di back-office, con deduplicazione lato server degli inventari."
    }
  },
  {
    id: "invoice-channel",
    title: "Invoice Channel",
    tech: ["Java 17", "Spring Boot", "Maven"],
    description: {
      en: "Electronic invoicing microservices with ERP integration: Ant → Maven, Java 8 → 17 and legal-archive integration.",
      it: "Microservizi di fatturazione elettronica integrati con gli ERP: Ant → Maven, Java 8 → 17 e conservazione sostitutiva."
    }
  },
  {
    id: "credit-calculator",
    title: { en: "Credit limit calculator", it: "Calcolo del fido" },
    tech: ["Spring Boot", "Hibernate"],
    description: {
      en: "A banking application with user data management, a credit limit calculator and secure authentication.",
      it: "Un'applicazione bancaria con gestione dati utente, calcolo del fido e autenticazione sicura."
    }
  },
  {
    id: "remote-tests",
    title: { en: "Remote test automation", it: "Automazione test remota" },
    tech: ["Test automation", "Remote browsers"],
    description: {
      en: "My MSc thesis: moving browser tests from local machines to remote browsers, cutting testing effort by 25%.",
      it: "La mia tesi magistrale: test spostati da browser locali a remoti, con il 25% di sforzo in meno."
    }
  },
  {
    id: "portfolio",
    title: { en: "This portfolio", it: "Questo portfolio" },
    tech: ["AI pair-programming", "HTML", "CSS", "JavaScript"],
    link: "https://github.com/bilgaaaaa/bilge-portfolio",
    description: {
      en: "Built in a few hours with AI (ChatGPT & Claude): I set the design, content and game mode, AI wrote most of the code, and I reviewed and tested every change.",
      it: "Costruito in poche ore con l'AI (ChatGPT e Claude): io ho deciso design, contenuti e modalità gioco, l'AI ha scritto gran parte del codice e io ho revisionato e testato ogni modifica."
    }
  }
];

// "What I do" columns; `icon` refers to a symbol in assets/icons.svg.
const services = [
  {
    icon: "phone",
    title: { en: "Android apps", it: "App Android" },
    body: { en: "Kotlin, Jetpack Compose and Room apps that keep working offline, wherever they are used.", it: "App Kotlin, Jetpack Compose e Room che funzionano anche offline, ovunque vengano usate." }
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
    body: { en: "RabbitMQ pipelines and SQL databases that keep devices and back-office systems in sync.", it: "Pipeline RabbitMQ e database SQL che tengono sincronizzati dispositivi e sistemi di back-office." }
  }
];

// Tool tiles: a short monogram and a tint from the palette.
const tools = [
  {
    short: "Kt", name: "Kotlin", tint: "#854F6C",
    about: { en: "A modern programming language for Android apps — my main language today.", it: "Un linguaggio di programmazione moderno per app Android — oggi il mio principale." }
  },
  {
    short: "Jc", name: "Jetpack Compose", tint: "#522B5B",
    about: { en: "Google's toolkit for building Android screens in Kotlin code instead of XML layouts.", it: "Il toolkit di Google per costruire le schermate Android in Kotlin invece che con layout XML." }
  },
  {
    short: "Jv", name: "Java", tint: "#DFB6B2",
    about: { en: "A classic language for backends and Android — where I started, with Spring Boot.", it: "Un linguaggio classico per backend e Android — da qui sono partita, con Spring Boot." }
  },
  {
    short: "C#", name: "C#", tint: "#854F6C",
    about: { en: "Microsoft's main language for .NET — I write services and device drivers in it.", it: "Il linguaggio principale di Microsoft per .NET — lo uso per servizi e driver." }
  },
  {
    short: ".N", name: ".NET", tint: "#522B5B",
    about: { en: "Microsoft's platform for running C# services, APIs and web apps.", it: "La piattaforma Microsoft per far girare servizi, API e web app in C#." }
  },
  {
    short: "Bz", name: "Blazor", tint: "#DFB6B2",
    about: { en: "A .NET framework for building web apps in C# instead of JavaScript.", it: "Un framework .NET per creare web app in C# invece che in JavaScript." }
  },
  {
    short: "Sq", name: "SQL", tint: "#854F6C",
    about: { en: "The language for storing and querying data in databases like SQL Server and PostgreSQL.", it: "Il linguaggio per salvare e interrogare i dati in database come SQL Server e PostgreSQL." }
  },
  {
    short: "Mq", name: "RabbitMQ", tint: "#522B5B",
    about: { en: "A message broker that passes messages reliably between apps and services.", it: "Un message broker che consegna in modo affidabile i messaggi tra app e servizi." }
  },
  {
    short: "Dk", name: "Docker", tint: "#DFB6B2",
    about: { en: "Packs an app with everything it needs into a container that runs the same everywhere.", it: "Impacchetta un'app con tutto ciò che le serve in un container che gira uguale ovunque." }
  }
];

// Rotating lines in the hero's "behind the scenes" feed: a mix of everything I work on.
const heroTicker = {
  en: [
    "android · Compose screen rendered in 12 ms",
    "rabbitmq · sale.created → sales (2 queued)",
    "room · migration 3 → 4 done, 0 rows lost",
    "invoice · FatturaPA XML validated",
    "pacetasks · task synced through Realtime",
    "pipeline · build green, release ready"
  ],
  it: [
    "android · schermata Compose disegnata in 12 ms",
    "rabbitmq · sale.created → sales (2 in coda)",
    "room · migrazione 3 → 4 completata, 0 righe perse",
    "fattura · XML FatturaPA validato",
    "pacetasks · attività sincronizzata con Realtime",
    "pipeline · build verde, rilascio pronto"
  ]
};

// Products the live demo can scan (prices in EUR, barcodes are made up).
const labProducts = [
  { ean: "8001234567890", name: { en: "Espresso beans", it: "Caffè in grani" }, price: 7.9 },
  { ean: "8009876543210", name: { en: "Fresh pasta", it: "Pasta fresca" }, price: 2.49 },
  { ean: "8005551234567", name: { en: "Olive oil", it: "Olio d'oliva" }, price: 8.75 },
  { ean: "8007778889990", name: { en: "Notebook", it: "Quaderno" }, price: 3.2 },
  { ean: "8003334445556", name: { en: "Sparkling water", it: "Acqua frizzante" }, price: 0.59 },
  { ean: "8002223334441", name: { en: "Parmigiano 200 g", it: "Parmigiano 200 g" }, price: 4.95 }
];

// Weekly bar heights (in %) for the store analytics card demo.
const chartStores = [
  { name: "A", bars: [28, 46, 36, 56, 42, 64] },
  { name: "B", bars: [52, 38, 60, 44, 70, 58] },
  { name: "C", bars: [34, 62, 48, 30, 66, 50] }
];

// Steps of the electronic invoicing demo; `validation` is where a missing VAT number is caught.
const invoiceSteps = [
  { id: "erp", name: { en: "ERP export", it: "Export ERP" } },
  { id: "xml", name: { en: "FatturaPA XML", it: "XML FatturaPA" } },
  { id: "validation", name: { en: "Validation", it: "Validazione" } },
  { id: "delivery", name: { en: "Delivery", it: "Consegna" } },
  { id: "archive", name: { en: "Legal archive", it: "Conservazione" } }
];

// Skill groups from the CV; `usedIn` points at experience ids and project ids on the page.
const skillGroups = [
  {
    title: { en: "Languages", it: "Linguaggi" },
    skills: [
      { name: "Kotlin", usedIn: ["retail-company", "handheld-app"] },
      { name: "Java", usedIn: ["ifin", "iason", "invoice-channel", "credit-calculator", "handheld-app"] },
      { name: "C# / .NET 8", usedIn: ["retail-company", "pos-drivers", "sync-service", "analytics"] },
      { name: "SQL", usedIn: ["retail-company", "ifin", "analytics", "sync-service"] },
      { name: "TypeScript", usedIn: ["pacetasks"] },
      { name: "JavaScript", usedIn: ["portfolio"] }
    ]
  },
  {
    title: { en: "Mobile", it: "Mobile" },
    skills: [
      { name: "Android SDK", usedIn: ["retail-company", "handheld-app"] },
      { name: "Jetpack Compose", usedIn: ["retail-company", "handheld-app"] },
      { name: "MVVM", usedIn: ["retail-company", "handheld-app"] },
      { name: "Room", usedIn: ["retail-company", "handheld-app"] },
      { name: "GreenDAO", usedIn: ["retail-company", "handheld-app"] },
      { name: { en: "Peripheral integration", it: "Integrazione periferiche" }, usedIn: ["retail-company", "pos-drivers", "handheld-app"] },
      { name: "Expo / React Native", usedIn: ["pacetasks"] }
    ]
  },
  {
    title: { en: "Backend", it: "Backend" },
    skills: [
      { name: "REST APIs", usedIn: ["retail-company", "ifin", "sync-service"] },
      { name: "Spring Boot", usedIn: ["ifin", "iason", "invoice-channel", "credit-calculator"] },
      { name: "Hibernate", usedIn: ["ifin", "iason", "credit-calculator"] },
      { name: "EF Core", usedIn: ["retail-company", "sync-service"] },
      { name: "Blazor", usedIn: ["retail-company", "analytics"] },
      { name: "DevExpress", usedIn: ["retail-company", "analytics"] },
      { name: "Supabase", usedIn: ["pacetasks"] }
    ]
  },
  {
    title: { en: "Data & messaging", it: "Dati e messaggistica" },
    skills: [
      { name: "RabbitMQ", usedIn: ["retail-company", "sync-service"] },
      { name: "SQL Server", usedIn: ["retail-company", "analytics"] },
      { name: "PostgreSQL", usedIn: ["ifin", "invoice-channel", "pacetasks"] },
      { name: "MySQL", usedIn: ["ifin"] },
      { name: "SQLite", usedIn: ["retail-company", "handheld-app"] }
    ]
  },
  {
    title: { en: "Practices & tools", it: "Pratiche e strumenti" },
    skills: [
      { name: "Azure Pipelines", usedIn: ["retail-company"] },
      { name: "Docker", usedIn: ["retail-company"] },
      { name: "Maven", usedIn: ["ifin", "invoice-channel"] },
      { name: { en: "Unit & UI testing", it: "Test unitari e UI" }, usedIn: ["ifin", "ifin-thesis", "remote-tests", "pacetasks"] },
      { name: { en: "Test automation", it: "Automazione dei test" }, usedIn: ["ifin-thesis", "remote-tests"] },
      { name: "Agile / Scrum", usedIn: ["ifin", "retail-company"] }
    ]
  }
];

const processSteps = [
  {
    icon: "search",
    title: { en: "Understand", it: "Capire" },
    body: { en: "Learn the real workflow and the people who depend on it.", it: "Capire il flusso reale e chi ci lavora ogni giorno." },
    log: { en: "Ticket: “the app feels slow on older devices”. I reproduce it on a real one first.", it: "Ticket: “l'app è lenta sui dispositivi più vecchi”. Prima la riproduco su uno vero." }
  },
  {
    icon: "pen",
    title: { en: "Design", it: "Progettare" },
    body: { en: "Map the data flow and the edge cases before writing code.", it: "Disegnare il flusso dei dati e i casi limite prima del codice." },
    log: { en: "Each screen reloads everything over the network. Plan: cache locally, refresh in the background.", it: "Ogni schermata ricarica tutto dalla rete. Piano: cache locale, aggiornata in background." }
  },
  {
    icon: "code",
    title: { en: "Build", it: "Sviluppare" },
    body: { en: "Small, reviewable steps with clean and consistent naming.", it: "Passi piccoli e revisionabili, con nomi chiari e coerenti." },
    log: { en: "A small PR: a local cache, a sync worker and names that match the rest of the code.", it: "Una PR piccola: cache locale, un worker di sincronizzazione e nomi coerenti con il resto del codice." }
  },
  {
    icon: "check",
    title: { en: "Test", it: "Testare" },
    body: { en: "Unit tests, then real hardware on the bench — not just the emulator.", it: "Test unitari, poi hardware reale sul banco — non solo l'emulatore." },
    log: { en: "Unit tests green, then the real device on the bench, online and offline.", it: "Test unitari verdi, poi il dispositivo reale sul banco, online e offline." }
  },
  {
    icon: "rocket",
    title: { en: "Ship & support", it: "Rilasciare e supportare" },
    body: { en: "Release, watch the logs and fix fast in production.", it: "Rilasciare, leggere i log e correggere in fretta in produzione." },
    log: { en: "Release through the pipeline, then a week of watching crash reports and logs.", it: "Rilascio dalla pipeline, poi una settimana a controllare report di crash e log." }
  }
];

// "Beyond code" cards; `photos` cycle on hover, `demo` picks the small interactive in simulations.js.
const beyondItems = [
  {
    id: "bruno",
    icon: "paw",
    avatar: "assets/bruno/bruno-avatar.webp",
    wide: true,
    demo: "treat",
    title: { en: "Bruno", it: "Bruno" },
    description: {
      en: "My dog, my most loyal code reviewer and the reason I take my breaks. Take him for a walk in code, just below.",
      it: "Il mio cane, il mio code reviewer più fedele e il motivo per cui faccio le pause. Portalo a passeggio con il codice, qui sotto."
    },
    facts: [
      { label: { en: "Role", it: "Ruolo" }, value: { en: "Chief Morale Officer", it: "Responsabile del morale" } },
      { label: { en: "Superpower", it: "Superpotere" }, value: { en: "Hears a treat bag from two rooms away", it: "Sente un sacchetto di biscotti da due stanze di distanza" } },
      { label: { en: "Review style", it: "Stile di review" }, value: { en: "Naps on the desk until I take a break", it: "Dorme sulla scrivania finché non faccio una pausa" } }
    ],
    photos: [
      { src: "assets/beyond/bruno-reviewer.webp", position: "50% 70%", caption: { en: "Senior code reviewer — approves every PR by falling asleep on it.", it: "Senior code reviewer — approva ogni PR addormentandosi sopra." } },
      { src: "assets/beyond/bruno-standup.webp", position: "50% 45%", caption: { en: "Daily stand-up: never late, always on the table.", it: "Daily stand-up: mai in ritardo, sempre sul tavolo." } },
      { src: "assets/beyond/bruno-puppy.webp", position: "50% 45%", caption: { en: "Bruno v0.1 — the puppy build, chocolate edition.", it: "Bruno v0.1 — la build cucciolo, edizione cioccolato." } },
      { src: "assets/beyond/bruno-tests.webp", position: "50% 45%", caption: { en: "Status: all tests passing. Treats pending.", it: "Stato: tutti i test passano. Biscottini in attesa." } },
      { src: "assets/beyond/bruno-monday.webp", position: "40% 50%", caption: { en: "Monday mornings, accurately.", it: "Il lunedì mattina, in modo accurato." } },
      { src: "assets/beyond/bruno-weekend.webp", position: "50% 70%", caption: { en: "Weekend mode: on. Notifications: off.", it: "Modalità weekend: attiva. Notifiche: spente." } }
    ]
  },
  {
    id: "baking",
    icon: "bake",
    demo: "bake",
    title: { en: "Cooking & baking", it: "Cucina e forno" },
    description: {
      en: "Turkish classics and fresh bread from my kitchen — every batch is a release with its own build number.",
      it: "Classici turchi e pane fresco dalla mia cucina — ogni teglia è un rilascio con il suo numero di build."
    },
    photos: [
      { src: "assets/beyond/bake-buns.webp", position: "50% 50%", caption: { en: "Build #1 · Sesame buns — 16 of 16 passed QA.", it: "Build #1 · Panini al sesamo — 16 su 16 hanno passato il QA." } },
      { src: "assets/beyond/bake-borek.webp", position: "50% 50%", caption: { en: "Build #2 · Börek — layered like a clean architecture.", it: "Build #2 · Börek — a strati come una clean architecture." } },
      { src: "assets/beyond/bake-berry-cake.webp", position: "50% 40%", caption: { en: "Build #3 · Berry cake — shipped straight from the oven.", it: "Build #3 · Torta ai frutti di bosco — rilasciata direttamente dal forno." } },
      { src: "assets/beyond/bake-spiral.webp", position: "50% 60%", caption: { en: "Build #4 · Spiral pastry — recursion you can eat.", it: "Build #4 · Sfoglia a spirale — ricorsione da mangiare." } },
      { src: "assets/beyond/bake-lahmacun.webp", position: "50% 45%", caption: { en: "Build #5 · Lahmacun — thin, crispy, zero bugs.", it: "Build #5 · Lahmacun — sottile, croccante, zero bug." } },
      { src: "assets/beyond/bake-cookies.webp", position: "50% 50%", caption: { en: "Build #6 · Sugar-dusted cookies — a sweet release.", it: "Build #6 · Biscotti allo zucchero — un rilascio dolce." } },
      { src: "assets/beyond/bake-simit.webp", position: "50% 45%", caption: { en: "Build #7 · Simit — Istanbul's favourite ring buffer.", it: "Build #7 · Simit — il ring buffer preferito di Istanbul." } }
    ]
  },
  {
    id: "climbing",
    icon: "climb",
    demo: "climb",
    title: { en: "Climbing", it: "Arrampicata" },
    description: {
      en: "Bouldering problems are just debugging with chalk: read the route, try, fall, adjust.",
      it: "Un blocco di boulder è debugging con la magnesite: leggi la via, prova, cadi, correggi."
    }
  },
  {
    id: "crochet",
    icon: "yarn",
    demo: "stitch",
    title: { en: "Crochet & knitting", it: "Uncinetto e maglia" },
    description: {
      en: "Patterns, loops and the occasional off-by-one stitch — the most relaxing kind of code.",
      it: "Schemi, cicli e ogni tanto un punto sbagliato di uno — il codice più rilassante che ci sia."
    }
  },
  {
    id: "cards",
    icon: "card",
    demo: "cards",
    title: { en: "A card collection", it: "Una collezione di biglietti" },
    description: {
      en: "Business cards from every restaurant and pasticceria in Italy worth remembering.",
      it: "Biglietti da visita di ogni ristorante e pasticceria d'Italia che vale la pena ricordare."
    }
  }
];

// What Bruno says after each treat in his card; the last line repeats with the count.
const brunoTreatLines = {
  en: ["Woof! Thank you.", "Another one? He says yes.", "Treat #{n} — you're officially his favourite.", "Treat #{n}. He'd still say yes. He always says yes."],
  it: ["Bau! Grazie.", "Un altro? Dice di sì.", "Biscottino n. {n} — ora sei ufficialmente il suo preferito.", "Biscottino n. {n}. Direbbe ancora di sì. Dice sempre di sì."]
};

// Hero portrait "releases": each look has a version and a short release note.
const portraitLooks = [
  { src: "assets/portrait.webp", version: "v1.0", alt: { en: "Bilge in a blue cardigan and sunglasses", it: "Bilge con un cardigan azzurro e occhiali da sole" }, note: { en: "The original release.", it: "La versione originale." } },
  { src: "assets/looks/look-office.webp", version: "v1.1", alt: { en: "Bilge in a white office shirt making heart hands", it: "Bilge con una camicia bianca che fa un cuore con le mani" }, note: { en: "Office mode: shirt ironed, bugs not.", it: "Modalità ufficio: camicia stirata, bug no." } },
  { src: "assets/looks/look-sunglasses.webp", version: "v2.0", alt: { en: "Bilge with long red hair and sunglasses", it: "Bilge con lunghi capelli rossi e occhiali da sole" }, note: { en: "Dark mode, now on my face too.", it: "Dark mode, ora anche sulla mia faccia." } },
  { src: "assets/looks/look-round.webp", version: "v3.0", alt: { en: "Bilge smiling with new round glasses", it: "Bilge sorridente con nuovi occhiali tondi" }, note: { en: "New frames, same bugs.", it: "Montatura nuova, stessi bug." } },
  { src: "assets/looks/look-bruno.webp", version: "v4.0", alt: { en: "Bilge holding Bruno with a surprised face", it: "Bilge con Bruno in braccio e una faccia sorpresa" }, note: { en: "Breaking change: Bruno merged into main.", it: "Breaking change: Bruno è entrato in main." } }
];

// Cards the "card collection" demo can draw: kinds of places and cities, no real names.
const beyondCards = [
  { kind: { en: "Pasticceria", it: "Pasticceria" }, city: "Padova" },
  { kind: { en: "Trattoria", it: "Trattoria" }, city: "Bologna" },
  { kind: { en: "Gelateria", it: "Gelateria" }, city: "Verona" },
  { kind: { en: "Osteria", it: "Osteria" }, city: "Venezia" },
  { kind: { en: "Pizzeria", it: "Pizzeria" }, city: "Napoli" },
  { kind: { en: "Pasticceria", it: "Pasticceria" }, city: "Torino" },
  { kind: { en: "Ristorante", it: "Ristorante" }, city: "Trieste" }
];

const languagesSpoken = {
  en: "Turkish (native) · English (professional) · Italian (B1–B2, daily at work)",
  it: "Turco (madrelingua) · Inglese (professionale) · Italiano (B1–B2, uso quotidiano al lavoro)"
};

const experience = [
  {
    id: "retail-company",
    demo: "migration",
    tab: { en: "Retail software", it: "Software retail" },
    company: { en: "a retail software company", it: "un'azienda di software per il retail" },
    location: { en: "Padova, Italy", it: "Padova" },
    role: { en: "Software Development Specialist", it: "Software Development Specialist" },
    dates: { en: "Jun 2024 – Present", it: "Giu 2024 – Oggi" },
    bullets: {
      en: [
        "Sole developer of a production Android app for retail chains, working directly with the product manager and owning delivery end to end.",
        "Migrated the app from Java to Kotlin and rebuilt the entire screen layer in Jetpack Compose with an MVVM architecture.",
        "Planned and shipped the local database migration from GreenDAO to Room, including SQLite schema migrations on devices already in the field.",
        "Build and maintain .NET (C#) microservices, REST APIs and a RabbitMQ pipeline connecting handhelds, in-store POS and back-office services.",
        "Write drivers for retail peripherals — fiscal and receipt printers, barcode scanners and customer displays — over TCP and serial.",
        "Developed a Blazor + DevExpress web app, now in production, for multi-store performance analysis.",
        "Support the app in production: crash and ANR investigation, releases with Azure Pipelines and Docker."
      ],
      it: [
        "Unica sviluppatrice di un'app Android in produzione per catene retail, in diretto raccordo con il product manager e responsabile della consegna end to end.",
        "Ho migrato l'app da Java a Kotlin e ricostruito l'intero livello di interfaccia in Jetpack Compose con architettura MVVM.",
        "Ho pianificato e realizzato la migrazione del database locale da GreenDAO a Room, incluse le migrazioni di schema SQLite sui dispositivi già in campo.",
        "Sviluppo e mantengo microservizi .NET (C#), API REST e una pipeline RabbitMQ che collega palmari, casse in negozio e servizi di back-office.",
        "Scrivo driver per periferiche retail — stampanti fiscali e di scontrini, scanner barcode e display cliente — via TCP e seriale.",
        "Ho sviluppato un'applicazione web Blazor + DevExpress, oggi in produzione, per l'analisi delle performance multi-negozio.",
        "Supporto l'app in produzione: analisi di crash e ANR, rilasci con Azure Pipelines e Docker."
      ]
    }
  },
  {
    id: "ifin",
    demo: "invoice",
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
    demo: "credit",
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
    demo: "tests",
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
    tabs: { en: ["Tasks", "Stats", "Settings"], it: ["Attività", "Statistiche", "Impostazioni"] },
    // Typed into the quick-add bar when the mouse arrives on the phone.
    demoTasks: {
      en: ["Call the bank", "Walk Bruno", "Water the plants", "Book a haircut"],
      it: ["Chiamare la banca", "Portare fuori Bruno", "Annaffiare le piante", "Prenotare il parrucchiere"]
    }
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
