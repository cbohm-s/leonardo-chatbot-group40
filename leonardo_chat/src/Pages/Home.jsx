import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container home">
      <img
        className="portrait"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Leonardo_self.jpg"
        alt="Portrait of Leonardo da Vinci"
        width="280"
        height="280"
      />
      <h1>Leonardo da Vinci Chatbot</h1>
      <p className="tagline">
        “Greetings, I am Leonardo da Vinci. Ask me about my art, inventions or philosophies!”
      </p>
      <div className="cta-row">
        <Link className="btn primary" to="/chat">START Chat</Link>
        <a className="btn" href="https://en.wikipedia.org/wiki/Leonardo_da_Vinci" target="_blank">
          About Leonardo
        </a>
      </div>
    </main>
  );
}
