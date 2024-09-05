import React from 'react';

const Header = () => {
  return (
    <header className="w-full max-w-3xl py-8 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 cursor-pointer hover:text-[#ff79c6] transition-colors hover:underline underline-offset-2">
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
      <nav className="flex gap-6">
        {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
          <a key={item} href="#" className="text-sm hover:text-[#ff79c6] transition-colors relative group">
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#ff79c6] transition-all group-hover:w-full"></span>
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
