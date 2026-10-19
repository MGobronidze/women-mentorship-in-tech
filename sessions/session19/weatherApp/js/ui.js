/* ui.js — მხოლოდ DOM. API-ს "ნედლ" მონაცემებს არ იცნობს — ღებულობს უკვე ნორმალიზებულს. */
import { formatWeekday } from "./weather.js";

// დამხმარე: ელემენტის შექმნა. textContent — უსაფრთხოა (API-დან მოსული ტექსტი HTML-ად არ პარსირდება!)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createCurrentCard(city, current) {
  const card = el("section", "weather-current");
  card.append(
    el("h2", "weather-city", `${city.name}${city.country ? ", " + city.country : ""}`),
    el("p", "weather-emoji", current.emoji),
    el("p", "weather-temp", `${current.temp}°C`),
    el("p", "weather-label", current.label),
    el("p", "weather-meta", `შეგრძნება ${current.feelsLike}° · ტენიანობა ${current.humidity}% · ქარი ${current.wind} კმ/სთ`)
  );
  return card;
}

function createForecastList(days) {
  const list = el("ul", "forecast-grid");
  const fragment = document.createDocumentFragment(); // მე-15 გაკვეთილი

  for (const { date, emoji, max, min, label } of days) {
    const item = el("li", "forecast-day");
    item.title = label;
    item.append(
      el("span", "forecast-weekday", formatWeekday(date)),
      el("span", "forecast-emoji", emoji),
      el("span", "forecast-temps", `${max}° / ${min}°`)
    );
    fragment.appendChild(item);
  }

  list.appendChild(fragment);
  return list;
}

// ერთი ფუნქცია, რომელიც state-ს გარდაქმნის ეკრანად
export function render(state, container) {
  container.replaceChildren(); // ძველი შიგთავსის გასუფთავება
  container.dataset.state = state.status;

  switch (state.status) {
    case "idle":
      container.append(el("p", "weather-hint", "შეიყვანე ქალაქის სახელი და დააჭირე „ძებნას“."));
      break;
    case "loading":
      container.append(el("p", "weather-loading", "⏳ იტვირთება..."));
      break;
    case "error":
      container.append(el("p", "weather-error", `⚠️ ${state.message}`));
      break;
    case "success":
      container.append(createCurrentCard(state.city, state.forecast.current), createForecastList(state.forecast.days));
      break;
  }
}

// ფავორიტი ქალაქების პანელი (Promise.allSettled-ის შედეგებიდან)
export function renderFavorites(items, container) {
  container.replaceChildren();

  for (const { city, forecast } of items) {
    const row = el("li", "favorite-city");
    row.append(
      el("span", "favorite-name", city.name),
      forecast
        ? el("span", "favorite-temp", `${forecast.current.emoji} ${forecast.current.temp}°C`)
        : el("span", "favorite-temp favorite-failed", "— მიუწვდომელია")
    );
    container.appendChild(row);
  }
}