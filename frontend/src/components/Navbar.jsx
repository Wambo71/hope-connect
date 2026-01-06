import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-600">
              HopeConnect
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-red-600">Home</Link>
            <Link to="/stories" className="text-gray-700 hover:text-red-600">Stories</Link>
            <Link to="/reviews" className="text-gray-700 hover:text-red-600">Reviews</Link>
            <Link to="/donate" className="text-gray-700 hover:text-red-600">Donate</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-red-600">Admin</Link>
                )}
                <button onClick={logout} className="text-gray-700 hover:text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-red-600">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}