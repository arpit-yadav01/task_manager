// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// import Input from "../components/Input";
// import Button from "../components/Button";
// import Loader from "../components/Loader";

// const Login = () => {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ CHECK IF USER ALREADY LOGGED IN
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await API.get("/auth/me");
//         navigate("/projects"); // already logged in → go to projects
//       } catch {
//         // not logged in → stay here
//       }
//     };

//     checkAuth();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       if (isLogin) {
//         await API.post("/auth/login", { email, password });
//       } else {
//         await API.post("/auth/register", { email, password });
//       }

//       navigate("/projects"); // after login/register
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>{isLogin ? "Login" : "Register"}</h2>

//       <form onSubmit={handleSubmit}>
//         <Input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />

//         <Input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />

//         {error && <p>{error}</p>}

//         {loading ? (
//           <Loader />
//         ) : (
//           <Button type="submit">
//             {isLogin ? "Login" : "Register"}
//           </Button>
//         )}
//       </form>

//       <p
//         onClick={() => setIsLogin(!isLogin)}
//         style={{ cursor: "pointer" }}
//       >
//         {isLogin
//           ? "Don't have an account? Register"
//           : "Already have an account? Login"}
//       </p>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    background: #f7f6f3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
  }

  .auth-card {
    background: #ffffff;
    border: 1px solid #e2e0db;
    width: 100%;
    max-width: 400px;
    padding: 48px 40px 40px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
  }

  .auth-wordmark {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9e9a94;
    margin-bottom: 40px;
  }

  .auth-heading {
    font-size: 22px;
    font-weight: 600;
    color: #1a1916;
    margin: 0 0 6px 0;
    letter-spacing: -0.3px;
  }

  .auth-subtext {
    font-size: 13.5px;
    color: #9e9a94;
    margin: 0 0 32px 0;
    font-weight: 400;
  }

  .auth-field {
    margin-bottom: 14px;
  }

  .auth-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6b6860;
    margin-bottom: 6px;
  }

  .auth-input {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid #dedad4;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1916;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.15s ease, background 0.15s ease;
    border-radius: 2px;
  }

  .auth-input:focus {
    border-color: #1a1916;
    background: #ffffff;
  }

  .auth-input::placeholder {
    color: #c4c0bb;
  }

  .auth-error {
    font-size: 12.5px;
    color: #b84040;
    background: #fdf3f3;
    border: 1px solid #f0d5d5;
    padding: 10px 13px;
    margin-bottom: 16px;
    border-radius: 2px;
  }

  .auth-btn {
    width: 100%;
    padding: 12px;
    background: #1a1916;
    color: #f7f6f3;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.01em;
    margin-top: 6px;
    border-radius: 2px;
    transition: background 0.15s ease, opacity 0.15s ease;
  }

  .auth-btn:hover {
    background: #2e2c28;
  }

  .auth-btn:active {
    opacity: 0.85;
  }

  .auth-divider {
    border: none;
    border-top: 1px solid #ece9e4;
    margin: 28px 0;
  }

  .auth-toggle {
    font-size: 13px;
    color: #6b6860;
    text-align: center;
  }

  .auth-toggle span {
    color: #1a1916;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: #c4c0bb;
    transition: text-decoration-color 0.15s ease;
  }

  .auth-toggle span:hover {
    text-decoration-color: #1a1916;
  }

  .auth-loader {
    display: flex;
    justify-content: center;
    padding: 10px 0 4px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me");
        navigate("/projects");
      } catch {}
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        await API.post("/auth/login", { email, password });
      } else {
        await API.post("/auth/register", { email, password });
      }
      navigate("/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-wordmark">Workspace</div>

          <h2 className="auth-heading">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="auth-subtext">
            {isLogin
              ? "Sign in to continue to your workspace"
              : "Get started — it only takes a moment"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            {loading ? (
              <div className="auth-loader">
                <Loader />
              </div>
            ) : (
              <button className="auth-btn" type="submit">
                {isLogin ? "Sign in" : "Create account"}
              </button>
            )}
          </form>

          <hr className="auth-divider" />

          <p className="auth-toggle">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => { setIsLogin(!isLogin); setError(""); }}>
              {isLogin ? "Register" : "Sign in"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;