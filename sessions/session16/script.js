const button = document.querySelector(".btn")

button.addEventListener("click", (event) => {
  console.log(event.type);    // "click"
  console.log(event.target);  // კონკრეტული ელემენტი, რომელზეც დაწკაპუნდა
});

// input-ის მნიშვნელობის წაკითხვა ცოცხლად, აკრეფისას
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (event) => {
  console.log(event.target.value); // მიმდინარე ტექსტი input-ში
});

