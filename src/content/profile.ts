/**
 * All personal content for the site lives in this file.
 *
 * Source of truth: Katya_Alferov_CV.docx (public/cv/), November 2026 version.
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
  | "project"
  | "toolkit";

export const evidenceLabels: Record<Evidence, { short: string; long: string }> = {
  partner: { short: "Partner", long: "Used in the ETL & BI Developer role at Partner" },
  isracard: { short: "Isracard", long: "Used in the ETL Developer role at Isracard" },
  progeeks: { short: "ProGeeks", long: "Taught at ProGeeks" },
  studies: { short: "Coursework", long: "Studied at The Open University" },
  marketing: { short: "Marketing", long: "Used in marketing, brand and client roles" },
  project: { short: "Projects", long: "Used in personal projects such as AdPulse" },
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
  role: "ETL, BI & Data Developer | Marketing & Brand Manager",
  location: "Israel",
  locationNote: "Open to relevant opportunities",
  email: "katyaalferov@gmail.com",
  /** Displayed as written on the CV. */
  phoneDisplay: "(054) 520-6797",
  phoneHref: "tel:+972545206797",
  /** Shown in the hero, contact section and footer; set to null to hide. */
  linkedin: "https://www.linkedin.com/in/katya-alferov-4a4ab3133/" as string | null,
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
  eyebrow: ["ETL & BI", "Data Engineering", "Applied AI", "Marketing & Brand"],
  headline: { lead: "Turning complex data", accent: "into clarity." },
  intro:
    "Hi, I’m Katya Alferov — an ETL, BI & Data Developer and a Senior Marketing, Brand & Project Manager. At Partner I build ETL processes, BI reporting and AI-driven products; before data, I spent 7+ years leading digital marketing, brand and client projects. I love the point where data, AI, development and marketing meet.",
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
      { name: "APIs", evidence: ["partner"] },
      { name: "Mainframe (COBOL) files", evidence: ["isracard"] },
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
      { name: "Power BI (DAX)", evidence: ["partner"] },
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
    "I work where data systems meet the business. On the billing team at Partner, I build and maintain the ETL processes, database objects, reports and AI-driven initiatives that billing data depends on — from the specification, through QA and release, to supporting it in production.",
    "Before that, at Isracard, I developed ETL processes with Informatica in a data warehouse environment, worked across Teradata, Oracle and SQL Server, and was part of the shift-based support for Informatica and Control-M failures.",
    "Before data, I spent 7+ years in marketing: as Marketing Manager and Client Account Manager at Upper Group, as a brand and digital marketing consultant for large clients, at agencies such as Social Lady, DigiTouch and Razi Interactive, and as the founder of my own swimwear brand, Dream Bikinis. I led PPC and SEO campaigns, brand strategy and client portfolios in Israel and the USA.",
    "I also taught Java, Python and web development at ProGeeks, and I hold two B.A. degrees from The Open University: Computer Science & Business Administration, and Psychology.",
  ],
  threads: [
    { label: "Systems", text: "Computer Science degree; ETL development across Informatica, Control-M and three database platforms; streaming with Kafka and Spark." },
    { label: "Data & AI", text: "Complex SQL, tuning, validation and analysis; AI-driven products and initiatives at Partner." },
    { label: "Business & Marketing", text: "Business Administration degree; 7+ years of marketing, brand and client management; founding Dream Bikinis." },
    { label: "People", text: "Cross-department projects, client strategy sessions, teaching programming, and a Psychology degree." },
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
      "Hands-on ETL, BI and AI development for billing, with ownership that continues past go-live: testing, releasing, monitoring and supporting what ships.",
    groups: [
      {
        label: "Build",
        items: [
          "Develop, maintain, test and enhance ETL processes with Informatica PowerCenter, Python and APIs.",
          "Develop reports and dashboards with SAP BusinessObjects and Power BI (including DAX).",
          "Create and maintain tables, packages and stored procedures for the Billing department.",
          "Write technical and functional specifications (FSD/TSD) from stakeholder requirements.",
        ],
      },
      {
        label: "Optimize",
        items: [
          "Write and edit complex SQL on Oracle and Microsoft SQL Server for extraction, validation, data and gap analysis, troubleshooting, and SQL tuning of query and ETL performance.",
        ],
      },
      {
        label: "Test & Run",
        items: [
          "Write test documentation (STP, STD, STR) and test scenarios, and run functional, regression, sanity, data quality and performance/runtime tests.",
          "Manage the release lifecycle with GIT and CI/CD pipelines: production deployments and post-go-live support.",
        ],
      },
      {
        label: "Lead & Collaborate",
        items: [
          "Lead end-to-end data/ETL projects in Agile and DWH environments, working with teams from multiple departments across the organization.",
          "Develop AI-driven products and initiatives, and use generative AI to improve daily workflows.",
        ],
      },
    ],
    tech: [
      "Informatica PowerCenter",
      "Python",
      "APIs",
      "Oracle",
      "Microsoft SQL Server",
      "SAP BusinessObjects",
      "Power BI (DAX)",
      "GIT / CI/CD",
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
          "Build pipelines with JSON, XML and Mainframe (COBOL) files, and HTTP and Java transformations.",
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
      "Mainframe (COBOL)",
      "Jenkins",
      "Jira",
    ],
  },
  {
    id: "upper",
    title: "Marketing Manager & Client Account Manager",
    company: "Upper Group",
    start: "2020",
    end: "2023",
    range: "2020 — 2023",
    summary:
      "Led marketing teams and a portfolio of client accounts — from strategy and SWOT sessions to campaign delivery and KPI optimization.",
    groups: [
      {
        label: "Lead",
        items: [
          "Recruited, onboarded and managed teams of content writers, PPC specialists and SEO professionals.",
          "Oversaw marketing operations, campaign budgets, stakeholder alignment and workflow to maximize ROI and client retention.",
        ],
      },
      {
        label: "Clients",
        items: [
          "Served as Client Account Manager, leading end-to-end client, brand and multi-channel marketing projects from roadmap to delivery.",
          "Ran business strategy consultations: SWOT analysis, market research, competitor benchmarking and brand differentiation.",
        ],
      },
    ],
    tech: ["PPC", "SEO", "Content strategy", "Brand management", "SWOT analysis", "KPI optimization"],
  },
  {
    id: "progeeks",
    title: "Programming Teacher",
    company: "ProGeeks",
    start: "2021",
    end: "2023",
    range: "2021 — 2023",
    summary: "Taught Java, Python and web development courses (JavaScript, HTML, CSS, React, Node.js).",
    groups: [
      {
        label: "Teach",
        items: ["Taught Java.", "Taught Python.", "Taught web development."],
      },
    ],
    tech: ["Java", "Python", "JavaScript", "HTML", "CSS", "React", "Node.js"],
  },
  {
    id: "freelance",
    title: "Brand & Digital Marketing Consultant",
    company: "Self-Employed",
    start: "2017",
    end: "2023",
    range: "2017 — 2023",
    summary:
      "Full-funnel digital marketing, websites and analytics for large, high-profile clients and diverse commercial businesses.",
    groups: [
      {
        label: "Campaigns",
        items: [
          "Led full-funnel digital marketing strategies, performance marketing (PPC) and organic growth campaigns.",
        ],
      },
      {
        label: "Web & SEO",
        items: [
          "Ran business strategy consultations, built custom WordPress websites and landing pages (Elementor Pro), and executed technical and content SEO.",
        ],
      },
      {
        label: "Data",
        items: [
          "Analyzed cross-channel performance, designed A/B tests and built KPI dashboards to optimize conversion, ROI and engagement.",
        ],
      },
    ],
    tech: ["Google Ads", "Meta Ads", "SEO", "WordPress", "Elementor Pro", "Google Analytics", "A/B testing"],
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
    title: "Founder, Designer & Brand Manager",
    company: "Dream Bikinis",
    range: "2017 — 2021",
    summary:
      "Founded, designed and launched an independent swimwear brand from zero: brand identity, product design, go-to-market, e-commerce and social media.",
  },
  {
    title: "Digital Marketing & Account Manager",
    company: "Social Lady",
    range: "2017 — 2018",
    summary:
      "PPC and organic social campaigns for clients in Israel and the USA; SEO and brand strategy sessions; bilingual website content.",
  },
  {
    title: "Web & E-Commerce Project Manager",
    company: "Razi Interactive",
    range: "2016 — 2017",
    summary:
      "Built and managed websites and e-commerce stores on WordPress and Shopify; digital strategy, content and SEO for clients.",
  },
  {
    title: "Digital Content Specialist",
    company: "WebNoise",
    range: "2015 — 2017",
    summary: "Digital content and marketing copy aligned with each client’s brand voice and SEO best practices.",
  },
  {
    title: "Digital Content Writer",
    company: "Personas Media",
    range: "2015 — 2017",
    summary: "Engaging content across platforms, supporting brand storytelling and organic growth.",
  },
  {
    title: "Digital Content & SEO Strategist",
    company: "DigiTouch",
    range: "2015 — 2016",
    summary: "Website content, SEO and link building, WordPress websites and marketing analysis for clients in diverse industries.",
  },
];

