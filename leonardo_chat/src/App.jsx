import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";

import HomePage from "./Pages/Home.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";

import { SettingsProvider } from "./Context/SettingsContext.jsx";

export default function App() {
  return (
    <SettingsProvider>
      <Navbar />

      <main id="main" style={{ padding: 24 }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </SettingsProvider>
  );
}
