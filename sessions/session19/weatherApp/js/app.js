/* app.js — "შემკრები": state, events, async ლოგიკა */
import { searchCity, getForecast } from "./api.js";
import { normalizeForecast, describeError } from "./weather.js";
import { render, renderFavorites } from "./ui.js";

const FAVORITES = [
  { name: "თბილისი", latitude: 41.72, longitude: 44.79 },
  { name: "ბათუმი", latitude: 41.65, longitude: 41.64 },
  { name: "ქუთაისი", latitude: 42.27, longitude: 42.7 },
];

const form = document.querySelector("#search-form");
const input = document.querySelector("#city-input");
const output = document.querySelector("#weather-output");
const favoritesList = document.querySelector("#favorites-list");

let state = { status: "idle" };
let currentController = null; // მიმდინარე მოთხოვნის გასაუქმებლად

function setState(newState) {
  state = newState;
  render(state, output);
}

async function handleSearch(cityName) {
  // 1. წინა, ჯერ კიდევ მიმდინარე მოთხოვნა უქმდება (stale response-ის პრობლემა)
  currentController?.abort();
  currentController = new AbortController();

  // 2. ერთი signal: ხელით გაუქმება + 8 წამიანი timeout
  const signal = AbortSignal.any([currentController.signal, AbortSignal.timeout(8000)]);

  setState({ status: "loading" });

  try {
    const city = await searchCity(cityName, signal);
    if (!city) {
      setState({ status: "error", message: `„${cityName}“ ვერ მოიძებნა. სცადე სხვა დაწერილობა.` });
      return;
    }

    const raw = await getForecast(city, signal); // დამოკიდებულია city-ზე → თანმიმდევრული await
    setState({ status: "success", city, forecast: normalizeForecast(raw) });
  } catch (error) {
    if (error.name === "AbortError") return; // ახალმა ძებნამ გააუქმა — ეს შეცდომა არ არის
    setState({ status: "error", message: describeError(error) });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = input.value.trim();
  if (cityName.length < 2) {
    setState({ status: "error", message: "შეიყვანე მინიმუმ 2 სიმბოლო." });
    return;
  }
  handleSearch(cityName);
});

// ფავორიტები — დამოუკიდებელი მოთხოვნები, ამიტომ პარალელურად; allSettled — ერთის ჩავარდნა დანარჩენს არ აფუჭებს
async function loadFavorites() {
  const results = await Promise.allSettled(
    FAVORITES.map((city) => getForecast(city, AbortSignal.timeout(8000)))
  );

  const items = results.map((result, i) => ({
    city: FAVORITES[i],
    forecast: result.status === "fulfilled" ? normalizeForecast(result.value) : null,
  }));

  renderFavorites(items, favoritesList);
}

render(state, output);
loadFavorites();