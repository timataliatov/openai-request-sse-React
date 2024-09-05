import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import Footer from './components/Footer';
import Prism from 'prismjs';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages(prevMessages => [...prevMessages, { role, content }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage('user', input);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5050/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'mode': 'production',
          'provider': 'open-ai'
        },
        body: JSON.stringify({
          stream: isStreaming,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant.'
            },
            {
              role: 'user',
              content: input
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      if (isStreaming) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.trim() !== '') {
              try {
                const jsonData = JSON.parse(line);
                let content = '';
                if (jsonData.choices && jsonData.choices[0]) {
                  content = jsonData.choices[0].delta?.content || jsonData.choices[0].message?.content || '';
                }
                if (content) {
                  accumulatedContent += content;
                  addMessage('AI', accumulatedContent);
                }
              } catch (parseError) {
                console.error('Error parsing JSON:', parseError, 'Line:', line);
              }
            }
          }
        }
      } else {
        const data = await response.json();
        let content = '';
        if (data.choices && data.choices[0]) {
          content = data.choices[0].message?.content || data.choices[0].text || '';
        }
        if (content) {
          addMessage('AI', content);
        } else {
          throw new Error('Unexpected response format');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('AI', `Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#282a36] to-[#44475a] text-[#f8f8f2] flex flex-col items-center">
      <Header />

      <main className="w-full max-w-3xl py-12 flex flex-col items-center justify-center gap-8 px-4 mb-24">
        <div className="text-center space-y-4 animate-fade-in-down">
          <h1 className="text-4xl font-bold text-[#50fa7b] font-mono underline underline-offset-8 tracking-tight leading-tight">Welcome to TIMA's[AI]</h1>
          <p className="text-[#bd93f9] font-mono text-sm font-bold pt-4">Unlock the power of AI with our intelligent assistant. Get personalized recommendations, automate tasks, and boost your productivity.</p>
        </div>

        <ChatWindow messages={messages} />
        <ChatInput
          input={input}
          setInput={setInput}
          isStreaming={isStreaming}
          setIsStreaming={setIsStreaming}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
