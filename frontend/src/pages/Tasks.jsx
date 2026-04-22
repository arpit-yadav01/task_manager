import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

import Loader from "../components/Loader";

const STATUS_CONFIG = {
  Todo:        { label: "Todo",        dot: "#c4c0bb" },
  "In Progress": { label: "In Progress", dot: "#e8a838" },
  Done:        { label: "Done",        dot: "#4caf82" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .tasks-root {
    min-height: 100vh;
    background: #f7f6f3;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── TOPBAR ── */
  .tasks-topbar {
    background: #ffffff;
    border-bottom: 1px solid #e2e0db;
    padding: 0 40px;
    height: 56px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .tasks-back-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #9e9a94;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.15s;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .tasks-back-btn:hover { color: #1a1916; }

  .tasks-topbar-sep {
    color: #dedad4;
    font-size: 14px;
  }

  .tasks-wordmark {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1a1916;
  }

  /* ── BODY ── */
  .tasks-body {
    max-width: 760px;
    margin: 0 auto;
    padding: 52px 24px 80px;
  }

  .tasks-page-title {
    font-size: 26px;
    font-weight: 600;
    color: #1a1916;
    letter-spacing: -0.4px;
    margin: 0 0 4px;
  }

  .tasks-page-sub {
    font-size: 14px;
    color: #9e9a94;
    margin: 0 0 40px;
  }

  /* ── CREATE ROW ── */
  .tasks-create-row {
    display: flex;
    gap: 10px;
    margin-bottom: 36px;
  }

  .tasks-text-input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #dedad4;
    background: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1916;
    outline: none;
    border-radius: 2px;
    transition: border-color 0.15s ease;
  }

  .tasks-text-input:focus { border-color: #1a1916; }
  .tasks-text-input::placeholder { color: #c4c0bb; }

  .tasks-add-btn {
    padding: 10px 20px;
    background: #1a1916;
    color: #f7f6f3;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 2px;
    white-space: nowrap;
    transition: background 0.15s ease;
  }

  .tasks-add-btn:hover { background: #2e2c28; }
  .tasks-add-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── ERROR ── */
  .tasks-error {
    font-size: 12.5px;
    color: #b84040;
    background: #fdf3f3;
    border: 1px solid #f0d5d5;
    padding: 10px 13px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  /* ── SECTION LABEL ── */
  .tasks-section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #b0aca6;
    margin-bottom: 12px;
  }

  /* ── TASK LIST ── */
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    border: 1px solid #e2e0db;
    background: #e2e0db;
    border-radius: 3px;
    overflow: hidden;
  }

  .tasks-item {
    background: #ffffff;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .tasks-item-left {
    flex: 1;
    min-width: 0;
  }

  .tasks-item-title {
    font-size: 14.5px;
    font-weight: 500;
    color: #1a1916;
    letter-spacing: -0.1px;
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tasks-item-title.done-title {
    text-decoration: line-through;
    color: #b0aca6;
  }

  /* ── STATUS BADGE ── */
  .tasks-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 500;
    color: #6b6860;
    background: #faf9f7;
    border: 1px solid #e2e0db;
    padding: 3px 8px 3px 6px;
    border-radius: 2px;
  }

  .tasks-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── STATUS ACTIONS ── */
  .tasks-item-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .tasks-status-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #6b6860;
    background: none;
    border: 1px solid #e2e0db;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 2px;
    white-space: nowrap;
    transition: all 0.12s ease;
  }

  .tasks-status-btn:hover {
    background: #faf9f7;
    color: #1a1916;
    border-color: #a8a49e;
  }

  .tasks-status-btn.active {
    background: #1a1916;
    color: #f7f6f3;
    border-color: #1a1916;
  }

  .tasks-delete-btn {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    color: #c4c0bb;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 6px;
    line-height: 1;
    border-radius: 2px;
    transition: color 0.12s ease, background 0.12s ease;
    margin-left: 4px;
  }

  .tasks-delete-btn:hover {
    color: #b84040;
    background: #fdf3f3;
  }

  /* ── EMPTY ── */
  .tasks-empty {
    text-align: center;
    padding: 56px 24px;
    border: 1px dashed #dedad4;
    border-radius: 3px;
    background: #faf9f7;
  }

  .tasks-empty-icon {
    font-size: 28px;
    margin-bottom: 12px;
    opacity: 0.35;
  }

  .tasks-empty-title {
    font-size: 15px;
    font-weight: 500;
    color: #6b6860;
    margin: 0 0 4px;
  }

  .tasks-empty-sub {
    font-size: 13px;
    color: #b0aca6;
    margin: 0;
  }

  /* ── LOADER ── */
  .tasks-loader-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f6f3;
  }
`;

const Tasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      setAdding(true);
      setError("");
      await API.post("/tasks", { title: title.trim(), projectId: id });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to create task");
    } finally {
      setAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const counts = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  if (loading && tasks.length === 0) {
    return (
      <>
        <style>{styles}</style>
        <div className="tasks-loader-wrap"><Loader /></div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tasks-root">
        <header className="tasks-topbar">
          <button className="tasks-back-btn" onClick={() => navigate("/projects")}>
            ← Back
          </button>
          <span className="tasks-topbar-sep">/</span>
          <span className="tasks-wordmark">Tasks</span>
        </header>

        <main className="tasks-body">
          <h1 className="tasks-page-title">Tasks</h1>
          <p className="tasks-page-sub">
            {tasks.length === 0
              ? "No tasks yet — add one below"
              : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} · ${counts["Done"] || 0} done`}
          </p>

          <div className="tasks-create-row">
            <input
              className="tasks-text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="New task title"
            />
            <button
              className="tasks-add-btn"
              onClick={handleCreate}
              disabled={adding || !title.trim()}
            >
              {adding ? "Adding…" : "Add task"}
            </button>
          </div>

          {error && <div className="tasks-error">{error}</div>}

          {tasks.length === 0 ? (
            <div className="tasks-empty">
              <div className="tasks-empty-icon">◻</div>
              <p className="tasks-empty-title">No tasks yet</p>
              <p className="tasks-empty-sub">Type a title above and hit Add task</p>
            </div>
          ) : (
            <>
              <div className="tasks-section-label">All tasks</div>
              <div className="tasks-list">
                {tasks.map((task) => {
                  const cfg = STATUS_CONFIG[task.status] || STATUS_CONFIG["Todo"];
                  return (
                    <div key={task._id} className="tasks-item">
                      <div className="tasks-item-left">
                        <p className={`tasks-item-title ${task.status === "Done" ? "done-title" : ""}`}>
                          {task.title}
                        </p>
                        <span className="tasks-badge">
                          <span
                            className="tasks-badge-dot"
                            style={{ background: cfg.dot }}
                          />
                          {cfg.label}
                        </span>
                      </div>

                      <div className="tasks-item-right">
                        {Object.keys(STATUS_CONFIG).map((s) => (
                          <button
                            key={s}
                            className={`tasks-status-btn ${task.status === s ? "active" : ""}`}
                            onClick={() => task.status !== s && updateStatus(task._id, s)}
                          >
                            {s}
                          </button>
                        ))}
                        <button
                          className="tasks-delete-btn"
                          title="Delete task"
                          onClick={() => deleteTask(task._id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Tasks;