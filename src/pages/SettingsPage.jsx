import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockupImages = [
  'https://picsum.photos/seed/avatar1/256',
  'https://picsum.photos/seed/avatar2/256',
  'https://picsum.photos/seed/avatar3/256',
  'https://picsum.photos/seed/avatar4/256',
  'https://picsum.photos/seed/avatar5/256',
  'https://picsum.photos/seed/avatar6/256',
  'https://picsum.photos/seed/avatar7/256',
  'https://picsum.photos/seed/avatar8/256',
  'https://picsum.photos/seed/avatar9/256',
  'https://picsum.photos/seed/avatar10/256',
];

const SettingsPage = ({ setAvatar }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedAvatar, setGeneratedAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerateAvatar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedAvatar('');

    const startTime = Date.now();

    try {
      const response = await Promise.race([
        fetch('http://localhost:5050/api/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'mode': 'production',
            'provider': 'open-ai'
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: '256x256',
            response_format: 'url'
          })
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 4000))
      ]);

      if (!response.ok) {
        throw new Error('Failed to generate avatar');
      }

      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].url) {
        setGeneratedAvatar(data.data[0].url);
      } else {
        throw new Error('No image URL received');
      }
    } catch (error) {
      console.error('Error generating avatar:', error);
      setError('Failed to generate avatar. Using a mock-up image instead.');
      // Fallback to random mock-up image
      const randomIndex = Math.floor(Math.random() * mockupImages.length);
      setGeneratedAvatar(mockupImages[randomIndex]);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }
  };

  const handleSaveAvatar = () => {
    if (generatedAvatar) {
      localStorage.setItem('userAvatar', generatedAvatar);
      setAvatar(generatedAvatar);
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-[#2c2e3e] rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#50fa7b] mb-8">Generate Avatar</h1>
        <form onSubmit={handleGenerateAvatar} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-[#f8f8f2] mb-2">Enter image prompt</label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-[#44475a] text-[#f8f8f2] border border-[#6272a4] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ff79c6] transition-all duration-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff79c6] text-[#282a36] py-2 rounded-full font-semibold hover:bg-[#ff92d0] transition-colors duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Generate Avatar'}
          </button>
        </form>
        {error && <p className="text-yellow-500 mt-4 text-center">{error}</p>}
        {generatedAvatar && !isLoading && (
          <div className="mt-8 text-center">
            <img src={generatedAvatar} alt="Generated Avatar" className="mx-auto mb-4 rounded-full w-32 h-32 object-cover" />
            <button
              onClick={handleSaveAvatar}
              className="bg-[#50fa7b] text-[#282a36] px-6 py-2 rounded-full font-semibold hover:bg-[#69ff9f] transition-colors duration-300"
            >
              Save Avatar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
