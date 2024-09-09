import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ avatar, setAvatar }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#282a36] to-[#44475a] text-[#f8f8f2] flex flex-col">
      <Header userAvatar={avatar} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet context={{ avatar, setAvatar }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
