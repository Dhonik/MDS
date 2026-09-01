import React, { useState, useEffect } from 'react';
import { GalleryModel, fetchGalleryItems } from '../../services/galleryService';
import { Icons } from '../common/Icons';
import { EmptyState } from '../common/Skeletons';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [items, setItems] = useState<GalleryModel[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Vegetables', 'Fruits', 'Stores', 'Wholesale', 'Daily Operations'];

  useEffect(() => {
    setLoading(true);
    fetchGalleryItems(activeFilter)
      .then((data) => setItems(data))
      .catch((err) => console.error('Gallery fetch error:', err))
      .finally(() => setLoading(false));
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-mds-cream relative border-t border-mds-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.Sparkles className="w-3.5 h-3.5 text-mds-accent" />
            <span>Visual Glimpse</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Inside MDS
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            A look into our daily produce arrivals, store counters in Thuckalay & Nagercoil, wholesale sorting, and authentic market activity.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-mds-primary text-white shadow-sm scale-105'
                  : 'bg-white text-mds-charcoal border border-mds-border hover:bg-mds-sand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-mds-border/70 animate-pulse space-y-3">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="Photos Updating" message="Photos will be updated soon." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-mds-border/70 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Display */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-mds-sand via-gray-100 to-mds-cream p-4 flex flex-col justify-between border-b border-mds-border/50 overflow-hidden">
                  <div className="flex justify-between items-start z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-mds-primary shadow-xs border border-gray-200">
                      {item.category}
                    </span>
                  </div>

                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title || 'MDS Photo'} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="z-10 bg-white/90 backdrop-blur-xs rounded-lg p-2 text-center border border-gray-200">
                      <span className="text-[10px] font-mono text-gray-500 block truncate">
                        // {item.placeholder || `REPLACE_WITH_MDS_GALLERY_${item.id}_PHOTO`}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-mds-primary/5 group-hover:bg-mds-primary/10 transition-colors pointer-events-none"></div>
                </div>

                {/* Title & Tag */}
                <div className="p-4">
                  <h4 className="text-sm font-bold text-mds-charcoal font-heading group-hover:text-mds-primary transition-colors">
                    {item.title || 'MDS Gallery View'}
                  </h4>
                  <div className="text-[11px] text-mds-muted mt-0.5">
                    Category: {item.category}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Easy photo replacement note */}
        <div className="mt-10 text-center">
          <span className="text-xs font-mono text-gray-500 bg-white px-4 py-2 rounded-xl border border-mds-border">
            📸 Dynamic Supabase Gallery — uploaded images update here in real-time.
          </span>
        </div>

      </div>
    </section>
  );
};
