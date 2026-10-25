/**
 * All personal content for the site lives in this file.
 *
 * Source of truth: Katya_Alferov_CV_Final_v4.docx (public/cv/).
 * Update job titles, dates, technologies, contact details and projects here;
 * components read from these exports and should not need to change.
 */

import { asset } from "@/lib/paths";

/* ------------------------------------------------------------------ */
/* Evidence: where a skill or technology shows up on the CV            */
/* ------------------------------------------------------------------ */

export type Evidence =
  | "partner"
  | "isracard"
  | "progeeks"
  | "studies"
  | "marketing"
  | "toolkit";

export const evidenceLabels: Record<Evidence, { short: string; long: string }> = {
  partner: { short: "Partner", long: "Used in the ETL & BI Developer role at Partner" },
  isracard: { short: "Isracard", long: "Used in the ETL Developer role at Isracard" },
  progeeks: { short: "ProGeeks", long: "Taught at ProGeeks" },
  studies: { short: "Coursework", long: "Studied at The Open University" },
  marketing: { short: "Marketing", long: "Used in earlier marketing analytics work" },
  toolkit: { short: "Toolkit", long: "Listed in the CV skills section" },
};

/** Evidence types that come from paid professional roles. */
export const professionalEvidence: Evidence[] = ["partner", "isracard", "progeeks", "marketing"];

/* ------------------------------------------------------------------ */
/* Identity & contact                                                  */
/* ------------------------------------------------------------------ */

