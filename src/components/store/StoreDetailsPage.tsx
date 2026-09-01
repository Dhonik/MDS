import React, { useState } from 'react';
import { Store, STORES_DATA } from '../../data/stores';
import { VEGETABLE_CATEGORIES, FRUIT_CATEGORIES } from '../../data/products';
import { Icons } from '../common/Icons';

interface StoreDetailsPageProps {
  store: Store;
  onBackToHome: () => void;
  onSelectStore: (slug: string) => void;
  onShowToast: (msg: string) => void;
}

export const StoreDetailsPage: React.FC<StoreDetailsPageProps> = ({
  store,
  onBackToHome,
  onSelectStore,
  onShowToast,
}) => {
  const [inquiryMsg, setInquiryMsg] = useState({ name: '', phone: '', quantity: '', note: '' });
  const [submitted, setSubmitted] = useState(false);

  const isFruitStore = store.category === 'Fruits';
  const relevantProduce = isFruitStore ? FRUIT_CATEGORIES : VEGETABLE_CATEGORIES;
  const otherStores = STORES_DATA.filter((s) => s.id !== store.id);

  const handleDirections = () => {
    onShowToast(`Opening Google Maps for ${store.name} -> Placeholder: ${store.mapUrl}`);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMsg.name || !inquiryMsg.phone) {
      onShowToast('Please provide your name and contact phone.');
      return;
    }

    const waText = encodeURIComponent(
      `Hello ${store.name} (${store.subLocation}), enquiry from website:\n` +
      `Name: ${inquiryMsg.name}\n` +
      `Phone: ${inquiryMsg.phone}\n` +
      `Estimated Quantity: ${inquiryMsg.quantity || 'General household/business'}\n` +
      `Message: ${inquiryMsg.note || 'Inquiring about produce availability and rates.'}`
    );

    setSubmitted(true);
    onShowToast(`Sending enquiry directly to ${store.name} WhatsApp desk...`);
    window.open(`https://wa.me/${store.whatsapp}?text=${waText}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-mds-cream pt-6 pb-24 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between py-4 border-b border-mds-border/70 mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-mds-primary hover:text-mds-accent transition-colors bg-white px-4 py-2 rounded-xl border border-mds-border/80 shadow-xs cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All 3 Stores</span>
          </button>

          <div className="text-xs font-semibold text-mds-muted hidden sm:block">
            MDS Portal &gt; Stores &gt; <span className="text-mds-charcoal font-bold">{store.subLocation}</span>
          </div>
        </div>

        {/* Store Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-mds-border/80 shadow-card mb-12 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-mds-primary text-white">
                  {store.number}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isFruitStore 
                    ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  {store.tagline}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-mds-sand text-mds-charcoal border border-mds-border">
                  {store.badge}
                </span>
              </div>

              {/* Title & SubLocation */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal font-heading tracking-tight">
                  {store.name}
                </h1>
                <div className="text-lg sm:text-xl font-bold text-mds-primary mt-1 flex items-center space-x-2">
                  <Icons.MapPin className="w-5 h-5 text-mds-accent" />
                  <span>{store.subLocation}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-mds-muted leading-relaxed max-w-3xl">
                {store.fullStory}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${store.phone}`}
                  className="px-6 py-3.5 rounded-xl bg-mds-primary text-white text-xs sm:text-sm font-bold hover:bg-mds-accent transition-all flex items-center space-x-2 shadow-sm"
                >
                  <Icons.Phone className="w-4 h-4" />
                  <span>Call {store.name}</span>
                </a>

                <a
                  href={`https://wa.me/${store.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-50 text-mds-primary text-xs sm:text-sm font-bold hover:bg-emerald-100 transition-all flex items-center space-x-2 border border-emerald-200"
                >
                  <Icons.WhatsApp className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Store Desk</span>
                </a>

                <button
                  onClick={handleDirections}
                  className="px-6 py-3.5 rounded-xl bg-mds-sand text-mds-charcoal text-xs sm:text-sm font-bold hover:bg-mds-border/60 transition-all flex items-center space-x-2 border border-mds-border cursor-pointer"
                >
                  <Icons.Navigation className="w-4 h-4 text-mds-accent" />
                  <span>Get Directions</span>
                </button>
              </div>

            </div>

            {/* Right Photo Placeholder */}
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-mds-sand via-gray-100 to-mds-cream border border-mds-border p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-mds-primary">Physical Outlet</span>
                  <span className="p-2 rounded-lg bg-white shadow-xs text-mds-accent">
                    {isFruitStore ? <Icons.Apple className="w-5 h-5" /> : <Icons.Leaf className="w-5 h-5" />}
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3 text-center border border-gray-200">
                  <span className="text-xs font-mono text-gray-500 block">
                    // {store.imagePlaceholder}
                  </span>
                </div>

                <div className="text-center text-[11px] text-mds-muted font-medium">
                  {store.subLocation} Branch
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Store Specializations & Key Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Specialization & Produce Offered */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Specialization List */}
            <div className="bg-white rounded-3xl p-8 border border-mds-border/80 shadow-soft space-y-4">
              <h3 className="text-xl font-bold text-mds-charcoal font-heading flex items-center space-x-2">
                <Icons.Check className="w-5 h-5 text-mds-accent" />
                <span>Store Capabilities & Highlights</span>
              </h3>
              <p className="text-xs text-mds-muted">
                What sets this specific MDS branch apart:
              </p>

              <div className="space-y-3 pt-2">
                {store.specialization.map((spec, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-mds-cream/80 border border-mds-border/60">
                    <div className="p-1.5 rounded-md bg-emerald-100 text-mds-primary shrink-0 mt-0.5">
                      <Icons.Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-mds-charcoal">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Produce Categories available here */}
            <div className="bg-white rounded-3xl p-8 border border-mds-border/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-mds-charcoal font-heading">
                  Produce Sourced at this Store
                </h3>
                <span className="text-xs font-semibold text-mds-accent bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {isFruitStore ? 'Fresh Fruits Selection' : 'Vegetables Sourcing'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {relevantProduce.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-mds-sand/60 border border-mds-border/60 flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-white shadow-xs text-mds-primary shrink-0 mt-0.5">
                      {isFruitStore ? <Icons.Apple className="w-4 h-4" /> : <Icons.Leaf className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-mds-charcoal">{p.name}</div>
                      <div className="text-[11px] text-mds-muted line-clamp-1 mt-0.5">{p.examples}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200">
                Notice: Specific varieties may fluctuate according to daily morning market arrivals.
              </div>
            </div>

          </div>

          {/* Right Column: Timings, Address, Direct Enquiry */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Store Operational Info Box */}
            <div className="bg-white rounded-3xl p-8 border border-mds-border/80 shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-mds-charcoal font-heading">
                Store Information
              </h3>

              <div className="space-y-4 text-xs font-mono text-gray-700">
                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/70">
                  <span className="font-sans font-bold text-mds-charcoal block mb-1">Physical Address:</span>
                  <div className="text-gray-800">{store.address}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/70">
                  <span className="font-sans font-bold text-mds-charcoal block mb-1">Business Hours:</span>
                  <div className="text-gray-800">{store.openingHours}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/70 space-y-1">
                  <span className="font-sans font-bold text-mds-charcoal block">Store Phone Contact:</span>
                  <div className="flex items-center justify-between text-gray-800">
                    <a href={`tel:${store.phone}`} className="text-mds-primary hover:underline font-semibold">
                      {store.phone}
                    </a>
                    <span className="text-[10px] bg-emerald-100 text-mds-primary px-1.5 py-0.5 rounded font-sans font-bold uppercase">Primary</span>
                  </div>
                  {store.altPhone && (
                    <div className="flex items-center justify-between text-gray-600 pt-0.5">
                      <a href={`tel:${store.altPhone}`} className="hover:text-mds-charcoal">
                        {store.altPhone}
                      </a>
                      <span className="text-[10px] text-gray-500 font-sans">(Optional)</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl bg-mds-cream border border-mds-border/70">
                  <span className="font-sans font-bold text-mds-charcoal block mb-1">Store WhatsApp Desk:</span>
                  <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-800 hover:underline font-semibold">
                    {store.phone} (WhatsApp)
                  </a>
                </div>
              </div>

              {/* Map launch button */}
              <button
                onClick={handleDirections}
                className="w-full py-3 rounded-xl bg-mds-sand hover:bg-mds-border/60 text-mds-charcoal text-xs font-bold transition-colors flex items-center justify-center space-x-2 border border-mds-border cursor-pointer"
              >
                <Icons.Navigation className="w-4 h-4 text-mds-accent" />
                <span>Open in Google Maps ({store.mapUrl})</span>
              </button>
            </div>

            {/* Quick Inquiry Form for this store */}
            <div className="bg-white rounded-3xl p-8 border border-mds-border/80 shadow-soft">
              <h4 className="text-lg font-bold text-mds-charcoal font-heading mb-2">
                Message {store.name}
              </h4>
              <p className="text-xs text-mds-muted mb-4">
                Send an instant stock or pricing query to this branch desk.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 text-center space-y-2 border border-emerald-200">
                  <Icons.Check className="w-5 h-5 text-mds-primary mx-auto" />
                  <div className="text-xs font-bold text-mds-charcoal">Enquiry Prepared</div>
                  <button onClick={() => setSubmitted(false)} className="text-[11px] text-mds-primary font-bold underline">
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-mds-charcoal mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryMsg.name}
                      onChange={(e) => setInquiryMsg({ ...inquiryMsg, name: e.target.value })}
                      placeholder="Name"
                      className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border focus:outline-none focus:border-mds-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={inquiryMsg.phone}
                      onChange={(e) => setInquiryMsg({ ...inquiryMsg, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border focus:outline-none focus:border-mds-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal mb-1">Approx. Quantity / Query</label>
                    <input
                      type="text"
                      value={inquiryMsg.quantity}
                      onChange={(e) => setInquiryMsg({ ...inquiryMsg, quantity: e.target.value })}
                      placeholder="e.g. Daily 25kg / Weekend fruit basket"
                      className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border focus:outline-none focus:border-mds-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal mb-1">Specific Items Needed</label>
                    <textarea
                      rows={2}
                      value={inquiryMsg.note}
                      onChange={(e) => setInquiryMsg({ ...inquiryMsg, note: e.target.value })}
                      placeholder="e.g. Inquiring about shallots / apples in bulk..."
                      className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border focus:outline-none focus:border-mds-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                  >
                    <Icons.WhatsApp className="w-4 h-4" />
                    <span>Send Query to Store WhatsApp</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>

        {/* Other Stores Quick Switcher */}
        <div className="pt-10 border-t border-mds-border/70">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-mds-charcoal font-heading">
                Explore Other MDS Locations
              </h3>
              <p className="text-xs text-mds-muted mt-0.5">
                Check our other vegetable and fruit shops in the region.
              </p>
            </div>
            <button
              onClick={onBackToHome}
              className="text-xs font-bold text-mds-primary hover:underline"
            >
              View Main Portal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherStores.map((other) => (
              <div
                key={other.id}
                className="bg-white rounded-2xl p-6 border border-mds-border/80 shadow-soft hover:shadow-card transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-mds-primary text-white rounded">
                      {other.number}
                    </span>
                    <span className="text-xs font-bold text-mds-accent">
                      {other.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-mds-charcoal font-heading mt-1">
                    {other.name}
                  </h4>
                  <div className="text-xs text-mds-primary font-medium">
                    {other.subLocation}
                  </div>
                  <div className="text-xs text-mds-muted mt-1">
                    {other.description}
                  </div>
                </div>

                <button
                  onClick={() => onSelectStore(other.slug)}
                  className="px-4 py-2.5 rounded-xl bg-mds-sand hover:bg-mds-primary hover:text-white text-mds-charcoal text-xs font-bold transition-colors shrink-0 ml-4 cursor-pointer"
                >
                  View Store
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};
