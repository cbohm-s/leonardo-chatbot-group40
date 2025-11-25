import { useEffect, useRef, useState } from "react";
import persona from "../data/persona.json";
import prompts from "../data/prompts.json";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "leo", text: persona.greeting }
  ]);
  const scroller = useRef(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const text = message.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setMessage("");

    // very small JSON “scripting” demo (swap with API later)
    const lower = text.toLowerCase();
    const match = prompts.find(p => lower.includes(p.whenIncludes));
    const reply = match ? match.reply : persona.fallback;
    setTimeout(() => {
      setMessages((m) => [...m, { from: "leo", text: reply }]);
    }, 400);
  }

  return (
    <section className="chat-shell" aria-label="Chat with Leonardo">
      <div className="chat-window" ref={scroller} role="log" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from === "leo" ? "leo" : "user"}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          aria-label="Type your question for Leonardo"
          placeholder="Type your question here …"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e)=> e.key==="Enter" && handleSend()}
        />
        <button className="btn primary" onClick={handleSend} aria-label="Send message">Send ➜</button>
      </div>
    </section>
  );
}
