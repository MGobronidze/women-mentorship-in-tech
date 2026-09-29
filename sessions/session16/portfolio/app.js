
import { projects } from "./data.js";
import {
  getFeaturedProjects,
  formatProjectSummary,
  getAllUniqueTags,
  createViewTracker,
} from "./project-utils.js";

const tracker = createViewTracker();

/* ---------- 1. ერთი project-ობიექტიდან — DOM ელემენტის შექმნა ---------- */
function createProjectCard(project) {
  const { title, year, tags, description, featured } = project; // destructuring, მე-14 გაკვეთილი

  const card = document.createElement("article");
  card.className = "project-card";
  if (featured) card.setAttribute("data-featured", "true");

  const tagsHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
  const badgeHTML = featured ? `<span class="featured-badge">⭐ გამორჩეული</span>` : "";

  // insertAdjacentHTML — სწრაფი, ერთჯერადი ჩასმა ერთი card-ის შიგნით (მე-15 გაკვეთილი)
  card.insertAdjacentHTML(
    "beforeend",
    `
    <div class="project-top">
      <div>
        ${badgeHTML}
        <h3>${title}</h3>
      </div>
      <span class="project-year">${year}</span>
    </div>
    <p>${description}</p>
    <div class="project-tags">${tagsHTML}</div>
  `
  );

  return card;
}

/* ---------- 2. მთელი სიის რენდერი, DocumentFragment-ით (batch insert) ---------- */
function renderProjects(projectList) {
  const container = document.querySelector("#project-grid");
  if (!container) return;

  const fragment = document.createDocumentFragment(); // "უხილავი" კონტეინერი — ერთი reflow ბევრის ნაცვლად

  for (const project of projectList) {
    fragment.appendChild(createProjectCard(project));
  }

  container.innerHTML = ""; // ვასუფთავებთ ძველ შემცველობას (თუ იყო)
  container.appendChild(fragment); // ერთი ოპერაცია — ყველა card ერთდროულად ემატება DOM-ში
}

/* ---------- 3. საწყისი რენდერი — გვერდის ჩატვირთვისას ---------- */
renderProjects(projects);

console.log("%c📦 პროექტები რენდერდა DOM-ზე", "font-weight: bold; color: #5B4EFF;");
console.log("სულ პროექტი:", projects.length);
console.log("⭐ გამორჩეული:", getFeaturedProjects(projects).map(formatProjectSummary));
console.log("🏷️ ყველა უნიკალური tag:", getAllUniqueTags(projects));

/* ==========================================================================
   მე-16 გაკვეთილი — Events: სამი რეალური ინტერაქცია
   ========================================================================== */

/* ---------- 4. ინტერაქცია 1 — ფილტრის ღილაკები (All / Featured), event delegation ---------- */
const filterRow = document.querySelector("#filter-row");

filterRow.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return; // დაწკაპუნდა filter-row-ში, მაგრამ არა ღილაკზე

  // ვიზუალურად მონიშნული ("აქტიური") ღილაკის განახლება
  filterRow.querySelectorAll("button").forEach((b) => b.setAttribute("data-active", "false"));
  btn.setAttribute("data-active", "true");

  const filter = btn.dataset.filter; // "all" ან "featured"
  const filtered = filter === "featured" ? getFeaturedProjects(projects) : projects;
  renderProjects(filtered); // მე-15 გაკვეთილის ფუნქცია — ხელახლა გამოძახებადია!

  console.log(` ფილტრი: ${filter} — ნაჩვენებია ${filtered.length} პროექტი`);
});

/* ---------- 5. ინტერაქცია 2 — card-ზე დაწკაპუნება: "ნახვის" თვალთვალი + ვიზუალური გახსნა ---------- */
const grid = document.querySelector("#project-grid");

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (!card) return; // დაწკაპუნდა grid-ში, მაგრამ card-ის გარეთ

  const title = card.querySelector("h3").textContent;
  tracker.markViewed(title); // მე-13 გაკვეთილის closure-ფუნქცია — ახლა რეალურად გამოიყენება!
  card.classList.toggle("is-expanded"); // მარტივი ვიზუალური უკუკავშირი

  console.log(` სულ დათვალიერებული პროექტი: ${tracker.getViewedCount()}`);
});

/* ---------- 6. ინტერაქცია 3 — საკონტაქტო ფორმის ვალიდაცია, preventDefault-ით ---------- */
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // გვერდის ხელახლა ჩატვირთვა არ გვინდა

  const email = form.querySelector("#email").value.trim();

  if (!email.includes("@")) {
    formStatus.textContent = "⚠️ გთხოვთ, მიუთითოთ ვალიდური ელფოსტა.";
    formStatus.setAttribute("data-state", "error");
    return;
  }

  formStatus.textContent = ' მადლობა! შეტყობინება „გაიგზავნა" (დემო — რეალურ სერვერს მე-19 გაკვეთილში დავუკავშირებთ).';
  formStatus.setAttribute("data-state", "success");
  console.log("ფორმა წარმატებით 'გაიგზავნა' (დემო):", email);
  form.reset(); // ველების გასუფთავება
});
