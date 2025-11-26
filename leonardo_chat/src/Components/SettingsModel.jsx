import { useEffect, useState } from "react";
import { useSettings } from "../Context/SettingsContext.jsx";

export default function SettingsModel() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [draft, setDraft] = useState(settings);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  function handleSave() {
    updateSettings(draft);
    setStatus("Settings saved");
    setTimeout(() => setStatus(""), 1500);
  }

  function handleCancel() {
    resetSettings();
    setStatus("Settings reset to defaults");
    setTimeout(() => setStatus(""), 1500);
  }

  return (
    <section
      className="settings"
      role="dialog"
      aria-labelledby="settingsTitle"
      aria-modal="true"
    >
      <h1 id="settingsTitle">Accessibility Settings</h1>

      <div className="setting">
        <label>
          <input
            type="checkbox"
            checked={draft.highContrast}
            onChange={(e) =>
              setDraft({ ...draft, highContrast: e.target.checked })
            }
          />{" "}
          Enable high-contrast mode
        </label>
      </div>

      <div className="setting">
        <label htmlFor="font">Increase font size</label>
        <select
          id="font"
          value={draft.fontScale}
          onChange={(e) =>
            setDraft({ ...draft, fontScale: Number(e.target.value) })
          }
        >
          <option value={90}>Small</option>
          <option value={100}>Default</option>
          <option value={120}>Large</option>
          <option value={150}>Extra Large</option>
        </select>
      </div>

      <div className="setting">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={draft.theme}
          onChange={(e) =>
            setDraft({ ...draft, theme: e.target.value })
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="setting">
        <label>
          <input
            type="checkbox"
            checked={draft.reducedMotion}
            onChange={(e) =>
              setDraft({ ...draft, reducedMotion: e.target.checked })
            }
          />{" "}
          Reduce motion (disable animations)
        </label>
      </div>

      <details className="setting">
        <summary>Keyboard Navigation help</summary>
        <ul>
          <li><kbd>Tab</kbd> – move focus</li>
          <li><kbd>Enter</kbd> – activate focused control</li>
          <li><kbd>Esc</kbd> – close dialogs</li>
        </ul>
      </details>

      <div className="btn-row">
        <button className="btn primary" onClick={handleSave}>
          Save settings
        </button>
        <button className="btn subtle" onClick={handleCancel}>
          Cancel
        </button>
      </div>

      {status && (
        <p className="settings-status" role="status">
          {status}
        </p>
      )}
    </section>
  );
}
