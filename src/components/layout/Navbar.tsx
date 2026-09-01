import React, { useState, useEffect } from 'react';
import { Icons } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/business';
import { STORES_DATA } from '../../data/stores';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, storeSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'home', hash: '#home' },
    { label: 'Our Stores', target: 'stores', hash: '#stores', isDropdown: true },
    { label: 'Vegetables', target: 'vegetables', hash: '#vegetables' },
    { label: 'Fruits', target: 'fruits', hash: '#fruits' },
    { label: 'Wholesale', target: 'wholesale', hash: '#wholesale' },
    { label: 'Our Story', target: 'story', hash: '#story' },
    { label: 'Gallery', target: 'gallery', hash: '#gallery' },
    { label: 'Contact', target: 'contact', hash: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, target: string, hash: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setStoresDropdownOpen(false);

    if (currentView !== 'home' || target === 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStoreClick = (slug: string) => {
    setMobileMenuOpen(false);
    setStoresDropdownOpen(false);
    onNavigate('store', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-mds-cream/95 backdrop-blur-md shadow-soft border-b border-mds-border/60 py-3' 
        : 'bg-mds-cream border-b border-mds-border/40 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={(e) => handleNavClick(e, 'home', '#home')}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold tracking-tight text-mds-primary font-heading group-hover:text-mds-accent transition-colors">
                {BUSINESS_INFO.name}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100/80 text-mds-primary border border-emerald-200">
                50 Yrs Experience
              </span>
            </div>
            <span className="text-xs tracking-wider uppercase font-medium text-mds-muted">
              {BUSINESS_INFO.tagline}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.isDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setStoresDropdownOpen(true)}
                    onMouseLeave={() => setStoresDropdownOpen(false)}
                  >
                    <button
                      onClick={(e) => handleNavClick(e, link.target, link.hash)}
                      className="px-3 py-2 text-sm font-medium text-mds-charcoal hover:text-mds-primary transition-colors rounded-lg flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <svg className="w-4 h-4 text-mds-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Stores Dropdown */}
                    {storesDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-card border border-mds-border/70 p-2 z-50 animate-fadeIn">
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-mds-muted px-3 py-1.5 border-b border-gray-100">
                          Three Physical Outlets
                        </div>
                        {STORES_DATA.map((store) => (
                          <button
                            key={store.id}
                            onClick={() => handleStoreClick(store.slug)}
                            className="w-full text-left p-2.5 rounded-lg hover:bg-mds-sand/80 transition-colors flex items-start space-x-3 group cursor-pointer"
                          >
                            <div className="mt-0.5 p-1.5 rounded-md bg-mds-light text-mds-primary">
                              <Icons.Store className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-mds-charcoal group-hover:text-mds-primary">
                                {store.name}
                              </div>
                              <div className="text-xs text-mds-accent font-medium">
                                {store.subLocation}
                              </div>
                              <div className="text-[11px] text-mds-muted mt-0.5">
                                {store.tagline}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={(e) => handleNavClick(e, link.target, link.hash)}
                    className="px-3 py-2 text-sm font-medium text-mds-charcoal hover:text-mds-primary hover:bg-mds-sand/60 transition-colors rounded-lg cursor-pointer"
                  >
                    {link.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={(e) => handleNavClick(e, 'stores', '#stores')}
              className="px-5 py-2.5 rounded-xl bg-mds-primary text-white text-sm font-semibold hover:bg-mds-accent transition-all shadow-sm flex items-center space-x-2 group cursor-pointer"
            >
              <Icons.MapPin className="w-4 h-4 text-emerald-300 group-hover:animate-bounce" />
              <span>Find a Store</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-mds-charcoal hover:bg-mds-sand focus:outline-none cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-mds-border shadow-xl animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <div className="pb-3 mb-2 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-mds-muted uppercase tracking-wider">
                Browse MDS Portal
              </span>
              <span className="text-xs bg-emerald-50 text-mds-primary px-2 py-0.5 rounded-full font-medium">
                3 Physical Outlets
              </span>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={(e) => handleNavClick(e, link.target, link.hash)}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-mds-charcoal hover:bg-mds-sand/80 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <span>{link.label}</span>
                <Icons.ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}

            {/* Direct Store Links in Mobile Drawer */}
            <div className="pt-3 mt-3 border-t border-gray-100">
              <div className="text-xs font-semibold text-mds-muted uppercase tracking-wider px-3 mb-2">
                Visit Specific Store
              </div>
              <div className="space-y-1.5">
                {STORES_DATA.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => handleStoreClick(store.slug)}
                    className="w-full text-left p-3 rounded-xl bg-mds-sand/50 hover:bg-mds-sand border border-mds-border/60 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-mds-charcoal">{store.name}</div>
                      <div className="text-xs text-mds-primary font-medium">{store.subLocation}</div>
                    </div>
                    <span className="text-xs font-semibold text-mds-accent bg-white px-2 py-1 rounded-md border border-gray-200">
                      View
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={(e) => handleNavClick(e, 'stores', '#stores')}
                className="w-full py-3 rounded-xl bg-mds-primary text-white text-center font-semibold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Icons.MapPin className="w-4 h-4" />
                <span>Locate Nearest MDS Outlet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
