import { useState } from 'react';
import { Target, Eye, Award } from 'lucide-react';

const VisionMission = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const tabs = [
    {
      id: 'vision',
      title: 'Our Vision',
      icon: Eye,
      content:
        'To be the leading provider of affordable, quality housing solutions in Uganda, transforming the real estate landscape by making homeownership accessible to every Ugandan family.',
    },
    {
      id: 'mission',
      title: 'Our Mission',
      icon: Target,
      content:
        'We are committed to developing sustainable, modern housing estates in prime locations across Uganda, offering flexible payment plans and exceptional customer service to ensure that every family can achieve their dream of owning a home.',
    },
    {
      id: 'values',
      title: 'Our Values',
      icon: Award,
      content: {
        items: [
          {
            title: 'Integrity',
            description:
              'We conduct our business with honesty, transparency, and accountability.',
          },
          {
            title: 'Customer Focus',
            description:
              'Your satisfaction and comfort are at the heart of everything we do.',
          },
          {
            title: 'Quality',
            description:
              'We never compromise on the quality of our construction and finishes.',
          },
          {
            title: 'Innovation',
            description:
              'We continuously seek new ways to make housing more accessible and affordable.',
          },
        ],
      },
    },
  ];

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-4">
            Who We Are
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Universal Affordable Housing Uganda is committed to transforming lives
            through accessible homeownership
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full border transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] border-transparent shadow-lg'
                    : 'bg-[#1a1a1a] text-gray-300 border-[#FFD700]/20 hover:border-[#FFD700]/40'
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold">{tab.title}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl p-8 md:p-12 min-h-[300px]">
          {activeContent && (
            <div className="animate-fadeIn">
              {typeof activeContent.content === 'string' ? (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {activeContent.content}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeContent.content.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#0a0a0a] border border-[#FFD700]/10 rounded-lg p-6 hover:border-[#FFD700]/30 transition-colors"
                    >
                      <h4 className="text-xl font-semibold text-[#FFD700] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
