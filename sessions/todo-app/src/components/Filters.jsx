const FILTERS = [
  { value: "all", label: "ყველა" },
  { value: "active", label: "აქტიური" },
  { value: "done", label: "შესრულებული" },
];

function Filters({ current, onChange }) {
  return (
    <div className="filters" role="group" aria-label="ფილტრი">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          aria-pressed={current === f.value}
          className={current === f.value ? "active" : ""}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default Filters;
