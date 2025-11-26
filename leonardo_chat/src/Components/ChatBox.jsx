import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import persona from "../Data/persona.json";
import prompts from "../Data/prompts.json";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "leo", text: persona.greeting }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const scroller = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTo({
        top: scroller.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  function handleSend() {
    const text = message.trim();
    if (!text) return;

    // add user message
    setMessages(prev => [...prev, { from: "user", text }]);
    setMessage("");
    setIsThinking(true);

    // simple JSON-based reply logic
    const lower = text.toLowerCase();
    const match = prompts.find(p => lower.includes(p.whenIncludes));
    const reply = match ? match.reply : persona.fallback;

    setTimeout(() => {
      setMessages(prev => [...prev, { from: "leo", text: reply }]);
      setIsThinking(false);
    }, 500);
  }

  function handleNewChat() {
    setMessages([{ from: "leo", text: persona.greeting }]);
    setMessage("");
  }

  function handleEndChat() {
    navigate("/");   // go back to Home page
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

      <div
        className="chat-window framed"
        ref={scroller}
        role="log"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`msg-row ${m.from === "leo" ? "from-leo" : "from-user"}`}
          >
            {m.from === "leo" && (
              <div className="avatar avatar-leo" aria-hidden="true">
                L
              </div>
            )}

            <div className="msg-bubble-block">
              <span className="msg-name">
                {m.from === "leo" ? "Leonardo" : "You"}
              </span>
              <div className="bubble">
                {m.text}
              </div>
            </div>

            {m.from === "user" && (
              <div className="avatar avatar-user" aria-hidden="true">
                U
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="msg-row from-leo">
            <div className="avatar avatar-leo" aria-hidden="true">L</div>
            <div className="msg-bubble-block">
              <span className="msg-name">Leonardo</span>
              <div className="bubble thinking">
                Thinking…
              </div>
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="btn primary"
            onClick={handleSend}
            aria-label="Send message"
          >
            Send ➜
          </button>
        </div>

        <div className="chat-footer-buttons">
          <button className="btn subtle" onClick={handleNewChat}>
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
