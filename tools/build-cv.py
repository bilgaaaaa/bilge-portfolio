"""Generates the public EN/IT CV pages (HTML + A4 PDF) in assets/cv from one data source.

Public version: no birth date, home address, employer names or availability. Run: python3 tools/build-cv.py
"""
import sys
from html import escape
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "cv"

# Change WEBSITE here once the custom domain is live; everything else follows.
WEBSITE = "bilgalog.dev"
GITHUB = "github.com/bilgaaaaa"

# Contact items as (label, link), one list per line of the CV header.
CONTACT_LINES = [
    [
        ("+39 339 204 7793", "tel:+393392047793"),
        ("ozcanbazbilge@gmail.com", "mailto:ozcanbazbilge@gmail.com"),
    ],
    [
        (WEBSITE, f"https://{WEBSITE}/"),
        ("linkedin.com/in/bilge-ozcanbaz-692652114", "https://www.linkedin.com/in/bilge-ozcanbaz-692652114"),
        (GITHUB, f"https://{GITHUB}"),
    ],
]

# Personal project repos, shared by both languages so links never drift apart.
PROJECT_REPOS = {
    "pacetasks": f"{GITHUB}/pacetasks",
    "deskfocus": f"{GITHUB}/deskfocus",
}

CV = {
    "en": {
        "title": "Software Developer · Android, Java & .NET",
        "location": "Padova, Italy",
        "sections": {"summary": "Professional summary", "skills": "Technical skills", "experience": "Professional experience",
                     "projects": "Personal projects", "education": "Education", "languages": "Languages"},
        "summary": "Software developer with 4+ years of experience building Android apps and backend services for Italian companies in retail and enterprise software. I am the sole developer of a production Android app, which I migrated from Java to Kotlin and rebuilt in Jetpack Compose, and I work daily with .NET (C#) microservices, SQL databases and RabbitMQ messaging. Before that I worked on Java backends with Spring Boot, Hibernate, PostgreSQL and MySQL. In my own time I build personal apps for iPhone and macOS. I am used to owning a feature end to end, from the device to the backend services.",
        "skills": [
            ("Languages", "Kotlin, Java, C# / .NET 8, SQL, TypeScript, JavaScript, HTML/CSS, Swift (basic)"),
            ("Mobile", "Android SDK, Jetpack Compose, MVVM, Kotlin Coroutines and Flow, Room, GreenDAO, device and peripheral integration, React Native and Expo (personal project)"),
            ("Backend", "REST APIs, microservices, Spring Boot, Hibernate, Entity Framework Core, Blazor, .NET Razor Pages, DevExpress, Supabase"),
            ("Data & messaging", "SQLite, SQL Server, PostgreSQL, MySQL, EF Core, RabbitMQ (exchanges, queues, routing keys)"),
            ("Practices & tools", "Git, GitHub Actions, Azure DevOps and Azure Pipelines, Docker, Postman, Maven, unit and UI testing, code review, Agile/Scrum"),
        ],
        "jobs": [
            ("Software Development Specialist", "Retail software company — Padova, Italy", "Jun 2024 – Present", [
                "Sole developer of a production Android app for retail chains, working directly with the product manager and fully responsible for delivery.",
                "Migrated the app from Java to Kotlin, rebuilding the entire UI in Jetpack Compose with an MVVM architecture.",
                "Planned and delivered the local database migration from GreenDAO to Room, including SQLite schema migrations on devices already in the field.",
                "Build and maintain .NET (C#) microservices and REST APIs supporting the handheld app and admin tools.",
                "Integrated RabbitMQ for communication between handheld devices, in-store applications and back-office services.",
                "Integrated Epson and Custom peripherals — barcode scanning and receipt printing — with industrial Android devices.",
                "Built a Blazor web app with DevExpress, in production, for multi-store performance analysis; production support including crash and ANR analysis, with releases via Azure Pipelines and Docker.",
            ]),
            ("Software Developer", "E-invoicing software company — Padova, Italy", "Mar 2023 – Apr 2024", [
                "Backend development on an e-invoicing platform built as Java microservices with ERP integration, using Spring Boot, Hibernate, PostgreSQL and MySQL.",
                "Migrated the build system from Ant to Maven and upgraded the platform from Java 8 to Java 17.",
                "Built the integration with legal archiving software for digital preservation compliance.",
                "Wrote unit and UI tests, fixed critical production bugs, improved the client onboarding flow and took part in code reviews, technical documentation and CI/CD pipelines in an Agile team.",
            ]),
            ("Intern Developer", "Banking software company — Milan, Italy", "Sep 2022 – Jan 2023", [
                "Built a Spring Boot and Hibernate application for a banking system, covering user data management, credit limit calculation and secure authentication and access configuration.",
            ]),
            ("Intern", "E-invoicing software company — Padova, Italy", "Feb 2022 – Jul 2022", [
                "Improved test automation for e-invoicing software as my master's thesis project: moved test execution from local to remote browsers, increasing efficiency by 25%. Contributed to documentation and cross-team QA.",
            ]),
        ],
        "projects": [
            ("PaceTasks", "in development", "pacetasks",
             "iPhone app that helps people with a fixed work schedule plan personal tasks around their working day. TypeScript, React Native and Expo, with a Supabase backend (Postgres with row-level security, Auth, Edge Function). Jest, pgTAP and Playwright tests run with GitHub Actions on every pull request."),
            ("Deskfocus", "macOS", "deskfocus",
             "macOS menu bar app and desktop widget that brings today's tasks (iCloud, Google Calendar, Google Tasks) together with a per-task focus timer. Built with Xcode, WidgetKit and App Intents."),
        ],
        "education": [
            ("MSc in ICT for Internet and Multimedia", "University of Padova — Padova, Italy", "Aug 2020 – Dec 2022"),
            ("BSc in Electrical & Electronics Engineering", "University of Turkish Aeronautical Association — Ankara, Turkey", "Aug 2014 – Jun 2018"),
        ],
        "languages": "Turkish: native · English: professional working proficiency · Italian: B1–B2, used daily at work.",
    },
    "it": {
        "title": "Sviluppatrice Software · Android, Java e .NET",
        "location": "Padova, Italia",
        "sections": {"summary": "Profilo professionale", "skills": "Competenze tecniche", "experience": "Esperienze professionali",
                     "projects": "Progetti personali", "education": "Formazione", "languages": "Lingue"},
        "summary": "Sviluppatrice software con oltre 4 anni di esperienza nello sviluppo di applicazioni Android e servizi backend per aziende italiane del settore retail e software enterprise. Sono l'unica sviluppatrice di un'applicazione Android di produzione, che ho migrato da Java a Kotlin ricostruendola in Jetpack Compose, e lavoro quotidianamente su microservizi .NET (C#), database SQL e messaggistica RabbitMQ. In precedenza ho maturato esperienza di sviluppo backend Java con Spring Boot, Hibernate, PostgreSQL e MySQL. Nel tempo libero sviluppo app personali per iPhone e macOS. Sono abituata a seguire una funzionalità dall'inizio alla fine, dai dispositivi fino ai servizi backend.",
        "skills": [
            ("Linguaggi", "Kotlin, Java, C# / .NET 8, SQL, TypeScript, JavaScript, HTML/CSS, Swift (base)"),
            ("Mobile", "Android SDK, Jetpack Compose, MVVM, Kotlin Coroutines e Flow, Room, GreenDAO, integrazione dispositivi e periferiche, React Native ed Expo (progetto personale)"),
            ("Backend", "API REST, microservizi, Spring Boot, Hibernate, Entity Framework Core, Blazor, .NET Razor Pages, DevExpress, Supabase"),
            ("Database e messaggistica", "SQLite, SQL Server, PostgreSQL, MySQL, EF Core, RabbitMQ (exchange, code, routing key)"),
            ("Metodologie e strumenti", "Git, GitHub Actions, Azure DevOps e Azure Pipelines, Docker, Postman, Maven, test unitari e UI, code review, Agile/Scrum"),
        ],
        "jobs": [
            ("Specialista in Sviluppo Software", "Azienda di software per il retail — Padova", "Giu 2024 – Presente", [
                "Unica sviluppatrice di un'applicazione Android di produzione per catene retail, in diretto raccordo con il product manager e con piena responsabilità sulla consegna.",
                "Migrazione dell'applicazione da Java a Kotlin, con ricostruzione dell'intera interfaccia in Jetpack Compose e architettura MVVM.",
                "Pianificazione e realizzazione della migrazione del database locale da GreenDAO a Room, con migrazioni di schema SQLite sui dispositivi già installati.",
                "Sviluppo e manutenzione di microservizi .NET (C#) e API REST a supporto dell'app palmare e degli strumenti amministrativi.",
                "Integrazione di RabbitMQ per la comunicazione tra dispositivi palmari, applicazioni in negozio e servizi di back office.",
                "Integrazione di periferiche Epson e Custom — lettura barcode e stampa scontrini — con dispositivi Android industriali.",
                "Sviluppo di una web app Blazor con DevExpress, in produzione, per l'analisi delle performance multi-store; supporto in produzione con analisi di crash e ANR e rilasci via Azure Pipelines e Docker.",
            ]),
            ("Sviluppatrice Software", "Azienda di software per la fatturazione elettronica — Padova", "Mar 2023 – Apr 2024", [
                "Sviluppo backend su una piattaforma di fatturazione elettronica realizzata come microservizi Java con integrazione ERP, in Spring Boot, Hibernate, PostgreSQL e MySQL.",
                "Migrazione del sistema di build da Ant a Maven e aggiornamento della piattaforma da Java 8 a Java 17.",
                "Realizzazione dell'integrazione con software di archiviazione legale per la conformità alla conservazione digitale.",
                "Scrittura di test unitari e UI, risoluzione di bug critici in produzione, miglioramento del flusso di onboarding clienti e partecipazione a code review, documentazione tecnica e pipeline CI/CD in contesto Agile.",
            ]),
            ("Sviluppatrice Tirocinante", "Azienda di software bancario — Milano", "Set 2022 – Gen 2023", [
                "Sviluppo di un'applicazione Spring Boot e Hibernate per un sistema bancario, con gestione dei dati utente, calcolo del limite di credito e configurazione dell'autenticazione e degli accessi sicuri.",
            ]),
            ("Tirocinante", "Azienda di software per la fatturazione elettronica — Padova", "Feb 2022 – Lug 2022", [
                "Miglioramento dell'automazione dei test per software di fatturazione elettronica, oggetto della tesi di laurea magistrale: migrazione dell'esecuzione dei test da browser locali a remoti, con un incremento del 25% dell'efficienza. Contributo alla documentazione e alle attività di QA inter-team.",
            ]),
        ],
        "projects": [
            ("PaceTasks", "in sviluppo", "pacetasks",
             "App per iPhone che aiuta chi ha un orario di lavoro fisso a pianificare le attività personali prima e dopo il lavoro. TypeScript, React Native ed Expo, backend Supabase (Postgres con row-level security, Auth, Edge Function). Test Jest, pgTAP e Playwright eseguiti con GitHub Actions a ogni pull request."),
            ("Deskfocus", "macOS", "deskfocus",
             "App per la barra dei menu e widget desktop per macOS che riunisce le attività del giorno (iCloud, Google Calendar, Google Tasks) e un timer di concentrazione per attività. Sviluppata con Xcode, WidgetKit e App Intents."),
        ],
        "education": [
            ("Laurea Magistrale in ICT for Internet and Multimedia", "Università degli Studi di Padova", "Ago 2020 – Dic 2022"),
            ("Laurea Triennale in Ingegneria Elettrica ed Elettronica", "University of Turkish Aeronautical Association — Ankara, Turchia", "Ago 2014 – Giu 2018"),
        ],
        "languages": "Turco: madrelingua · Inglese: ottima conoscenza professionale · Italiano: B1–B2, utilizzato quotidianamente al lavoro.",
    },
}

