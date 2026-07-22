/* ==========================================================================
   Front-End Development საკურსო — Shared JS
   - LESSONS მასივი: ერთადერთი წყარო 24-ვე გაკვეთილისთვის
   - სილაბუსის დინამიური რენდერი (index.html)
   - მობილური ნავიგაცია
   - Hero-ს "URL bar" ტაიპინგ-ეფექტი
   ========================================================================== */

/* ---------- 1. მონაცემები: 24 გაკვეთილი, 4 მოდული ---------- */
const MODULES = {
  html: { label: "HTML", full: "HTML საფუძვლები", color: "var(--mod-html)" },
  css: { label: "CSS", full: "CSS & სტილიზაცია", color: "var(--mod-css)" },
  js: { label: "JS", full: "JavaScript", color: "var(--mod-js)" },
  react: { label: "React", full: "React & პროექტი", color: "var(--mod-react)" },
};

/* მოდულების საზღვრები (განახლებული გეგმა, 2-ე რედაქცია):
   HTML  → 1–3
   CSS   → 4–8
   JS    → 9–20
   React → 21–24 */
const LESSONS = [
  { n: 1, mod: "html", title: "ინტერნეტი, HTTP და Front-end პროფესია" },
  { n: 2, mod: "html", title: "HTML სტრუქტურა, ტერმინები, ტექსტის ტეგები და ბმულები" },
  { n: 3, mod: "html", title: "HTML ფორმები და მედია კონტენტი (Audio/Video)" },

  { n: 4, mod: "css", title: "CSS სინტაქსი, სელექტორები, Reset, Box Model" },
  { n: 5, mod: "css", title: "Display თვისებები, Background, ტექსტის ფორმატირება" },
  { n: 6, mod: "css", title: "CSS Flexbox და Positioned Elements" },
  { n: 7, mod: "css", title: "Pseudo-classes, Transitions, Animations, Variables, Autoprefixer" },
  { n: 8, mod: "css", title: "Bootstrap, Git & GitHub, რესპონსიული დიზაინი (Media Queries)" },

  { n: 9, mod: "js", title: "AI ვებ დეველოპმენტში — ChatGPT, Claude და დებაგირება" },
  { n: 10, mod: "js", title: "JS სინტაქსი, NPM გარემო, ცვლადები და მონაცემთა ტიპები" },
  { n: 11, mod: "js", title: "შედარება, ლოგიკური ოპერატორები და Coercion" },
  { n: 12, mod: "js", title: "მასივები, ობიექტები, Dot vs Bracket, ციკლები" },
  { n: 13, mod: "js", title: "ფუნქციები: Declaration, Expression, Arrow, Scope, Closure" },
  { n: 14, mod: "js", title: "ES6: Rest/Spread, დესტრუქტურირება, მოდულური JS (import/export)" },
  { n: 15, mod: "js", title: "DOM, Defer/Async, ელემენტების შექმნა, Query Selectors" },
  { n: 16, mod: "js", title: "Events, Event Handlers, PreventDefault" },
  { n: 17, mod: "js", title: "Burger Menu, call/apply/bind, Higher-Order Functions, Hoisting" },
  { n: 18, mod: "js", title: "Promises, setTimeout, Callbacks, Async/Await" },
  { n: 19, mod: "js", title: "Ajax, XHR, Fetch, JSON, DevTools Network, სლაიდერი და ვალიდაცია" },
  { n: 20, mod: "js", title: "Constructor, Prototype, Classes, Storage, Cookies, ფილტრი" },

  { n: 21, mod: "react", title: "React, SPA, Vite, Babel, JSX, კომპონენტების რენდერი" },
  { n: 22, mod: "react", title: "State/Props, List & Keys, React Hooks, Lifecycle" },
  { n: 23, mod: "react", title: "Axios, Custom Hook, Styled Components, Virtual DOM, Router" },
  { n: 24, mod: "react", title: "React Form, ავტორიზაცია, E-commerce საბოლოო პროექტი" },
];

/* ---------- 2. სილაბუსის რენდერი ---------- */
function lessonFile(n) {
  return `lesson${n}.html`;
}

function renderSyllabus(filter = "all") {
  const grid = document.getElementById("syllabus-grid");
  if (!grid) return;

  const items = LESSONS.filter((l) => filter === "all" || l.mod === filter);

  grid.innerHTML = items
    .map((l) => {
      const mod = MODULES[l.mod];
      const num = String(l.n).padStart(2, "0");
      return `
        <a class="lesson-card" href="${lessonFile(l.n)}"
           style="--card-color:${mod.color}; --card-bg:${mod.color.replace("var(", "var(").replace(")", "-bg)")};">
          <div class="lesson-top">
            <span class="lesson-num">გაკვეთილი ${num}</span>
            <span class="lesson-mod">${mod.label}</span>
          </div>
          <div class="lesson-title">${l.title}</div>
          <div class="lesson-file">${lessonFile(l.n)}</div>
        </a>`;
    })
    .join("");
}

function setupFilters() {
  const row = document.getElementById("filter-row");
  if (!row) return;

  const buttons = row.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("data-active", "false"));
      btn.setAttribute("data-active", "true");
      renderSyllabus(btn.dataset.filter);
    });
  });
}

/* ---------- 3. მობილური ნავიგაცია ---------- */
function setupNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.getAttribute("data-open") === "true";
    links.setAttribute("data-open", String(!open));
  });
}

/* ---------- 4. Hero URL-bar ტაიპინგ ეფექტი ---------- */
function setupHeroTyping() {
  const el = document.getElementById("hero-url");
  if (!el) return;

  const phrases = ["front-end-course/index.html", "front-end-course/lesson24.html", "front-end-course/react-shop/"];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    el.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(tick, 55);
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1400);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(tick, 30);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, 300);
    }
  }
  tick();
}

/* ---------- 5. Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSyllabus("all");
  setupFilters();
  setupNav();
  setupHeroTyping();
});
