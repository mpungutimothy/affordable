import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LoginModal from './LoginModal';
import { supabase, Property } from '../lib/supabase';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesMenuOpen, setPropertiesMenuOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const { isAdmin, logout } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const { data } = await supabase
      .from('properties')
      .select('id, slug, name, location')
      .order('sort_order', { ascending: true });
    if (data) setProperties(data);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Properties', path: '/properties', hasDropdown: true },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a1a1a] shadow-lg border-b border-[#FFD700]/20'
            : 'bg-[#1a1a1a]/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/Uni-logo2.png"
                alt="Universal Affordable Housing"
                className="h-12 w-auto drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown && setPropertiesMenuOpen(true)
                  }
                  onMouseLeave={() =>
                    link.hasDropdown && setPropertiesMenuOpen(false)
                  }
                >
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-[#FFD700]'
                        : 'text-gray-200 hover:text-[#FFD700]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${propertiesMenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {link.hasDropdown && propertiesMenuOpen && (
                    <div
                      className="absolute top-full left-0 mt-0 w-72 bg-[#1a1a1a] border border-[#FFD700]/40 rounded-lg shadow-2xl py-2 animate-fadeIn z-[100] max-h-96 overflow-y-auto scrollbar-hide"
                      onMouseEnter={() => setPropertiesMenuOpen(true)}
                      onMouseLeave={() => setPropertiesMenuOpen(false)}
                    >
                      {properties.length > 0 ? (
                        properties.map((property) => (
                          <Link
                            key={property.id}
                            to={`/property/${property.slug}`}
                            onClick={() => setPropertiesMenuOpen(false)}
                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-[#FFD700]/20 hover:text-white transition-all border-b border-[#FFD700]/10 last:border-b-0"
                          >
                            <div className="font-semibold">{property.name}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {property.location}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                          Loading properties...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => (isAdmin ? logout() : setLoginModalOpen(true))}
                className="flex items-center space-x-2 text-gray-300 hover:text-[#FFD700] transition-colors"
                title={isAdmin ? 'Logout' : 'Admin Login'}
              >
                {isAdmin ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-[#FFD700]/20">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                        className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-300"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobilePropertiesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {mobilePropertiesOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {properties.length > 0 ? (
                            properties.map((property) => (
                              <Link
                                key={property.id}
                                to={`/property/${property.slug}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobilePropertiesOpen(false);
                                }}
                                className="block py-2 text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
                              >
                                <div className="font-medium">{property.name}</div>
                                <div className="text-xs text-gray-600">{property.location}</div>
                              </Link>
                            ))
                          ) : (
                            <div className="py-2 text-sm text-gray-600">
                              Loading properties...
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-[#FFD700]'
                          : 'text-gray-300'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  isAdmin ? logout() : setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-300"
              >
                {isAdmin ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>Admin Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
