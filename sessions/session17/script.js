// JS: ერთი toggle ფუნქცია, state-ს ვინახავთ თავად DOM ატრიბუტში
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  const isOpen = toggleBtn.getAttribute("data-open") === "true";
  toggleBtn.setAttribute("data-open", String(!isOpen));
  navLinks.setAttribute("data-open", String(!isOpen));
});