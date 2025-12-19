import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Upload, Image, FileText, CheckCircle, X, Trash2, Star, Check } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';


export function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      id: posts.length + 1,
      title: formData.title,
      description: formData.description,
      image: formData.imageUrl,
      date: new Date().toISOString().split('T')[0],
      location: formData.location,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setFormData({ title: '', description: '', location: '', imageUrl: '' });
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(c => c.id !== commentId)
          };
        }
        return post;
      }));
    }
  };

  const handleDeleteReview = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const handleApprovePendingReview = (id) => {
    const reviewToApprove = pendingReviews.find(r => r.id === id);
    if (reviewToApprove) {
      setReviews([{ ...reviewToApprove, status: 'approved' }, ...reviews]);
      setPendingReviews(pendingReviews.filter(r => r.id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleDeletePendingReview = (id) => {
    if (window.confirm('Are you sure you want to reject this review?')) {
      setPendingReviews(pendingReviews.filter(review => review.id !== id));
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage donation posts, comments, and reviews</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="text-green-600" />
            <span className="text-green-900">Action completed successfully!</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Donation Posts
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            } relative`}
          >
            Pending Reviews
            {pendingReviews.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {pendingReviews.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Approved Reviews
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <>
            {/* Add New Post Button */}
            <div className="mb-8">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Upload size={20} />
                {showForm ? 'Cancel' : 'Post New Accomplishment'}
              </button>
            </div>

            {/* Post Form */}
            {showForm && (
              <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                <h2 className="text-gray-900 mb-6">Create New Post</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Food Distribution in Refugee Camp"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Jordan, Kenya, etc."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Describe the accomplishment, impact, and number of people helped..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      <button
                        type="button"
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Upload image"
                      >
                        <Image size={20} className="text-gray-600" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      Paste an image URL or upload from your device
                    </p>
                  </div>

                  {formData.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                      <ImageWithFallback
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <FileText size={20} />
                      Publish Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts Grid */}
            <div>
              <h2 className="text-gray-900 mb-6">Published Accomplishments</h2>
              <div className="space-y-6">
                {posts.map(post => (
                  <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="aspect-video md:aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-500 text-sm">{post.location}</span>
                          <span className="text-gray-500 text-sm">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                        
                        {/* Comments Section */}
                        <div className="border-t pt-4 mt-4">
                          <button
                            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                            className="text-gray-700 hover:text-red-600 text-sm mb-3"
                          >
                            {post.comments.length} Comments {expandedPost === post.id ? '▼' : '▶'}
                          </button>
                          
                          {expandedPost === post.id && (
                            <div className="space-y-3 mt-3">
                              {post.comments.length === 0 ? (
                                <p className="text-gray-500 text-sm">No comments yet</p>
                              ) : (
                                post.comments.map(comment => (
                                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3 flex items-start justify-between">
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-gray-900 text-sm">{comment.author}</span>
                                        <span className="text-gray-500 text-xs">
                                          {new Date(comment.date).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-gray-600 text-sm">{comment.content}</p>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteComment(post.id, comment.id)}
                                      className="text-red-600 hover:text-red-700 ml-3"
                                      title="Delete comment"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm"
                          >
                            <X size={16} />
                            Delete Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">No posts yet. Create your first accomplishment post!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Pending Reviews Tab */}
        {activeTab === 'pending' && (
          <div>
            <h2 className="text-gray-900 mb-6">Manage Pending Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pendingReviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleDeletePendingReview(review.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  
                  <div className="border-t pt-4">
                    <div className="text-gray-900">{review.name}</div>
                    <div className="text-gray-500 text-sm">{review.role}</div>
                    <div className="text-gray-400 text-xs">
                      {review.location} • {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleApprovePendingReview(review.id)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Check size={20} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeletePendingReview(review.id)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pendingReviews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Star className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No pending reviews.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-gray-900 mb-6">Manage Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{review.comment}</p>
                  
                  <div className="border-t pt-4">
                    <div className="text-gray-900">{review.name}</div>
                    <div className="text-gray-500 text-sm">{review.role}</div>
                    <div className="text-gray-400 text-xs">
                      {review.location} • {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Star className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No reviews yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}