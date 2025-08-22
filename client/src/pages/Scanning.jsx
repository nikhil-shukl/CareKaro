import React, { useState, useEffect, useRef } from "react";
import data from "../data.json";
import vividBg from "/vivid.jpg";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HospitalLoader from "../components/HospitalLoader";

const Scanning = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Welcome ${
        user?.firstName || ""
      }! I am Doctor Bot. I can help you understand common health issues. Please describe your symptoms.`,
    },
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const chatRef = useRef();

  // **NEW: Loader state for initial route visit**
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 1.5s (or adjust duration as needed)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, botTyping]);

  const handleSend = () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { sender: "user", text: query }];
    setMessages(newMessages);
    setQuery("");

    const text = query.toLowerCase();
    let found = null;

    for (const item of data) {
      if (item.keywords.some((k) => text.includes(k.toLowerCase()))) {
        found = item;
        break;
      }
    }

    setBotTyping(true);
    setTimeout(() => {
      const botMsg = found
        ? `I understand your symptoms might relate to "${found.keywords[0]}".\n\nDescription: ${found.description}\n\nRemedy:\n${found.remedy}\n\nWorst Case: ${found.worstCase}`
        : `Sorry, I couldn't identify your symptoms. Please rephrase or provide more details.`;

      setMessages((prev) => [...prev, { sender: "bot", text: botMsg }]);
      setBotTyping(false);
    }, 1500);
  };

  // **Return loader if still loading on route visit**
  if (loading) return <HospitalLoader />;

  return (
    <div
      className="flex flex-col items-center min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${vividBg})` }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-1 px-3 py-2 cursor-pointer hover:bg-opacity-100 transition"
      >
        <ArrowLeft size={18} className="text-gray-700" />
        <span className="text-gray-800 font-medium">Back</span>
      </button>

      {/* Top Quote */}
      <div className="text-center mb-2 text-black text-lg font-medium max-w-full mt-10">
        Our bot is upgrading daily to give up his life to learn how to save yours
        <p className="text-red-400 text-sm mt-2 max-w-2xl text-center">
          ⚠️ This information is for general guidance only and is not a
          substitute for professional medical advice.
        </p>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-black mb-4 flex items-center gap-2">
        🩺 Doctor Bot
      </h1>

      {/* Chat Window */}
      <div className="w-full max-w-4xl h-[75vh] flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div>
                {msg.sender === "user" ? (
                  <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
                ) : (
                  <img src="/bot_avatar.png" alt="Bot" className="w-12 h-12 rounded-full" />
                )}
              </div>
              <div
                className={`p-4 max-w-[75%] rounded-lg break-words whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.text.split("\n").map((line, idx) => (
                  <p key={idx} className="mb-1">{line}</p>
                ))}
              </div>
            </div>
          ))}

          {botTyping && (
            <div className="flex items-start gap-2 flex-row">
              <img src="/bot_avatar.png" alt="Bot" className="w-12 h-12 rounded-full" />
              <div className="bg-gray-200 p-3 rounded-lg flex gap-1 w-20 justify-center">
                <span className="dot animate-ping"></span>
                <span className="dot animate-ping delay-200"></span>
                <span className="dot animate-ping delay-400"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-3 p-3 border-t border-gray-300">
          <input
            type="text"
            placeholder="Describe your symptoms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>

      {/* Typing dots CSS */}
      <style jsx>{`
        .dot {
          width: 6px;
          height: 6px;
          background: black;
          border-radius: 50%;
          display: inline-block;
        }
        .animate-ping {
          animation: ping 1s infinite ease-in-out;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes ping {
          0%, 100% {
            transform: scale(0.6);
            opacity: 0.3;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Scanning;
