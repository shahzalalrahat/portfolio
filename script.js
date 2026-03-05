/* ==========================
   EDIT THESE DETAILS
========================== */
const PROFILE = {
  name: "Shahzalal Khan Rahat",
  email: "shahzalalkhan91@gmail.com",
  github: "https://github.com/shahzalalrahat",
  linkedin: "https://www.linkedin.com/in/shahzalal-khan-rahat-a717b0285/",
};

/* ==========================
   PROJECT DATA
   Tip: add 'details' to make the modal richer.
========================== */
const PROJECTS = [
  {
    title: "SEWING — Wage Increment Prediction",
    category: "Machine Learning",
    description: "Interpretable ensemble ML framework for sewing operators’ wage increment prediction in the garment industry.",
    tags: ["Interpretable ML", "XGBoost", "scikit-learn", "R²"],
    details:
      "Built and evaluated an interpretable ensemble ML workflow using operational KPIs from multiple factories to support data-driven wage and workforce decisions.",
    live: "",
    repo: "",
  },
  {
    title: "Diabetes Prediction Model",
    category: "Machine Learning",
    description: "Clinical + demographic feature-based prediction with model comparison and evaluation for early risk detection.",
    tags: ["Classification", "scikit-learn", "Metrics", "EDA"],
    details:
      "A clean baseline-to-evaluation workflow: data cleaning, feature prep, model comparison, and metric reporting.",
    live: "",
    repo: "",
  },
  {
    title: "TorqueSAM — Unsupervised Kidney Lesion Segmentation",
    category: "Computer Vision",
    description: "Clustering-centric pipeline for renal lesion segmentation with ROI logic, post-processing, and Dice/IoU evaluation.",
    tags: ["Segmentation", "Clustering", "OpenCV", "MedSAM"],
    details:
      "An unsupervised pipeline that combines SAM-style segmentation components with clustering and post-processing to segment renal stones/lesions with minimal label dependence.",
    live: "",
    repo: "",
  },
  {
    title: "Travel Agency Platform",
    category: "Web",
    description: "Ticket booking platform with hotel and weather history, promo codes, and real-time data handling.",
    tags: ["HTML", "CSS", "JavaScript"],
    details:
      "Built a booking-focused web app with UX-first structure and practical features (promos, history views, and API-driven data).",
    live: "",
    repo: "https://github.com/shahzalalrahat/The-Travel-Agency-Platform",
  },
  {
    title: "EYE of Blind",
    category: "Hardware / IoT",
    description: "Sonar-based navigation aid using Arduino and ultrasonic sensors to detect obstacles via vibration feedback.",
    tags: ["Arduino", "Ultrasonic", "Embedded", "Assistive Tech"],
    details:
      "Designed a simple assistive device prototype for obstacle detection using sensors and tactile feedback for better accessibility.",
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
  if (!el) return;
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
  const icon = $("#themeIcon");
  if (icon) icon.textContent = mode === "light" ? "☀️" : "🌙";
}
(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) setTheme(saved);
  else setTheme("dark");
})();

$("#themeBtn")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* ==========================
   MOBILE MENU
========================== */
const burger = $("#burger");
const mobileNav = $("#mobileNav");

burger?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
  mobileNav.setAttribute("aria-hidden", String(!open));
});

mobileNav?.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    mobileNav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
  }
});

