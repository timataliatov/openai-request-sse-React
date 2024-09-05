import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full bg-[#44475a] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-between bg-[#6272a4] px-6 py-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#f8f8f2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="10" r="8"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 22h10"></path>
            <path d="M12 22v-4"></path>
          </svg>
          <span className="text-sm font-medium">Chat with AI</span>
        </div>
      </div>

      <div ref={chatContainerRef} className="p-6 space-y-4 min-h-[55vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="animate-fade-in-up">
            <ChatMessage role={message.role} content={message.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
