const CATALOG_URL = "https://pll.harvard.edu/CATALOG/free";
const VIDEO_URL = "https://youtu.be/bB2o81DnKHk";
const MALAN_URL = "https://cs.harvard.edu/malan/";
const categories = window.CATALOG || [];
const total = categories.reduce((sum, category) => sum + category.courses.length, 0);
document.querySelector("#course-total").textContent = total;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function navigate(page) {
  location.hash = page;
}

function getPage() {
  const hash = location.hash.replace("#", "");
  return ["dashboard", "home", "courses", "notes", "license"].includes(hash) ? hash : "dashboard";
}

function renderDashboard() {
  const categoryCards = categories.map((category, index) => `
    <button class="dashboard-category" type="button" data-page="courses" data-category="${escapeHtml(category.short)}">
      <span class="dashboard-category-number">${index + 1}</span>
      <span>
        <strong>${escapeHtml(category.short)}</strong>
        <small>${category.courses.length} courses</small>
      </span>
      <span aria-hidden="true">→</span>
    </button>`).join("");

  return `
    <section class="dashboard-shell">
      <aside class="dashboard-sidebar">
        <div class="dashboard-profile">
          <span class="profile-mark">JM</span>
          <div><strong>Jayson Marayag</strong><small>Learning Library</small></div>
        </div>
        <div class="dashboard-menu" aria-label="Dashboard navigation">
          <button class="active" type="button" data-page="dashboard"><span aria-hidden="true">▦</span> Overview</button>
          <button type="button" data-page="courses"><span aria-hidden="true">▤</span> Course Library</button>
          <button type="button" data-page="notes"><span aria-hidden="true">◇</span> Notes &amp; Mail</button>
        </div>
        <button class="dashboard-license" type="button" data-page="license"><span aria-hidden="true">©</span><span><strong>Licensed</strong><small>All rights reserved</small></span></button>
      </aside>
      <div class="dashboard-main">
        <div class="dashboard-heading">
          <div><p class="eyebrow">Learning Dashboard</p><h1>Welcome back</h1></div>
          <button class="button primary" type="button" data-page="courses">Explore Library</button>
        </div>

        <div class="stat-grid">
          <article class="stat-card navy"><span>Course Library</span><strong>${total}</strong><small>Free courses listed</small></article>
          <article class="stat-card teal"><span>Categories</span><strong>${categories.length}</strong><small>Learning subjects</small></article>
          <article class="stat-card gold"><span>Access</span><strong>AUDIT</strong><small>Choose free learning</small></article>
        </div>

        <div class="dashboard-columns">
          <section class="dashboard-panel">
            <div class="panel-heading"><div><p class="eyebrow">Course Library</p><h2>Browse by subject</h2></div><button class="text-button" type="button" data-page="courses">View all</button></div>
            <div class="dashboard-categories">${categoryCards}</div>
          </section>

          <section class="dashboard-panel quick-actions">
            <div class="panel-heading"><div><p class="eyebrow">Quick Access</p><h2>Resources</h2></div></div>
            <button class="resource-card" type="button" data-page="courses"><span class="resource-icon">▤</span><span><strong>Open Library</strong><small>Search and filter ${total} courses</small></span><span>→</span></button>
            <button class="resource-card" type="button" data-page="notes"><span class="resource-icon">✉</span><span><strong>Notes &amp; Disclaimer</strong><small>Review audit and certificate guidance</small></span><span>→</span></button>
            <button class="resource-card" type="button" id="copy-link"><span class="resource-icon">⌁</span><span><strong>Copy Page Link</strong><small id="copy-status">Share this learning dashboard</small></span><span>→</span></button>
          </section>
        </div>

        <section class="dashboard-feature">
          <div><p class="eyebrow light">Featured video</p><h2>Inside CS50 with David J. Malan</h2><p>Watch and learn how CS education, AI, and modern teaching are changing.</p></div>
          <a class="button watch" href="${VIDEO_URL}" target="_blank" rel="noopener">Watch on YouTube</a>
        </section>
      </section>
    </section>
  `;
}

function renderLicense() {
  return `
    <section class="content license-page">
      <p class="eyebrow">Legal Notice</p>
      <h1>License &amp; Ownership</h1>
      <article class="license-card">
        <div class="license-seal">©</div>
        <h2>All Rights Reserved</h2>
        <p><strong>Copyright © 2026 Jayson Marayag.</strong> The original website design, page structure, branding, written materials, and dashboard interface are protected works.</p>
        <p>No person or organization may copy, redistribute, republish, sell, rebrand, or create derivative works from this project without prior written permission from Jayson Marayag.</p>
        <p>Course names and external organizations remain the property of their respective owners. External links are provided for educational reference only.</p>
        <p>Public access to this page does not grant a license to reuse the source, assets, or original presentation.</p>
      </article>
      <div class="note-actions">
        <button class="button primary" type="button" data-page="dashboard">Back to Dashboard</button>
        <button class="button" type="button" data-page="notes">Read Notes</button>
      </div>
    </section>`;
}

