import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");      // "all" | "active" | "done"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── გამოთვლილი მნიშვნელობები (არა state!) ──
  const remaining = tasks.filter((t) => !t.done).length;
  const visibleTasks = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  // ── ეფექტი: ბრაუზერის ტაბის სათაური მიჰყვება მთვლელს ──
  useEffect(() => {
    document.title = remaining === 0 ? "To-Do" : `(${remaining}) To-Do`;
  }, [remaining]);

  // ── მოქმედებები (ყველა — updater ფორმით, ახალი ასლით) ──
  function addTask(text) {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function editTask(id, text) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  // ── გარე API-დან ნიმუშის ჩატვირთვა (event handler-ში, არა ეფექტში: მომხმარებლის ქმედებაა) ──
  async function loadSamples() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
      if (!res.ok) throw new Error("სერვერის შეცდომა: " + res.status);
      const data = await res.json();
      const samples = data.map((item) => ({
        id: crypto.randomUUID(),       // ახალი ID, რომ API-ს ID-ები არ დაგვეჯახოს
        text: item.title,
        done: item.completed,
      }));
      setTasks((prev) => [...prev, ...samples]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <h1>დავალებები</h1>

      <TaskForm onAdd={addTask} />

      <Filters current={filter} onChange={setFilter} />

      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />

      <footer className="toolbar">
        <span>დარჩენილია {remaining} დავალება</span>
        <button onClick={clearDone} disabled={tasks.every((t) => !t.done)}>
          შესრულებულების წაშლა
        </button>
        <button onClick={loadSamples} disabled={loading}>
          {loading ? "იტვირთება..." : "ნიმუშის ჩატვირთვა"}
        </button>
      </footer>

      {error && <p role="alert" className="error">{error}</p>}
    </main>
  );
}

export default App;