/* ==========================
   PROFILE LINKS + COUNTS
========================== */
(function initProfile() {
  $("#emailText") && ($("#emailText").textContent = PROFILE.email);
  $("#emailText2") && ($("#emailText2").textContent = PROFILE.email);

  $("#githubLink") && ($("#githubLink").href = PROFILE.github);

  const linkedinLink = $("#linkedinLink");
  const linkedinContact = $("#linkedinContact");
  if (linkedinLink) linkedinLink.href = PROFILE.linkedin;
  if (linkedinContact) {
    linkedinContact.href = PROFILE.linkedin;
    linkedinContact.textContent = PROFILE.linkedin.replace("https://", "");
  }

  const projectCount = $("#projectCount");
  if (projectCount) projectCount.textContent = String(PROJECTS.length);

  const yearNow = $("#yearNow");
  if (yearNow) yearNow.textContent = String(new Date().getFullYear());
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
$("#copyEmailBtn")?.addEventListener("click", copyEmail);
$("#copyEmailBtn2")?.addEventListener("click", copyEmail);
$("#copyEmailBtn3")?.addEventListener("click", copyEmail);

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
  if (!categorySelect) return;
  const cats = uniqueCategories(PROJECTS);
  categorySelect.innerHTML = cats
    .map((c) => `<option value="${c}">${c === "all" ? "All categories" : c}</option>`)
    .join("");
}

function matchesProject(p, q, cat) {
  const hay = `${p.title} ${p.description} ${p.details || ""} ${p.category} ${(p.tags || []).join(" ")}`.toLowerCase();
  const okQuery = !q || hay.includes(q);
  const okCat = cat === "all" || p.category === cat;
  return okQuery && okCat;
}

function projectCard(p, idx) {
  const chips = (p.tags || []).slice(0, 6).map((t) => `<span class="chip">${t}</span>`).join("");
  const repoBtn = p.repo ? `<a class="linkBtn" href="${p.repo}" target="_blank" rel="noreferrer">Repo ↗</a>` : "";
  const liveBtn = p.live ? `<a class="linkBtn" href="${p.live}" target="_blank" rel="noreferrer">Live ↗</a>` : "";

  return `
    <article class="card projectCard" tabindex="0" role="button" aria-label="Open project: ${escapeHtml(p.title)}" data-project-index="${idx}">
      <div class="projectCard__top">
        <span class="badge">${escapeHtml(p.category)}</span>
        <span class="miniHint">Details →</span>
      </div>
      <h3 class="projectCard__title">${escapeHtml(p.title)}</h3>
      <p class="projectCard__desc">${escapeHtml(p.description)}</p>
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
  if (!projectGrid) return;
  const q = (searchInput?.value || "").trim().toLowerCase();
  const cat = categorySelect?.value || "all";

  const filtered = PROJECTS
    .map((p, idx) => ({ p, idx }))
    .filter(({ p }) => matchesProject(p, q, cat));

  projectGrid.innerHTML = filtered.map(({ p, idx }) => projectCard(p, idx)).join("");

  if (emptyState) emptyState.hidden = filtered.length !== 0;
}

buildCategoryOptions();
renderProjects();

searchInput?.addEventListener("input", renderProjects);
categorySelect?.addEventListener("change", renderProjects);
clearFilters?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (categorySelect) categorySelect.value = "all";
  renderProjects();
  toast("Filters cleared");
});

/* ==========================
   PROJECT MODAL
========================== */
const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalBadge = $("#modalBadge");
const modalMeta = $("#modalMeta");
const modalChips = $("#modalChips");
const modalActions = $("#modalActions");

let lastFocusEl = null;

function openModalForProject(index) {
  const p = PROJECTS[index];
  if (!p || !modal) return;

  lastFocusEl = document.activeElement;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (modalTitle) modalTitle.textContent = p.title;
  if (modalDesc) modalDesc.textContent = p.details || p.description;
  if (modalBadge) modalBadge.textContent = p.category;
  if (modalMeta) modalMeta.textContent = (p.tags || []).slice(0, 4).join(" • ");

  if (modalChips) {
    modalChips.innerHTML = (p.tags || []).map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join("");
  }

  if (modalActions) {
    const repo = p.repo ? `<a class="btn btn-secondary" href="${p.repo}" target="_blank" rel="noreferrer">Open Repo ↗</a>` : "";
    const live = p.live ? `<a class="btn btn-secondary" href="${p.live}" target="_blank" rel="noreferrer">Open Live ↗</a>` : "";
    const close = `<button class="btn btn--ghost" type="button" data-close="true">Close</button>`;
    modalActions.innerHTML = `${live}${repo}${close}`;
  }

  // focus close button
  const closeBtn = modal.querySelector('[data-close="true"]');
  closeBtn?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusEl && typeof lastFocusEl.focus === "function") {
    lastFocusEl.focus();
  }
}

function onProjectActivate(e) {
  const card = e.target.closest?.("[data-project-index]");
  if (!card) return;
  const idx = Number(card.getAttribute("data-project-index"));
  openModalForProject(idx);
}

projectGrid?.addEventListener("click", onProjectActivate);
projectGrid?.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest?.("[data-project-index]");
  if (!card) return;
  e.preventDefault();
  const idx = Number(card.getAttribute("data-project-index"));
  openModalForProject(idx);
});

modal?.addEventListener("click", (e) => {
  if (e.target.matches("[data-close='true']") || e.target.closest?.("[data-close='true']")) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});

/* ==========================
   MAILTO FORM
========================== */
function gmailComposeUrl(to, subject, body) {
  const _to = encodeURIComponent(to || "");
  const _su = encodeURIComponent(subject || "");
  const _body = encodeURIComponent(body || "");
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${_to}&su=${_su}&body=${_body}`;
}

$("#mailtoForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = $("#subjectInput")?.value || "Portfolio inquiry";
  const from = ($("#fromInput")?.value || "").trim();
  const msg = $("#messageInput")?.value || "";

  const body = from ? `${msg}\n\n---\nSender: ${from}` : msg;
  const url = gmailComposeUrl(PROFILE.email, subject, body);

  window.open(url, "_blank", "noopener,noreferrer");
});

/* ==========================
   SCROLL PROGRESS + ACTIVE NAV
========================== */
const progress = $("#progress");
const sections = ["home", "about", "projects", "skills", "publications", "certifications", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from($$(".nav__link"));

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;

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

/* ==========================
   REVEAL ON SCROLL
========================== */
(function initReveal() {
  const els = Array.from($$(".reveal"));
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          ent.target.classList.add("reveal--on");
          io.unobserve(ent.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
})();

/* ==========================
   UTIL
========================== */
function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