/** Agencies and companies Katya worked with on the marketing side (from Katya). */
export const marketingPartners = ["Upper Group", "Social Lady", "DigiTouch", "Razi Interactive", "WebNoise", "Personas Media", "SEO Link"];

export const earlierSkills = [
  "PPC (Google & Meta Ads)",
  "SEO & link building",
  "Brand strategy",
  "Client & account management",
  "KPI analysis & A/B testing",
  "Google Analytics & Tag Manager",
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
      { name: "APIs", evidence: ["partner"] },
      { name: "Data warehouse environments", evidence: ["isracard"] },
      { name: "Control-M", evidence: ["isracard"] },
      { name: "Mainframe (COBOL) files", evidence: ["isracard"] },
      { name: "Snowflake", evidence: ["toolkit"] },
      { name: "Apache Airflow", evidence: ["toolkit"] },
    ],
  },
  {
    id: "sql",
    label: "Databases & SQL",
    skills: [
      { name: "Oracle", evidence: ["partner", "isracard"] },
      { name: "Microsoft SQL Server", evidence: ["partner", "isracard"] },
      { name: "Teradata", evidence: ["isracard"] },
      { name: "PostgreSQL", evidence: ["project"] },
      { name: "Complex SQL queries", evidence: ["partner", "isracard", "studies"] },
      { name: "Stored procedures", evidence: ["partner", "isracard"] },
      { name: "SQL performance tuning", evidence: ["partner"] },
      { name: "Toad", evidence: ["toolkit"] },
    ],
  },
  {
    id: "bi",
    label: "BI & Reporting",
    skills: [
      { name: "Power BI (DAX)", evidence: ["partner"] },
      { name: "SAP BusinessObjects", evidence: ["partner"] },
      { name: "Tableau", evidence: ["toolkit"] },
      { name: "Reporting & dashboards", evidence: ["partner", "marketing"] },
    ],
  },
  {
    id: "cloud",
    label: "Cloud, Streaming & Big Data",
    skills: [
      { name: "Apache Kafka", evidence: ["project"] },
      { name: "Apache Spark (PySpark)", evidence: ["project"] },
      { name: "S3 data lake (Parquet)", evidence: ["project"] },
      { name: "Docker & Docker Compose", evidence: ["project"] },
      { name: "FastAPI", evidence: ["project"] },
      { name: "CI/CD", evidence: ["partner", "project"] },
      { name: "AWS", evidence: ["toolkit"] },
      { name: "Microsoft Azure", evidence: ["toolkit"] },
      { name: "Google Cloud (GCP)", evidence: ["toolkit"] },
      { name: "Kubernetes", evidence: ["toolkit"] },
      { name: "Linux", evidence: ["toolkit"] },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    skills: [
      { name: "SQL", evidence: ["partner", "isracard", "studies"] },
      { name: "Python", evidence: ["partner", "progeeks", "project"] },
      { name: "Java", evidence: ["isracard", "progeeks", "studies"] },
      { name: "JavaScript", evidence: ["progeeks"] },
      { name: "React", evidence: ["progeeks"] },
      { name: "Node.js", evidence: ["progeeks"] },
      { name: "HTML", evidence: ["progeeks"] },
      { name: "CSS", evidence: ["progeeks"] },
      { name: "C", evidence: ["studies"] },
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    skills: [
      { name: "Generative AI", evidence: ["partner"] },
      { name: "AI product development", evidence: ["partner"] },
      { name: "LLMs", evidence: ["toolkit"] },
      { name: "RAG", evidence: ["toolkit"] },
      { name: "MCP (Model Context Protocol)", evidence: ["toolkit"] },
      { name: "Hallucination detection & mitigation", evidence: ["toolkit"] },
      { name: "AI agents", evidence: ["toolkit"] },
      { name: "LangChain", evidence: ["toolkit"] },
      { name: "Prompt engineering", evidence: ["toolkit"] },
      { name: "ChatGPT", evidence: ["toolkit"] },
      { name: "Claude & Claude Code", evidence: ["toolkit", "project"] },
      { name: "Copilot", evidence: ["toolkit"] },
    ],
  },
  {
    id: "marketing",
    label: "Marketing, Brand & Project Management",
    skills: [
      { name: "End-to-end project management", evidence: ["partner", "marketing"] },
      { name: "Brand management & positioning", evidence: ["marketing"] },
      { name: "Client & account management", evidence: ["marketing"] },
      { name: "Go-to-market strategy", evidence: ["marketing"] },
      { name: "PPC (Google Ads, Meta)", evidence: ["marketing"] },
      { name: "SEO & link building", evidence: ["marketing"] },
      { name: "Content strategy", evidence: ["marketing"] },
      { name: "CRO & A/B testing", evidence: ["marketing"] },
      { name: "Google Analytics (GA4)", evidence: ["marketing"] },
      { name: "Google Tag Manager", evidence: ["marketing"] },
      { name: "Ahrefs, SEMrush, Screaming Frog", evidence: ["marketing"] },
      { name: "WordPress, Shopify, Elementor Pro", evidence: ["marketing"] },
    ],
  },
  {
    id: "workflow",
    label: "Engineering Workflow",
    skills: [
      { name: "QA & test documentation (STP, STD, STR)", evidence: ["partner"] },
      { name: "GIT", evidence: ["partner", "project"] },
      { name: "Jenkins", evidence: ["isracard"] },
      { name: "Jira", evidence: ["isracard"] },
      { name: "Production support", evidence: ["partner", "isracard"] },
      { name: "Technical documentation", evidence: ["partner", "isracard"] },
      { name: "Cross-functional delivery", evidence: ["partner", "isracard", "marketing"] },
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
    gpa: "85",
  },
  {
    degree: "B.A. Psychology",
    school: "The Open University",
    range: "2019 — 2025",
    gpa: "87",
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
  { name: "Digital Marketing and Advertising course", provider: "HackerU College, 2015" },
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
  {
    title: "Quality before release",
    context: "Partner",
    text: "Test plans, designs and reports (STP, STD, STR), with functional, regression, sanity, data quality and runtime tests before anything reaches production.",
    tags: ["QA", "Regression", "Data quality"],
  },
  {
    title: "Growing brands and client portfolios",
    context: "Upper Group · Self-Employed",
    text: "Marketing teams, client accounts and full-funnel campaigns — strategy sessions, PPC, SEO, websites and KPI dashboards for clients in Israel and abroad.",
    tags: ["Brand", "PPC", "SEO", "Client management"],
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
 * Personal and client projects.
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
export const projects: Project[] = [
  {
    // TODO(Katya): add what was produced, channels, visuals and results.
    slug: "tami-lazer-ad",
    title: "Tami Lazer: commercial ad",
    year: "2026",
    summary:
      "A commercial ad for digital media for Tami Lazer, a laser company in Bat Yam, Israel: from the idea and the message to the finished creative, made for the platforms where the company's local customers spend their time.",
    points: [
      "Concept, messaging and script",
      "Creative produced for digital and social media",
      "Aimed at customers in Bat Yam and the surrounding area",
    ],
    stack: ["Advertising", "Copywriting", "Creative", "Digital media", "Local marketing"],
    links: [{ label: "Project on GitHub", href: "https://github.com/katya-alferov/TamiLazer-ad" }],
  },
  {
    slug: "adpulse",
    title: "AdPulse",
    year: "2026",
    summary:
      "A real-time ad-tech analytics platform: synthetic ad events stream through Kafka, are processed by Spark Structured Streaming, land in an S3-compatible data lake and PostgreSQL, and are served by FastAPI to a Streamlit dashboard. Everything runs with one docker compose up.",
    points: [
      "Validation, deduplication, watermarks and 1-minute event-time windows, with a dead-letter topic for bad data",
      "Click-fraud detection and publisher rankings with Spark window functions",
      "Unit, PySpark and end-to-end integration tests",
    ],
    stack: ["Apache Kafka", "PySpark", "S3 / Parquet", "PostgreSQL", "FastAPI", "Streamlit", "Docker", "pytest"],
    links: [{ label: "Code on GitHub", href: "https://github.com/katya-alferov/AdPulse" }],
  },
  {
    slug: "petalport",
    title: "Petalport",
    year: "2026",
    summary:
      "A colourful, offline, single-player virtual-life game for children aged 7–13: dress up, decorate a home, work fun jobs, cook and travel. It runs in iPhone Safari and on desktop, with no ads, chat, accounts or purchases, and nothing leaves the device.",
    points: [
      "Installable offline web app (PWA); saves stay on the device",
      "Original SVG art for every character, outfit and room",
      "Unit, content and end-to-end tests on iPhone and desktop browsers, built and deployed by CI",
    ],
    stack: ["React", "TypeScript", "Vite", "Zustand", "Motion", "Vitest", "Playwright", "GitHub Actions"],
    links: [
      { label: "Play", href: "https://katya-alferov.github.io/petal-port/" },
      { label: "Code on GitHub", href: "https://github.com/katya-alferov/petal-port" },
    ],
  },
];

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
  title: "Katya Alferov — ETL, BI & Data Developer | Marketing, Brand & Project Manager",
  description:
    "Katya Alferov is an ETL, BI & Data Developer and a Senior Marketing, Brand & Project Manager in Israel — Informatica, SQL, Python, Power BI and AI-driven products at Partner, plus 7+ years of digital marketing, brand and client management.",
};
