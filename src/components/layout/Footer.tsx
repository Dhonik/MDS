import React from 'react';
import { BUSINESS_INFO } from '../../data/business';
import { STORES_DATA } from '../../data/stores';
import { Icons } from '../common/Icons';

interface FooterProps {
  onNavigate: (view: string, storeSlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (hash: string) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleStoreClick = (slug: string) => {
    onNavigate('store', slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-mds-dark text-white pt-16 pb-24 md:pb-16 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-extrabold tracking-tight font-heading text-white">
                {BUSINESS_INFO.name}
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-900 text-emerald-300 border border-emerald-700">
                Nearly 50 Yrs
              </span>
            </div>
            <p className="text-xs tracking-wider uppercase font-semibold text-emerald-400">
              Freshness You Can Trust.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Fresh vegetables and quality fruits with nearly 50 years of trusted market experience, operating three physical stores serving retail families and wholesale businesses.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-300">
              <Icons.ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentic Local Family Business</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-heading">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('#home')} className="text-gray-300 hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#stores')} className="text-gray-300 hover:text-white transition-colors">
                  Our Three Stores
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#vegetables')} className="text-gray-300 hover:text-white transition-colors">
                  Fresh Vegetables
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#fruits')} className="text-gray-300 hover:text-white transition-colors">
                  Fresh Fruits
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#wholesale')} className="text-gray-300 hover:text-white transition-colors">
                  Wholesale & Bulk Supply
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#story')} className="text-gray-300 hover:text-white transition-colors">
                  50-Year Heritage Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('#gallery')} className="text-gray-300 hover:text-white transition-colors">
                  Inside MDS Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Three Locations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-heading">
              Our Physical Stores
            </h3>
            <div className="space-y-3">
              {STORES_DATA.map((store) => (
                <div 
                  key={store.id} 
                  className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/40 hover:border-emerald-700 transition-colors"
                >
                  <button 
                    onClick={() => handleStoreClick(store.slug)}
                    className="text-left w-full group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>{store.name}</span>
                      <span className="text-[10px] bg-emerald-900/90 text-emerald-300 px-2 py-0.5 rounded">
                        {store.category}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">
                      {store.subLocation}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">
                      {store.tagline}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Business Enquiry */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-heading">
              Contact & Enquiries
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Connect directly with any of our three outlets for everyday retail purchases or bulk business supply.
            </p>
            
            <div className="space-y-2.5 pt-2 text-xs text-gray-300">
              <div className="flex items-start space-x-2">
                <Icons.Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <a href="tel:+919488937666" className="text-emerald-300 hover:text-white font-mono font-semibold transition-colors">
                      +91 94889 37666 <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded uppercase">Primary</span>
                    </a>
                  </div>
                  <div>
                    <a href="tel:+919443391966" className="text-gray-300 hover:text-white font-mono transition-colors text-[11px]">
                      +91 94433 91966 <span className="text-[10px] text-gray-400">(Optional)</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.WhatsApp className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919488937666" target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white font-mono transition-colors">
                  +91 94889 37666 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Locations: Thuckalay & Nagercoil Markets</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNav('#wholesale')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Make a Bulk Wholesale Enquiry</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-3 md:space-y-0">
          <div>
            &copy; 2026 {BUSINESS_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-emerald-400 font-medium">
            <Icons.Leaf className="w-4 h-4" />
            <span>Nearly 50 Years of Trust</span>
          </div>
          <div className="text-gray-400">
            Fresh Vegetables • Fresh Fruits • Retail • Wholesale
          </div>
        </div>
      </div>
    </footer>
  );
};
