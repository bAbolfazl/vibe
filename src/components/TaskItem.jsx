import React from "react";

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <div className="task-content">
          <div className="task-title">{task.title}</div>
          {task.description ? <div className="task-desc">{task.description}</div> : null}
        </div>
      </label>
      <button className="btn btn-small" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
