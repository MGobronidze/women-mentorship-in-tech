import { useState, useRef, useEffect } from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const editRef = useRef(null);

  // როცა რედაქტირების რეჟიმი ირთვება — ფოკუსი და ტექსტის მონიშვნა
  useEffect(() => {
    if (isEditing) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [isEditing]);

  function startEditing() {
    setDraft(task.text);
    setIsEditing(true);
  }

  function save() {
    const trimmed = draft.trim();
    if (trimmed !== "" && trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") setIsEditing(false);   // გაუქმება
  }

  return (
    <li className={task.done ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={"მონიშვნა: " + task.text}
      />

      {isEditing ? (
        <input
          ref={editRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          aria-label="დავალების რედაქტირება"
        />
      ) : (
        <span onDoubleClick={startEditing}>{task.text}</span>
      )}

      <button onClick={() => onDelete(task.id)} aria-label={"წაშლა: " + task.text}>
        ✕
      </button>
    </li>
  );
}

export default TaskItem;