function renderHome() {
  return `
    <section class="home">
      <p class="featured">Featured video: <a href="${VIDEO_URL}" target="_blank" rel="noopener">- YouTube</a></p>
      <figure class="hero">
        <img src="static/poster.webp" alt="Free Links to Computer Learning - Shared By Jayson Marayag">
      </figure>
      <div class="home-intro">
        <p>Free Links to Computer Learning - Shared By Jayson Marayag. A community learning page sharing free links to computer learning.</p>
        <div class="intro-actions">
          <button class="button primary" type="button" data-page="courses">Browse Courses - Go to Page 2</button>
          <button class="button" type="button" data-page="notes">How It Works - Go to Page 3</button>
        </div>
      </div>
    </section>`;
}

function renderCourses() {
  const filterOptions = ["All", ...categories.map(category => category.short)];
  return `
    <section class="content courses-page">
      <p class="eyebrow">Page 2</p>
      <h1>Browse Courses</h1>
      <p class="lede">Pick a course, then choose Audit on edX. <button class="link-button" type="button" data-page="notes">See how it works on Page 3</button></p>
      <div class="search-panel">
        <label class="search-box">
          <span class="search-icon" aria-hidden="true"></span>
          <span class="sr-only">Search courses</span>
          <input id="course-search" placeholder="Search courses - try “Python”, “AI”, “Data Science”...">
        </label>
        <div class="filters" role="group" aria-label="Filter by category">
          ${filterOptions.map(label => `<button type="button" data-filter="${escapeHtml(label)}" class="${label === "All" ? "active" : ""}">${escapeHtml(label)}</button>`).join("")}
        </div>
        <p class="result-count" id="result-count" aria-live="polite"></p>
      </div>
      <div class="category-list" id="category-list"></div>
      <section class="video-section">
        <div class="video-copy">
          <p class="eyebrow light">Watch and Learn - Video</p>
          <h2>Harvard Professor: CS50, What Matters More Than Programming Now, Lecturing Well | David J Malan</h2>
          <p>An interview with David Malan, the professor behind CS50, on how CS50 works, how to lecture well, and how AI is changing CS education.</p>
          <article class="video-link">
            <p>Video link</p>
            <h3><a href="${VIDEO_URL}" target="_blank" rel="noopener">- YouTube</a></h3>
            <a class="button watch" href="${VIDEO_URL}" target="_blank" rel="noopener">Watch on YouTube</a>
          </article>
        </div>
        <div class="takeaways">
          <h3>Key takeaways</h3>
          <p>Seven ideas to listen for while you watch.</p>
          <ol>
            ${["Why CS50 starts with C","Depth vs engagement in learning","The ideal use of AI in education","Cheating and AI","Should we still learn CS?","Growth vs fixed mindset","Advice for beginners"].map((item, index) => `<li><span>${index + 1}</span><strong>${item}</strong></li>`).join("")}
          </ol>
        </div>
      </section>
      <p class="about">About the professor: <a href="${MALAN_URL}" target="_blank" rel="noopener">David Malan - cs.harvard.edu/malan</a></p>
    </section>`;
}

function renderNotes() {
  return `
    <section class="content notes-page">
      <p class="eyebrow">Page 3 - Back page</p>
      <h1>Notes - Please Read</h1>
      <p class="lede">Everything in one place, at the back of the page. Free Links to Computer Learning - Shared By Jayson Marayag.</p>
      <div class="notes-list">
        <section class="note disclaimer"><p class="section-label">Section 1</p><h2>Important Disclaimer</h2><p>This is a community learning page sharing free public links to computer learning. “Free Links to Computer Learning” is a community page by Jayson Marayag. This page is independent and is not affiliated with, endorsed by, or sponsored by Harvard University, Harvard Online, or edX. “Harvard” is a trademark of Harvard University. Learners enroll directly on edX. No credit, certificate, or admission advantage is provided by this page.</p></section>
        <section class="note audit"><p class="section-label">Section 2</p><h2>FREE ONLINE - Choose AUDIT</h2><p>Free Online means: Choose AUDIT. If you choose Certified / Verified / Track / Verified Certificate, or upgrade later, it has a fee. If you want it FREE, always choose Audit This Course. Do NOT choose Certified, Verified, Verified Track, or Upgrade.</p></section>
        <section class="note"><p class="section-label teal">Section 3</p><h2>Steps to Follow - No Download Needed</h2><ol class="steps">${["Click View on edX","Pick a course","Create free account (no card)","Choose Audit This Course - NOT Verified","Start learning"].map((item, i) => `<li><span>${i + 1}</span>${item}</li>`).join("")}</ol></section>
        <section class="note"><p class="section-label teal">Section 4</p><h2>What Does Free to Audit Mean?</h2><p><strong>Free to audit = free to learn. Certificate = paid.</strong></p><div class="note-grid"><div><h3>What you get</h3><ul><li>Watch lectures / videos</li><li>Read the readings</li><li>Do practice exercises</li><li>Learn at your own pace</li><li>No charge</li></ul></div><div><h3>What you don't get</h3><ul><li>No verified certificate</li><li>Sometimes no graded assignments / final exam</li><li>Sometimes access expires</li><li>No Harvard credit</li></ul></div></div></section>
        <section class="note next"><p class="section-label light">Section 5 - Next Page</p><h2>How to Show What You Learned Without Paying</h2><p>Honest answer: NO free Harvard / edX verified certificate.</p><ol class="steps light-steps">${["Learn free with AUDIT","Build 1 small project on GitHub (free)","Put on resume / LinkedIn as “Completed [Course] on Audit + built [Project]”","Use free proof where it exists, but do not claim it is a Harvard certificate","Only pay if job / school asks for verified"].map((item, i) => `<li><span>${i + 1}</span>${item}</li>`).join("")}</ol></section>
      </div>
      <div class="note-actions">
        <a class="button primary" href="${CATALOG_URL}" target="_blank" rel="noopener">View on edX / Harvard Online</a>
        <button class="button" type="button" data-page="home">Back to Home</button>
        <button class="button" type="button" data-page="courses">Go to Page 2</button>
      </div>
    </section>`;
}

