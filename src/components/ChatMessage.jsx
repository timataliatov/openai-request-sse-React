import React from 'react';
import { marked } from 'marked';

const ChatMessage = ({ role, content }) => {
  return (
    <div className="flex items-start gap-4 h-auto">
      <div className={`rounded-xl w-10 h-10 mt-2 flex items-center justify-center text-[#282a36] font-mono font-bold text-sm underline underline-offset-2 ${role === 'user' ? 'bg-[#bd93f9]' : 'bg-[#50fa7b]'}`}>
        {role === 'user' ? 'You' : 'AI'}
      </div>
      <div className="flex-1 bg-[#6272a4] rounded-xl p-4" dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
};

export default ChatMessage;