STYLE = """
@page { size: A4; margin: 14mm 14mm 14mm 14mm; }
* { box-sizing: border-box; }
body { margin: 0; color: #1d2433; font: 10pt/1.45 Inter, 'Segoe UI', Arial, sans-serif; }
main { max-width: 820px; margin: 0 auto; padding: 32px 24px; }
h1 { margin: 0; font-size: 24pt; color: #0a192f; }
.role { margin: 2px 0 6px; color: #0f8f73; font-size: 12pt; font-weight: 600; }
.contact { margin: 0 0 6px; color: #56607a; font-size: 9pt; }
.contact a { color: inherit; text-decoration: none; }
h2 { margin: 16px 0 6px; padding-bottom: 3px; border-bottom: 1.5px solid #0f8f73; color: #0a192f; font-size: 10pt; letter-spacing: .12em; text-transform: uppercase; }
p { margin: 0; }
.skills { display: grid; grid-template-columns: 130px 1fr; gap: 3px 12px; }
.skills dt { font-weight: 700; }
.skills dd { margin: 0; }
.job { margin-top: 10px; break-inside: avoid; }
.job-head { display: flex; justify-content: space-between; gap: 12px; }
.job-head strong { color: #0a192f; }
.muted { color: #56607a; }
.job-head .muted { flex-shrink: 0; white-space: nowrap; }
.project a { color: #0f8f73; text-decoration: none; }
ul { margin: 4px 0 0; padding-left: 16px; }
li { margin: 2px 0; }
@media print { main { padding: 0; } a { color: inherit; text-decoration: none; } .project a { color: #0f8f73; } }
"""


