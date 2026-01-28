import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { supabase, Review } from '../../lib/supabase';
import { useApp } from '../../context/AppContext';

type SortBy = 'date-new' | 'date-old' | 'rating-high' | 'rating-low';

const ReviewSection = ({
  propertyId,
  propertyName,
}: {
  propertyId: string;
  propertyName: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    rating: 5,
    message: '',
  });
  const [sortBy, setSortBy] = useState<SortBy>('date-new');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAdmin } = useApp();

  useEffect(() => {
    loadReviews();
  }, [propertyId, sortBy]);

  const loadReviews = async () => {
    let query = supabase
      .from('reviews')
      .select('*')
      .eq('property_id', propertyId);

    switch (sortBy) {
      case 'date-old':
        query = query.order('created_at', { ascending: true });
        break;
      case 'rating-high':
        query = query.order('rating', { ascending: false });
        break;
      case 'rating-low':
        query = query.order('rating', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;
    if (data) setReviews(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('reviews').insert([
      {
        property_id: propertyId,
        ...formData,
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setFormData({ email: '', rating: 5, message: '' });
      loadReviews();
      setTimeout(() => setSubmitted(false), 3000);
    }
    setLoading(false);
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    await supabase.from('reviews').delete().eq('id', reviewId);
    loadReviews();
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onChange?.(star) : undefined}
            className={interactive ? 'hover:scale-110 transition-transform' : ''}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-[#FFD700] text-[#FFD700]'
                  : 'text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0';

  return (
    <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif text-[#FFD700] mb-2">Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(Math.round(Number(averageRating)))}
              </div>
              <span className="text-gray-400 text-sm">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>

        {reviews.length > 0 && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-1 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD700]"
          >
            <option value="date-new">Newest First</option>
            <option value="date-old">Oldest First</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
          </select>
        )}
      </div>

      <div className="space-y-4 mb-8 max-h-96 overflow-y-auto scrollbar-hide">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#0a0a0a] border border-[#FFD700]/10 rounded-lg p-4 relative"
          >
            {isAdmin && (
              <button
                onClick={() => handleDelete(review.id)}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}

            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-400 text-sm">{review.email}</div>
              <div className="flex">{renderStars(review.rating)}</div>
            </div>

            <p className="text-gray-300 text-sm mb-2">{review.message}</p>

            <div className="text-xs text-gray-500">
              {new Date(review.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>

      {submitted ? (
        <div className="text-center py-6 bg-[#0a0a0a] rounded-lg">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-500"
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
          <p className="text-white font-semibold">Review Submitted!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Write a Review</h3>

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
            <label className="block text-sm text-gray-300 mb-2">
              Property <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={propertyName}
              disabled
              className="w-full px-3 py-2 bg-[#0a0a0a]/50 border border-[#FFD700]/10 rounded-lg text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            {renderStars(formData.rating, true, (rating) =>
              setFormData({ ...formData, rating })
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;
