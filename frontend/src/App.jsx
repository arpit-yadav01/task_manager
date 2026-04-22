import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* default */}
        <Route path="/" element={<Navigate to="/projects" />} />

        {/* pages */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Tasks />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;