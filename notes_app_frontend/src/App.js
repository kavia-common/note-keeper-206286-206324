import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NotesList from "./pages/NotesList";
import NoteEditor from "./pages/NoteEditor";
import Home from "./pages/Home";

/**
 * PUBLIC_INTERFACE
 * Main App - Provides top bar, theme switch, routing and footer with REACT_APP_FRONTEND_URL
 */
function App() {
  const [theme, setTheme] = useState("light");
  // Responsiveness - toggles nav for mobile
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <Router>
      <div className="App">
        <header className="nk-header">
          <div className="nk-header-brand">
            <span role="img" aria-label="Ocean">🌊</span> Note Keeper
          </div>
          <nav className={`nk-navbar${navOpen ? " open" : ""}`}>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
              React Docs
            </a>
            <a href={process.env.REACT_APP_FRONTEND_URL || "#"} target="_blank" rel="noopener noreferrer">
              App Home
            </a>
          </nav>
          <button
            className="nk-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button className="nk-burger" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle navigation">
            <span />
            <span />
            <span />
          </button>
        </header>
        <main className="nk-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/new" element={<NoteEditor />} />
            <Route path="/notes/:id" element={<NoteEditor />} />
            <Route path="*" element={<Navigate to="/notes" />} />
          </Routes>
        </main>
        <footer className="nk-footer">
          <span>
            Ocean Professional Theme &amp; Notes App &copy; {new Date().getFullYear()}
          </span>
          <span>
            Deployed at: <code>{process.env.REACT_APP_FRONTEND_URL || "localhost"}</code>
          </span>
        </footer>
      </div>
    </Router>
  );
}
export default App;
