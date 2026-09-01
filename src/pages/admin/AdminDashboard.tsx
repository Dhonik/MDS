import React, { useState, useEffect } from 'react';
import { signOutAdmin, getAdminSession } from '../../services/authService';
import { AdminLogin } from './AdminLogin';
import { StoreModel, adminFetchAllStores, adminSaveStore } from '../../services/storeService';
import { ProductModel, adminFetchAllProducts, adminSaveProduct, adminDeleteProduct } from '../../services/productService';
import { EnquiryModel, adminFetchEnquiries, adminUpdateEnquiryStatus } from '../../services/enquiryService';
import { GalleryModel, adminFetchAllGallery, adminSaveGalleryItem, adminDeleteGalleryItem, adminUploadImage } from '../../services/galleryService';
import { BusinessSetting, adminFetchAllSettings, adminSaveSetting } from '../../services/settingsService';
import { Icons } from '../../components/common/Icons';
import { generateWhatsAppLink } from '../../lib/utils';
import { isSupabaseConfigured } from '../../lib/supabase';

export const AdminDashboard: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'stores' | 'products' | 'enquiries' | 'gallery' | 'settings'>('overview');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Data states
  const [stores, setStores] = useState<StoreModel[]>([]);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryModel[]>([]);
  const [gallery, setGallery] = useState<GalleryModel[]>([]);
  const [settings, setSettings] = useState<BusinessSetting[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal / Editing states
  const [editingStore, setEditingStore] = useState<Partial<StoreModel> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductModel> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryModel> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    getAdminSession().then((session) => {
      setIsAuthenticated(Boolean(session));
      if (session) {
        loadDashboardData();
      }
    });
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [s, p, e, g, set] = await Promise.all([
        adminFetchAllStores(),
        adminFetchAllProducts(),
        adminFetchEnquiries(),
        adminFetchAllGallery(),
        adminFetchAllSettings(),
      ]);
      setStores(s);
      setProducts(p);
      setEnquiries(e);
      setGallery(g);
      setSettings(set);
    } catch (err) {
      console.error('Admin data load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-mds-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-mds-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          loadDashboardData();
        }}
        onBackToHome={onBackToHome}
      />
    );
  }

  // Action handlers
  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStore) return;
    try {
      await adminSaveStore(editingStore);
      showToast('Store details saved successfully.');
      setEditingStore(null);
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await adminSaveProduct(editingProduct);
      showToast('Product saved successfully.');
      setEditingProduct(null);
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await adminDeleteProduct(id);
      showToast('Product deleted.');
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleStatusChange = async (enquiryId: string, newStatus: 'new' | 'contacted' | 'completed' | 'cancelled') => {
    try {
      await adminUpdateEnquiryStatus(enquiryId, newStatus);
      showToast(`Status updated to ${newStatus}`);
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleUploadImage = async (file: File, folder: 'stores' | 'vegetables' | 'fruits' | 'gallery') => {
    setIsUploading(true);
    try {
      const url = await adminUploadImage(file, folder);
      showToast('Image uploaded successfully to Supabase Storage.');
      return url;
    } catch (err: any) {
      showToast(`Upload failed: ${err.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    try {
      await adminSaveGalleryItem(editingGallery);
      showToast('Gallery item saved.');
      setEditingGallery(null);
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this gallery photo?')) return;
    try {
      await adminDeleteGalleryItem(id);
      showToast('Gallery item removed.');
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  const handleSaveSetting = async (key: string, value: string) => {
    try {
      await adminSaveSetting(key, value);
      showToast(`Setting ${key} updated.`);
      loadDashboardData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-mds-cream flex flex-col">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-mds-charcoal text-white px-5 py-3 rounded-2xl shadow-xl border border-mds-primary text-xs font-semibold animate-fadeIn">
          {toastMsg}
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-mds-border/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-mds-primary text-white flex items-center justify-center font-bold">
              MDS
            </div>
            <div>
              <div className="text-sm font-extrabold text-mds-charcoal font-heading">
                Admin Control Center
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{isSupabaseConfigured ? 'Connected to Supabase' : 'Local Preview Mode'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-mds-charcoal bg-mds-sand hover:bg-mds-border/60 transition-colors cursor-pointer"
            >
              Public Website
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto py-2 border-t border-gray-100">
          {[
            { id: 'overview', label: 'Overview', icon: Icons.Sparkles },
            { id: 'stores', label: 'Stores', count: stores.length, icon: Icons.Store },
            { id: 'products', label: 'Products', count: products.length, icon: Icons.Leaf },
            { id: 'enquiries', label: 'Enquiries', count: enquiries.filter(e => e.status === 'new').length, icon: Icons.Scale },
            { id: 'gallery', label: 'Gallery', count: gallery.length, icon: Icons.Sparkles },
            { id: 'settings', label: 'Business Settings', icon: Icons.Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-mds-primary text-white shadow-xs'
                    : 'text-mds-muted hover:text-mds-charcoal hover:bg-mds-sand/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {loading && (
          <div className="mb-4 text-xs font-bold text-mds-primary flex items-center space-x-2">
            <span className="w-3 h-3 border-2 border-mds-primary border-t-transparent rounded-full animate-spin"></span>
            <span>Syncing database...</span>
          </div>
        )}

        {/* ---------------- 1. OVERVIEW TAB ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-mds-border shadow-soft">
                <div className="text-xs font-bold text-mds-muted uppercase tracking-wider">Total Stores</div>
                <div className="text-3xl font-extrabold text-mds-charcoal font-heading mt-2">{stores.length}</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">3 physical branches</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-mds-border shadow-soft">
                <div className="text-xs font-bold text-mds-muted uppercase tracking-wider">Active Products</div>
                <div className="text-3xl font-extrabold text-mds-charcoal font-heading mt-2">
                  {products.filter(p => p.is_available).length}
                </div>
                <div className="text-xs text-mds-muted mt-1">{products.length} total listed</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-mds-border shadow-soft">
                <div className="text-xs font-bold text-mds-muted uppercase tracking-wider">New Enquiries</div>
                <div className="text-3xl font-extrabold text-emerald-700 font-heading mt-2">
                  {enquiries.filter(e => e.status === 'new').length}
                </div>
                <div className="text-xs text-mds-muted mt-1">{enquiries.length} total received</div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-mds-border shadow-soft">
                <div className="text-xs font-bold text-mds-muted uppercase tracking-wider">Gallery Photos</div>
                <div className="text-3xl font-extrabold text-mds-charcoal font-heading mt-2">{gallery.length}</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">In Supabase Storage</div>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-mds-border shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-mds-charcoal font-heading">Recent Customer Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs font-bold text-mds-primary hover:underline">
                    View All
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">No enquiries recorded yet.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {enquiries.slice(0, 5).map((enq) => (
                      <div key={enq.id} className="py-3.5 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-mds-charcoal">{enq.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              enq.status === 'new' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {enq.status}
                            </span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-semibold uppercase">
                              {enq.enquiry_type}
                            </span>
                          </div>
                          <div className="text-xs text-mds-muted mt-0.5">
                            {enq.phone} {enq.location && `• ${enq.location}`} {enq.product_requirement && `• ${enq.product_requirement}`}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <a
                            href={`tel:${enq.phone}`}
                            className="p-2 rounded-lg bg-emerald-50 text-mds-primary hover:bg-emerald-100"
                            title="Call"
                          >
                            <Icons.Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={generateWhatsAppLink(enq.phone, `Hello ${enq.name}, regarding your MDS produce enquiry:`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            title="WhatsApp"
                          >
                            <Icons.WhatsApp className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-mds-border shadow-soft space-y-4">
                <h3 className="text-lg font-bold text-mds-charcoal font-heading">Quick Shortcuts</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setEditingProduct({ name: '', category: 'Green Vegetables', type: 'vegetable', is_available: true, unit: 'kg' });
                      setActiveTab('products');
                    }}
                    className="w-full p-3 rounded-xl bg-mds-sand hover:bg-mds-border/60 text-xs font-bold text-mds-charcoal text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>+ Add New Product</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5 text-mds-accent" />
                  </button>

                  <button
                    onClick={() => {
                      setEditingGallery({ category: 'Vegetables', is_active: true });
                      setActiveTab('gallery');
                    }}
                    className="w-full p-3 rounded-xl bg-mds-sand hover:bg-mds-border/60 text-xs font-bold text-mds-charcoal text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>+ Upload Photo to Gallery</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5 text-mds-accent" />
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full p-3 rounded-xl bg-mds-sand hover:bg-mds-border/60 text-xs font-bold text-mds-charcoal text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Edit Hotline Phone & Timings</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5 text-mds-accent" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 2. STORES TAB ---------------- */}
        {activeTab === 'stores' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-mds-charcoal font-heading">Manage Physical Stores</h2>
                <p className="text-xs text-mds-muted mt-0.5">Edit store details, addresses, timings, and contact numbers.</p>
              </div>
              <button
                onClick={() => setEditingStore({ name: '', slug: '', type: 'Vegetables', location: '', is_active: true })}
                className="px-4 py-2 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors"
              >
                + Add Store
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stores.map((store) => (
                <div key={store.id} className="bg-white rounded-3xl p-6 border border-mds-border shadow-soft space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-mds-accent">{store.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        store.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {store.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-mds-charcoal font-heading">{store.name}</h3>
                    <div className="text-xs font-semibold text-mds-primary">{store.location}</div>
                    <p className="text-xs text-mds-muted line-clamp-2">{store.description}</p>

                    <div className="pt-2 border-t border-gray-100 text-xs font-mono space-y-1 text-gray-600">
                      <div>Phone: {store.phone || 'None'}</div>
                      <div>WhatsApp: {store.whatsapp || 'None'}</div>
                      <div>Hours: {store.opening_hours || 'None'}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingStore(store)}
                    className="w-full py-2.5 rounded-xl bg-mds-sand hover:bg-mds-border/60 text-xs font-bold text-mds-charcoal transition-colors cursor-pointer"
                  >
                    Edit Store Details
                  </button>
                </div>
              ))}
            </div>

            {/* Store Modal */}
            {editingStore && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-mds-border max-h-[90vh] overflow-y-auto">
                  <h3 className="text-xl font-bold text-mds-charcoal font-heading mb-4">
                    {editingStore.id ? 'Edit Store' : 'Add New Store'}
                  </h3>

                  <form onSubmit={handleSaveStore} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Store Name</label>
                      <input
                        type="text"
                        required
                        value={editingStore.name || ''}
                        onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Slug</label>
                        <input
                          type="text"
                          required
                          value={editingStore.slug || ''}
                          onChange={(e) => setEditingStore({ ...editingStore, slug: e.target.value })}
                          placeholder="thuckalay-market"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Type</label>
                        <select
                          value={editingStore.type || 'Vegetables'}
                          onChange={(e) => setEditingStore({ ...editingStore, type: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        >
                          <option value="Vegetables">Vegetables</option>
                          <option value="Fruits">Fruits</option>
                          <option value="Vegetables & Fruits">Vegetables & Fruits</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Location Subtitle</label>
                      <input
                        type="text"
                        required
                        value={editingStore.location || ''}
                        onChange={(e) => setEditingStore({ ...editingStore, location: e.target.value })}
                        placeholder="Thuckalay Market"
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingStore.description || ''}
                        onChange={(e) => setEditingStore({ ...editingStore, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Primary Phone</label>
                        <input
                          type="text"
                          value={editingStore.phone || ''}
                          onChange={(e) => setEditingStore({ ...editingStore, phone: e.target.value })}
                          placeholder="+91 94889 37666"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">WhatsApp</label>
                        <input
                          type="text"
                          value={editingStore.whatsapp || ''}
                          onChange={(e) => setEditingStore({ ...editingStore, whatsapp: e.target.value })}
                          placeholder="919488937666"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Opening Hours</label>
                      <input
                        type="text"
                        value={editingStore.opening_hours || ''}
                        onChange={(e) => setEditingStore({ ...editingStore, opening_hours: e.target.value })}
                        placeholder="6:30 AM – 10:00 PM"
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Google Maps URL</label>
                      <input
                        type="text"
                        value={editingStore.map_url || ''}
                        onChange={(e) => setEditingStore({ ...editingStore, map_url: e.target.value })}
                        placeholder="https://maps.google.com/..."
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={editingStore.is_active ?? true}
                        onChange={(e) => setEditingStore({ ...editingStore, is_active: e.target.checked })}
                        className="rounded text-mds-primary focus:ring-mds-primary w-4 h-4"
                      />
                      <label htmlFor="is_active" className="font-bold text-mds-charcoal cursor-pointer">
                        Active & Visible on Public Website
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setEditingStore(null)}
                        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent cursor-pointer"
                      >
                        Save Store
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- 3. PRODUCTS TAB ---------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-mds-charcoal font-heading">Vegetable & Fruit Products</h2>
                <p className="text-xs text-mds-muted mt-0.5">Manage item availability, categories, and optional prices.</p>
              </div>
              <button
                onClick={() => setEditingProduct({ name: '', category: 'Green Vegetables', type: 'vegetable', is_available: true, unit: 'kg' })}
                className="px-4 py-2 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors cursor-pointer"
              >
                + Add Product
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-mds-border shadow-soft overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-mds-sand/80 text-mds-charcoal font-bold uppercase tracking-wider border-b border-mds-border">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price / Unit</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-mds-cream/40">
                      <td className="p-4 font-bold text-mds-charcoal">{prod.name}</td>
                      <td className="p-4 capitalize">
                        <span className={`px-2 py-0.5 rounded-full font-bold ${
                          prod.type === 'fruit' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prod.type}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{prod.category}</td>
                      <td className="p-4 font-mono font-bold">
                        {prod.price !== null && prod.price !== undefined ? `₹${prod.price}/${prod.unit || 'kg'}` : 'Unlisted'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prod.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {prod.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="px-2.5 py-1 rounded bg-mds-sand text-mds-charcoal hover:bg-mds-border/60 font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="px-2.5 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100 font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-mds-border">
                  <h3 className="text-xl font-bold text-mds-charcoal font-heading mb-4">
                    {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                  </h3>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        placeholder="e.g. Tomatoes"
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Type</label>
                        <select
                          value={editingProduct.type || 'vegetable'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        >
                          <option value="vegetable">Vegetable</option>
                          <option value="fruit">Fruit</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.category || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          placeholder="e.g. Leafy Vegetables"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Price (₹) (Optional)</label>
                        <input
                          type="number"
                          value={editingProduct.price ?? ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value ? Number(e.target.value) : null })}
                          placeholder="Leave empty if unlisted"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-mds-charcoal mb-1">Unit</label>
                        <input
                          type="text"
                          value={editingProduct.unit || 'kg'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                          placeholder="kg, bundle, piece"
                          className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_available"
                        checked={editingProduct.is_available ?? true}
                        onChange={(e) => setEditingProduct({ ...editingProduct, is_available: e.target.checked })}
                        className="rounded text-mds-primary focus:ring-mds-primary w-4 h-4"
                      />
                      <label htmlFor="is_available" className="font-bold text-mds-charcoal cursor-pointer">
                        Currently In Stock & Available
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent cursor-pointer"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- 4. ENQUIRIES TAB ---------------- */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-mds-charcoal font-heading">Wholesale & Contact Enquiries</h2>
              <p className="text-xs text-mds-muted mt-0.5">Manage customer orders, quotes, and communications.</p>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-mds-border">
                <p className="text-xs text-gray-500">No enquiries found in the database.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white rounded-3xl p-6 border border-mds-border shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-mds-charcoal">{enq.name}</span>
                        {enq.business_name && (
                          <span className="text-xs font-semibold text-mds-primary">({enq.business_name})</span>
                        )}
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                          {enq.enquiry_type}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 font-mono flex items-center space-x-3">
                        <span>📞 {enq.phone}</span>
                        {enq.location && <span>📍 {enq.location}</span>}
                        {enq.quantity && <span>⚖️ {enq.quantity}</span>}
                      </div>

                      {enq.message && (
                        <p className="text-xs text-mds-muted pt-1 bg-mds-cream/60 p-2 rounded-xl">
                          "{enq.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <select
                        value={enq.status || 'new'}
                        onChange={(e) => handleStatusChange(enq.id!, e.target.value as any)}
                        className="text-xs font-bold p-2 rounded-xl border border-mds-border bg-mds-cream"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`tel:${enq.phone}`}
                        className="p-2.5 rounded-xl bg-mds-primary text-white hover:bg-mds-accent"
                        title="Call Customer"
                      >
                        <Icons.Phone className="w-4 h-4" />
                      </a>

                      <a
                        href={generateWhatsAppLink(enq.phone, `Hello ${enq.name}, replying to your MDS produce enquiry:`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        title="Reply on WhatsApp"
                      >
                        <Icons.WhatsApp className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- 5. GALLERY TAB ---------------- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-mds-charcoal font-heading">Gallery Media</h2>
                <p className="text-xs text-mds-muted mt-0.5">Upload photos to Supabase Storage and manage public display.</p>
              </div>
              <button
                onClick={() => setEditingGallery({ category: 'Vegetables', is_active: true })}
                className="px-4 py-2 rounded-xl bg-mds-primary text-white text-xs font-bold hover:bg-mds-accent transition-colors cursor-pointer"
              >
                + Add Photo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-mds-border shadow-soft flex flex-col justify-between">
                  <div className="relative aspect-[4/3] bg-mds-sand/80">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title || ''} className="w-full h-full object-cover" />
                    ) : (
                      <div className="p-4 text-center text-xs font-mono text-gray-500 flex items-center justify-center h-full">
                        // No URL
                      </div>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-xs font-bold text-mds-charcoal truncate">{item.title || 'MDS Photo'}</div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className={`text-[10px] font-bold ${item.is_active ? 'text-emerald-700' : 'text-gray-400'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Upload Modal */}
            {editingGallery && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-mds-border">
                  <h3 className="text-xl font-bold text-mds-charcoal font-heading mb-4">Add Gallery Photo</h3>

                  <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Title</label>
                      <input
                        type="text"
                        value={editingGallery.title || ''}
                        onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                        placeholder="e.g. Morning Vegetable Arrivals"
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Category</label>
                      <select
                        value={editingGallery.category || 'Vegetables'}
                        onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      >
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Stores">Stores</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Daily Operations">Daily Operations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-mds-charcoal mb-1">Image URL or File Upload</label>
                      <input
                        type="text"
                        value={editingGallery.image_url || ''}
                        onChange={(e) => setEditingGallery({ ...editingGallery, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm mb-2"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleUploadImage(file, 'gallery');
                            if (url) setEditingGallery((prev) => ({ ...prev, image_url: url }));
                          }
                        }}
                        className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-mds-sand file:text-mds-charcoal hover:file:bg-mds-border"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setEditingGallery(null)}
                        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUploading}
                        className="px-5 py-2 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent"
                      >
                        {isUploading ? 'Uploading...' : 'Save Photo'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- 6. BUSINESS SETTINGS TAB ---------------- */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-mds-charcoal font-heading">Business Settings</h2>
              <p className="text-xs text-mds-muted mt-0.5">Edit general contact numbers, hotline WhatsApp, and brand metadata.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-mds-border shadow-soft space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {settings.map((setting) => (
                  <div key={setting.key} className="space-y-1">
                    <label className="block font-bold text-mds-charcoal uppercase tracking-wider">
                      {setting.key.replace(/_/g, ' ')}
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        defaultValue={setting.value || ''}
                        id={`setting-${setting.key}`}
                        className="w-full p-2.5 rounded-xl bg-mds-cream border border-mds-border text-sm"
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById(`setting-${setting.key}`) as HTMLInputElement;
                          if (el) handleSaveSetting(setting.key, el.value);
                        }}
                        className="px-4 py-2 rounded-xl bg-mds-primary text-white font-bold hover:bg-mds-accent shrink-0 cursor-pointer"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
