import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext.jsx";

export default function Navbar() {
  const { theme, setTheme } = useSettings();
  return (
    <header className="nav">
      <div className="brand">Leonardo Chatbot</div>
      <nav className="links">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/settings">Accessibility</Link>
        <button
          className="icon-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          title="Light/Dark"
        >{theme === "light" ? "🌙" : "☀️"}</button>
      </nav>
    </header>
  );
}
