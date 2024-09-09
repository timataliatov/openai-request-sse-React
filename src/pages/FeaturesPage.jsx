import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-[#44475a] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="text-4xl mb-4 text-[#50fa7b]">{icon}</div>
    <h3 className="text-2xl font-semibold text-[#ff79c6] mb-2">{title}</h3>
    <p className="text-[#f8f8f2]">{description}</p>
  </div>
);

const FeaturesPage = () => {
  const features = [
    { title: "Natural Conversations", description: "Engage in human-like dialogues with our advanced language model.", icon: "💬" },
    { title: "Knowledge Base", description: "Access a vast repository of information on various topics.", icon: "🧠" },
    { title: "Task Automation", description: "Automate repetitive tasks and boost your productivity.", icon: "⚡" },
    { title: "Personalized Learning", description: "Get tailored educational content and explanations.", icon: "📚" },
    { title: "Creative Writing", description: "Generate ideas and content for your creative projects.", icon: "✍️" },
    { title: "Code Generation", description: "Get help with coding tasks and debugging.", icon: "💻" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#50fa7b] mb-12">Discover Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
