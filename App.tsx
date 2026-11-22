import React, { useMemo, useState } from "react";
import { Search, ArrowUpRight, BookOpen, MonitorSmartphone, Clock, BadgeCheck, ChevronRight, Globe2, FlaskConical, Scale, Landmark, Brain, ExternalLink, Youtube, Check, Info } from "lucide-react";
import heroUrl from "container:///mnt/data/src/assets/4e53525d92bc02d8-image_20261122_132723.webp";

type Course = { title: string; desc: string; level: string; tag: string };
type Category = { id: string; short: string; heading: string; blurb: string; icon: React.ReactNode; courses: Course[] };

const CATALOG_URL = "https://pll.harvard.edu/CATALOG/free";
const VIDEO_URL = "https://youtu.be/bB2o81DnKHk";
const PRODUCT_VIDEO_URL = "https://youtu.be/bB2o81DnKHk?si=E8w06tiCbgnb28Sy";
const MALAN_URL = "https://cs.harvard.edu/malan/";

const categories: Category[] = [
  {
    id: "cs",
    short: "Computer Science & AI",
    heading: "Computer Science, Programming & AI",
    blurb: "Start with no experience or go deep into AI, security, and the web.",
    icon: <MonitorSmartphone size={18} />,
    courses: [
      { title: "CS50: Introduction to Computer Science", desc: "A friendly first look at coding, problem solving, and how computers think.", level: "Beginner friendly", tag: "Flagship" },
      { title: "CS50's Introduction to Programming with Python", desc: "Learn Python step by step with small, hands-on challenges.", level: "Beginner", tag: "Popular" },
      { title: "CS50's Introduction to Programming with Scratch", desc: "A colourful, visual way to try coding for the very first time.", level: "Younger learners", tag: "Top pick" },
      { title: "CS50's Web Programming with Python and JavaScript", desc: "Build interactive web pages and apps with modern tools.", level: "Intermediate", tag: "Project-based" },
      { title: "CS50's Introduction to Artificial Intelligence with Python", desc: "A practical tour of search, learning, and how AI systems decide.", level: "Intermediate", tag: "AI" },
      { title: "CS50's Introduction to Cybersecurity", desc: "How online attacks work — and how people protect systems and data.", level: "Beginner friendly", tag: "Security" },
      { title: "CS50's Introduction to Game Development", desc: "Make simple games while learning design and coding ideas.", level: "Intermediate", tag: "Creative" },
      { title: "CS50's Computer Science for Business Professionals", desc: "Tech ideas explained for people who lead teams and make decisions.", level: "No coding needed", tag: "For leaders" },
      { title: "CS50's Computer Science for Lawyers", desc: "Computing ideas explained through everyday legal questions.", level: "No coding needed", tag: "For law" },
      { title: "CS50's Understanding Technology", desc: "Plain-language tour of the internet, hardware, and staying safe online.", level: "Beginner", tag: "Foundations" },
      { title: "Machine Learning and AI with Python", desc: "From data to predictions — how machine-learning models are built.", level: "Intermediate", tag: "AI" },
      { title: "MLOps for Scaling TinyML", desc: "How tiny AI models are shipped, checked, and kept running.", level: "Advanced", tag: "TinyML" },
      { title: "Applications of TinyML", desc: "Small, low-power AI in everyday devices and real settings.", level: "Intermediate", tag: "TinyML" },
      { title: "TinyML and Efficient Deep Learning Computing", desc: "Ways to make deep learning smaller, faster, and device-friendly.", level: "Advanced", tag: "TinyML" },
    ],
  },
  {
    id: "data",
    short: "Data Science & Math",
    heading: "Data Science, Math & Statistics",
    blurb: "From first charts and chances to a full capstone project.",
    icon: <Brain size={18} />,
    courses: [
      { title: "Data Science: R Basics", desc: "First steps in R and the habits of a careful data analyst.", level: "Beginner", tag: "R" },
      { title: "Data Science: Wrangling", desc: "Tidy messy spreadsheets and datasets so they are ready to explore.", level: "Beginner", tag: "R" },
      { title: "Data Science: Probability", desc: "Chance, randomness, and what uncertain results really mean.", level: "Beginner", tag: "Math" },
      { title: "Data Science: Inference and Modeling", desc: "From a sample to a claim — estimates, tests, and simple models.", level: "Intermediate", tag: "Statistics" },
      { title: "Data Science: Productivity Tools", desc: "Everyday tools and workflows that keep analysis tidy and repeatable.", level: "Beginner", tag: "Tools" },
      { title: "Data Science: Visualization", desc: "Make clear, honest charts that help people understand numbers.", level: "Beginner", tag: "Visualization" },
      { title: "Data Science: Machine Learning", desc: "Prediction, checking models, and spotting when they go wrong.", level: "Intermediate", tag: "ML" },
      { title: "Data Science: Linear Regression", desc: "A classic modelling tool — patterns, relationships, and careful reading.", level: "Intermediate", tag: "Statistics" },
      { title: "Data Science: Capstone", desc: "Pull the series together in one real project of your own.", level: "Capstone", tag: "Project" },
      { title: "Principles, Statistical and Computational Tools for Reproducible Data Science", desc: "Keep analysis open, checkable, and easy to rerun.", level: "Intermediate", tag: "Reproducible" },
      { title: "Introduction to Probability", desc: "A steady foundation in chance, averages, and distributions.", level: "Intermediate", tag: "Math" },
      { title: "Introduction to Linear Models and Matrix Algebra", desc: "Vectors, matrices, and the maths behind many data tools.", level: "Intermediate", tag: "Math" },
      { title: "Data Analysis: Basic Probability and Statistics", desc: "Core probability and statistics for reading and doing analysis.", level: "Beginner", tag: "Statistics" },
      { title: "Quantitative Methods for Biology", desc: "Numbers and statistics applied to living things and real studies.", level: "Intermediate", tag: "Biology" },
      { title: "Advanced Bioconductor", desc: "Advanced tools for working with genomic data in R.", level: "Advanced", tag: "Genomics" },
    ],
  },
  {
    id: "science",
    short: "Science Health & Environment",
    heading: "Science, Health & Environment",
    blurb: "Brains, cells, cooking, climate, and how people stay healthy.",
    icon: <FlaskConical size={18} />,
    courses: [
      { title: "Principles of Biochemistry", desc: "The molecules of life — what they do and how cells use energy.", level: "Intermediate", tag: "Life science" },
      { title: "Fundamentals of Neuroscience, Part 1: The Electrical Properties of the Neuron", desc: "How nerve cells carry signals and stay electrically active.", level: "Intermediate", tag: "Neuroscience" },
      { title: "Fundamentals of Neuroscience, Part 2: Neurons and Networks", desc: "How nerve cells link up, talk, and form working circuits.", level: "Intermediate", tag: "Neuroscience" },
      { title: "Fundamentals of Neuroscience, Part 3: The Brain", desc: "How brain areas work together for sensing, moving, and thinking.", level: "Intermediate", tag: "Neuroscience" },
      { title: "Fundamentals of Neuroscience Final Exam", desc: "A closing check for the Fundamentals of Neuroscience series.", level: "Assessment", tag: "Neuroscience" },
      { title: "Energy and Thermodynamics", desc: "Energy, heat, and the rules behind engines, weather, and cells.", level: "Intermediate", tag: "Physics" },
      { title: "Energy to Electrochemistry Final Exam", desc: "A closing check for the energy and electrochemistry series.", level: "Assessment", tag: "Physics" },
      { title: "Super-Earths and Life", desc: "What astronomers look for when asking if a far-off world could support life.", level: "Beginner friendly", tag: "Astronomy" },
      { title: "Science & Cooking: From Haute Cuisine to Soft Matter Science (chemistry)", desc: "Cooking as chemistry — gels, foams, and why flavours behave as they do.", level: "Beginner friendly", tag: "Top pick" },
      { title: "Science & Cooking: From Haute Cuisine to Soft Matter Science (physics)", desc: "Cooking as physics — heat, texture, and what makes a dish work.", level: "Beginner friendly", tag: "Top pick" },
      { title: "Food Fermentation: The Science of Cooking with Microbes", desc: "Bread, yoghurt, kimchi, and more — microbes at work in the kitchen.", level: "Beginner friendly", tag: "Food science" },
      { title: "The Health Effects of Climate Change", desc: "How a warming world affects health — and what communities can do.", level: "Beginner friendly", tag: "Climate" },
      { title: "Human Anatomy: Musculoskeletal Cases", desc: "Learn anatomy through real cases and the moving human body.", level: "Intermediate", tag: "Medicine" },
      { title: "Stem Cell Medicine: Parkinson's Disease", desc: "What stem cells are, how research works, and what it may mean for Parkinson’s.", level: "Beginner friendly", tag: "Medicine" },
      { title: "Innovating in Health Care", desc: "How fresh ideas, teams, and models can improve care and access.", level: "Beginner friendly", tag: "Health" },
      { title: "Building Personal Resilience: Managing Anxiety and Mental Health", desc: "Practical, evidence-informed ways to cope and stay steady.", level: "Beginner friendly", tag: "Wellbeing" },
      { title: "Business Transformation through a Culture of Health", desc: "How workplaces can support health, focus, and a kinder culture.", level: "Beginner friendly", tag: "Health" },
    ],
  },
  {
    id: "business",
    short: "Business Law & Economics",
    heading: "Business, Law & Economics",
    blurb: "Contracts, negotiation, learning, and starting something that lasts.",
    icon: <Scale size={18} />,
    courses: [
      { title: "Entrepreneurship in Emerging Economies", desc: "How founders solve tough problems and build ventures in emerging markets.", level: "Beginner friendly", tag: "Entrepreneurship" },
      { title: "Contract Law: From Trust to Promise to Contract", desc: "Why promises become contracts — and what happens when they break.", level: "Beginner friendly", tag: "Law" },
      { title: "Justice", desc: "A much-loved course on fairness, rights, and what we owe one another.", level: "Beginner friendly", tag: "Top pick" },
      { title: "Negotiating Salary", desc: "A short, practical guide to preparing for a salary conversation.", level: "Beginner friendly", tag: "Careers" },
      { title: "Nonprofit Financial Stewardship Webinar: Introduction to Accounting and Financial Statements", desc: "Read nonprofit accounts with confidence and look after resources well.", level: "Beginner", tag: "Nonprofit" },
      { title: "Leaders of Learning Essentials", desc: "What good learning looks like — and how leaders can support it.", level: "Beginner friendly", tag: "Education" },
      { title: "Introduction to Family Engagement in Education", desc: "How families and educators can partner so every learner thrives.", level: "Beginner friendly", tag: "Education" },
    ],
  },
  {
    id: "humanities",
    short: "Humanities Literature & Arts",
    heading: "Humanities, Literature & Arts",
    blurb: "Stories, cities, art, music, and the objects that carry meaning.",
    icon: <BookOpen size={18} />,
    courses: [
      { title: "Ancient Masterpieces of World Literature", desc: "Epic, drama, and poetry from the ancient world — still vivid today.", level: "Beginner friendly", tag: "Literature" },
      { title: "Modern Masterpieces of World Literature", desc: "How modern writers remade the novel, the poem, and the story.", level: "Beginner friendly", tag: "Literature" },
      { title: "Shakespeare's Othello: The Moor", desc: "A close reading of jealousy, trust, and power in Othello.", level: "Beginner friendly", tag: "Shakespeare" },
      { title: "Shakespeare's Hamlet: The Ghost", desc: "A close reading of Hamlet — grief, doubt, and one famous ghost.", level: "Beginner friendly", tag: "Shakespeare" },
      { title: "Tangible Things", desc: "Learn history through objects — what things reveal when we look closely.", level: "Beginner friendly", tag: "History" },
      { title: "The Architectural Imagination", desc: "How architects see, draw, and imagine buildings and cities.", level: "Beginner friendly", tag: "Architecture" },
      { title: "Pyramids of Giza: Ancient Egyptian Art and Archaeology", desc: "Ancient Egypt through its art, monuments, and archaeology.", level: "Beginner friendly", tag: "Archaeology" },
      { title: "Introduction to Digital Humanities", desc: "What happens when humanities questions meet data and code.", level: "Beginner", tag: "Digital" },
      { title: "The Path to Happiness: What Chinese Philosophy Teaches Us about the Good Life", desc: "Chinese traditions on living well and finding balance.", level: "Beginner friendly", tag: "Philosophy" },
      { title: "PredictionX: John Snow and the Cholera Epidemic of 1854", desc: "How careful reasoning traced a deadly outbreak to its source.", level: "Beginner friendly", tag: "PredictionX" },
      { title: "PredictionX: Omens, Oracles & Prophecies", desc: "Why people have always tried to predict the future — and what we learn.", level: "Beginner friendly", tag: "PredictionX" },
      { title: "Stravinsky's Rite of Spring: Modernism, Ballet, and Riots", desc: "The music, dance, and scandal that changed modern art.", level: "Beginner friendly", tag: "Music" },
      { title: "CitiesX: The Past, Present and Future of Urban Life", desc: "How cities grow, change, and shape the people who live in them.", level: "Beginner friendly", tag: "Cities" },
    ],
  },
  {
    id: "history",
    short: "History Religion & Cultures",
    heading: "History, Religion & World Cultures",
    blurb: "China, sacred texts, and the questions that still shape our world.",
    icon: <Landmark size={18} />,
    courses: [
      { title: "Global China: From the Mongols to the Ming", desc: "China in a connected world — empire, trade, and culture.", level: "Beginner friendly", tag: "China" },
      { title: "Creating Modern China: The Republican Period to the Present", desc: "Revolution, reform, and the making of modern China.", level: "Beginner friendly", tag: "China" },
      { title: "Invasions, Rebellions, and the Fall of Imperial China", desc: "War, upheaval, and the end of imperial China.", level: "Beginner friendly", tag: "China" },
      { title: "Buddhism Through Its Scriptures", desc: "Buddhist thought through texts that Buddhists have long treasured.", level: "Beginner friendly", tag: "Scriptures" },
      { title: "Christianity Through Its Scriptures", desc: "Christian thought through texts that Christians have long treasured.", level: "Beginner friendly", tag: "Scriptures" },
      { title: "Islam Through Its Scriptures", desc: "Islamic thought through texts that Muslims have long treasured.", level: "Beginner friendly", tag: "Scriptures" },
      { title: "Judaism Through Its Scriptures", desc: "Jewish thought through texts that Jews have long treasured.", level: "Beginner friendly", tag: "Scriptures" },
      { title: "Sikhism Through Its Scriptures", desc: "Sikh thought through texts that Sikhs have long treasured.", level: "Beginner friendly", tag: "Scriptures" },
      { title: "The Jewish Bible: Its History As A Physical Artifact", desc: "The Bible as a book — copied, bound, carried, and kept across centuries.", level: "Beginner friendly", tag: "History" },
      { title: "A Darkening Horizon: Nuclear Dangers Around the World", desc: "The history and present risks of nuclear weapons — and why they matter.", level: "Beginner friendly", tag: "Global" },
    ],
  },
];

