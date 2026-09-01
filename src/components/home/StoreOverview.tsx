import React, { useState, useEffect } from 'react';
import { StoreModel, fetchStores } from '../../services/storeService';
import { Icons } from '../common/Icons';
import { CardSkeleton, EmptyState } from '../common/Skeletons';

interface StoreOverviewProps {
  onViewStore: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const StoreOverview: React.FC<StoreOverviewProps> = ({ onViewStore, onShowToast }) => {
  const [stores, setStores] = useState<StoreModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores()
      .then((data) => setStores(data))
      .catch((err) => console.error('Store fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDirections = (store: StoreModel) => {
    if (store.map_url) {
      window.open(store.map_url, '_blank');
    } else {
      onShowToast(`Location details coming soon for ${store.name} (${store.location})`);
    }
  };

  const handleCall = (store: StoreModel) => {
    if (!store.phone) {
      onShowToast(`Contact number coming soon for ${store.name}`);
    }
  };

  return (
    <section id="stores" className="py-20 md:py-28 bg-mds-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100/80 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.Store className="w-3.5 h-3.5" />
            <span>Three Physical Outlets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Find Your Nearest MDS
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Visit one of our three local stores for fresh vegetables and quality fruits across Thuckalay and Nagercoil.
          </p>
        </div>

        {/* 3 Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <CardSkeleton count={3} className="h-96" />
          ) : stores.length === 0 ? (
            <EmptyState message="Store information is being updated. Please contact MDS directly." />
          ) : (
            stores.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-3xl overflow-hidden border border-mds-border/70 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Card Top */}
                <div>
                  {/* Store Visual Placeholder Banner */}
                  <div className="relative h-48 bg-gradient-to-br from-mds-sand via-gray-100 to-mds-cream border-b border-mds-border/60 p-6 flex flex-col justify-between overflow-hidden">
                    
                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-mds-primary text-white tracking-wide">
                        {store.number || 'STORE'}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        store.type === 'Fruits' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {store.type}
                      </span>
                    </div>

                    {/* Placeholder or image label */}
                    <div className="z-10 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 border border-mds-border/80 text-center">
                      <span className="text-[11px] font-mono font-medium text-mds-muted block truncate">
                        {store.image_url ? (
                          <img src={store.image_url} alt={store.name} className="h-20 w-full object-cover rounded-lg" />
                        ) : (
                          `// REPLACE_WITH_MDS_${store.slug.toUpperCase().replace(/-/g, '_')}_PHOTO`
                        )}
                      </span>
                    </div>

                    {/* Decorative Icon Background */}
                    <div className="absolute -right-4 -bottom-6 text-mds-primary/5 group-hover:text-mds-primary/10 transition-colors pointer-events-none">
                      {store.type === 'Fruits' ? (
                        <Icons.Apple className="w-32 h-32" />
                      ) : (
                        <Icons.Leaf className="w-32 h-32" />
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-mds-charcoal font-heading group-hover:text-mds-primary transition-colors">
                        {store.name}
                      </h3>
                      <div className="text-sm font-semibold text-mds-accent mt-0.5 flex items-center space-x-1.5">
                        <Icons.MapPin className="w-4 h-4" />
                        <span>{store.location}</span>
                      </div>
                    </div>

                    {/* Category Pill Tag */}
                    <div className="py-1 px-2.5 rounded-lg bg-mds-sand/80 text-mds-charcoal text-xs font-bold inline-block border border-mds-border/60">
                      {store.tagline || `${store.type} • Retail • Wholesale`}
                    </div>

                    <p className="text-sm text-mds-muted leading-relaxed">
                      {store.description}
                    </p>

                    {/* Address, Hours & Phone */}
                    <div className="pt-2 border-t border-gray-100 space-y-1.5 text-xs text-gray-500 font-mono">
                      {store.opening_hours && (
                        <div className="flex items-center space-x-2">
                          <Icons.Clock className="w-3.5 h-3.5 text-mds-accent shrink-0" />
                          <span className="font-sans font-semibold text-gray-700">Hours:</span>
                          <span className="bg-emerald-50 text-mds-primary font-semibold px-2 py-0.5 rounded">{store.opening_hours}</span>
                        </div>
                      )}
                      {store.phone && (
                        <div className="flex items-center space-x-2">
                          <Icons.Phone className="w-3.5 h-3.5 text-mds-accent shrink-0" />
                          <span className="font-sans font-semibold text-gray-700">Phone:</span>
                          <a href={`tel:${store.phone}`} className="text-mds-primary hover:underline font-semibold">{store.phone}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    onClick={() => onViewStore(store.slug)}
                    className="w-full py-3 px-4 rounded-xl bg-mds-primary text-white text-sm font-bold hover:bg-mds-accent active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <span>View Store Details</span>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDirections(store)}
                      className="py-2.5 px-3 rounded-xl bg-mds-sand hover:bg-mds-border/50 text-mds-charcoal text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border border-mds-border/80 cursor-pointer"
                    >
                      <Icons.Navigation className="w-3.5 h-3.5 text-mds-accent" />
                      <span>{store.map_url ? 'Get Directions' : 'Location Info'}</span>
                    </button>

                    {store.phone ? (
                      <a
                        href={`tel:${store.phone}`}
                        onClick={() => handleCall(store)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-mds-primary text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200 cursor-pointer text-center"
                      >
                        <Icons.Phone className="w-3.5 h-3.5 text-mds-primary" />
                        <span>Call Store</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onShowToast(`Phone number coming soon for ${store.name}`)}
                        className="py-2.5 px-3 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-not-allowed"
                      >
                        <Icons.Phone className="w-3.5 h-3.5" />
                        <span>No Phone</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};
