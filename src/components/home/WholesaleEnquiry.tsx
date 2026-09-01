import React, { useState } from 'react';
import { Icons } from '../common/Icons';
import { WHOLESALE_CLIENTS } from '../../data/business';
import { submitEnquiry } from '../../services/enquiryService';
import { generateWhatsAppLink } from '../../lib/utils';

interface WholesaleEnquiryProps {
  onShowToast: (msg: string) => void;
}

export const WholesaleEnquiry: React.FC<WholesaleEnquiryProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    location: '',
    productType: 'Vegetables (All varieties)',
    quantity: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      onShowToast('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await submitEnquiry({
      name: formData.name,
      business_name: formData.businessName,
      phone: formData.phone,
      location: formData.location,
      enquiry_type: 'wholesale',
      product_requirement: formData.productType,
      quantity: formData.quantity,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      onShowToast('Thank you. Your enquiry has been received. The MDS team will contact you shortly.');

      // Also generate direct WhatsApp connect link
      const waText = 
        `Hello MDS, I have submitted a wholesale enquiry via your website:\n\n` +
        `Name: ${formData.name}\n` +
        `Business: ${formData.businessName || 'N/A'}\n` +
        `Phone: ${formData.phone}\n` +
        `Location: ${formData.location || 'Local'}\n` +
        `Requirement: ${formData.productType}\n` +
        `Quantity: ${formData.quantity || 'N/A'}\n` +
        `Message: ${formData.message || 'Please contact me with bulk pricing and supply details.'}`;

      const waUrl = generateWhatsAppLink('919488937666', waText);
      if (waUrl !== '#') {
        window.open(waUrl, '_blank');
      }

      setFormData({
        name: '',
        businessName: '',
        phone: '',
        location: '',
        productType: 'Vegetables (All varieties)',
        quantity: '',
        message: '',
      });
    } else {
      setErrorMsg('Something went wrong while sending your enquiry. Please try again.');
      onShowToast('Something went wrong while sending your enquiry. Please try again.');
    }
  };

  return (
    <section id="wholesale" className="py-20 md:py-28 bg-mds-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-mds-primary text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Icons.Scale className="w-3.5 h-3.5 text-mds-accent" />
            <span>Commercial & Bulk Supply</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-mds-charcoal tracking-tight font-heading">
            Need Fresh Produce in Bulk?
          </h2>
          <p className="text-base sm:text-lg text-mds-muted leading-relaxed">
            Talk to MDS about your vegetable or fruit requirements for hotels, restaurants, catering, grocery shops, and food businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Who We Supply */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-mds-border/80 shadow-soft">
              <h3 className="text-xl font-bold text-mds-charcoal font-heading mb-4">
                Businesses We Regularly Supply
              </h3>
              <p className="text-xs text-mds-muted mb-6 leading-relaxed">
                Dependable morning procurement, sorted grades, and honest trade practices backed by nearly five decades of experience.
              </p>

              <div className="space-y-4">
                {WHOLESALE_CLIENTS.map((client, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5 p-3 rounded-xl bg-mds-cream/80 border border-mds-border/60">
                    <div className="p-2 rounded-lg bg-emerald-100 text-mds-primary shrink-0 mt-0.5">
                      <Icons.Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-mds-charcoal">{client.name}</div>
                      <div className="text-[11px] text-mds-muted mt-0.5 leading-normal">{client.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Hotline Box */}
              <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                <div className="text-xs font-bold text-mds-charcoal">Direct Wholesale Hotlines:</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="tel:+919488937666"
                    className="flex-1 py-2 px-3 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors text-center flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Icons.Phone className="w-3.5 h-3.5" />
                    <span>+91 94889 37666 (Primary)</span>
                  </a>
                  <a
                    href="tel:+919443391966"
                    className="flex-1 py-2 px-3 rounded-xl bg-white text-mds-charcoal border border-mds-border text-xs font-medium hover:bg-emerald-50 transition-colors text-center flex items-center justify-center space-x-1.5"
                  >
                    <Icons.Phone className="w-3.5 h-3.5 text-mds-muted" />
                    <span>+91 94433 91966 (Optional)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-mds-border/80 shadow-card">
              
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-mds-charcoal font-heading">
                    Wholesale Enquiry Form
                  </h3>
                  <p className="text-xs text-mds-muted mt-1">
                    Fill in your requirement to connect directly with MDS wholesale dispatch.
                  </p>
                </div>
                <span className="p-2 rounded-xl bg-emerald-50 text-mds-primary">
                  <Icons.WhatsApp className="w-5 h-5" />
                </span>
              </div>

              {errorMsg && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-200 text-mds-primary mx-auto flex items-center justify-center">
                    <Icons.Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-mds-charcoal font-heading">
                    Thank you. Your enquiry has been received.
                  </h4>
                  <p className="text-xs text-mds-muted max-w-md mx-auto leading-relaxed">
                    The MDS team will contact you shortly. We have also opened our WhatsApp desk for fast instant communication.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      />
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Business / Organization Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Annapoorna Hotel / Catering"
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Delivery / Business Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Thuckalay, Nagercoil, Marthandam"
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Requirement */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Product Requirement
                      </label>
                      <select
                        value={formData.productType}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      >
                        <option value="Vegetables (All varieties)">Fresh Vegetables (Bulk Sourcing)</option>
                        <option value="Onions & Potatoes Only">Onions & Potatoes Sourcing</option>
                        <option value="Fresh Fruits">Fresh Fruits (Wholesale / Functions)</option>
                        <option value="Both Vegetables & Fruits">Both Vegetables & Fruits</option>
                        <option value="Event Catering Bulk Order">One-time Event / Catering Bulk</option>
                      </select>
                    </div>

                    {/* Approximate Quantity */}
                    <div>
                      <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                        Approximate Quantity / Frequency
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="e.g. 50kg daily / Weekly 200kg"
                        className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-mds-charcoal uppercase tracking-wider mb-1.5">
                      Specific Items or Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention any specific vegetable/fruit varieties, timing, or supply requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-mds-cream/50 border border-mds-border text-sm text-mds-charcoal focus:outline-none focus:ring-2 focus:ring-mds-primary/20 focus:border-mds-primary transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-mds-primary text-white font-bold text-sm hover:bg-mds-accent active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Submitting Enquiry...</span>
                      ) : (
                        <>
                          <Icons.WhatsApp className="w-4 h-4 text-emerald-300" />
                          <span>Send Wholesale Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">
                      Securely recorded in MDS enquiry desk & connected to WhatsApp
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
