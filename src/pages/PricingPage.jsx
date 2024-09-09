import React from 'react';

const PricingCard = ({ tier, price, features, recommended }) => (
  <div className={`bg-[#2c2e3e] rounded-lg shadow-lg overflow-hidden flex flex-col h-full ${recommended ? 'border-2 border-[#ff79c6]' : ''}`}>
    <div className="p-6 flex-grow">
      <h3 className={`text-2xl font-semibold mb-2 ${recommended ? 'text-[#ff79c6]' : 'text-[#50fa7b]'}`}>{tier}</h3>
      <div className="text-4xl font-bold text-[#f8f8f2] mb-4">${price}<span className="text-xl font-normal">/mo</span></div>
      <ul className="text-[#f8f8f2] mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-[#50fa7b] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6 bg-[#3c3f58] mt-auto">
      <button className={`w-full py-2 rounded-full font-semibold transition-colors duration-300 ${recommended ? 'bg-[#ff79c6] text-[#282a36] hover:bg-[#ff92d0]' : 'bg-[#bd93f9] text-[#282a36] hover:bg-[#caa9fa]'}`}>
        Choose Plan
      </button>
    </div>
  </div>
);

const PricingPage = () => {
  const plans = [
    { tier: "Basic", price: 9.99, features: ["1000 AI requests/month", "Standard response time", "Email support"] },
    { tier: "Pro", price: 29.99, features: ["Unlimited AI requests", "Priority response time", "24/7 support", "Advanced features"], recommended: true },
    { tier: "Enterprise", price: 99.99, features: ["Custom AI model", "Dedicated account manager", "API access", "Custom integrations"] },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#50fa7b] mb-12">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
