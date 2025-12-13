import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // greeting loaded from backend
  const [isThinking, setIsThinking] = useState(false);
  const scroller = useRef(null);
  const navigate = useNavigate();

  // Load persona (greeting) from backend
  useEffect(() => {
    async function loadPersona() {
      try {
        const res = await fetch("http://localhost:5050/persona");
        const data = await res.json();

        setMessages([{ from: "leo", text: data.greeting }]);
      } catch (err) {
        console.error("Persona load error:", err);
        setMessages([
          { from: "leo", text: "Buongiorno! I am Leonardo da Vinci. What do you seek?" }
        ]);
      }
    }

    loadPersona();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTo({
        top: scroller.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  async function sendToBackend(userMessage) {
    try {
      const res = await fetch("http://localhost:5050/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      return data.response;
    } catch (err) {
      console.error("Backend error:", err);
      return "My thoughts elude me at the moment…";
    }
  }

  async function handleSend() {
    if (isThinking) return;

    const text = message.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setMessage("");
    setIsThinking(true);

    const reply = await sendToBackend(text);

    setMessages((prev) => [...prev, { from: "leo", text: reply }]);
    setIsThinking(false);
  }

  async function handleNewChat() {
    // Re-fetch persona greeting for a clean reset
    try {
      const res = await fetch("http://localhost:5050/persona");
      const data = await res.json();
      setMessages([{ from: "leo", text: data.greeting }]);
    } catch {
      setMessages([{ from: "leo", text: "Buongiorno! Ask me of art or invention." }]);
    }
    setMessage("");
  }

  function handleEndChat() {
    navigate("/");
  }

  return (
    <section className="chat-layout">
      <header className="chat-header">
        <div className="chat-title">
          <span className="chat-title-main">Leonardo Chatbot</span>
          <span className="chat-title-sub">
            Ask Leonardo about his art, inventions, and ideas.
          </span>
        </div>
      </header>

      <div className="chat-window framed" ref={scroller} role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg-row ${m.from === "leo" ? "from-leo" : "from-user"}`}
          >
            {m.from === "leo" && (
              <div className="avatar avatar-leo" aria-hidden="true">L</div>
            )}

            <div className="msg-bubble-block">
              <span className="msg-name">{m.from === "leo" ? "Leonardo" : "You"}</span>
              <div className="bubble">{m.text}</div>
            </div>

            {m.from === "user" && (
              <div className="avatar avatar-user" aria-hidden="true">U</div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="msg-row from-leo">
            <div className="avatar avatar-leo" aria-hidden="true">L</div>
            <div className="msg-bubble-block">
              <span className="msg-name">Leonardo</span>
              <div className="bubble thinking">Thinking…</div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-controls">
        <div className="input-row">
          <input
            aria-label="Type your question for Leonardo"
            placeholder="Type your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isThinking && handleSend()}
            disabled={isThinking}
          />

          <button
            className="btn primary"
            onClick={handleSend}
            aria-label="Send message"
            disabled={isThinking}
          >
            Send ➜
          </button>
        </div>

        <div className="chat-footer-buttons">
          <button className="btn subtle" onClick={handleNewChat} disabled={isThinking}>
            New Chat
          </button>
          <button className="btn danger" onClick={handleEndChat}>
            End Chat
          </button>
        </div>
      </div>
    </section>
  );
}
