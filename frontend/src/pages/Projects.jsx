import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import Loader from "../components/Loader";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .proj-root {
    min-height: 100vh;
    background: #f7f6f3;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── TOPBAR ── */
  .proj-topbar {
    background: #ffffff;
    border-bottom: 1px solid #e2e0db;
    padding: 0 40px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .proj-wordmark {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1a1916;
  }

  .proj-logout-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #6b6860;
    background: none;
    border: 1px solid #e2e0db;
    padding: 6px 14px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.15s ease;
    letter-spacing: 0.01em;
  }

  .proj-logout-btn:hover {
    color: #1a1916;
    border-color: #a8a49e;
    background: #faf9f7;
  }

  /* ── CONTENT ── */
  .proj-body {
    max-width: 780px;
    margin: 0 auto;
    padding: 52px 24px 80px;
  }

  .proj-page-title {
    font-size: 26px;
    font-weight: 600;
    color: #1a1916;
    letter-spacing: -0.4px;
    margin: 0 0 4px;
  }

  .proj-page-sub {
    font-size: 14px;
    color: #9e9a94;
    margin: 0 0 40px;
  }

  /* ── CREATE BAR ── */
  .proj-create-row {
    display: flex;
    gap: 10px;
    margin-bottom: 36px;
  }

  .proj-text-input {
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

  .proj-text-input:focus {
    border-color: #1a1916;
  }

  .proj-text-input::placeholder {
    color: #c4c0bb;
  }

  .proj-create-btn {
    padding: 10px 20px;
    background: #1a1916;
    color: #f7f6f3;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.01em;
    border-radius: 2px;
    white-space: nowrap;
    transition: background 0.15s ease;
  }

  .proj-create-btn:hover { background: #2e2c28; }
  .proj-create-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── ERROR ── */
  .proj-error {
    font-size: 12.5px;
    color: #b84040;
    background: #fdf3f3;
    border: 1px solid #f0d5d5;
    padding: 10px 13px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  /* ── SECTION LABEL ── */
  .proj-section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #b0aca6;
    margin-bottom: 12px;
  }

  /* ── PROJECT LIST ── */
  .proj-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    border: 1px solid #e2e0db;
    background: #e2e0db;
    border-radius: 3px;
    overflow: hidden;
  }

  .proj-item {
    background: #ffffff;
    padding: 18px 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.1s ease;
  }

  .proj-item:hover {
    background: #faf9f7;
  }

  .proj-item-name {
    font-size: 14.5px;
    font-weight: 500;
    color: #1a1916;
    letter-spacing: -0.1px;
  }

  .proj-item-arrow {
    color: #c4c0bb;
    font-size: 16px;
    transition: color 0.15s ease, transform 0.15s ease;
  }

  .proj-item:hover .proj-item-arrow {
    color: #6b6860;
    transform: translateX(2px);
  }

  /* ── EMPTY STATE ── */
  .proj-empty {
    text-align: center;
    padding: 56px 24px;
    border: 1px dashed #dedad4;
    border-radius: 3px;
    background: #faf9f7;
  }

  .proj-empty-icon {
    font-size: 28px;
    margin-bottom: 12px;
    opacity: 0.4;
  }

  .proj-empty-title {
    font-size: 15px;
    font-weight: 500;
    color: #6b6860;
    margin: 0 0 4px;
  }

  .proj-empty-sub {
    font-size: 13px;
    color: #b0aca6;
    margin: 0;
  }

  /* ── NOT LOGGED IN ── */
  .proj-gate {
    text-align: center;
    padding: 80px 24px;
  }

  .proj-gate-title {
    font-size: 20px;
    font-weight: 600;
    color: #1a1916;
    margin: 0 0 8px;
  }

  .proj-gate-sub {
    font-size: 14px;
    color: #9e9a94;
    margin: 0 0 28px;
  }

  .proj-gate-btn {
    padding: 11px 28px;
    background: #1a1916;
    color: #f7f6f3;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s ease;
  }

  .proj-gate-btn:hover { background: #2e2c28; }

  /* ── LOADER ── */
  .proj-loader-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f6f3;
  }
`;

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        await API.get("/auth/me");
        if (!isMounted) return;
        setIsAuth(true);
        const projectRes = await API.get("/projects");
        setProjects(projectRes.data);
      } catch (err) {
        if (!isMounted) return;
        if (err.response?.status !== 401) console.error(err);
        setIsAuth(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();
    return () => { isMounted = false; };
  }, []);

  const handleCreate = async () => {
    if (!isAuth) { navigate("/login"); return; }
    if (!name.trim()) return;
    try {
      setCreating(true);
      setError("");
      await API.post("/projects", { name: name.trim() });
      const res = await API.get("/projects");
      setProjects(res.data);
      setName("");
    } catch {
      setError("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setIsAuth(false);
      setProjects([]);
      navigate("/login");
    } catch {
      setError("Logout failed");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="proj-loader-wrap"><Loader /></div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="proj-root">
        <header className="proj-topbar">
          <span className="proj-wordmark">Workspace</span>
          {isAuth && (
            <button className="proj-logout-btn" onClick={handleLogout}>
              Sign out
            </button>
          )}
        </header>

        <main className="proj-body">
          {!isAuth ? (
            <div className="proj-gate">
              <p className="proj-gate-title">Sign in to continue</p>
              <p className="proj-gate-sub">Your projects are waiting for you.</p>
              <button className="proj-gate-btn" onClick={() => navigate("/login")}>
                Go to login
              </button>
            </div>
          ) : (
            <>
              <h1 className="proj-page-title">Projects</h1>
              <p className="proj-page-sub">
                {projects.length === 0
                  ? "No projects yet — create your first one below"
                  : `${projects.length} project${projects.length !== 1 ? "s" : ""}`}
              </p>

              <div className="proj-create-row">
                <input
                  className="proj-text-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="New project name"
                />
                <button
                  className="proj-create-btn"
                  onClick={handleCreate}
                  disabled={creating || !name.trim()}
                >
                  {creating ? "Creating…" : "Create project"}
                </button>
              </div>

              {error && <div className="proj-error">{error}</div>}

              {projects.length === 0 ? (
                <div className="proj-empty">
                  <div className="proj-empty-icon">◻</div>
                  <p className="proj-empty-title">No projects yet</p>
                  <p className="proj-empty-sub">
                    Type a name above and hit Create project
                  </p>
                </div>
              ) : (
                <>
                  <div className="proj-section-label">All projects</div>
                  <div className="proj-list">
                    {projects.map((p) => (
                      <div
                        key={p._id}
                        className="proj-item"
                        onClick={() => navigate(`/projects/${p._id}`)}
                      >
                        <span className="proj-item-name">{p.name}</span>
                        <span className="proj-item-arrow">→</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Projects;