export const person = {
  name: "Katya Alferov",
  initials: "KA",
  role: "ETL & BI Developer",
  location: "Israel",
  locationNote: "Open to relevant opportunities",
  email: "katyaalferov@gmail.com",
  /** Displayed as written on the CV. */
  phoneDisplay: "(054) 520-6797",
  phoneHref: "tel:+972545206797",
  /**
   * No LinkedIn URL appears on the CV, so it is not shown.
   * Paste the verified profile URL here to add a LinkedIn link to the
   * contact section and footer automatically.
   */
  linkedin: null as string | null,
  languages: [
    { name: "Hebrew", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Russian", level: "Fluent" },
  ],
  /**
   * Portrait: none provided yet. To add one, place the image at
   * public/images/portrait.jpg and set this to "/images/portrait.jpg".
   * See README.md → "Adding a portrait".
   */
  portrait: null as { src: string; alt: string } | null,
};

export const cvFiles = {
  pdf: { href: asset("/cv/Katya_Alferov_CV.pdf"), label: "PDF" },
  docx: { href: asset("/cv/Katya_Alferov_CV.docx"), label: "Word" },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: ["Data Engineering", "ETL", "BI", "Applied AI"],
  headline: { lead: "Turning complex data", accent: "into clarity." },
  intro:
    "Hi, I’m Katya Alferov — a data professional working across ETL development, SQL, BI, and enterprise data systems. I enjoy understanding complex systems, solving problems, and turning technical challenges into reliable solutions.",
  primaryCta: { label: "Explore my work", href: "#experience" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

/* ------------------------------------------------------------------ */
/* Pipeline: conceptual map of the tools from Katya's roles            */
/* ------------------------------------------------------------------ */

export type PipelineTech = { name: string; evidence: Evidence[] };

export type PipelineStage = {
  id: string;
  index: string;
  label: string;
  short: string;
  summary: string;
  inPractice: string;
  tech: PipelineTech[];
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "sources",
    index: "01",
    label: "Data Sources",
    short: "Sources",
    summary:
      "Where data originates: operational databases, files and service calls, each arriving in its own shape.",
    inPractice:
      "ETL pipelines at Isracard included JSON and XML files and HTTP sources alongside relational systems.",
    tech: [
      { name: "JSON files", evidence: ["isracard"] },
      { name: "XML files", evidence: ["isracard"] },
      { name: "HTTP sources", evidence: ["isracard"] },
      { name: "Relational databases", evidence: ["partner", "isracard"] },
    ],
  },
  {
    id: "extraction",
    index: "02",
    label: "Extraction",
    short: "Extract",
    summary:
      "Pulling data out of source systems reliably and on schedule, so downstream steps start from a known state.",
    inPractice:
      "Building and maintaining Informatica processes, run as scheduled jobs and supported when they fail.",
    tech: [
      { name: "Informatica PowerCenter", evidence: ["partner"] },
      { name: "Informatica Developer", evidence: ["isracard"] },
      { name: "HTTP transformations", evidence: ["isracard"] },
    ],
  },
  {
    id: "transformation",
    index: "03",
    label: "Transformation & Validation",
    short: "Transform",
    summary:
      "Reshaping, joining and checking data so that what moves forward is consistent and correct.",
    inPractice:
      "Informatica mappings, Java transformations and SQL validation, with testing before anything reaches production.",
    tech: [
      { name: "Informatica PowerCenter", evidence: ["partner"] },
      { name: "Java transformations", evidence: ["isracard"] },
      { name: "SQL validation queries", evidence: ["partner", "isracard"] },
      { name: "Pre-release testing", evidence: ["partner"] },
    ],
  },
  {
    id: "database",
    index: "04",
    label: "SQL & Database Layer",
    short: "SQL / DB",
    summary:
      "Tables, views, packages and stored procedures — and the queries that have to run fast against them.",
    inPractice:
      "Complex SQL, stored procedures and SQL tuning: finding bottlenecks in data loading and retrieval.",
    tech: [
      { name: "Oracle", evidence: ["partner", "isracard"] },
      { name: "Microsoft SQL Server", evidence: ["partner", "isracard"] },
      { name: "Teradata", evidence: ["isracard"] },
      { name: "Stored procedures & packages", evidence: ["partner", "isracard"] },
      { name: "SQL performance tuning", evidence: ["partner"] },
    ],
  },
  {
    id: "warehouse",
    index: "05",
    label: "Data Warehouse",
    short: "Warehouse",
    summary:
      "Integrated, historical data modelled for analysis rather than for day-to-day transactions.",
    inPractice:
      "ETL development in a data warehouse environment, including tables, views and procedures in Teradata.",
    tech: [
      { name: "DWH environments", evidence: ["isracard"] },
      { name: "Teradata", evidence: ["isracard"] },
      { name: "DWH architecture & methodology", evidence: ["toolkit"] },
    ],
  },
  {
    id: "insights",
    index: "06",
    label: "BI, Reporting & Insights",
    short: "BI",
    summary:
      "Reports and dashboards that turn the data into answers people can act on.",
    inPractice:
      "Developing reports and dashboards, and translating technical detail for non-technical leadership and teams.",
    tech: [
      { name: "SAP BusinessObjects", evidence: ["partner"] },
      { name: "Power BI", evidence: ["partner"] },
      { name: "Tableau", evidence: ["toolkit"] },
    ],
  },
];

/** A layer that spans stages rather than being one of them. */
export const orchestrationLayer = {
  id: "orchestration",
  index: "∞",
  label: "Scheduling & Orchestration",
  short: "Orchestration",
  summary:
    "The layer around the pipeline: when jobs run, in what order, how releases get there, and who is called when something breaks.",
  inPractice:
    "Supporting Informatica and Control-M processes in 24-hour shift-based support at Isracard; writing Control-M designs; deploying releases and monitoring stability at Partner.",
  tech: [
    { name: "Control-M", evidence: ["isracard"] },
    { name: "Jenkins", evidence: ["isracard"] },
    { name: "Production support", evidence: ["partner", "isracard"] },
  ],
} satisfies Omit<PipelineStage, "id"> & { id: string };

export const pipelineNote =
  "A conceptual map of tools from my roles at Partner and Isracard — not a diagram of one specific production system.";

/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

export const story = {
  heading: "Systems, data, business — and the people in between.",
  paragraphs: [
    "I work where data systems meet the business. On the billing team at Partner, I build and maintain the ETL processes, database objects and reports that billing data depends on — from the specification, through testing and release, to supporting it in production.",
    "Before that, at Isracard, I developed ETL processes with Informatica in a data warehouse environment, worked across Teradata, Oracle and SQL Server, and was part of the shift-based support for Informatica and Control-M failures.",
    "Earlier, I taught Java and Python at ProGeeks, and spent several years in digital marketing analytics: tracking KPIs, designing A/B tests and reporting on what the numbers meant. I studied Computer Science & Business Administration, and Psychology, at The Open University.",
  ],
  threads: [
    { label: "Systems", text: "Computer Science degree; ETL development across Informatica, Control-M and three database platforms." },
    { label: "Data", text: "Complex SQL, stored procedures, tuning, validation and data analysis." },
    { label: "Business", text: "Business Administration degree; billing data; earlier marketing management and KPI reporting." },
    { label: "Communication", text: "Teaching programming; translating technical knowledge for non-technical leadership." },
  ],
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type ResponsibilityGroup = { label: string; items: string[] };

export type Role = {
  id: string;
  title: string;
  company: string;
  team?: string;
  start: string;
  end: string;
  /** Short, machine-friendly range for the timeline axis. */
  range: string;
  summary: string;
  groups: ResponsibilityGroup[];
  tech: string[];
};

export const roles: Role[] = [
  {
    id: "partner",
    title: "ETL & BI Developer",
    company: "Partner",
    team: "Billing team",
    start: "Nov 2024",
    end: "Present",
    range: "11.2024 — now",
    summary:
      "Hands-on ETL and BI development for billing, with ownership that continues past go-live: testing, releasing, monitoring and supporting what ships.",
    groups: [
      {
        label: "Build",
        items: [
          "Develop, maintain and improve ETL processes with Informatica PowerCenter.",
          "Develop reports and dashboards with SAP BusinessObjects and Power BI.",
          "Create and maintain tables, packages and stored procedures for the Billing department.",
          "Write technical and functional specifications.",
        ],
      },
      {
        label: "Optimize",
        items: [
          "Write complex SQL on Oracle and Microsoft SQL Server for extraction, validation, troubleshooting and analysis.",
          "Tune SQL and ETL performance: analysis, bottleneck identification, and faster data loading and retrieval.",
        ],
      },
      {
        label: "Run",
        items: [
          "Test and validate new developments before production deployment.",
          "Deploy releases to production and monitor stability after go-live.",
          "Troubleshoot production issues and provide production support.",
        ],
      },
      {
        label: "Collaborate",
        items: [
          "Work across development, architecture, QA, system analysis, infrastructure, BI, information security, DBA and business teams through the full SDLC.",
          "Translate technical detail for non-technical leadership and lead end-to-end data and ETL projects.",
          "Use generative AI tools to improve daily workflows and support AI-driven initiatives.",
        ],
      },
    ],
    tech: [
      "Informatica PowerCenter",
      "Oracle",
      "Microsoft SQL Server",
      "SAP BusinessObjects",
      "Power BI",
      "Generative AI",
    ],
  },
  {
    id: "isracard",
    title: "ETL Developer",
    company: "Isracard",
    start: "2022",
    end: "2024",
    range: "2022 — 2024",
    summary:
      "ETL development in an Agile, data warehouse environment, with semi-structured sources and round-the-clock operational support.",
    groups: [
      {
        label: "Build",
        items: [
          "Create, optimize and maintain ETL processes with Informatica tools, including Informatica Developer.",
          "Build pipelines with JSON and XML files, and HTTP and Java transformations.",
          "Create and maintain tables, views and stored procedures in Teradata.",
        ],
      },
      {
        label: "Query",
        items: [
          "Write SQL queries and procedures in Teradata, Oracle and Microsoft SQL Server to test and maintain ETL processes.",
        ],
      },
      {
        label: "Run",
        items: [
          "Provide 24-hour shift-based support for Informatica and Control-M failures.",
          "Document business and detailed designs for Control-M and ETL processes.",
        ],
      },
      {
        label: "Collaborate",
        items: [
          "Work with internal clients, BI developers, data developers, the DBA team and the Control-M team, using Jenkins and Jira.",
        ],
      },
    ],
    tech: [
      "Informatica Developer",
      "Teradata",
      "Oracle",
      "Microsoft SQL Server",
      "Control-M",
      "JSON / XML",
      "Jenkins",
      "Jira",
    ],
  },
  {
    id: "progeeks",
    title: "Programming Teacher",
    company: "ProGeeks",
    start: "2020",
    end: "2022",
    range: "2020 — 2022",
    summary: "Taught programming in Java and in Python.",
    groups: [
      {
        label: "Teach",
        items: ["Taught Java programming.", "Taught Python programming."],
      },
    ],
    tech: ["Java", "Python"],
  },
];

export type EarlierRole = {
  title: string;
  company?: string;
  range: string;
  summary: string;
};

export const earlierRoles: EarlierRole[] = [
  {
    title: "Marketing Manager",
    company: "upper.il",
    range: "2020 — 2021",
    summary:
      "Managed content writers, PPC and SEO specialists; coordinated marketing activity, budgets and workflow.",
  },
  {
    title: "Digital Marketing Analyst",
    company: "Freelance",
    range: "2017 — 2021",
    summary:
      "Collected and analysed channel data, tracked KPIs, built reports and dashboards, and designed A/B tests for SEO, PPC and content.",
  },
  {
    title: "Content Writer & Email Marketing",
    company: "Freelance",
    range: "2016 — 2021",
    summary:
      "Wrote content across many topics and planned content schedules to support SEO and engagement.",
  },
];

export const earlierSkills = [
  "KPI analysis & reporting",
  "Data-informed decisions",
  "A/B testing",
  "SEO & PPC analytics",
  "Google Analytics",
  "Cross-functional coordination",
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Skill = { name: string; evidence: Evidence[] };
export type SkillCategory = { id: string; label: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: "etl",
    label: "Data Engineering & ETL",
    skills: [
      { name: "Informatica PowerCenter", evidence: ["partner"] },
      { name: "Informatica Developer", evidence: ["isracard"] },
      { name: "ETL pipelines", evidence: ["partner", "isracard"] },
      { name: "Data warehouse environments", evidence: ["isracard"] },
      { name: "Control-M", evidence: ["isracard"] },
    ],
  },
  {
    id: "sql",
    label: "Databases & SQL",
    skills: [
      { name: "Oracle", evidence: ["partner", "isracard"] },
      { name: "Microsoft SQL Server", evidence: ["partner", "isracard"] },
      { name: "Teradata", evidence: ["isracard"] },
      { name: "Complex SQL queries", evidence: ["partner", "isracard", "studies"] },
      { name: "Stored procedures", evidence: ["partner", "isracard"] },
      { name: "SQL performance tuning", evidence: ["partner"] },
    ],
  },
  {
    id: "bi",
    label: "BI & Reporting",
    skills: [
      { name: "Power BI", evidence: ["partner"] },
      { name: "SAP BusinessObjects", evidence: ["partner"] },
      { name: "Tableau", evidence: ["toolkit"] },
      { name: "Reporting & dashboards", evidence: ["partner", "marketing"] },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    skills: [
      { name: "SQL", evidence: ["partner", "isracard", "studies"] },
      { name: "Java", evidence: ["isracard", "progeeks", "studies"] },
      { name: "Python", evidence: ["progeeks"] },
      { name: "C", evidence: ["toolkit"] },
      { name: "JavaScript", evidence: ["toolkit"] },
      { name: "HTML", evidence: ["toolkit"] },
      { name: "CSS", evidence: ["toolkit"] },
    ],
  },
  {
    id: "ai",
    label: "AI & Developer Productivity",
    skills: [
      { name: "Generative AI", evidence: ["partner"] },
      { name: "Prompt engineering", evidence: ["toolkit"] },
      { name: "ChatGPT", evidence: ["toolkit"] },
      { name: "Copilot", evidence: ["toolkit"] },
      { name: "Claude Code", evidence: ["toolkit"] },
      { name: "AI integration", evidence: ["toolkit"] },
    ],
  },
  {
    id: "workflow",
    label: "Engineering Workflow",
    skills: [
      { name: "Jenkins", evidence: ["isracard"] },
      { name: "Jira", evidence: ["isracard"] },
      { name: "Testing & validation", evidence: ["partner"] },
      { name: "Production support", evidence: ["partner", "isracard"] },
      { name: "Technical documentation", evidence: ["partner", "isracard"] },
      { name: "Cross-functional delivery", evidence: ["partner", "isracard"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const degrees = [
  {
    degree: "B.A. Computer Science & Business Administration",
    school: "The Open University",
    range: "2020 — 2024",
    gpa: "87",
  },
  {
    degree: "B.A. Psychology",
    school: "The Open University",
    range: "2019 — 2025",
    gpa: "86",
  },
];

export const courses = [
  { name: "Database Systems — SQL", grade: "93" },
  { name: "Information System Development", grade: "93" },
  { name: "Systems Programming Lab", grade: "92" },
  { name: "Advanced Programming in Java", grade: "86" },
  { name: "Data Structures and Introduction to Algorithms", grade: "82" },
  { name: "Computer Communication Networks", grade: "82" },
];

export const training = [
  { name: "ETL Informatica course", provider: "Aman Group" },
  { name: "Internet Marketing and Advertising course", provider: "HackerU College, 2016" },
];

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export const highlights = [
  {
    title: "Billing data, end to end",
    context: "Partner",
    text: "ETL processes, database objects and BusinessObjects / Power BI reporting for a billing domain — specified, built, tested, released and supported by the same developer.",
    tags: ["Informatica PowerCenter", "Oracle", "SQL Server", "BI"],
  },
  {
    title: "Making slow things fast",
    context: "Partner",
    text: "SQL tuning across queries and ETL loads: reading execution behaviour, finding the bottleneck, and improving how data is loaded and retrieved.",
    tags: ["SQL tuning", "Performance analysis"],
  },
  {
    title: "Pipelines with mixed inputs",
    context: "Isracard",
    text: "Data warehouse ETL that handled JSON and XML files, HTTP calls and Java transformations alongside Teradata, Oracle and SQL Server.",
    tags: ["Informatica Developer", "Teradata", "JSON / XML"],
  },
  {
    title: "Keeping production running",
    context: "Partner · Isracard",
    text: "Shift-based support for Informatica and Control-M failures, release deployment, and post-go-live monitoring of process stability.",
    tags: ["Control-M", "Production support"],
  },
];

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  /** What the project demonstrates, in one line each. */
  points?: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

/**
 * Personal projects. Empty until real, verifiable projects are published.
 * Add an entry here and it appears in the "Project index" automatically.
 *
 * Example:
 * {
 *   slug: "billing-quality-checks",
 *   title: "Data quality checks for CSV loads",
 *   year: "2026",
 *   summary: "A small Python tool that validates CSV files before loading them.",
 *   points: ["Rule-based validation", "Rejected-row report"],
 *   stack: ["Python", "SQL"],
 *   links: [{ label: "Source on GitHub", href: "https://github.com/…" }],
 * }
 */
export const projects: Project[] = [];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navigation = [
  { label: "Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const site = {
  title: "Katya Alferov — ETL & BI Developer",
  description:
    "Katya Alferov is a data professional in Israel working across ETL development, SQL, BI and enterprise data systems — Informatica, Oracle, SQL Server, Teradata, Power BI and SAP BusinessObjects.",
};