let activeFilter = "All";

function filterCourses() {
  const search = document.querySelector("#course-search");
  if (!search) return;
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  const output = categories.map(category => {
    if (activeFilter !== "All" && category.short !== activeFilter) return "";
    const courses = category.courses.filter(course =>
      !query ||
      course.title.toLowerCase().includes(query) ||
      course.desc.toLowerCase().includes(query) ||
      category.heading.toLowerCase().includes(query)
    );
    if (!courses.length) return "";
    visible += courses.length;
    return `
      <section class="category">
        <div class="category-heading"><div><h2>${escapeHtml(category.heading)}</h2><p>${escapeHtml(category.blurb)}</p></div><span class="course-count">${courses.length} course${courses.length === 1 ? "" : "s"}</span></div>
        <div class="course-grid">
          ${courses.map(course => `
            <article class="course-card">
              <div class="course-meta"><span>${escapeHtml(course.tag)}</span><span>${escapeHtml(course.level)}</span></div>
              <h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.desc)}</p>
              <a href="${CATALOG_URL}" target="_blank" rel="noopener">View on edX / Harvard Online</a>
            </article>`).join("")}
        </div>
      </section>`;
  }).join("");

  document.querySelector("#category-list").innerHTML = output || `
    <div class="no-results"><h2>No courses matched "${escapeHtml(search.value)}"</h2><p>Try a shorter word - “Python”, “China”, “Music”, “Health”.</p><button class="button primary" type="button" id="show-all">Show all ${total} courses</button></div>`;
  document.querySelector("#result-count").innerHTML = `Showing <strong>${visible}</strong> of ${total} courses${query ? ` for "${escapeHtml(search.value.trim())}"` : ""}${query || activeFilter !== "All" ? ' - <button type="button" id="reset-filters">Reset</button>' : ""}`;
  document.querySelector("#show-all")?.addEventListener("click", () => {
    activeFilter = "All";
    search.value = "";
    document.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("active", button.dataset.filter === "All"));
    filterCourses();
  });
  document.querySelector("#reset-filters")?.addEventListener("click", () => {
    activeFilter = "All";
    search.value = "";
    document.querySelectorAll("[data-filter]").forEach(button => button.classList.toggle("active", button.dataset.filter === "All"));
    filterCourses();
  });
}

function render() {
  const page = getPage();
  document.querySelectorAll("[data-page]").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  document.querySelector("#app").innerHTML =
    page === "dashboard" ? renderDashboard() :
    page === "courses" ? renderCourses() :
    page === "notes" ? renderNotes() :
    page === "license" ? renderLicense() :
    renderHome();
  if (page === "courses") {
    activeFilter = sessionStorage.getItem("courseCategory") || "All";
    sessionStorage.removeItem("courseCategory");
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.classList.toggle("active", button.dataset.filter === activeFilter);
    });
    document.querySelector("#course-search").addEventListener("input", filterCourses);
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
        filterCourses();
      });
    });
    filterCourses();
  }
  if (page === "dashboard") {
    document.querySelector("#copy-link")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        document.querySelector("#copy-status").textContent = "Dashboard link copied";
      } catch {
        document.querySelector("#copy-status").textContent = "Copy unavailable in this browser";
      }
    });
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", event => {
  const target = event.target.closest("[data-page]");
  if (target) {
    navigate(target.dataset.page);
    if (target.dataset.category && target.dataset.page === "courses") {
      sessionStorage.setItem("courseCategory", target.dataset.category);
    }
  }
});
window.addEventListener("hashchange", render);
render();
