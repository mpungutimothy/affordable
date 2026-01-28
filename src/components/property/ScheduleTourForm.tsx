import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ScheduleTourForm = ({ propertyId }: { propertyId: string }) => {
  const [formData, setFormData] = useState({
    tour_type: 'In Person',
    tour_date: '',
    tour_time: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('tour_bookings').insert([
      {
        property_id: propertyId,
        ...formData,
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setFormData({
        tour_type: 'In Person',
        tour_date: '',
        tour_time: '',
        name: '',
        phone: '',
        email: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-6 h-6 text-[#FFD700]" />
        <h3 className="text-xl font-semibold text-white">Schedule a Tour</h3>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">
            Tour Scheduled!
          </h4>
          <p className="text-sm text-gray-400">
            We'll contact you shortly to confirm.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Tour Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['In Person', 'Video Chat'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, tour_type: type as any })}
                  className={`py-2 px-4 rounded-lg border transition-colors ${
                    formData.tour_type === type
                      ? 'bg-[#FFD700] text-[#0a0a0a] border-[#FFD700]'
                      : 'bg-[#0a0a0a] text-gray-300 border-[#FFD700]/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.tour_date}
                onChange={(e) =>
                  setFormData({ ...formData, tour_date: e.target.value })
                }
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={formData.tour_time}
                onChange={(e) =>
                  setFormData({ ...formData, tour_time: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Scheduling...' : 'Schedule Tour'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ScheduleTourForm;
