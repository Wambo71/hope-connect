import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">HopeConnect</h3>
            <p className="text-gray-300">
              Empowering communities in crisis, building hope for tomorrow.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/stories" className="text-gray-300 hover:text-white">Stories</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-white">Reviews</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-white">Donate</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">Email: info@hopeconnect.org</p>
            <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 HopeConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}