const total = categories.reduce((s, c) => s + c.courses.length, 0);
type Page = "home" | "courses" | "notes";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => {
        const inCat = active === "All" || cat.short === active;
        if (!inCat) return { ...cat, courses: [] };
        const courses = cat.courses.filter((c) => !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || cat.heading.toLowerCase().includes(q));
        return { ...cat, courses };
      })
      .filter((c) => c.courses.length > 0);
  }, [query, active]);

  const visibleCount = filtered.reduce((s, c) => s + c.courses.length, 0);
  const shellStyle = { boxSizing: "border-box" as const, paddingTop: "var(--safe-area-inset-top)" };
  const tabs: { id: Page; label: string; short: string }[] = [
    { id: "home", label: "Page 1 — Home", short: "Page 1" },
    { id: "courses", label: "Page 2 — Courses", short: "Page 2" },
    { id: "notes", label: "Page 3 — Notes", short: "Page 3" },
  ];

  return (
    <div data-safe-area-inset-root style={shellStyle} className="min-h-screen bg-[var(--paper)] text-[var(--ink)] overflow-x-clip">
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-30 border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={() => setCurrentPage("home")} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[var(--navy)] font-display text-lg font-black text-white">C</span>
            <span className="leading-none">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--teal)]">Free Online</span>
              <span className="font-display mt-1 block text-[17px] font-bold leading-tight [overflow-wrap:anywhere] sm:text-[18px]">Free Links to Computer Learning</span>
              <span className="mt-0.5 block text-xs font-semibold text-[var(--muted)]">Shared By Jayson Marayag</span>
            </span>
          </button>
          <nav aria-label="Pages" className="flex flex-wrap items-center gap-1.5">
            {tabs.map((t) => (
              <button key={t.id} type="button" onClick={() => setCurrentPage(t.id)} aria-pressed={currentPage === t.id} aria-current={currentPage === t.id ? "page" : undefined} className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition sm:px-4 ${currentPage === t.id ? "bg-[var(--navy)] text-white" : "border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--teal)] hover:text-[var(--teal-deep)]"}`}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* PAGE 1 — HOME: poster image + 1 line + 2 buttons only */}
        <div className={currentPage === "home" ? "" : "hidden"}>
          <section aria-label="Page 1 — Home">
            <p className="mx-auto max-w-[1220px] px-4 pt-3 text-center text-sm sm:px-6">Featured video: <a href={VIDEO_URL} target="_blank" rel="noopener" className="font-bold text-[var(--teal-deep)] underline">- YouTube</a></p>
            <figure className="m-0 w-full bg-[var(--surface)]">
              <img src={heroUrl} alt="Free Links to Computer Learning — Shared By Jayson Marayag" className="block h-auto w-full object-contain" />
            </figure>
            <div className="mx-auto max-w-[900px] px-4 pb-14 pt-7 text-center sm:px-6">
              <p className="mx-auto max-w-[760px] text-[17px] font-semibold leading-relaxed [overflow-wrap:anywhere] sm:text-lg">Free Links to Computer Learning — Shared By Jayson Marayag. A community learning page sharing free links to computer learning.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => setCurrentPage("courses")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3.5 text-sm font-bold text-white hover:bg-[var(--navy-deep)]">Browse Courses <span aria-hidden="true">→</span> Go to Page 2 <ChevronRight size={16} /></button>
                <button type="button" onClick={() => setCurrentPage("notes")} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 text-sm font-bold hover:border-[var(--teal)] hover:text-[var(--teal-deep)]">How It Works <span aria-hidden="true">→</span> Go to Page 3 <ChevronRight size={16} /></button>
              </div>
            </div>
          </section>
        </div>

        {/* PAGE 2 — COURSES */}
        <div className={currentPage === "courses" ? "" : "hidden"}>
          <section aria-label="Page 2 — Courses">
            <div className="mx-auto max-w-[1220px] px-4 py-8 sm:px-6 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--teal)]">Page 2</p>
              <h1 className="font-display mt-2 text-[clamp(2rem,5vw,3.2rem)] font-black leading-[1.02] [overflow-wrap:anywhere]">Browse Courses</h1>
              <p className="mt-2 text-sm text-[var(--muted)]">Pick a course, then choose Audit on edX. <button type="button" onClick={() => setCurrentPage("notes")} className="font-bold text-[var(--teal-deep)] underline">See how it works on Page 3 →</button></p>

              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm sm:p-4">
                <label className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 focus-within:border-[var(--teal)]">
                  <Search size={20} className="shrink-0 text-[var(--muted)]" />
                  <span className="sr-only">Search courses</span>
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses — try “Python”, “AI”, “Data Science”…" className="w-full bg-transparent text-[15px] outline-none placeholder:text-[var(--muted)]" />
                  {query && <button type="button" onClick={() => setQuery("")} className="shrink-0 rounded-full bg-[var(--teal-soft)] px-3 py-1 text-xs font-bold text-[var(--teal-deep)]">Clear</button>}
                </label>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                  {["All", ...categories.map((c) => c.short)].map((label) => (
                    <button key={label} type="button" onClick={() => setActive(label)} aria-pressed={active === label} className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${active === label ? "border-[var(--navy)] bg-[var(--navy)] text-white" : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--teal)] hover:text-[var(--teal-deep)]"}`}>{label}</button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]" aria-live="polite">Showing <strong className="text-[var(--teal)]">{visibleCount}</strong> of {total} courses{query.trim() ? ` for “${query.trim()}”` : ""}. {(query || active !== "All") && <button type="button" onClick={() => { setQuery(""); setActive("All"); }} className="font-bold text-[var(--teal-deep)] underline">Reset</button>}</p>
              </div>

              <div className="mt-8 space-y-10">
                {filtered.map((cat) => (
                  <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                    <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[var(--teal)] pb-3">
                      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--navy)] text-white">{cat.icon}</span><div><h2 id={`cat-${cat.id}`} className="font-display text-xl font-bold leading-tight sm:text-2xl [overflow-wrap:anywhere]">{cat.heading}</h2><p className="mt-0.5 text-sm text-[var(--muted)]">{cat.blurb}</p></div></div>
                      <span className="rounded-full bg-[var(--teal-soft)] px-3 py-1 text-xs font-bold text-[var(--teal-deep)]">{cat.courses.length} course{cat.courses.length === 1 ? "" : "s"}</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {cat.courses.map((course) => (
                        <article key={course.title} className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:border-[var(--teal)]/40 hover:shadow-[0_12px_30px_rgba(14,124,123,0.08)]">
                          <div className="flex items-center justify-between gap-2"><span className="rounded-full bg-[var(--paper)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">{course.tag}</span><span className="text-[11px] font-semibold text-[var(--muted)]">{course.level}</span></div>
                          <h3 className="font-display mt-3 text-[17px] font-bold leading-snug [overflow-wrap:anywhere]">{course.title}</h3>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{course.desc}</p>
                          <a href={CATALOG_URL} target="_blank" rel="noopener" className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-[var(--teal-deep)] hover:underline">View on edX / Harvard Online <ArrowUpRight size={15} /></a>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
                {filtered.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] p-10 text-center">
                    <p className="font-display text-xl font-bold">No courses matched “{query}”</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">Try a shorter word — “Python”, “China”, “Music”, “Health”.</p>
                    <button type="button" onClick={() => { setQuery(""); setActive("All"); }} className="mt-4 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-bold text-white">Show all {total} courses</button>
                  </div>
                )}
              </div>

              {/* VIDEO — no embed, no autoplay, single plain link */}
              <section aria-label="Video" className="mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="bg-[var(--navy)] p-6 text-white sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7AD0CE]">Watch &amp; Learn — Video</p>
                    <h2 className="font-display mt-3 text-2xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-3xl">Harvard Professor: CS50, What Matters More Than Programming Now, Lecturing Well | David J Malan</h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">An interview with David Malan, the professor behind CS50, on how CS50 works, how to lecture well, and how AI is changing CS education. Shared here as an external link for learning.</p>
                    <article className="mt-6 rounded-2xl border border-white/25 bg-white/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Video link</p>
                      <h3 className="font-display mt-2 text-lg font-bold leading-snug [overflow-wrap:anywhere]"><a href={PRODUCT_VIDEO_URL} target="_blank" rel="noopener">- YouTube</a></h3>
                      <a href={VIDEO_URL} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[var(--navy)] hover:bg-[var(--teal-soft)]"><Youtube size={18} /> Watch on YouTube <ArrowUpRight size={16} /></a>
                      <p className="mt-3 text-xs leading-relaxed text-white/70">Opens on YouTube in a new tab. This page only shares the link.</p>
                    </article>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold leading-snug">Key takeaways</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">Seven ideas to listen for while you watch.</p>
                    <ol className="mt-5 space-y-3">
                      {["Why CS50 starts with C", "Depth vs engagement in learning", "The ideal use of AI in education", "Cheating and AI", "Should we still learn CS?", "Growth vs fixed mindset", "Advice for beginners"].map((item, i) => (
                        <li key={item} className="flex gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--teal)] text-xs font-black text-white">{i + 1}</span>
                          <span className="text-sm font-semibold leading-relaxed [overflow-wrap:anywhere]">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>
              <section aria-label="About David Malan" className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-sm leading-relaxed">
                <p>About the professor: <a href={MALAN_URL} target="_blank" rel="noopener" className="font-bold text-[var(--teal-deep)] underline underline-offset-2">David Malan — cs.harvard.edu/malan</a></p>
              </section>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => setCurrentPage("home")} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-bold hover:border-[var(--teal)]">← Back to Home</button>
                <button type="button" onClick={() => setCurrentPage("notes")} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-bold hover:border-[var(--teal)]">Go to Page 3 — Notes</button>
              </div>
            </div>
          </section>
        </div>

        {/* PAGE 3 — NOTES */}
        <div className={currentPage === "notes" ? "" : "hidden"}>
          <section aria-label="Page 3 — Notes">
            <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 sm:py-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--teal)]">Page 3 — Back page</p>
              <h1 className="font-display mt-2 text-[clamp(2rem,5vw,3.2rem)] font-black leading-[1.02] [overflow-wrap:anywhere]">Notes — Please Read</h1>
              <p className="mt-2 max-w-[720px] text-[15px] leading-relaxed text-[var(--muted)]">Everything in one place, at the back of the page. Free Links to Computer Learning — Shared By Jayson Marayag.</p>

              <div className="mt-8 space-y-5">
                <section aria-labelledby="note-1" className="rounded-2xl border-2 border-[var(--alert-border)] bg-[var(--alert-bg)] p-5 text-[var(--alert-text)] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em]">Section 1</p>
                  <h2 id="note-1" className="font-display mt-2 text-2xl font-black leading-tight">Important Disclaimer</h2>
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed [overflow-wrap:anywhere]">This is a community learning page sharing free public links to computer learning. &lsquo;Free Links to Computer Learning&rsquo; is a community page by Jayson Marayag. This page is an independent resource page, not affiliated with, endorsed by, or sponsored by Harvard University, Harvard Online, or edX. &lsquo;Harvard&rsquo; is a trademark of Harvard University. Learners enroll directly on edX. No credit, certificate, or admission advantage is provided by this page.</p>
                </section>

                <section aria-labelledby="note-2" className="rounded-2xl border-4 border-[#E8C547] bg-[#FFF8D6] p-5 text-[#5A4300] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em]">Section 2</p>
                  <h2 id="note-2" className="font-display mt-2 text-2xl font-black leading-tight">FREE ONLINE — Choose AUDIT</h2>
                  <p className="mt-3 text-base font-bold leading-relaxed [overflow-wrap:anywhere] sm:text-lg">Free Online means: Choose AUDIT. If you choose Certified / Verified / Track / Verified Certificate, or you upgrade later, it has a fee. You will be asked to pay on edX. If you want it FREE, always choose Audit This Course. Do NOT choose Certified, Verified, Verified Track, or Upgrade.</p>
                </section>

                <section aria-labelledby="note-3" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--teal)]">Section 3</p>
                  <h2 id="note-3" className="font-display mt-2 text-2xl font-bold leading-tight">Steps to Follow — No Download Needed</h2>
                  <ol className="mt-4 space-y-3">
                    {["Click View on edX", "Pick a course", "Create free account (no card)", "Choose Audit This Course — NOT Verified", "Start learning"].map((s, i) => (
                      <li key={s} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--teal)] text-xs font-black text-white">{i + 1}</span><span className="text-[15px] font-semibold leading-relaxed [overflow-wrap:anywhere]">{s}</span></li>
                    ))}
                  </ol>
                  <p className="mt-4 rounded-xl bg-[var(--teal-soft)] px-4 py-3 text-sm font-semibold leading-relaxed">Do they have to download edX? No. Browser is enough. App is optional.</p>
                </section>

                <section aria-labelledby="note-4" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--teal)]">Section 4</p>
                  <h2 id="note-4" className="font-display mt-2 text-2xl font-bold leading-tight">What Does Free to Audit Mean?</h2>
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed">Free to audit = free to learn. Certificate = paid.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
                      <h3 className="font-display font-bold">What you get</h3>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                        <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" /><span>Watch lectures / videos</span></li>
                        <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" /><span>Read the readings</span></li>
                        <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" /><span>Do practice exercises</span></li>
                        <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" /><span>Learn at your own pace</span></li>
                        <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[var(--teal)]" /><span>No charge</span></li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
                      <h3 className="font-display font-bold">What you don&apos;t get</h3>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                        <li className="flex gap-2"><span aria-hidden="true" className="font-black">×</span><span>No verified certificate</span></li>
                        <li className="flex gap-2"><span aria-hidden="true" className="font-black">×</span><span>Sometimes no graded assignments / final exam</span></li>
                        <li className="flex gap-2"><span aria-hidden="true" className="font-black">×</span><span>Sometimes access expires — edX will tell you the date</span></li>
                        <li className="flex gap-2"><span aria-hidden="true" className="font-black">×</span><span>No Harvard credit</span></li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-bold leading-relaxed [overflow-wrap:anywhere]">If you choose Certified / Verified / Track now, or upgrade later, edX will charge you, usually $99–$299. Audit stays free.</p>
                </section>

                <section aria-labelledby="note-5" className="rounded-2xl bg-[var(--navy)] p-5 text-white sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7AD0CE]">Section 5 — Next Page</p>
                  <h2 id="note-5" className="font-display mt-2 text-2xl font-bold leading-tight">How to Show What You Learned Without Paying</h2>
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed">Honest answer: NO free Harvard / edX verified certificate.</p>
                  <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/90">
                    <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[var(--navy)]">1</span><span>Learn free with AUDIT</span></li>
                    <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[var(--navy)]">2</span><span>Build 1 small project on GitHub (free)</span></li>
                    <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[var(--navy)]">3</span><span>Put on resume / LinkedIn as &ldquo;Completed [Course] on Audit + built [Project]&rdquo;</span></li>
                    <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[var(--navy)]">4</span><span>Use free proof where it exists (freeCodeCamp / Khan Academy) but do NOT claim they are Harvard certificates</span></li>
                    <li className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[var(--navy)]">5</span><span>Only pay if job / school asks for verified</span></li>
                  </ol>
                  <p className="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold leading-relaxed">Do NOT say &ldquo;I have a Harvard certificate&rdquo; if you only audited.</p>
                </section>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={CATALOG_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--navy-deep)]">View on edX / Harvard Online <ExternalLink size={15} /></a>
                <button type="button" onClick={() => setCurrentPage("home")} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-bold hover:border-[var(--teal)]">← Back to Home</button>
                <button type="button" onClick={() => setCurrentPage("courses")} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-bold hover:border-[var(--teal)]">Go to Page 2</button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-[var(--muted)] sm:px-6">
          <p className="font-semibold [overflow-wrap:anywhere]">Free Links to Computer Learning — Shared By Jayson Marayag · Free to audit · {total} courses</p>
          <p className="inline-flex items-center gap-1.5"><Info size={13} /> Full notes are on Page 3. <a href={VIDEO_URL} target="_blank" rel="noopener" className="font-bold text-[var(--teal-deep)] underline">- YouTube</a></p>
        </div>
      </footer>
    </div>
  );
}
