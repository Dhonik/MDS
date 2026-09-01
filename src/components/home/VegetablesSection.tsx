import React, { useState, useEffect } from 'react';
import { ProductModel, fetchProducts } from '../../services/productService';
import { Icons } from '../common/Icons';
import { CardSkeleton, EmptyState } from '../common/Skeletons';
import { formatPrice } from '../../lib/utils';

export const VegetablesSection: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts('vegetable')
      .then((data) => setProducts(data))
      .catch((err) => console.error('Vegetable fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="vegetables" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.Leaf className="w-3.5 h-3.5 text-mds-accent" />
            <span>Farm & Market Fresh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Fresh Vegetables
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            A wide selection of vegetables for everyday cooking, retail purchases and wholesale requirements.
          </p>

          {/* Important Availability Disclaimer */}
          <div className="inline-block mt-2 px-4 py-2 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium">
            ⚠️ <strong>Notice:</strong> Available varieties may vary depending on season and daily supply.
          </div>
        </div>

        {/* Product / Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <CardSkeleton count={4} className="h-64" />
          ) : products.length === 0 ? (
            <EmptyState message="Product availability is updated regularly. Please contact MDS for today's selection." />
          ) : (
            products.map((item) => {
              const formattedPrice = formatPrice(item.price, item.unit);
              return (
                <div
                  key={item.id}
                  className="bg-mds-cream/70 rounded-2xl overflow-hidden border border-mds-border/70 shadow-sm hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Area */}
                    <div className="relative h-44 bg-gradient-to-br from-emerald-900/10 via-emerald-800/5 to-transparent border-b border-mds-border/60 p-4 flex flex-col justify-between overflow-hidden">
                      {item.image_url && (
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      )}
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center text-mds-primary">
                          <Icons.Leaf className="w-4 h-4" />
                        </span>
                        {item.highlight && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs">
                            {item.highlight}
                          </span>
                        )}
                        {formattedPrice && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-mds-primary text-white shadow-sm">
                            {formattedPrice}
                          </span>
                        )}
                      </div>
                      
                      {/* Placeholder Tag if no image */}
                      {!item.image_url && (
                        <div className="relative z-10 bg-white/80 backdrop-blur-xs rounded-lg p-2 text-center border border-gray-200/80">
                          <span className="text-[10px] font-mono text-gray-500 block truncate">
                            // REPLACE_WITH_MDS_VEGETABLE_{item.name.toUpperCase().replace(/\s+/g, '_')}_PHOTO
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5 space-y-2.5">
                      <h3 className="text-lg font-bold text-mds-charcoal font-heading group-hover:text-mds-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-mds-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Examples Footer if available */}
                  {item.examples && (
                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-mds-border/50 text-[11px] text-gray-500">
                        <span className="font-semibold text-mds-charcoal">Examples:</span> {item.examples}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Store Reference Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-mds-primary text-white">
              <Icons.Store className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-mds-charcoal">Available at Store 01 & Store 02</div>
              <div className="text-xs text-mds-muted">Thuckalay Market & Nagercoil Market Vegetable Hubs</div>
            </div>
          </div>
          <a
            href="#stores"
            className="px-5 py-2.5 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors shrink-0"
          >
            Locate Vegetable Stores
          </a>
        </div>

      </div>
    </section>
  );
};
