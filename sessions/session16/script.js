const button = document.querySelector(".btn")

button.addEventListener("click", (event) => {
  console.log(event.type);    // "click"
 
});


const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (event) => {
  console.log(event.target.value); // მიმდინარე ტექსტი input-ში
});

const list = document.querySelector("#todo-list")
list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("დაწკაპუნდა:", event.target.textContent);
  }}
)