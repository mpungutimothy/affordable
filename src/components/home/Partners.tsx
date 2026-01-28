const Partners = () => {
  const partners = [
    'Partner 1',
    'Partner 2',
    'Partner 3',
    'Partner 4',
    'Partner 5',
    'Partner 6',
    'Partner 7',
    'Partner 8',
    'Partner 9',
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-xl text-gray-400">
            Working with leading organizations to deliver excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 flex items-center justify-center hover:border-[#FFD700]/50 transition-colors group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700]/20 to-[#50C878]/20 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-[#FFD700]">
                    {index + 1}
                  </span>
                </div>
                <div className="text-sm text-gray-400 group-hover:text-[#FFD700] transition-colors">
                  {partner}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
