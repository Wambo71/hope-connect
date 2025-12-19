import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-red-600" fill="currentColor" size={24} />
              <span className="text-white">HopeConnect</span>
            </div>
            <p className="text-sm">
              Empowering communities in crisis through sustainable humanitarian aid and long-term development solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-white transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-white transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/transparency" className="hover:text-white transition-colors">
                  Transparency
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@hopeconnect.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Global Headquarters</span>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-white mb-4">Our Partners</h3>
            <p className="text-sm">
              Working alongside UNHCR, IRC, Save the Children, Norwegian Refugee Council, and World Food Programme.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Donor Rights
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} HopeConnect. All rights reserved.</p>
          <p className="mt-2 text-xs">
            A registered humanitarian organization committed to transparency and accountability.
          </p>
        </div>
      </div>
    </footer>
  );
}