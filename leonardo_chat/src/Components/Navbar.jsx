import { NavLink } from "react-router-dom";
import { useSettings } from "../Context/SettingsContext.jsx";

export default function Navbar() {
  const { settings, updateSettings } = useSettings();
  const theme = settings.theme;

  function setTheme(mode) {
    updateSettings({ theme: mode });
  }

  return (
    <header className="nav">
      <div className="brand">Leonardo Chatbot</div>

      <nav className="links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/chat" className="nav-link">
          Chat
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          Settings
        </NavLink>

        {/* Sun / Moon theme toggle */}
        <div
          className="theme-toggle"
          role="group"
          aria-label="Colour theme"
        >
          <button
            className={`icon-toggle ${
              theme === "light" ? "active" : ""
            }`}
            onClick={() => setTheme("light")}
            aria-label="Switch to light mode"
          >
            ☀️
          </button>
          <button
            className={`icon-toggle ${
              theme === "dark" ? "active" : ""
            }`}
            onClick={() => setTheme("dark")}
            aria-label="Switch to dark mode"
          >
            🌙
          </button>
        </div>
      </nav>
    </header>
  );
}
