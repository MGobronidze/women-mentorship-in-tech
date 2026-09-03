/* ==========================================================================
   data.js — მონაცემთა ფენა (Data Layer)
   front-end-course, გაკვეთილი 12 — საკონტროლო პროექტი

   შენიშვნა: ეს ფაილი შეგნებულად არ ეხება DOM-ს (querySelector, createElement)
   და არ იყენებს საკუთარ function-ებს — მხოლოდ იმას, რაც 1-12 გაკვეთილებში
   ვისწავლეთ: ცვლადები, მასივები, ობიექტები, პირობები, ციკლები და მასივის
   მეთოდები. შედეგები იბეჭდება Console-ში (F12 → Console).

   DOM-ზე რენდერს ვისწავლით მე-15 გაკვეთილში — მაშინ ეს ზუსტად იგივე მონაცემები
   და ლოგიკა გამოვიყენოთ, რომ ისინი პირდაპირ გვერდზე გამოვსახოთ.
   ========================================================================== */

/* ---------- 1. მონაცემები — პროექტების მასივი, ობიექტების სახით ---------- */
const projects = [
  {
    title: "To-Do აპლიკაცია",
    year: 2025,
    tags: ["JS", "CSS"],
    featured: true,
    description: "მარტივი დავალებების სია — დამატება, მონიშვნა და წაშლა.",
  },
  {
    title: "პორტფოლიოს საიტი",
    year: 2026,
    tags: ["HTML", "CSS"],
    featured: true,
    description: "ეს გვერდი — სემანტიკური HTML, CSS Grid და Flexbox.",
  },
  {
    title: "ამინდის ვიჯეტი",
    year: 2025,
    tags: ["JS", "API"],
    featured: false,
    description: "ამინდის მონაცემების გამოსახვის კონცეპტი.",
  },
  {
    title: "ბლოგის დიზაინი",
    year: 2024,
    tags: ["CSS", "Figma"],
    featured: false,
    description: "ბლოგის სტატიის გვერდის ტიპოგრაფიაზე ორიენტირებული დიზაინი.",
  },
];

console.log("%c📦 პროექტების მონაცემთა ფენა ჩაიტვირთა", "font-weight: bold; color: #5B4EFF;");
console.log("სულ პროექტი:", projects.length);

/* ---------- 2. filter — მხოლოდ გამორჩეული (featured) პროექტები ---------- */
const featuredProjects = projects.filter((p) => p.featured);
console.log("\n⭐ გამორჩეული პროექტები:", featuredProjects.length);
console.log(featuredProjects.map((p) => p.title));

/* ---------- 3. map — თითოეული პროექტისთვის ფორმატირებული სტრიქონის შექმნა ---------- */
const summaries = projects.map((p) => `${p.title} (${p.year})`);
console.log("\n📝 პროექტების მოკლე სია:");
console.log(summaries);

/* ---------- 4. reduce — რამდენი tag გამოიყენება სულ ---------- */
const totalTagCount = projects.reduce((total, p) => total + p.tags.length, 0);
console.log("\n🏷️ სულ tag-ების რაოდენობა (გამეორებებით):", totalTagCount);

/* ---------- 5. Object.groupBy — პროექტების დაჯგუფება წლის მიხედვით (ES2024) ---------- */
const byYear = Object.groupBy(projects, (p) => p.year);
console.log("\n📅 პროექტები წლების მიხედვით დაჯგუფებული:");
console.log(byYear);

/* ---------- 6. for...of — ორგანიზებული, სრული ჩამონათვალი Console-ში ---------- */
console.log("\n📋 სრული სია:");
for (const project of projects) {
  const tagList = project.tags.join(", ");
  const status = project.featured ? "⭐ გამორჩეული" : "ჩვეულებრივი";
  console.log(`${project.title} — ${project.year} — [${tagList}] — ${status}`);
}

/* ---------- 7. Object.entries + for...of — ერთი კონკრეტული პროექტის დეტალური ჩვენება ---------- */
console.log("\n🔍 პირველი პროექტის დეტალები:");
for (const [key, value] of Object.entries(projects[0])) {
  console.log(`  ${key}:`, value);
}

/* ---------- 8. toSorted — უახლესი პროექტები (ორიგინალ მასივს არ ვცვლით) ---------- */
const newestFirst = projects.toSorted((a, b) => b.year - a.year);
console.log("\n🆕 ქრონოლოგიურად, უახლესიდან:");
console.log(newestFirst.map((p) => `${p.year} — ${p.title}`));
console.log("(ორიგინალი projects მასივი უცვლელია — toSorted() ახალ ასლს აბრუნებს)");