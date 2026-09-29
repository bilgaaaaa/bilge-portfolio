"""Generates the public EN/IT CV HTML pages in assets/cv from one data source.

Public version: no birth date or home address. Run: python3 tools/build-cv.py
"""
from html import escape
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parent.parent / "assets" / "cv"

CONTACT = "Padova, Italy · +39 339 204 7793 · ozcanbazbilge@gmail.com · linkedin.com/in/bilge-ozcanbaz-692652114 · github.com/bilgaaaaa"

CV = {
    "en": {
        "title": "Software Developer · Android, Java & .NET",
        "contact": CONTACT,
        "sections": {"summary": "Professional summary", "skills": "Technical skills", "experience": "Professional experience",
                     "education": "Education", "languages": "Languages"},
        "summary": "Software Developer with 4+ years of experience building Android applications and backend services for retail and enterprise software companies in Italy. Sole developer on a production Android retail application, which I migrated from Java to Kotlin and rebuilt in Jetpack Compose, while working daily on .NET (C#) microservices, SQL databases and RabbitMQ messaging. Earlier experience in Java backend development with Spring Boot, Hibernate, PostgreSQL and MySQL. Comfortable owning a feature end to end, from device integration through to the service behind it.",
        "skills": [
            ("Languages", "Kotlin, Java, C# / .NET 8, SQL, JavaScript, HTML/CSS"),
            ("Mobile", "Android SDK, Jetpack Compose, MVVM, Room, GreenDAO, device & peripheral integration"),
            ("Backend", "REST APIs, microservices, Spring Boot, Hibernate, Entity Framework Core, Blazor, .NET Razor Pages, DevExpress"),
            ("Data & messaging", "SQLite, SQL Server, PostgreSQL, MySQL, EF Core, RabbitMQ (exchanges, queues, routing keys)"),
            ("Practices & tools", "Git, Azure DevOps & Azure Pipelines, Docker, Postman, Maven, unit and UI testing, code review, Agile/Scrum"),
        ],
        "jobs": [
            ("Software Development Specialist", "System Retail — Padova, Italy", "Jun 2024 – Present", [
                "Sole developer on a production Android application for retail chains, working directly with the product manager and owning delivery end to end.",
                "Migrated the application from Java to Kotlin, rebuilding the entire screen layer in Jetpack Compose with an MVVM architecture.",
                "Planned and implemented the local database migration from GreenDAO to Room, including SQLite schema migrations on installed devices.",
                "Built and maintained .NET (C#) microservices and REST APIs supporting the handheld application and administrative tools.",
                "Integrated RabbitMQ messaging connecting handheld devices, in-store applications and back-office services.",
                "Integrated Epson and Custom peripherals — barcode scanning and receipt printing — with industrial Android devices.",
                "Developed a Blazor and DevExpress web application, now in production, for multi-store performance analysis.",
                "Support the application in production: crash and ANR investigation, release work with Azure Pipelines and Docker.",
            ]),
            ("Software Developer", "Ifin Sistemi — Padova, Italy", "Mar 2023 – Apr 2024", [
                "Backend development on Invoice Channel, an electronic invoicing platform built as Java microservices with ERP integration, using Spring Boot, Hibernate, PostgreSQL and MySQL.",
                "Migrated the build system from Ant to Maven and upgraded the platform from Java 8 to Java 17.",
                "Implemented an integration with legal archiving software to support digital preservation compliance.",
                "Wrote unit and UI tests, resolved critical production bugs, improved the client onboarding workflow and contributed to code reviews, documentation and CI/CD pipelines in an Agile team.",
            ]),
            ("Intern Developer", "Iason SRL — Milan, Italy", "Sep 2022 – Jan 2023", [
                "Built a Spring Boot and Hibernate application for a banking system, including user data management, a credit limit calculator and the authentication and secure access configuration.",
            ]),
            ("Intern", "Ifin Sistemi — Padova, Italy", "Feb 2022 – Jul 2022", [
                "Improved test automation for electronic invoicing software as the subject of the MSc thesis project, migrating test execution from local to remote browsers and increasing testing efficiency by 25%. Contributed to documentation and cross-team QA activities.",
            ]),
        ],
        "education": [
            ("MSc in ICT for Internet and Multimedia", "University of Padova — Padova, Italy", "Aug 2020 – Dec 2022"),
            ("BSc in Electrical & Electronics Engineering", "University of Turkish Aeronautical Association — Ankara, Turkey", "Aug 2014 – Jun 2018"),
        ],
        "languages": "Turkish: native · English: professional working proficiency · Italian: B1–B2, used daily at work.",
    },
    "it": {
        "title": "Sviluppatrice Software · Android, Java e .NET",
        "contact": CONTACT.replace("Italy", "Italia"),
        "sections": {"summary": "Profilo professionale", "skills": "Competenze tecniche", "experience": "Esperienza professionale",
                     "education": "Formazione", "languages": "Lingue"},
        "summary": "Sviluppatrice software con oltre 4 anni di esperienza nello sviluppo di applicazioni Android e servizi backend per aziende italiane del settore retail e software enterprise. Sono l'unica sviluppatrice di un'applicazione Android di produzione, che ho migrato da Java a Kotlin ricostruendola in Jetpack Compose, e lavoro quotidianamente su microservizi .NET (C#), database SQL e messaggistica RabbitMQ. In precedenza ho maturato esperienza di sviluppo backend Java con Spring Boot, Hibernate, PostgreSQL e MySQL. Sono abituata a seguire una funzionalità dall'inizio alla fine, dai dispositivi fino ai servizi backend.",
        "skills": [
            ("Linguaggi", "Kotlin, Java, C# / .NET 8, SQL, JavaScript, HTML/CSS"),
            ("Mobile", "Android SDK, Jetpack Compose, MVVM, Room, GreenDAO, integrazione di dispositivi e periferiche"),
            ("Backend", "API REST, microservizi, Spring Boot, Hibernate, Entity Framework Core, Blazor, .NET Razor Pages, DevExpress"),
            ("Dati e messaggistica", "SQLite, SQL Server, PostgreSQL, MySQL, EF Core, RabbitMQ (exchange, code, routing key)"),
            ("Metodi e strumenti", "Git, Azure DevOps e Azure Pipelines, Docker, Postman, Maven, test unitari e di interfaccia, code review, Agile/Scrum"),
        ],
        "jobs": [
            ("Software Development Specialist", "System Retail — Padova", "Giu 2024 – Oggi", [
                "Unica sviluppatrice di un'applicazione Android di produzione per catene retail, in diretto raccordo con il product manager e responsabile della consegna end to end.",
                "Migrazione dell'applicazione da Java a Kotlin, con la ricostruzione dell'intero livello di interfaccia in Jetpack Compose e architettura MVVM.",
                "Pianificazione e realizzazione della migrazione del database locale da GreenDAO a Room, incluse le migrazioni di schema SQLite sui dispositivi installati.",
                "Sviluppo e manutenzione di microservizi .NET (C#) e API REST a supporto dell'app palmare e degli strumenti amministrativi.",
                "Integrazione della messaggistica RabbitMQ tra palmari, applicazioni in negozio e servizi di back-office.",
                "Integrazione di periferiche Epson e Custom — lettura barcode e stampa scontrini — con dispositivi Android industriali.",
                "Sviluppo di un'applicazione web Blazor e DevExpress, oggi in produzione, per l'analisi delle performance multi-negozio.",
                "Supporto in produzione: analisi di crash e ANR, rilasci con Azure Pipelines e Docker.",
            ]),
            ("Sviluppatrice Software", "Ifin Sistemi — Padova", "Mar 2023 – Apr 2024", [
                "Sviluppo backend su Invoice Channel, piattaforma di fatturazione elettronica a microservizi Java integrata con gli ERP, con Spring Boot, Hibernate, PostgreSQL e MySQL.",
                "Migrazione del sistema di build da Ant a Maven e aggiornamento della piattaforma da Java 8 a Java 17.",
                "Integrazione con il software di conservazione sostitutiva per la conformità normativa.",
                "Test unitari e di interfaccia, risoluzione di bug critici in produzione, miglioramento dell'onboarding clienti e contributo a code review, documentazione e pipeline CI/CD in un team Agile.",
            ]),
            ("Sviluppatrice (stage)", "Iason SRL — Milano", "Set 2022 – Gen 2023", [
                "Sviluppo di un'applicazione Spring Boot e Hibernate per un sistema bancario: gestione dati utente, calcolo del fido, autenticazione e configurazione degli accessi sicuri.",
            ]),
            ("Stagista", "Ifin Sistemi — Padova", "Feb 2022 – Lug 2022", [
                "Miglioramento dell'automazione dei test del software di fatturazione elettronica come progetto di tesi magistrale: esecuzione spostata da browser locali a remoti, con un aumento del 25% dell'efficienza. Contributo alla documentazione e alle attività di QA tra team.",
            ]),
        ],
        "education": [
            ("Laurea Magistrale in ICT for Internet and Multimedia", "Università degli Studi di Padova", "Ago 2020 – Dic 2022"),
            ("Laurea in Ingegneria Elettrica ed Elettronica", "University of Turkish Aeronautical Association — Ankara, Turchia", "Ago 2014 – Giu 2018"),
        ],
        "languages": "Turco: madrelingua · Inglese: livello professionale · Italiano: B1–B2, uso quotidiano al lavoro.",
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
h2 { margin: 16px 0 6px; padding-bottom: 3px; border-bottom: 1.5px solid #0f8f73; color: #0a192f; font-size: 10pt; letter-spacing: .12em; text-transform: uppercase; }
p { margin: 0; }
.skills { display: grid; grid-template-columns: 130px 1fr; gap: 3px 12px; }
.skills dt { font-weight: 700; }
.skills dd { margin: 0; }
.job { margin-top: 10px; break-inside: avoid; }
.job-head { display: flex; justify-content: space-between; gap: 12px; }
.job-head strong { color: #0a192f; }
.muted { color: #56607a; }
ul { margin: 4px 0 0; padding-left: 16px; }
li { margin: 2px 0; }
@media print { main { padding: 0; } a { color: inherit; text-decoration: none; } }
"""


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
<p class="contact">{escape(data["contact"])}</p>
<h2>{escape(s["summary"])}</h2><p>{escape(data["summary"])}</p>
<h2>{escape(s["skills"])}</h2><dl class="skills">{skills}</dl>
<h2>{escape(s["experience"])}</h2>{jobs}
<h2>{escape(s["education"])}</h2>{edu}
<h2>{escape(s["languages"])}</h2><p>{escape(data["languages"])}</p>
</main>
</body>
</html>
"""


if __name__ == "__main__":
    for language, content in CV.items():
        path = OUT_DIR / f"Bilge_Ozcanbaz_CV_{language.upper()}.html"
        path.write_text(render(language, content), encoding="utf-8")
        print(f"[build-cv] wrote {path.name}")
