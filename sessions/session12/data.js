/* ==========================================================================
   data.js — data layer 
   front-end-course, lesson 12 — control project

   Note: This file intentionally does not interact with the DOM (querySelector, createElement)
   and does not use custom functions — only what was learned in lessons 1-12:
   variables, arrays, objects, conditions, loops and array methods. Results are logged to the Console (F12 → Console).

   Dom rendering will be covered in lesson 15 — then we will use the same data
   and logic to display it directly on the page.
   ========================================================================== */

/* ---------- 1. Projects data — array of project objects ---------- */
const projects = [
  {
    title: "To-Do Application",
    year: 2025,
    tags: ["JS", "CSS"],
    featured: true,
    description: "Simple task list — add, mark, and delete tasks.",
  },
  {
    title: "Portfolio Website",
    year: 2026,
    tags: ["HTML", "CSS"],
    featured: true,
    description: "Semantic HTML, CSS Grid and Flexbox.",
  },
  {
    title: "Weather Forecast Application",
    year: 2025,
    tags: ["JS", "API"],
    featured: false,
    description: "Weather data visualization concept.",
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

/* ---------- 2. filter — only featured projects ---------- */
const featuredProjects = projects.filter((p) => p.featured);
console.log("\nFeatured Projects:", featuredProjects.length);
console.log(featuredProjects.map((p) => p.title));

/* ---------- 3. map — each project's formatted string ---------- */
const summaries = projects.map((p) => `${p.title} (${p.year})`);
console.log("\nProjects Summary:");
console.log(summaries);

/* ---------- 4. reduce — how many tags are used in total ---------- */
const totalTagCount = projects.reduce((total, p) => total + p.tags.length, 0);
console.log("\nTotal Tags (with duplicates):", totalTagCount);

/* ---------- 5. Object.groupBy — groupping projects by year (ES2024) ---------- */
const byYear = Object.groupBy(projects, (p) => p.year);
console.log("\nProjects grouped by year:");
console.log(byYear);

/* ---------- 6. for...of — organized, complete list in Console ---------- */
console.log("\nTotal Projects:");
for (const project of projects) {
  const tagList = project.tags.join(", ");
  const status = project.featured ? "⭐ გამორჩეული" : "ჩვეულებრივი";
  console.log(`${project.title} — ${project.year} — [${tagList}] — ${status}`);
}

/* ---------- 7. Object.entries + for...of — first project details ---------- */
console.log("\nFirst project details:");
for (const [key, value] of Object.entries(projects[0])) {
  console.log(`  ${key}:`, value);
}

/* ---------- 8. toSorted — newest project details */
const newestFirst = projects.toSorted((a, b) => b.year - a.year);
console.log("\nProjects sorted by year (newest first):");
console.log(newestFirst.map((p) => `${p.year} — ${p.title}`));
console.log("(original projects array is unchanged — toSorted() returns a new array)");