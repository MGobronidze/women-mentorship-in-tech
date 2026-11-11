import { useState, useRef, useEffect } from "react";

function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // გვერდის გახსნისას ფოკუსი input-ზე
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") return;       // ცარიელი ტექსტი არ ემატება

    onAdd(trimmed);
    setText("");
    inputRef.current.focus();         // დამატების შემდეგ ფოკუსი ისევ input-ზე
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="რა უნდა გააკეთო?"
        aria-label="ახალი დავალება"
      />
      <button type="submit" disabled={text.trim() === ""}>დამატება</button>
    </form>
  );
}

export default TaskForm;