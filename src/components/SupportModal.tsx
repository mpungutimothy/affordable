import { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SupportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    question: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is the Rent-to-Own scheme?',
      answer:
        'Our Rent-to-Own scheme allows you to pay a 50% deposit and spread the remaining balance over time while enjoying your new home immediately.',
    },
    {
      question: 'What is the booking fee?',
      answer:
        'The booking fee varies by property. Contact us for specific details on your chosen property.',
    },
    {
      question: 'What locations do you offer properties in?',
      answer:
        'We have properties in Mbuya, Naalya, Nsasa, Nakwero, and Kira, all in prime locations around Kampala.',
    },
    {
      question: 'Do you offer mortgage options?',
      answer:
        'Yes, selected properties are eligible for mortgage financing. Check individual property details or contact us for more information.',
    },
    {
      question: 'Can I schedule a property tour?',
      answer:
        'Absolutely! You can schedule both in-person and virtual tours through the Schedule a Tour form on any property page.',
    },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('support_tickets').insert([formData]);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', question: '' });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-[#FFD700]/30 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-serif text-[#FFD700] mb-2">
          How can we help you?
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          For immediate answers, check our FAQ section below. For specific queries,
          send us a message, and our team will get back to you within 24 hours.
        </p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-[#FFD700]/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full px-4 py-3 flex items-center justify-between bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 transition-colors"
                >
                  <span className="text-left text-sm font-medium text-gray-300">
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#FFD700]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#FFD700]" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 py-3 bg-[#0a0a0a] text-sm text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
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
            <h3 className="text-xl font-semibold text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-400">
              We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
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
                  className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                  required
                />
              </div>
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
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Question <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SupportModal;
