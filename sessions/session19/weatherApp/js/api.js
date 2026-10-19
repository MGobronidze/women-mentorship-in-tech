/* api.js — ქსელთან კომუნიკაცია (Fetch). DOM-ს არ ეხება. */

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// fetch() მხოლოდ ქსელის შეცდომაზე "ვარდება" — HTTP 404/500-ზე არა! ამიტომ ვამოწმებთ response.ok-ს.
async function fetchJSON(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status; // კატეგორიზაციისთვის, UI-ში
    throw error;
  }

  return response.json();
}

// ნაბიჯი 1: ქალაქის სახელი → კოორდინატები
export async function searchCity(name, signal) {
  // URLSearchParams თავად აკეთებს encoding-ს — ქართული ასოებიც უსაფრთხოდ გადადის URL-ში
  const params = new URLSearchParams({ name, count: "1", language: "en", format: "json" });
  const data = await fetchJSON(`${GEO_URL}?${params}`, signal);

  // თუ ვერაფერი მოიძებნა, API-ს პასუხში "results" ველი საერთოდ არ არის!
  if (!data.results || data.results.length === 0) {
    return null;
  }

  const { name: cityName, latitude, longitude, country } = data.results[0];
  return { name: cityName, latitude, longitude, country };
}

// ნაბიჯი 2: კოორდინატები → ამინდის პროგნოზი
export function getForecast({ latitude, longitude }, signal) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "5",
  });
  return fetchJSON(`${FORECAST_URL}?${params}`, signal);
}