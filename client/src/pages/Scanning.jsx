import React, { useState } from "react";
import data from "../data.json";

const Scanning = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSearch = () => {
    const text = query.toLowerCase();
    let found = null;

    for (const item of data) {
      for (const key of item.keywords) {
        if (text.includes(key.toLowerCase())) {
          found = item;
          break;
        }
      }
      if (found) break;
    }

    // Add user message
    const newMessages = [...messages, { sender: "user", text: query }];

    if (found) {
      newMessages.push({
        sender: "bot",
        text: `🤖 I understand you're experiencing symptoms related to **${found.keywords[0]}**.\n\n📝 **Description:** ${found.description}\n\n💡 **Remedy (Do / Don’t):** ${found.remedy}\n\n⚠️ *Disclaimer: This is general information and not a substitute for professional medical advice.*`
      });
    } else {
      newMessages.push({
        sender: "bot",
        text: "❌ Sorry, I couldn't identify your symptoms. Please rephrase or try another."
      });
    }

    setMessages(newMessages);
    setQuery(""); // Clear input
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">CareScan 🩺</h1>

      {/* Chat Window */}
      <div className="w-full max-w-lg flex-1 overflow-y-auto bg-white rounded-lg shadow p-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 p-3 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text.split("\n").map((line, idx) => (
              <p key={idx} className="mb-1">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-lg flex">
        <textarea
          className="flex-1 p-3 border rounded-lg"
          rows={2}
          placeholder="Describe your symptoms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Scanning;
