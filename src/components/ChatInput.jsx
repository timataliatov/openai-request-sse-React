import React from 'react';

const ChatInput = ({ input, setInput, isStreaming, setIsStreaming, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 w-[30rem] h-auto bg-[#282a36] text-[#f8f8f2] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#bd93f9]"
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isStreaming}
            onChange={() => setIsStreaming(!isStreaming)}
            className="checkbox checkbox-primary"
          />
          <span>Stream?</span>
        </label>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
