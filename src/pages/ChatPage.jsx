import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import Prism from 'prismjs';

const ChatPage = ({ userAvatar }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState('gpt-3.5-turbo');

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5050/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'development',
          'provider': 'open-ai'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages,
            { role: 'user', content: input }
          ],
          stream: isStreaming
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      if (isStreaming) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            const jsonData = JSON.parse(line.replace(/^data: /, ''));
            const content = jsonData.choices[0]?.delta?.content || '';
            if (content) {
              accumulatedContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages[newMessages.length - 1]?.role === 'assistant') {
                  newMessages[newMessages.length - 1].content = accumulatedContent;
                } else {
                  newMessages.push({ role: 'assistant', content: accumulatedContent });
                }
                return newMessages;
              });
            }
          }
        }
      } else {
        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';
        if (content) {
          setMessages(prev => [...prev, { role: 'assistant', content }]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ChatWindow messages={messages} userAvatar={userAvatar} />
      <ChatInput
        input={input}
        setInput={setInput}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        model={model}
        setModel={setModel}
      />
    </>
  );
};

export default ChatPage;
