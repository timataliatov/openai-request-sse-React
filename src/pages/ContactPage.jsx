import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to a server
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#50fa7b] mb-12">Get in Touch</h1>
      <div className="max-w-2xl mx-auto bg-[#44475a] rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[#f8f8f2] mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#282a36] text-[#f8f8f2] border border-[#6272a4] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ff79c6] transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#f8f8f2] mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#282a36] text-[#f8f8f2] border border-[#6272a4] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ff79c6] transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[#f8f8f2] mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-[#282a36] text-[#f8f8f2] border border-[#6272a4] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ff79c6] transition-all duration-300"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-[#ff79c6] text-[#282a36] py-2 rounded-full font-semibold hover:bg-[#bd93f9] transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
