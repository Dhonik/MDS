import React, { useState } from 'react';
import { STORES_DATA, Store } from '../../data/stores';
import { Icons } from '../common/Icons';

interface StoreLocatorProps {
  onViewStore: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({ onViewStore, onShowToast }) => {
  const [activeStoreId, setActiveStoreId] = useState<string>(STORES_DATA[0].id);

  const selectedStore = STORES_DATA.find((s) => s.id === activeStoreId) || STORES_DATA[0];

  const handleDirections = (store: Store) => {
    onShowToast(`Opening map directions for ${store.name} (${store.subLocation}) -> Placeholder: ${store.mapUrl}`);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.MapPin className="w-3.5 h-3.5 text-mds-accent" />
            <span>Local Market Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Visit MDS
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Conveniently located in prime commercial market centers in Thuckalay and Nagercoil.
          </p>
        </div>

        {/* Interactive Store Selector & Map Display */}
        <div className="bg-mds-cream rounded-3xl p-6 sm:p-10 border border-mds-border/80 shadow-soft">
          
          {/* Store Switcher Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {STORES_DATA.map((store) => {
              const isSelected = store.id === selectedStore.id;
              return (
                <button
                  key={store.id}
                  onClick={() => setActiveStoreId(store.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-mds-primary text-white border-mds-primary shadow-md scale-[1.02]'
                      : 'bg-white text-mds-charcoal border-mds-border hover:border-mds-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-mds-sand text-mds-muted'
                    }`}>
                      {store.number}
                    </span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-mds-accent'}`}>
                      {store.category}
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-heading mt-2 ${isSelected ? 'text-white' : 'text-mds-charcoal'}`}>
                    {store.name}
                  </div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-mds-muted'}`}>
                    {store.subLocation}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Store Details & Map Placeholder Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Store Information Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-mds-border/70 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-mds-accent">
                    {selectedStore.number} • {selectedStore.category}
                  </span>
                  <h3 className="text-2xl font-bold text-mds-charcoal font-heading mt-1">
                    {selectedStore.name}
                  </h3>
                  <div className="text-sm font-semibold text-mds-primary">
                    {selectedStore.subLocation}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mds-muted leading-relaxed">
                  {selectedStore.fullStory}
                </p>

                {/* Info List */}
                <div className="space-y-3 pt-2 text-xs border-t border-gray-100 font-mono">
                  <div className="flex items-start space-x-2.5">
                    <Icons.MapPin className="w-4 h-4 text-mds-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Address: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Icons.Clock className="w-4 h-4 text-mds-accent shrink-0" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Business Hours: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Icons.Phone className="w-4 h-4 text-mds-accent shrink-0" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Store Phone: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => onViewStore(selectedStore.slug)}
                  className="w-full py-3 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <span>Open Full Store Page</span>
                  <Icons.ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDirections(selectedStore)}
                    className="py-2.5 px-3 rounded-xl bg-mds-sand text-mds-charcoal text-xs font-bold hover:bg-mds-border/60 transition-colors flex items-center justify-center space-x-1.5 border border-mds-border cursor-pointer"
                  >
                    <Icons.Navigation className="w-3.5 h-3.5 text-mds-accent" />
                    <span>Directions</span>
                  </button>

                  <a
                    href={`https://wa.me/${selectedStore.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 text-mds-primary text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200 text-center"
                  >
                    <Icons.WhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Map Placeholder Container */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-mds-border/70 shadow-sm flex flex-col justify-between min-h-[320px]">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Icons.MapPin className="w-5 h-5 text-mds-primary" />
                  <span className="text-sm font-bold text-mds-charcoal font-heading">
                    Map Preview ({selectedStore.subLocation})
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-emerald-50 text-mds-primary px-2.5 py-1 rounded-md border border-emerald-200">
                  Ready for Google Maps Link
                </span>
              </div>

              {/* Map Canvas Placeholder */}
              <div className="my-4 rounded-xl bg-gradient-to-br from-emerald-900/10 via-mds-sand to-gray-100 p-8 border border-dashed border-mds-border/90 flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-mds-primary animate-pulse">
                  <Icons.MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-mds-charcoal font-heading">
                    {selectedStore.name} — {selectedStore.subLocation}
                  </div>
                  <div className="text-xs font-mono text-gray-500">
                    // Map URL Placeholder: {selectedStore.mapUrl}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => handleDirections(selectedStore)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-mds-primary hover:text-mds-accent transition-colors"
                >
                  <span>Launch Google Maps with {selectedStore.mapUrl}</span>
                  <Icons.ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
