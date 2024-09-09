import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-5xl font-bold text-[#50fa7b] mb-6 animate-pulse">
        Welcome to TIMA's[AI]
      </h1>
      <p className="text-xl text-[#bd93f9] mb-8 max-w-2xl">
        Unlock the power of AI with our intelligent assistant. Get personalized recommendations, automate tasks, and boost your productivity.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {['Chat', 'Learn', 'Create'].map((feature, index) => (
          <div key={index} className="bg-[#44475a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-[#ff79c6] mb-4">{feature}</h3>
            <p className="text-[#f8f8f2]">Experience the future of AI interaction with our advanced {feature.toLowerCase()} capabilities.</p>
          </div>
        ))}
      </div>
      <Link to="/chat" className="bg-[#ff79c6] text-[#282a36] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#ff92d0] transition-colors duration-300">
        Start Chatting Now
      </Link>
    </div>
  );
};

export default HomePage;
