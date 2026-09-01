import React from 'react';
import { TIMELINE_STEPS } from '../../data/business';
import { Icons } from '../common/Icons';

export const ExperienceStory: React.FC = () => {
  return (
    <section id="story" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.History className="w-3.5 h-3.5 text-mds-accent" />
            <span>Generational Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Nearly 50 Years of Trust
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            For nearly five decades, MDS has grown through hard work, customer relationships and a commitment to fresh produce.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            From serving local customers to supporting business requirements, MDS continues to build on the experience and trust developed over generations.
          </p>
        </div>

        {/* 5-Step Timeline Grid */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-emerald-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {TIMELINE_STEPS.map((step, index) => (
              <div
                key={index}
                className="bg-mds-cream/70 rounded-2xl p-6 border border-mds-border/80 shadow-sm hover:shadow-soft hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Marker Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-mds-primary text-white text-xs font-extrabold flex items-center justify-center shadow-sm group-hover:bg-mds-accent group-hover:scale-110 transition-all">
                      0{index + 1}
                    </span>
                    <span className="text-[11px] font-bold text-mds-accent uppercase tracking-wider">
                      {step.timeframe}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-mds-charcoal font-heading group-hover:text-mds-primary transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-mds-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-mds-border/50 text-[11px] font-semibold text-emerald-800 flex items-center space-x-1">
                  <Icons.Check className="w-3 h-3 text-mds-accent" />
                  <span>Verified Experience</span>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Brand Promise Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-mds-dark via-emerald-900 to-mds-primary text-white max-w-4xl mx-auto shadow-card border border-emerald-800 text-center space-y-3">
          <div className="inline-block p-2 rounded-full bg-emerald-800/60 border border-emerald-600 text-emerald-300">
            <Icons.ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Authentic Regional Trade, Built on Honesty
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
            No exaggerated marketing claims — just five decades of standing behind the freshness and fair weighing of every kilogram of vegetables and fruits we sell.
          </p>
        </div>

      </div>
    </section>
  );
};
