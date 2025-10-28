import { useState } from "react";
import axios from "axios";

const Consultation = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/api/consultation-chat/ask", {
        question: input,
      });

      const botMsg = { role: "bot", content: res.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errMsg = { role: "bot", content: "Sorry, I couldn't process that." };
      setMessages((prev) => [...prev, errMsg]);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-6 rounded shadow-lg h-[500px] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-xs ${
              msg.role === "user"
                ? "bg-pink-100 self-end text-right ml-auto"
                : "bg-gray-100 self-start text-left mr-auto"
            }`}
          >
            <p className="text-sm text-gray-700">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Ask your skincare/makeup question..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-pink-400"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Consultation;
