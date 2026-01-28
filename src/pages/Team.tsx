import { Users } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Mukasa',
      title: 'Chief Executive Officer',
      bio: 'With over 15 years in real estate development, John leads our vision of making affordable housing accessible to all Ugandans.',
    },
    {
      name: 'Sarah Nambi',
      title: 'Head of Sales',
      bio: 'Sarah brings exceptional client service and deep market knowledge to help families find their perfect homes.',
    },
    {
      name: 'David Okello',
      title: 'Project Manager',
      bio: 'David ensures every property meets our high quality standards and is delivered on time and within budget.',
    },
    {
      name: 'Grace Atim',
      title: 'Finance Director',
      bio: 'Grace manages our innovative payment plans and ensures financial accessibility for all our clients.',
    },
    {
      name: 'Patrick Kato',
      title: 'Marketing Director',
      bio: 'Patrick connects our properties with the right buyers through strategic marketing and community engagement.',
    },
    {
      name: 'Mary Nassuna',
      title: 'Customer Relations Manager',
      bio: 'Mary ensures every client receives exceptional support throughout their homeownership journey.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-10 h-10 text-[#FFD700]" />
            <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700]">
              Our Team
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated professionals committed to making your dream of
            homeownership a reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl p-8 hover:border-[#FFD700]/50 transition-all hover:shadow-xl hover:shadow-[#FFD700]/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl group-hover:bg-[#FFD700]/10 transition-colors" />

              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#50C878] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <span className="text-4xl font-bold text-[#0a0a0a]">
                    {member.name.charAt(0)}
                  </span>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-serif text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-[#FFD700] text-sm font-semibold mb-4">
                    {member.title}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
