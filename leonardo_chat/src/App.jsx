import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";
import { SettingsProvider } from "./context/SettingsContext.jsx";

export default function App() {
  return (
    <SettingsProvider>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </SettingsProvider>
  );
}
