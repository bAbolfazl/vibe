import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <div className="empty">No tasks yet — add one.</div>;
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
