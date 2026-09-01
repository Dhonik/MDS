import React from 'react';
import { Icons } from '../common/Icons';

interface RetailWholesaleProps {
  onFindStore: () => void;
  onWholesaleClick: () => void;
}

export const RetailWholesale: React.FC<RetailWholesaleProps> = ({ onFindStore, onWholesaleClick }) => {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-mds-sand text-mds-primary text-xs font-bold uppercase tracking-wider border border-mds-border">
            <Icons.Scale className="w-3.5 h-3.5 text-mds-accent" />
            <span>Dual Service Capability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Retail for Families. Wholesale for Businesses.
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Whether you are buying daily produce for your home or sourcing high-volume vegetables and fruits for commercial kitchens, MDS provides dependable service.
          </p>
        </div>

        {/* 2 Split Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* RETAIL CARD */}
          <div className="bg-mds-cream rounded-3xl p-8 sm:p-10 border border-mds-border shadow-soft flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-mds-primary tracking-wider uppercase border border-emerald-200">
                  Retail Service
                </span>
                <span className="p-2.5 rounded-xl bg-white text-mds-primary shadow-sm">
                  <Icons.Users className="w-5 h-5" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-mds-charcoal font-heading">
                  Fresh Produce for Everyday Needs
                </h3>
                <p className="text-sm sm:text-base text-mds-muted mt-2 leading-relaxed">
                  Shop for your everyday vegetable and fruit requirements across our three neighborhood stores.
                </p>
              </div>

              {/* Retail Feature List */}
              <ul className="space-y-3 pt-2">
                <li className="flex items-center space-x-3 text-sm text-mds-charcoal font-medium">
                  <div className="p-1 rounded-full bg-emerald-100 text-mds-primary">
                    <Icons.Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Farm-fresh daily vegetable and fruit selection</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-mds-charcoal font-medium">
                  <div className="p-1 rounded-full bg-emerald-100 text-mds-primary">
                    <Icons.Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Flexible quantities tailored for home kitchens</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-mds-charcoal font-medium">
                  <div className="p-1 rounded-full bg-emerald-100 text-mds-primary">
                    <Icons.Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Three convenient local stores in Thuckalay and Nagercoil</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-mds-charcoal font-medium">
                  <div className="p-1 rounded-full bg-emerald-100 text-mds-primary">
                    <Icons.Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Honest weighing and courteous, personal counter service</span>
                </li>
              </ul>

            </div>

            <div className="pt-4">
              <button
                onClick={onFindStore}
                className="w-full py-3.5 px-6 rounded-xl bg-mds-primary text-white font-bold text-sm hover:bg-mds-accent transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <span>Find Your Nearest Store</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* WHOLESALE CARD */}
          <div className="bg-gradient-to-br from-emerald-950 via-mds-dark to-emerald-900 rounded-3xl p-8 sm:p-10 text-white shadow-card border border-emerald-800 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-800 text-emerald-200 tracking-wider uppercase border border-emerald-600">
                  Wholesale & Commercial
                </span>
                <span className="p-2.5 rounded-xl bg-emerald-800/80 text-emerald-300 border border-emerald-600/60 shadow-sm">
                  <Icons.Scale className="w-5 h-5" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  Reliable Supply for Businesses
                </h3>
                <p className="text-sm sm:text-base text-emerald-200/90 mt-2 leading-relaxed">
                  MDS also serves larger requirements for commercial buyers who depend on regular, dependable fresh produce supply.
                </p>
              </div>

              {/* Wholesale Business Clients List */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Hotel className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hotels & Lodges</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Utensils className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Restaurants & Cafes</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Store className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Grocery Shops</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Catering & Events</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Cup className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Food Service Outlets</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center space-x-2 text-xs font-semibold text-emerald-100">
                  <Icons.Building className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Commercial Buyers</span>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <button
                onClick={onWholesaleClick}
                className="w-full py-3.5 px-6 rounded-xl bg-white text-mds-primary font-bold text-sm hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Make a Wholesale Enquiry</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
