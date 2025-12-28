import React, { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const STORAGE_KEY = "tasks:v1";
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load tasks", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks", e);
    }
  }, [tasks]);

  function addTask(task) {
    setTasks((s) => [task, ...s]);
  }

  function toggleTask(id) {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Task Manager</h1>
        <div className="stats">{completedCount}/{tasks.length} done</div>
      </header>

      <main>
        <TaskForm onAdd={addTask} />

        <div className="filters">
          <button className={`btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`btn ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Active</button>
          <button className={`btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
        </div>

        <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
      </main>
    </div>
  );
}
