import React, { useState, useEffect } from 'react';
import { StoreModel, fetchStores } from '../../services/storeService';
import { Icons } from '../common/Icons';

interface StoreLocatorProps {
  onViewStore: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const StoreLocator: React.FC<StoreLocatorProps> = ({ onViewStore, onShowToast }) => {
  const [stores, setStores] = useState<StoreModel[]>([]);
  const [activeStoreId, setActiveStoreId] = useState<string>('');

  useEffect(() => {
    fetchStores().then((data) => {
      setStores(data);
      if (data.length > 0) {
        setActiveStoreId(data[0].id);
      }
    });
  }, []);

  const selectedStore = stores.find((s) => s.id === activeStoreId) || stores[0];

  const handleDirections = (store: StoreModel) => {
    if (store.map_url) {
      window.open(store.map_url, '_blank');
    } else {
      onShowToast(`Location details coming soon for ${store.name} (${store.location})`);
    }
  };

  if (!selectedStore) return null;

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
            {stores.map((store) => {
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
                      {store.number || 'STORE'}
                    </span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-mds-accent'}`}>
                      {store.type}
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-heading mt-2 ${isSelected ? 'text-white' : 'text-mds-charcoal'}`}>
                    {store.name}
                  </div>
                  <div className={`text-xs mt-0.5 ${isSelected ? 'text-emerald-200' : 'text-mds-muted'}`}>
                    {store.location}
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
                    {selectedStore.number || 'STORE'} • {selectedStore.type}
                  </span>
                  <h3 className="text-2xl font-bold text-mds-charcoal font-heading mt-1">
                    {selectedStore.name}
                  </h3>
                  <div className="text-sm font-semibold text-mds-primary">
                    {selectedStore.location}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mds-muted leading-relaxed">
                  {selectedStore.description}
                </p>

                {/* Info List */}
                <div className="space-y-3 pt-2 text-xs border-t border-gray-100 font-mono">
                  <div className="flex items-start space-x-2.5">
                    <Icons.MapPin className="w-4 h-4 text-mds-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Address: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.address || 'Address details on location'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Icons.Clock className="w-4 h-4 text-mds-accent shrink-0" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Business Hours: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.opening_hours || 'Daily morning to evening'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Icons.Phone className="w-4 h-4 text-mds-accent shrink-0" />
                    <div>
                      <span className="font-bold text-mds-charcoal font-sans">Store Phone: </span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{selectedStore.phone || 'Coming soon'}</span>
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
                    <span>{selectedStore.map_url ? 'Google Maps' : 'Location Info'}</span>
                  </button>

                  {selectedStore.phone ? (
                    <a
                      href={`tel:${selectedStore.phone}`}
                      className="py-2.5 px-3 rounded-xl bg-emerald-50 text-mds-primary text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200 text-center"
                    >
                      <Icons.Phone className="w-3.5 h-3.5 text-mds-primary" />
                      <span>Call Branch</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => onShowToast(`Phone number coming soon for ${selectedStore.name}`)}
                      className="py-2.5 px-3 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-not-allowed"
                    >
                      <Icons.Phone className="w-3.5 h-3.5" />
                      <span>No Phone</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Map Visual / Directions Area */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-mds-border/70 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icons.Navigation className="w-4 h-4 text-mds-primary" />
                    <h4 className="text-lg font-bold text-mds-charcoal font-heading">
                      Live Google Maps Navigation
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {selectedStore.location}
                  </span>
                </div>

                {/* Real Live Interactive Google Map Frame */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-mds-border/80 shadow-inner relative bg-gray-100">
                  <iframe
                    title={`${selectedStore.name} - ${selectedStore.location}`}
                    src={selectedStore.embed_map_url || (selectedStore.slug === 'nagercoil-market' 
                      ? 'https://maps.google.com/maps?q=8.1915307,77.4316496+(MDS+Vegetable+Shop+Nagercoil)&z=16&output=embed'
                      : selectedStore.slug === 'thuckalay-fruits'
                      ? 'https://maps.google.com/maps?q=8.2488,77.3620+(MDS+Fruit+Shop+Thuckalay)&z=16&output=embed'
                      : 'https://maps.google.com/maps?q=8.2494,77.3592+(MDS+Vegetable+Shop+Thuckalay+Market)&z=16&output=embed')}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-mds-muted pt-2 border-t border-gray-100">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Interactive Map & Live Navigation Active</span>
                </span>
                <button
                  onClick={() => handleDirections(selectedStore)}
                  className="font-bold text-mds-primary hover:text-mds-accent flex items-center space-x-1 hover:underline cursor-pointer"
                >
                  <span>Open Full Screen in Google Maps</span>
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
