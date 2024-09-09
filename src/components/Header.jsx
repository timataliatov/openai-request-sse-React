import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userAvatar }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#282a36] py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#ff79c6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <span className="text-2xl font-semibold text-[#f8f8f2] tracking-wide">TIMA's[AI]</span>
        </div>
        <nav className="flex items-center space-x-6">
          {['Home', 'Features', 'Pricing', 'Contact', 'Chat', 'Settings'].map((item) => (
            <Link
              key={item}
              to={item === 'Chat' ? '/' : `/${item.toLowerCase()}`}
              className="text-sm text-[#f8f8f2] hover:text-[#ff79c6] transition-colors relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ff79c6] transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <div className="flex items-center gap-2">
            {!userAvatar && (
              <div className="w-10 h-10 rounded-full bg-[#50fa7b] flex items-center justify-center overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#282a36]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="m20 20-2-2"></path>
                  <path d="m4 4 2 2"></path>
                  <path d="m20 4-2 2"></path>
                  <path d="m4 20 2-2"></path>
                </svg>
              </div>
            )}
            {userAvatar && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
