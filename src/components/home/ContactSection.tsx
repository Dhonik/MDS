import React, { useState, useEffect } from 'react';
import { StoreModel, fetchStores } from '../../services/storeService';
import { BUSINESS_INFO } from '../../data/business';
import { Icons } from '../common/Icons';
import { submitEnquiry } from '../../services/enquiryService';
import { generateWhatsAppLink } from '../../lib/utils';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [stores, setStores] = useState<StoreModel[]>([]);
  const [quickMsg, setQuickMsg] = useState({ 
    name: '', 
    phone: '', 
    store_id: '',
    store_label: 'Store 01 (Thuckalay Market)', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchStores().then((data) => {
      setStores(data);
      if (data.length > 0) {
        setQuickMsg((prev) => ({ 
          ...prev, 
          store_id: data[0].id,
          store_label: `${data[0].name} (${data[0].location})` 
        }));
      }
    });
  }, []);

  const handleDirections = (store: StoreModel) => {
    if (store.map_url) {
      window.open(store.map_url, '_blank');
    } else {
      onShowToast(`Location details coming soon for ${store.name} (${store.location})`);
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.name.trim() || !quickMsg.phone.trim()) {
      onShowToast('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitEnquiry({
      name: quickMsg.name,
      phone: quickMsg.phone,
      store_id: quickMsg.store_id || null,
      enquiry_type: 'general',
      message: `[${quickMsg.store_label}] ${quickMsg.message}`,
    });
    setIsSubmitting(false);

    if (result.success) {
      setSent(true);
      onShowToast('Thank you. Your enquiry has been received.');

      const waText = 
        `Hello MDS, enquiry from website:\n\n` +
        `Name: ${quickMsg.name}\n` +
        `Phone: ${quickMsg.phone}\n` +
        `Target Store: ${quickMsg.store_label}\n` +
        `Message: ${quickMsg.message || 'I have a general enquiry.'}`;

      const waUrl = generateWhatsAppLink(BUSINESS_INFO.generalWhatsApp, waText);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank');
      }

      setQuickMsg((prev) => ({ ...prev, name: '', phone: '', message: '' }));
    } else {
      onShowToast('Something went wrong while sending your enquiry. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-mds-cream relative border-t border-mds-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.Phone className="w-3.5 h-3.5 text-mds-accent" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Get in Touch With MDS
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Reach out to any of our three stores directly or contact our general business desk for retail inquiries and wholesale supplies.
          </p>
        </div>

        {/* 3 Store Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-mds-border/80 shadow-soft flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-mds-primary text-white">
                    {store.number || 'STORE'}
                  </span>
                  <span className="text-xs font-bold text-mds-accent">
                    {store.type}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-mds-charcoal font-heading">
                    {store.name}
                  </h3>
                  <div className="text-xs font-semibold text-mds-primary mt-0.5">
                    {store.location}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100 text-xs font-mono text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-gray-800">Phone:</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{store.phone || 'Coming soon'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-gray-800">WhatsApp:</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{store.whatsapp || 'Coming soon'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-gray-800">Hours:</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{store.opening_hours || 'Coming soon'}</span>
                  </div>
                </div>
              </div>

              {/* 3 Store Action Buttons */}
              <div className="space-y-2 pt-2">
                {store.phone ? (
                  <a
                    href={`tel:${store.phone}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors flex items-center justify-center space-x-2"
                  >
                    <Icons.Phone className="w-3.5 h-3.5" />
                    <span>Call {store.name}</span>
                  </a>
                ) : (
                  <button
                    onClick={() => onShowToast(`Phone number coming soon for ${store.name}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center space-x-2 cursor-not-allowed"
                  >
                    <Icons.Phone className="w-3.5 h-3.5" />
                    <span>Phone Unavailable</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {store.whatsapp ? (
                    <a
                      href={`https://wa.me/${store.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-emerald-50 text-mds-primary text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-1.5 border border-emerald-200 text-center"
                    >
                      <Icons.WhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => onShowToast(`WhatsApp coming soon for ${store.name}`)}
                      className="py-2 px-3 rounded-xl bg-gray-50 text-gray-400 text-xs font-bold flex items-center justify-center space-x-1.5 cursor-not-allowed"
                    >
                      <Icons.WhatsApp className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDirections(store)}
                    className="py-2 px-3 rounded-xl bg-mds-sand text-mds-charcoal text-xs font-bold hover:bg-mds-border/60 transition-colors flex items-center justify-center space-x-1.5 border border-mds-border cursor-pointer"
                  >
                    <Icons.Navigation className="w-3.5 h-3.5 text-mds-accent" />
                    <span>{store.map_url ? 'Directions' : 'Location'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* General Business Hotline & Quick Message Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-mds-border/80 shadow-card max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: General Business Info */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-mds-accent">
                General Business Hotline
              </span>
              <h3 className="text-2xl font-bold text-mds-charcoal font-heading">
                Central MDS Desk
              </h3>
              <p className="text-xs text-mds-muted leading-relaxed">
                For administrative enquiries, multiple-store coordination, or general supply queries across Kanyakumari district.
              </p>

              <div className="space-y-2.5 text-xs text-gray-700 pt-2">
                <div className="p-3 rounded-2xl bg-mds-sand/80 border border-mds-border/60">
                  <span className="font-sans font-bold text-mds-charcoal block mb-1.5">Direct Hotline Numbers:</span>
                  <div className="space-y-1.5 font-mono">
                    <a href="tel:+919488937666" className="flex items-center justify-between text-mds-primary hover:text-mds-accent font-semibold transition-colors bg-white/80 p-1.5 rounded-lg border border-emerald-200">
                      <span>📞 +91 94889 37666</span>
                      <span className="text-[10px] bg-emerald-100 text-mds-primary px-1.5 py-0.5 rounded font-sans font-bold uppercase">Primary</span>
                    </a>
                    <a href="tel:+919443391966" className="flex items-center justify-between text-gray-600 hover:text-mds-charcoal transition-colors bg-white/50 p-1.5 rounded-lg">
                      <span>📞 +91 94433 91966</span>
                      <span className="text-[10px] text-gray-500 font-sans">(Optional)</span>
                    </a>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-mds-sand/80 border border-mds-border/60">
                  <span className="font-sans font-bold text-mds-charcoal block mb-1">WhatsApp Desk:</span>
                  <a href="https://wa.me/919488937666" target="_blank" rel="noopener noreferrer" className="font-mono text-emerald-800 hover:text-emerald-950 font-semibold transition-colors flex items-center space-x-1.5">
                    <span>💬 +91 94889 37666</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-bold">Online</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Quick Direct Inquiry Form */}
            <div className="md:col-span-7 md:border-l md:border-gray-100 md:pl-8">
              <h4 className="text-lg font-bold text-mds-charcoal font-heading mb-4">
                Send a Direct Message
              </h4>

              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <Icons.Check className="w-6 h-6 text-mds-primary mx-auto" />
                  <div className="text-sm font-bold text-mds-charcoal">
                    Thank you. Your enquiry has been received.
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-bold text-mds-primary underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-mds-charcoal uppercase tracking-wider mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={quickMsg.name}
                      onChange={(e) => setQuickMsg({ ...quickMsg, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-mds-cream/60 border border-mds-border text-sm focus:outline-none focus:border-mds-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal uppercase tracking-wider mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={quickMsg.phone}
                      onChange={(e) => setQuickMsg({ ...quickMsg, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-mds-cream/60 border border-mds-border text-sm focus:outline-none focus:border-mds-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal uppercase tracking-wider mb-1">
                      Select Store
                    </label>
                    <select
                      value={quickMsg.store_id}
                      onChange={(e) => {
                        const selected = stores.find((s) => s.id === e.target.value);
                        setQuickMsg({
                          ...quickMsg,
                          store_id: e.target.value,
                          store_label: selected ? `${selected.name} (${selected.location})` : 'General Desk',
                        });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-mds-cream/60 border border-mds-border text-sm focus:outline-none focus:border-mds-primary"
                    >
                      {stores.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {s.location} ({s.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-mds-charcoal uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      value={quickMsg.message}
                      onChange={(e) => setQuickMsg({ ...quickMsg, message: e.target.value })}
                      placeholder="Your enquiry..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-mds-cream/60 border border-mds-border text-sm focus:outline-none focus:border-mds-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                  >
                    <Icons.WhatsApp className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Message to WhatsApp & Desk'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
