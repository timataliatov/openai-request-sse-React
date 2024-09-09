import React from 'react';
import { marked } from 'marked';

const ChatMessage = ({ role, content, userAvatar, aiAvatar }) => {
  return (
    <div className={`flex items-start gap-4 h-auto ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`rounded-xl w-10 h-10 mt-2 flex items-center justify-center overflow-hidden ${role === 'user' ? 'bg-[#bd93f9]' : 'bg-[#50fa7b]'}`}>
        {role === 'user' ? (
          userAvatar ? (
            <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#282a36] font-mono font-bold text-sm">You</span>
          )
        ) : (
          aiAvatar
        )}
      </div>
      <div className={`flex-1 bg-[#6272a4] rounded-xl p-4 ${role === 'user' ? 'text-right' : 'text-left'}`}>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </div>
  );
};

export default ChatMessage;
