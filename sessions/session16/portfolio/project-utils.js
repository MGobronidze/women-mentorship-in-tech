/* ==========================================================================
   project-utils.js — ხელახლა გამოსაყენებელი ფუნქციები (მე-13/14 გაკვეთილი)
   არაფერს "იცის" კონკრეტულად ჩვენს მონაცემებზე — ყველა ფუნქცია იღებს
   მასივს პარამეტრად, ამიტომ ნებისმიერ სხვა პროექტშიც გამოსადეგია.
   ========================================================================== */

/* Function Declaration */
export function getFeaturedProjects(projectList) {
  return projectList.filter((p) => p.featured);
}

/* Rest parameter — ნებისმიერი რაოდენობის tag-ის მიხედვით ფილტრი */
export function getProjectsByAnyTag(projectList, ...searchTags) {
  return projectList.filter((p) => p.tags.some((tag) => searchTags.includes(tag)));
}

/* Arrow function + destructuring პირდაპირ პარამეტრში */
export const formatProjectSummary = ({ title, year }) => `${title} (${year})`;

/* Spread + Set — ყველა უნიკალური tag, ყველა პროექტიდან ერთად */
export function getAllUniqueTags(projectList) {
  const allTags = projectList.flatMap((p) => p.tags);
  return [...new Set(allTags)];
}

/* Spread — ახალი პროექტის დამატება, ორიგინალის შეცვლის გარეშე (immutable) */
export function addProject(projectList, newProject) {
  return [...projectList, newProject];
}

/* Function Expression — Object.groupBy-ზე "შეფუთული" სახელიანი ვერსია */
export const groupProjectsByYear = function groupByYear(projectList) {
  return Object.groupBy(projectList, (p) => p.year);
};

/* Closure — "კერძო" მდგომარეობა, რომელი პროექტები დათვალიერდა */
export function createViewTracker() {
  const viewedTitles = [];

  return {
    markViewed(title) {
      if (!viewedTitles.includes(title)) {
        viewedTitles.push(title);
      }
      console.log(`👁️ ნანახია: ${title} (სულ: ${viewedTitles.length})`);
    },
    getViewedCount() {
      return viewedTitles.length;
    },
  };
}
