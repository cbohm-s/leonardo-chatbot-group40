import { createContext, useContext, useEffect, useState } from "react";

const defaultSettings = {
  theme: "dark",
  highContrast: false,
  fontScale: 100,
  reducedMotion: false
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  // Apply to <html> element so CSS can react
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;                       // light | dark
    root.dataset.hc = settings.highContrast ? "1" : "0";       // high contrast
    root.dataset.motion = settings.reducedMotion ? "reduced" : "normal";
    root.style.setProperty("--font-scale", String(settings.fontScale));
    
  }, [settings]);

  const value = {
    settings,
    updateSettings: (patch) => setSettings(prev => ({ ...prev, ...patch })),
    resetSettings: () => setSettings(defaultSettings)
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
