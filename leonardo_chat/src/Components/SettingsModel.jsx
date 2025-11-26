import Toggle from "./Toggle.jsx";
import { useSettings } from "../Context/SettingsContext.jsx";


export default function SettingsModel() {
  const { highContrast, setHighContrast, fontScale, setFontScale, theme, setTheme } = useSettings();
  return (
    <section className="settings" role="dialog" aria-labelledby="settingsTitle" aria-modal="true">
      <h1 id="settingsTitle">Accessibility Settings</h1>

      <div className="setting">
        <Toggle
          id="hc"
          checked={highContrast}
          onChange={setHighContrast}
          label="Enable high-contrast mode"
        />
      </div>

      <div className="setting">
        <label htmlFor="font">Increase font size</label>
        <select
          id="font"
          value={fontScale}
          onChange={(e)=> setFontScale(Number(e.target.value))}
          aria-label="Font size"
        >
          <option value={90}>Small</option>
          <option value={100}>Default</option>
          <option value={120}>Large</option>
          <option value={150}>Extra Large</option>
        </select>
      </div>

      <div className="setting">
        <label htmlFor="theme">Theme</label>
        <select id="theme" value={theme} onChange={(e)=>setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <details className="setting">
        <summary>Keyboard Navigation help</summary>
        <ul>
          <li><kbd>Tab</kbd> move focus</li>
          <li><kbd>Enter</kbd> activate</li>
          <li><kbd>Esc</kbd> close dialogs</li>
        </ul>
      </details>

      <div className="btn-row">
        <button className="btn primary" onClick={()=>alert("Settings saved")}>Save settings</button>
        <button className="btn" onClick={()=>history.back()}>Cancel</button>
      </div>
    </section>
  );
}
