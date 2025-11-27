// src/Components/Navbar.jsx
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <nav aria-label="Primary">
        <ul className="nav-list" role="list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                "btn btn-home" + (isActive ? " active" : "")
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                "btn btn-chat" + (isActive ? " active" : "")
              }
            >
              Chat
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                "btn btn-a11y" + (isActive ? " active" : "")
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
