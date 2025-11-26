import leonardoImg from "../assets/leonardo.png";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Leonardo da Vinci Chatbot</h1>

      <img className="leo-image" src={leonardoImg} alt="Leonardo da Vinci" />


      <p className="home-intro">
        “Greetings, I am Leonardo da Vinci. Ask me about my art, inventions, or philosophies!”
      </p>

      <div className="button-row">
        <button
          className="start-btn"
          onClick={() => navigate("/chat")}
        >
          START Chat
        </button>

        <a
          className="about-btn"
          href="https://en.wikipedia.org/wiki/Leonardo_da_Vinci"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Leonardo
        </a>
      </div>
    </div>
  );
}
