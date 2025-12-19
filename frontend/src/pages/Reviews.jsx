
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


export function ReviewsPage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: '',
    location: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const totalReviews = reviews.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would submit to the backend
    setSubmitSuccess(true);
    setFormData({ name: '', role: '', rating: 5, comment: '', location: '' });
    setShowForm(false);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">Donor & Community Reviews</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Read what donors and beneficiaries say about their experience with HopeConnect
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <div className="text-gray-600 text-sm">Based on {totalReviews} reviews</div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-900">
              Thank you for your review! It has been submitted for approval and will be published shortly.
            </p>
          </div>
        )}

        {/* Submit Review Button/Form */}
        {user ? (
          <div className="mb-12">
            {!showForm ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <h2 className="text-gray-900 mb-4">Share Your Experience</h2>
                <p className="text-gray-600 mb-6">
                  Have you donated or benefited from our programs? We&apos;d love to hear your story.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Submit Your Review
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h2 className="text-gray-900 mb-6">Submit Your Review</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Role *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="Monthly Donor">Monthly Donor</option>
                        <option value="One-time Donor">One-time Donor</option>
                        <option value="Beneficiary">Beneficiary</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Corporate Partner">Corporate Partner</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="City, Country"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            size={32}
                            className={
                              rating <= formData.rating
                                ? 'text-yellow-400 fill-yellow-400 hover:scale-110 transition-transform'
                                : 'text-gray-300 hover:text-yellow-200 hover:scale-110 transition-transform'
                            }
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-gray-600 self-center">
                        {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Your Review *</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                      rows={5}
                      placeholder="Share your experience with HopeConnect. How has your donation or the support you received impacted you or the community?"
                      required
                      minLength={50}
                    />
                    <p className="text-gray-500 text-sm mt-2">
                      Minimum 50 characters ({formData.comment.length}/50)
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                    <p className="text-blue-900">
                      Your review will be reviewed by our team before being published. We typically approve reviews within 24-48 hours.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-12 bg-white rounded-lg p-8 text-center shadow-sm">
            <h2 className="text-gray-900 mb-4">Share Your Experience</h2>
            <p className="text-gray-600 mb-6">
              Please log in to submit your review
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Log In to Submit Review
            </Link>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm relative">
              <Quote className="absolute top-4 right-4 text-gray-200" size={32} />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 mb-6 relative z-10">{review.comment}</p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t pt-4">
                <ImageWithFallback
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-gray-900">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.role}</div>
                  <div className="text-gray-400 text-xs">{review.location} • {new Date(review.date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}