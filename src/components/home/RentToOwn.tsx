import { MapPin } from 'lucide-react';

const RentToOwn = () => {
  const locations = [
    { name: 'Mbuya', lat: 0.32, lng: 32.63 },
    { name: 'Naalya', lat: 0.38, lng: 32.66 },
    { name: 'Nsasa', lat: 0.39, lng: 32.67 },
    { name: 'Nakwero', lat: 0.37, lng: 32.64 },
    { name: 'Kira', lat: 0.40, lng: 32.65 },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-6">
              You can now Rent to Own.
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              The long-awaited call has been answered today!
            </p>
            <div className="bg-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Deposit 50% and Move In
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Pay only 50% of the property price as a deposit and start living in
                your dream home immediately. The remaining balance can be spread over
                an agreed period, making homeownership accessible and stress-free.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#50C878] rounded-full" />
                  </div>
                  <span className="text-gray-300">
                    Flexible payment plans tailored to your needs
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#50C878] rounded-full" />
                  </div>
                  <span className="text-gray-300">
                    No lengthy bank approval processes
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#50C878]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[#50C878] rounded-full" />
                  </div>
                  <span className="text-gray-300">
                    Move in immediately after deposit
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-96 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl overflow-hidden p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Our Prime Locations
            </h3>
            <div className="relative w-full h-full">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.2))',
                }}
              >
                <rect width="400" height="300" fill="#1a1a1a" rx="10" />

                <path
                  d="M50,150 Q200,100 350,150"
                  stroke="#FFD700"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />

                {locations.map((location, index) => {
                  const x = 80 + index * 60;
                  const y = 150 + Math.sin(index) * 30;
                  return (
                    <g key={location.name} className="animate-pulse">
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="#FFD700"
                        opacity="0.2"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="#FFD700"
                        opacity="0.4"
                      />
                      <circle cx={x} cy={y} r="6" fill="#FFD700" />
                      <text
                        x={x}
                        y={y + 40}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="12"
                        fontWeight="500"
                      >
                        {location.name}
                      </text>
                    </g>
                  );
                })}

                <MapPin
                  x="175"
                  y="50"
                  className="text-[#50C878]"
                  size={24}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentToOwn;
