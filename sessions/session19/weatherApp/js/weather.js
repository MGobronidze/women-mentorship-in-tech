/* weather.js — წმინდა ლოგიკა (pure functions): კოდები, ნორმალიზაცია, შეცდომების აღწერა */

// WMO weather code → ემოჯი და ქართული აღწერა
const WEATHER_CODES = [
  { codes: [0], emoji: "☀️", label: "მოწმენდილი ცა" },
  { codes: [1], emoji: "🌤️", label: "ძირითადად მოწმენდილი" },
  { codes: [2], emoji: "⛅", label: "ნაწილობრივ მოღრუბლული" },
  { codes: [3], emoji: "☁️", label: "მოღრუბლული" },
  { codes: [45, 48], emoji: "🌫️", label: "ნისლი" },
  { codes: [51, 53, 55, 56, 57], emoji: "🌦️", label: "წვრილი წვიმა" },
  { codes: [61, 63, 65, 66, 67], emoji: "🌧️", label: "წვიმა" },
  { codes: [71, 73, 75, 77], emoji: "🌨️", label: "თოვლი" },
  { codes: [80, 81, 82], emoji: "🌦️", label: "კოკისპირული წვიმა" },
  { codes: [85, 86], emoji: "🌨️", label: "თოვლის ჩავლა" },
  { codes: [95, 96, 99], emoji: "⛈️", label: "ჭექა-ქუხილი" },
];

export function getWeatherInfo(code) {
  const match = WEATHER_CODES.find((item) => item.codes.includes(code));
  return match ? { emoji: match.emoji, label: match.label } : { emoji: "❓", label: "უცნობი" };
}

// API-ს "ნედლი" პასუხი → ჩვენთვის მოსახერხებელი სტრუქტურა
export function normalizeForecast(raw) {
  const { current, daily } = raw;

  return {
    current: {
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      wind: Math.round(current.wind_speed_10m),
      ...getWeatherInfo(current.weather_code),
    },
    days: daily.time.map((date, i) => ({
      date,
      max: Math.round(daily.temperature_2m_max[i]),
      min: Math.round(daily.temperature_2m_min[i]),
      ...getWeatherInfo(daily.weather_code[i]),
    })),
  };
}

// "2026-10-14" → "ოთხ" (ქართული ლოკალი, Intl API)
export function formatWeekday(isoDate) {
  // "T00:00:00" — რომ თარიღი ადგილობრივ დროდ ჩაითვალოს, არა UTC-დ
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("ka-GE", { weekday: "short" });
}

// შეცდომა → მომხმარებლისთვის გასაგები ტექსტი
export function describeError(error) {
  if (error.name === "TimeoutError") return "სერვერმა დიდხანს არ უპასუხა. სცადე ხელახლა.";
  if (error.status === 429) return "ძალიან ბევრი მოთხოვნა. ცოტა ხანში სცადე.";
  if (error.status >= 500) return "სერვერის შეცდომა. მოგვიანებით სცადე.";
  if (error.status) return `მოთხოვნა ვერ შესრულდა (HTTP ${error.status}).`;
  return "ქსელთან კავშირი ვერ დამყარდა. შეამოწმე ინტერნეტი.";
}