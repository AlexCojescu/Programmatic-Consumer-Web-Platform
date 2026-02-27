"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const chatbotOptions = [
  {
    path: "/api/chat"
  }
];

// Refined SVG Icons
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 6-12 12"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const BotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="10" x="3" y="11" rx="2" ry="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="m12 7v4"/>
    <line x1="8" x2="8" y1="16" y2="16"/>
    <line x1="16" x2="16" y1="16" y2="16"/>
  </svg>
);


export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const selectedBot = chatbotOptions[0]; // Always use the first (and only) chatbot

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: selectedBot.path
    })
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <>
      {/* Add custom scrollbar hiding styles */}
      <style jsx global>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Interface */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-96 h-[32rem] bg-white rounded-lg shadow-lg border border-gray-200 mb-2 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BotIcon />
                <h3 className="font-medium text-gray-900 text-sm">Assistant</h3>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors text-gray-500"
              >
                <XIcon />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto bg-white scrollbar-hidden flex flex-col relative">
              {error && (
                <div className="text-red-600 bg-red-50 border border-red-200 p-2.5 rounded text-sm m-4">
                  {error.message}
                </div>
              )}

              {/* Empty state when there are no messages yet */}
              {(!messages || messages.length === 0) && !error && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                    <BotIcon />
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Ask anything about our systems integration & services.
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    I can help you understand our offers, recommend next steps, or answer quick questions.
                  </p>
                </div>
              )}

              {/* Messages list */}
              {messages && messages.length > 0 && (
                <div className="p-4 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="flex flex-col">
                      {message.parts?.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={`${message.id}-${index}`}
                                className={`max-w-[80%] p-2.5 rounded text-sm ${
                                  message.role === "user"
                                    ? "bg-gray-900 text-white ml-auto"
                                    : "bg-gray-100 text-gray-900"
                                }`}
                              >
                                {part.text}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  ))}
                </div>
              )}

              {(status === "submitted" || status === "streaming") && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                  <span>Typing...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-gray-50 border-t border-gray-200"
            >
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm placeholder-gray-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={status === "submitted" || status === "streaming"}
                />
                {status === "submitted" || status === "streaming" ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={!input.trim()}
                  >
                    Send
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Main Widget Button */}
        <button
          onClick={toggleChat}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? <XIcon /> : <BotIcon />}
        </button>
      </div>
    </>
  );
}