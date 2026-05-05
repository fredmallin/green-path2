import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Mic, Send, MicOff, Volume2 } from "lucide-react";

export default function FarmAssistChat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hello! I'm FarmAssist AI . How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const recognitionRef = useRef(null);
  const chatRef = useRef(null);

  // 🎤 Speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (e) => {
        setInputValue(e.results[0][0].transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  // Scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 🎤 Toggle voice
  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Use Chrome or Edge for voice");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }

    setIsListening(!isListening);
  };

  // 🚀 SEND MESSAGE TO GEMINI BACKEND
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // 🔥 CALL YOUR BACKEND (Gemini)
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();

      const botMsg = {
        id: Date.now().toString(),
        text: data.reply || "No response from AI",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = {
        id: Date.now().toString(),
        text: "⚠️ Error connecting to AI server",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    }

    setIsTyping(false);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      {!isOpen && (
        <div className="chat-button" onClick={() => setIsOpen(true)}>
          <MessageCircle />
        </div>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="chat-container">
          {/* HEADER */}
          <div className="chat-header">
            <div className="chat-title">
              <Volume2 />
              <div>
                <h3>FarmAssist</h3>
                <p>AI Helper</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* MESSAGES */}
          <div className="chat-body" ref={chatRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.sender === "user" ? "msg user" : "msg bot"}
              >
                <p>{m.text}</p>
                <span>
                  {m.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {isTyping && <div className="msg bot typing">Typing...</div>}
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <button onClick={toggleVoice}>
              {isListening ? <MicOff /> : <Mic />}
            </button>

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
}