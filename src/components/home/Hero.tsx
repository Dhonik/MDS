import React from 'react';
import { Icons } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/business';

interface HeroProps {
  onExploreStores: () => void;
  onWholesaleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreStores, onWholesaleClick }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-mds-sand/60 via-mds-cream to-white pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-mds-border/40">
      {/* Decorative background natural accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-mds-primary text-white shadow-sm">
                <Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{BUSINESS_INFO.badgeText}</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-mds-primary border border-emerald-200/80">
                <Icons.Store className="w-3.5 h-3.5 text-mds-accent" />
                <span>3 Local Outlets</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80">
                <Icons.Scale className="w-3.5 h-3.5 text-amber-700" />
                <span>Retail + Wholesale</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-mds-charcoal tracking-tight font-heading leading-[1.15]">
              Freshness You Can Trust.{' '}
              <span className="text-mds-primary block mt-1">
                Nearly 50 Years of Experience.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-mds-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              MDS brings fresh vegetables and fruits to customers and businesses through three trusted local stores in Thuckalay and Nagercoil, serving both everyday household retail and commercial wholesale requirements.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onExploreStores}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-mds-primary text-white text-base font-bold hover:bg-mds-accent active:scale-[0.98] transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-3 group cursor-pointer"
              >
                <span>Explore Our 3 Stores</span>
                <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onWholesaleClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-mds-primary border-2 border-mds-primary/20 text-base font-bold hover:bg-mds-sand/80 hover:border-mds-primary/40 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <Icons.Scale className="w-4 h-4 text-mds-accent" />
                <span>Wholesale & Bulk Supply</span>
              </button>
            </div>

            {/* Bottom Key Feature Line */}
            <div className="pt-4 border-t border-mds-border/70 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm font-semibold text-mds-charcoal">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>3 Physical Outlets</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Retail + Wholesale</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>Fresh Vegetables & Fruits</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 to-mds-dark text-white p-7 sm:p-9 shadow-card border border-emerald-800/60">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-6 border-b border-emerald-800/60">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      MDS Established Network
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-white mt-0.5">
                      Three Local Outlets
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-800/70 border border-emerald-600/50 flex items-center justify-center text-emerald-200">
                    <Icons.Store className="w-6 h-6" />
                  </div>
                </div>

                {/* 3 Physical Store Quick List */}
                <div className="py-6 space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-emerald-800 text-emerald-200">
                        <Icons.Leaf className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">STORE 01: Thuckalay Market</div>
                        <div className="text-[11px] text-emerald-300">Vegetables • Retail & Wholesale</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-emerald-800 text-emerald-200">
                        <Icons.Store className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">STORE 02: Nagercoil Market</div>
                        <div className="text-[11px] text-emerald-300">Vegetables • Bulk & Family Supply</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-amber-900/60 text-amber-300">
                        <Icons.Apple className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">STORE 03: Near Bus Stand</div>
                        <div className="text-[11px] text-amber-300">Fresh Fruits • Thuckalay</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>
                </div>

                {/* Photo Placeholder Tag */}
                <div className="pt-4 border-t border-emerald-800/60 text-center">
                  <div className="py-3 px-4 rounded-xl bg-emerald-950/50 border border-dashed border-emerald-700/60 text-[11px] font-mono text-emerald-300">
                    // REPLACE_WITH_MDS_HERO_AUTHENTIC_PRODUCE_PHOTO
                  </div>
                </div>

              </div>

              {/* Decorative floating trust sticker */}
              <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl p-4 shadow-elevated border border-mds-border/80 flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-mds-primary">
                  <Icons.Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-mds-charcoal">Direct Farm & Market Ties</div>
                  <div className="text-[11px] text-mds-muted">Fresh morning produce daily</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
