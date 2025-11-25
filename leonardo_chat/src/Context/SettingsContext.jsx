import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState("light");          // light | dark
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(100);      // 90..150

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.hc = highContrast ? "1" : "0";
    document.documentElement.style.setProperty("--font-scale", `${fontScale}%`);
  }, [theme, highContrast, fontScale]);

  return (
    <SettingsContext.Provider value={{
      theme, setTheme, highContrast, setHighContrast, fontScale, setFontScale
    }}>
      {children}
    </SettingsContext.Provider>
  );
}
export const useSettings = () => useContext(SettingsContext);
