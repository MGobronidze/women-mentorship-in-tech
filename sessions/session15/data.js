/* ==========================================================================
   app.js — Data layer + DOM Rendering
   front-end-course, lesson 15 — control project
   ========================================================================== */

/* ---------- 1. Projects data ---------- */
const projects = [
  {
    title: "To-Do Application",
    year: 2025,
    tags: ["JS", "CSS"],
    featured: true,
    description: "Simple task list — add, mark, and delete tasks, built with JavaScript arrays.",
  },
  {
    title: "Portfolio Website",
    year: 2026,
    tags: ["HTML", "CSS"],
    featured: true,
    description: "This website — built with semantic HTML, CSS Grid and Flexbox.",
  },
  {
    title: "Weather Forecast Application",
    year: 2025,
    tags: ["JS", "API"],
    featured: false,
    description: "Weather data visualization concept — will connect to real API in the future.",
  },
  {
    title: "Blog Design",
    year: 2024,
    tags: ["CSS", "Figma"],
    featured: false,
    description: "Blog post page typography-focused design.",
  },
];

console.log("%cProjects Data Layer Initialized", "font-weight: bold; color: #5B4EFF;");
console.log("Total Projects:", projects.length);

/* ---------- 2. DOM Rendering Logic ---------- */

/**
 * ინდივიდუალური პროექტის ბარათის (DOM Element) შექმნა
 * @param {Object} project - პროექტის ობიექტი
 * @returns {HTMLElement} - შექმნილი article ელემენტი
 */
function createProjectCard(project) {
  const { title, year, tags, featured, description } = project;

  // 1. იქმნება ძირითადი კონტეინერი
  const card = document.createElement("article");
  card.className = "project-card";

  // 2. ატრიბუტი გამორჩეული პროექტებისთვის
  if (featured) {
    card.setAttribute("data-featured", "true");
  }

  // 3. დამხმარე HTML შაბლონების მომზადება
  const tagsHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
  const badgeHTML = featured ? `<span class="featured-badge">⭐ გამორჩეული</span>` : "";

  // 4. insertAdjacentHTML — სწრაფი, ეფექტური ჩასმა
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

/**
 * პროექტების მასივის რენდერი DOM-ში DocumentFragment-ის გამოყენებით
 * @param {Array} projectList - პროექტების მასივი
 */
function renderProjects(projectList) {
  const container = document.querySelector("#project-grid");

  if (!container) {
    console.error("კონტეინერი #project-grid ვერ მოიძებნა!");
    return;
  }

  // DocumentFragment — უხილავი კონტეინერი, იცავს ბრაუზერს ზედმეტი reflow-სგან
  const fragment = document.createDocumentFragment();

  for (const project of projectList) {
    const card = createProjectCard(project);
    fragment.appendChild(card);
  }

  // კონტეინერის გასუფთავება და fragment-ის ერთი ოპერაციით ჩასმა DOM-ში
  container.innerHTML = "";
  container.appendChild(fragment);
}

/* ---------- 3. Initial Render ---------- */
renderProjects(projects);