/* ==========================
   EDIT THESE DETAILS
========================== */
const PROFILE = {
  name: "Shahzalal Khan Rahat",
  email: "shahzalal.khan.rahat@gmail.com",
  github: "https://github.com/shahzalalrahat",
  linkedin: "https://www.linkedin.com/in/shahzalal-khan-rahat-a717b0285/", // <-- change this
};

/* ==========================
   PROJECT DATA (EDIT THIS)
========================== */
const PROJECTS = [
  {
    title: "Wage Prediction Model",
    category: "Machine Learning",
    description: "Built and evaluated a wage prediction model using ML frameworks with structured feature engineering and performance tracking.",
    tags: ["XGBoost", "scikit-learn", "Pandas"],
    live: "",
    repo: "https://github.com/shahzalalrahat",
  },
  {
    title: "Diabetes Prediction",
    category: "Machine Learning",
    description: "End-to-end classification workflow: preprocessing, training, evaluation, and clean reporting for diabetes prediction.",
    tags: ["Classification", "Pandas", "Metrics"],
    live: "",
    repo: "https://github.com/shahzalalrahat",
  },
  {
    title: "Travel Agency Web Platform",
    category: "Web",
    description: "A responsive website with clean UI, structured sections, and scalable layout for a travel agency use-case.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "",
    repo: "https://github.com/shahzalalrahat",
  },
  {
    title: "Kidney Lesion Segmentation (Unsupervised)",
    category: "Computer Vision",
    description: "Exploring unsupervised lesion segmentation pipelines and ROI logic for kidney CT, focused on lesion-only extraction and evaluation.",
    tags: ["Segmentation", "OpenCV", "Dice/IoU"],
    live: "",
    repo: "https://github.com/shahzalalrahat",
  },
  {
    title: "Robotics Project",
    category: "Systems",
    description: "A practical robotics system project involving integration, control logic, and iterative testing.",
    tags: ["Systems", "Integration"],
    live: "",
    repo: "https://github.com/shahzalalrahat",
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
(function initTheme(){
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
(function initProfile(){
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
    toast("Email copied ✅");
  } catch {
    toast("Copy failed — please copy manually.");
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
  const cats = new Set(items.map(p => p.category));
  return ["all", ...Array.from(cats).sort((a,b)=>a.localeCompare(b))];
}

function buildCategoryOptions() {
  const cats = uniqueCategories(PROJECTS);
  categorySelect.innerHTML = cats.map(c =>
    `<option value="${c}">${c === "all" ? "All categories" : c}</option>`
  ).join("");
}

function matchesProject(p, q, cat) {
  const hay = `${p.title} ${p.description} ${p.category} ${(p.tags||[]).join(" ")}`.toLowerCase();
  const okQuery = !q || hay.includes(q);
  const okCat = cat === "all" || p.category === cat;
  return okQuery && okCat;
}

function projectCard(p) {
  const chips = (p.tags || []).slice(0, 5).map(t => `<span class="chip">${t}</span>`).join("");
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

  const filtered = PROJECTS.filter(p => matchesProject(p, q, cat));
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
   FOOTER YEAR
========================== */
$("#year").textContent = String(new Date().getFullYear());

/* ==========================
   SCROLL PROGRESS + ACTIVE NAV
========================== */
const progress = $("#progress");
const sections = ["home","about","projects","skills","research","contact"].map(id => document.getElementById(id));
const navLinks = Array.from($$(".nav__link"));

function onScroll(){
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progress.style.width = `${pct}%`;

  // Active section
  let current = "home";
  for (const sec of sections) {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 110) current = sec.id;
  }
  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("is-active", href === `#${current}`);
  });
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

