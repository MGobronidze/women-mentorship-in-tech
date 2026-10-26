const products = [
  { name: "წიგნი", category: "განათლება", price: 15 },
  { name: "ყურსასმენი", category: "ტექნიკა", price: 80 },
  { name: "რვეული", category: "განათლება", price: 5 },
];

const filtersEl = document.querySelector("#filters");
const listEl = document.querySelector("#product-list");
const KEY = "products.filter";

let current = localStorage.getItem(KEY) ?? "all";   // ბოლო არჩეული ფილტრი

function render() {
  const items = current === "all" ? products : products.filter(p => p.category === current);
  const frag = document.createDocumentFragment();           // ერთჯერადი DOM-ში ჩასმა
  for (const { name, price } of items) {
    const li = document.createElement("li");
    li.textContent = `${name} — ${price}₾`;                 // textContent: XSS-ისგან უსაფრთხო
    frag.append(li);
  }
  listEl.replaceChildren(frag);

  filtersEl.querySelectorAll("[data-filter]").forEach(btn =>
    btn.setAttribute("aria-pressed", String(btn.dataset.filter === current)));
}

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  current = btn.dataset.filter;
  localStorage.setItem(KEY, current);
  render();
});

render();