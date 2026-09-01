import React from 'react';
import { WHY_CHOOSE_POINTS } from '../../data/business';
import { Icons } from '../common/Icons';

export const WhyChooseMDS: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'history':
        return <Icons.History className="w-6 h-6 text-mds-primary" />;
      case 'sparkles':
        return <Icons.Sparkles className="w-6 h-6 text-mds-primary" />;
      case 'scale':
        return <Icons.Scale className="w-6 h-6 text-mds-primary" />;
      case 'mapPin':
        return <Icons.MapPin className="w-6 h-6 text-mds-primary" />;
      case 'users':
        return <Icons.Users className="w-6 h-6 text-mds-primary" />;
      case 'shieldCheck':
      default:
        return <Icons.ShieldCheck className="w-6 h-6 text-mds-primary" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-mds-cream relative border-t border-mds-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.ShieldCheck className="w-3.5 h-3.5 text-mds-accent" />
            <span>Trusted Choice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Why Choose MDS?
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Practical reasons families, shops, and food businesses have relied on MDS across Thuckalay and Nagercoil for decades.
          </p>
        </div>

        {/* 6 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_POINTS.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-mds-border/70 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-mds-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(point.icon)}
                </div>

                <h3 className="text-xl font-bold text-mds-charcoal font-heading group-hover:text-mds-primary transition-colors">
                  {point.title}
                </h3>

                <p className="text-sm text-mds-muted mt-2 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center space-x-2 text-xs font-bold text-mds-accent">
                <span>MDS Standard</span>
                <Icons.Check className="w-3.5 h-3.5" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
