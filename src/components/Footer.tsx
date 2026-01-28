import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Instagram, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#FFD700]/20 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/Uni-logo2.png"
                alt="Universal Affordable Housing"
                className="h-16 w-auto drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
              />
            </Link>
            <h3 className="text-[#FFD700] font-serif text-lg mb-2">
              Universal Affordable Housing
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Building Dreams, Defining Futures
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-[#FFD700] flex-shrink-0" />
                <span className="text-sm">
                  Plot 32B Katalima Crescent, Ntinda 2 Road, Naguru Kampala Uganda
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#50C878] flex-shrink-0" />
                <div className="text-sm">
                  <div>+256 757 878443</div>
                  <div>+256 787 178660</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#0F52BA] flex-shrink-0" />
                <a
                  href="mailto:universal.m.sales@gmail.com"
                  className="text-sm hover:text-[#FFD700] transition-colors"
                >
                  universal.m.sales@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                <div className="text-sm">
                  <div>Monday - Sunday</div>
                  <div>9:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center hover:bg-[#FFD700]/20 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#FFD700] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#50C878]/10 rounded-lg flex items-center justify-center hover:bg-[#50C878]/20 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-[#50C878] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0F52BA]/10 rounded-lg flex items-center justify-center hover:bg-[#0F52BA]/20 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#0F52BA] group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/256752225352"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors group"
              >
                <Phone className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center hover:bg-pink-500/20 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <div className="space-y-1">
                <Link
                  to="/"
                  className="block text-sm hover:text-[#FFD700] transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className="block text-sm hover:text-[#FFD700] transition-colors"
                >
                  Our Properties
                </Link>
                <Link
                  to="/team"
                  className="block text-sm hover:text-[#FFD700] transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm hover:text-[#FFD700] transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FFD700]/10 text-center text-sm text-gray-500">
          <p>
            © {currentYear} Universal Affordable Housing Uganda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
