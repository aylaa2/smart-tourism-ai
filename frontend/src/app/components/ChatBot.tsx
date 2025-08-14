"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "👋 Hi! Ask me anything about Syrian cities, landmarks, or culture.",
    },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, lang }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl shadow-lg p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">💬 Smart Tourism AI</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "ar")}
        >
          <option value="en">🇬🇧 English</option>
          <option value="ar">🇸🇾 العربية</option>
        </select>
      </div>

      <div className="border rounded-lg p-4 h-[300px] overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg max-w-xs break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic">AI is thinking...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2"
          placeholder={
            lang === "ar"
              ? "اسألني عن دمشق أو حلب أو الأماكن السياحية..."
              : "Ask about Aleppo, Damascus, landmarks..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {lang === "ar" ? "إرسال" : "Send"}
        </button>
      </div>
    </div>
  );
}
