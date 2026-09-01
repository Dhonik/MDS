import React from 'react';
import { Icons } from '../common/Icons';

export const AboutMDS: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Icons.ShieldCheck className="w-3.5 h-3.5 text-mds-accent" />
              <span>Generational Tradition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
              The MDS Story
            </h2>

            <div className="space-y-4 text-base text-mds-muted leading-relaxed">
              <p>
                <strong>MDS</strong> is an established fresh-produce business with <strong>nearly 50 years of experience</strong> serving retail customers and commercial buyers across the region.
              </p>
              <p>
                Over the decades, the business has grown not through hype, but through genuine customer relationships, practical market experience, and an everyday commitment to supplying fresh, dependable vegetables and fruits.
              </p>
              <p>
                Today, MDS operates two dedicated vegetable stores in Thuckalay Market and Nagercoil Market, along with a specialized fruit store near Thuckalay Bus Stand. We continue to serve household families and commercial businesses including hotels, restaurants, shops, and catering services.
              </p>
            </div>

            {/* Core Brand Progression Visual */}
            <div className="pt-6 border-t border-mds-border/70">
              <div className="text-xs font-bold uppercase tracking-wider text-mds-charcoal mb-3">
                Core MDS Foundation
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/80 text-center">
                  <div className="text-xs font-extrabold text-mds-primary">Experience</div>
                  <div className="text-[10px] text-mds-muted mt-0.5">50 Years</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/80 text-center">
                  <div className="text-xs font-extrabold text-mds-primary">Trust</div>
                  <div className="text-[10px] text-mds-muted mt-0.5">Fair Trade</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/80 text-center">
                  <div className="text-xs font-extrabold text-mds-primary">Fresh Produce</div>
                  <div className="text-[10px] text-mds-muted mt-0.5">Daily Harvest</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/80 text-center">
                  <div className="text-xs font-extrabold text-mds-primary">Service</div>
                  <div className="text-[10px] text-mds-muted mt-0.5">Retail & Bulk</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Experience Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-mds-primary to-mds-dark rounded-3xl p-8 sm:p-10 text-white shadow-card border border-emerald-800 space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Business Presence
                </span>
                <span className="text-xs font-extrabold bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full">
                  Established
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-heading text-white">
                  Three Physical Outlets Under One Trusted Brand
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  Every MDS branch shares the same foundational values: strict inspection of daily produce, fair weighing, and personalized customer care.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs text-emerald-100">
                  <Icons.Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Two Vegetable Market hubs (Thuckalay & Nagercoil)</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-emerald-100">
                  <Icons.Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Fruit specialist near Thuckalay Bus Stand</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-emerald-100">
                  <Icons.Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Wholesale daily procurement for regional businesses</span>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 text-center">
                <div className="text-[11px] font-mono text-emerald-300">
                  // REPLACE_WITH_MDS_OWNER_OR_SHOP_PHOTO
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
