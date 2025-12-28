import React, { useState } from "react";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ id: uid(), title: title.trim(), description: description.trim(), completed: false });
    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn" type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
