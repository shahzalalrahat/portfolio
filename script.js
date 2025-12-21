/* ==========================
   EDIT THESE DETAILS
========================== */
const PROFILE = {
  name: "Shahzalal Khan Rahat",
  email: "shahzalalkhan91@gmail.com",
  github: "https://github.com/shahzalalrahat",
  linkedin: "https://www.linkedin.com/in/shahzalal-khan-rahat-a717b0285/",
};


document.getElementById("viewCvBtn").addEventListener("click", () => {
  window.open("./Shahzalal_Khan_CV.pdf", "_blank", "noopener");
});


/* ==========================
   PROJECT DATA
========================== */
const PROJECTS = [
 {
    title: "SEWING Wage Increment Prediction",
    category: "Machine Learning",
    description: "Interpretable ensemble ML framework for wage increment prediction using operational KPIs, supporting workforce decisions in garment manufacturing.",
    tags: ["XGBoost", "scikit-learn", "Interpretability"],
    live: "",
    repo: "",
  },

 {
    title: "Diabetes Prediction Model",
    category: "Machine Learning",
    description: "Clinical and demographic feature-based diabetes prediction with model comparison and evaluation for early risk detection.",
    tags: ["Classification", "scikit-learn", "Metrics"],
    live: "",
    repo: "",
  },
  {
    title: "Unsupervised Kidney Lesion Segmentation",
    category: "Computer Vision",
    description: "Clustering-centric pipeline for renal lesion segmentation (stones and tumors) with ROI logic, post-processing, and Dice/IoU evaluation.",
    tags: ["Segmentation", "Clustering", "OpenCV"],
    live: "",
    repo: "",
  },
  {
    title: "Travel Agency Platform",
    category: "Web",
    description: "Ticket booking platform with hotel and weather history features, promo code support, and real-time data handling.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "",
    repo: "https://github.com/shahzalalrahat/The-Travel-Agency-Platform",
  },
  {
    title: "EYE of Blind",
    category: "Hardware / IoT",
    description: "Sonar-based navigation aid using Arduino and ultrasonic sensors to detect obstacles and provide vibration feedback.",
    tags: ["Arduino", "Sensors", "Embedded"],
    live: "",
    repo: "",
  },
];

/* ==========================
   DOM HELPERS
========================== */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("is-on"), 1600);
}

/* ==========================
   THEME
========================== */
function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  $("#themeIcon").textContent = mode === "light" ? "☀️" : "🌙";
}
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else setTheme("dark");
})();

$("#themeBtn").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* ==========================
   MOBILE MENU
========================== */
const burger = $("#burger");
const mobileNav = $("#mobileNav");

burger.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  mobileNav.setAttribute("aria-hidden", String(!open));
});

mobileNav.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    mobileNav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  }
});

/* ==========================
   PROFILE LINKS
========================== */
(function initProfile() {
  $("#emailText").textContent = PROFILE.email;
  $("#githubLink").href = PROFILE.github;

  const linkedinLink = $("#linkedinLink");
  const linkedinContact = $("#linkedinContact");
  linkedinLink.href = PROFILE.linkedin;
  linkedinContact.href = PROFILE.linkedin;
  linkedinContact.textContent = PROFILE.linkedin.replace("https://", "");
})();

/* ==========================
   COPY EMAIL BUTTONS
========================== */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    toast("Email copied");
  } catch {
    toast("Copy failed");
  }
}
$("#copyEmailBtn").addEventListener("click", copyEmail);
$("#copyEmailBtn2").addEventListener("click", copyEmail);

/* ==========================
   PROJECT RENDERING + FILTER
========================== */
const projectGrid = $("#projectGrid");
const searchInput = $("#searchInput");
const categorySelect = $("#categorySelect");
const emptyState = $("#emptyState");
const clearFilters = $("#clearFilters");

function uniqueCategories(items) {
  const cats = new Set(items.map((p) => p.category));
  return ["all", ...Array.from(cats).sort((a, b) => a.localeCompare(b))];
}

function buildCategoryOptions() {
  const cats = uniqueCategories(PROJECTS);
  categorySelect.innerHTML = cats
    .map((c) => `<option value="${c}">${c === "all" ? "All categories" : c}</option>`)
    .join("");
}

function matchesProject(p, q, cat) {
  const hay = `${p.title} ${p.description} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
  const okQuery = !q || hay.includes(q);
  const okCat = cat === "all" || p.category === cat;
  return okQuery && okCat;
}

function projectCard(p) {
  const chips = (p.tags || []).slice(0, 6).map((t) => `<span class="chip">${t}</span>`).join("");
  const liveBtn = p.live ? `<a class="linkBtn" href="${p.live}" target="_blank" rel="noreferrer">Live ↗</a>` : "";
  const repoBtn = p.repo ? `<a class="linkBtn" href="${p.repo}" target="_blank" rel="noreferrer">Repo ↗</a>` : "";

  return `
    <article class="card projectCard">
      <div class="projectCard__top">
        <span class="badge">${p.category}</span>
      </div>
      <h3 class="projectCard__title">${p.title}</h3>
      <p class="projectCard__desc">${p.description}</p>
      <div class="projectCard__footer">
        <div class="mini">${chips}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end;">
          ${liveBtn}
          ${repoBtn}
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const q = (searchInput.value || "").trim().toLowerCase();
  const cat = categorySelect.value;

  const filtered = PROJECTS.filter((p) => matchesProject(p, q, cat));
  projectGrid.innerHTML = filtered.map(projectCard).join("");

  emptyState.hidden = filtered.length !== 0;
  $("#projectCount").textContent = String(PROJECTS.length);
}

buildCategoryOptions();
renderProjects();

searchInput.addEventListener("input", renderProjects);
categorySelect.addEventListener("change", renderProjects);
clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  renderProjects();
  toast("Filters cleared");
});

/* ==========================
   MAILTO FORM
========================== */
$("#mailtoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const subject = encodeURIComponent($("#subjectInput").value || "Portfolio Inquiry");
  const body = encodeURIComponent($("#messageInput").value || "");
  window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
});

/* ==========================
   SCROLL PROGRESS + ACTIVE NAV
========================== */
const progress = $("#progress");
const sections = ["home", "about", "projects", "skills", "research", "contact"].map((id) => document.getElementById(id));
const navLinks = Array.from($$(".nav__link"));

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progress.style.width = `${pct}%`;

  let current = "home";
  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 110) current = sec.id;
  }
  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("is-active", href === `#${current}`);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();




