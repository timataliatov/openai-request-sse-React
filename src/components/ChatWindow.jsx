import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages, userAvatar }) => {
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
            <ChatMessage
              role={message.role}
              content={message.content}
              userAvatar={userAvatar}
              aiAvatar={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#ff79c6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
