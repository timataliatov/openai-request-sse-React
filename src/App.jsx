import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || '');

  useEffect(() => {
    localStorage.setItem('userAvatar', avatar);
  }, [avatar]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout avatar={avatar} setAvatar={setAvatar} />}>
          <Route index element={<ChatPage userAvatar={avatar} />} />
          <Route path="settings" element={<SettingsPage setAvatar={setAvatar} />} />
          <Route path="home" element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
