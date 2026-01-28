import { DollarSign, MapPin, Calendar } from 'lucide-react';

const WhyAffordable = () => {
  const reasons = [
    {
      number: '01',
      icon: DollarSign,
      title: 'Affordable Prices',
      description:
        'Properties starting from as low as 88M UGX, with flexible payment plans that fit your budget. We believe everyone deserves a quality home.',
    },
    {
      number: '02',
      icon: MapPin,
      title: 'Prime Locations',
      description:
        'All our estates are strategically located in well-developed areas with excellent infrastructure, schools, hospitals, and shopping centers nearby.',
    },
    {
      number: '03',
      icon: Calendar,
      title: 'Favorable Payment Plan',
      description:
        'Choose from various payment options including rent-to-own with 50% deposit, or spread payments over agreed periods with zero hidden charges.',
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-4">
            Why Affordable Housing?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are committed to making homeownership a reality for every Ugandan
            family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.number}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl p-8 hover:border-[#FFD700]/50 transition-all hover:shadow-xl hover:shadow-[#FFD700]/10 group"
              >
                <div className="absolute top-0 right-0 text-8xl font-bold text-[#FFD700]/5 group-hover:text-[#FFD700]/10 transition-colors">
                  {reason.number}
                </div>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#50C878] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-[#0a0a0a]" />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {reason.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAffordable;
