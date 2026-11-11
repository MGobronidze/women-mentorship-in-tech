import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">დავალებები არ არის. დაამატე პირველი! ✨</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}            // სტაბილური ID, არა index
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;