def link(label: str, href: str) -> str:
    """Renders an escaped anchor; links stay clickable in the printed PDF."""
    return f'<a href="{escape(href)}">{escape(label)}</a>'


def render_contact(location: str) -> str:
    """Builds the two-line contact header (details, then web links)."""
    details = [escape(location)] + [link(label, href) for label, href in CONTACT_LINES[0]]
    web = [link(label, href) for label, href in CONTACT_LINES[1]]
    return " · ".join(details) + "<br />" + " · ".join(web)


def render_projects(projects: list) -> str:
    """Builds the personal projects list with each repo linked."""
    items = []
    for name, tag, repo_key, text in projects:
        repo = PROJECT_REPOS[repo_key]
        items.append(f'<li class="project"><strong>{escape(name)}</strong> <span class="muted">({escape(tag)})</span> — '
                     f'{link(repo, f"https://{repo}")}. {escape(text)}</li>')
    return f'<ul>{"".join(items)}</ul>'


def render(lang: str, data: dict) -> str:
    """Builds one CV page as a standalone HTML document."""
    s = data["sections"]
    skills = "".join(f"<dt>{escape(k)}</dt><dd>{escape(v)}</dd>" for k, v in data["skills"])
    jobs = "".join(
        f'<div class="job"><div class="job-head"><span><strong>{escape(role)}</strong> · {escape(place)}</span>'
        f'<span class="muted">{escape(dates)}</span></div><ul>{"".join(f"<li>{escape(b)}</li>" for b in bullets)}</ul></div>'
        for role, place, dates, bullets in data["jobs"]
    )
    edu = "".join(
        f'<div class="job"><div class="job-head"><span><strong>{escape(d)}</strong> · {escape(p)}</span>'
        f'<span class="muted">{escape(dt)}</span></div></div>'
        for d, p, dt in data["education"]
    )
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bilge Ozcanbaz — CV ({lang.upper()})</title>
<style>{STYLE}</style>
</head>
<body>
<main>
<h1>Bilge Ozcanbaz</h1>
<p class="role">{escape(data["title"])}</p>
<p class="contact">{render_contact(data["location"])}</p>
<h2>{escape(s["summary"])}</h2><p>{escape(data["summary"])}</p>
<h2>{escape(s["skills"])}</h2><dl class="skills">{skills}</dl>
<h2>{escape(s["experience"])}</h2>{jobs}
<h2>{escape(s["projects"])}</h2>{render_projects(data["projects"])}
<h2>{escape(s["education"])}</h2>{edu}
<h2>{escape(s["languages"])}</h2><p>{escape(data["languages"])}</p>
</main>
</body>
</html>
"""


def print_pdfs(html_paths: list) -> None:
    """Prints each HTML page to an A4 PDF beside it with headless Chromium (needs: pip install playwright)."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("[build-cv] playwright not installed, skipped PDFs — print the HTML pages to A4 PDF by hand", file=sys.stderr)
        return
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page()
        for html_path in html_paths:
            page.goto(html_path.as_uri())
            pdf_path = html_path.with_suffix(".pdf")
            page.pdf(path=str(pdf_path), format="A4", print_background=True, prefer_css_page_size=True)
            print(f"[build-cv] wrote {pdf_path.name}")
        browser.close()


if __name__ == "__main__":
    written = []
    for language, content in CV.items():
        path = OUT_DIR / f"Bilge_Ozcanbaz_CV_{language.upper()}.html"
        path.write_text(render(language, content), encoding="utf-8")
        written.append(path)
        print(f"[build-cv] wrote {path.name}")
    print_pdfs(written)
