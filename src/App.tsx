import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { StoreDetailsPage } from './components/store/StoreDetailsPage';
import { Toast } from './components/common/Toast';
import { getStoreBySlug, STORES_DATA } from './data/stores';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'store'>('home');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('thuckalay-market');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with browser URL / hash for clean store deep-linking
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/stores/') || hash.startsWith('#store-') || hash.startsWith('#stores/')) {
        const slug = hash.replace('#/stores/', '').replace('#stores/', '').replace('#store-', '');
        const store = getStoreBySlug(slug) || STORES_DATA.find(s => s.id === slug || s.slug === slug);
        if (store) {
          setSelectedStoreSlug(store.slug);
          setCurrentView('store');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      if (hash === '' || hash === '#home' || hash === '#stores' || hash === '#vegetables' || hash === '#fruits' || hash === '#wholesale' || hash === '#story' || hash === '#gallery' || hash === '#contact') {
        setCurrentView('home');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const handleNavigate = (view: string, storeSlug?: string) => {
    if (view === 'store' && storeSlug) {
      setSelectedStoreSlug(storeSlug);
      setCurrentView('store');
      window.location.hash = `#/stores/${storeSlug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (window.location.hash.includes('/stores/')) {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const activeStore = getStoreBySlug(selectedStoreSlug) || STORES_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-mds-cream text-mds-charcoal">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* 2. Main View (Home or Dedicated Store Page) */}
      {currentView === 'home' ? (
        <HomePage
          onViewStore={(slug) => handleNavigate('store', slug)}
          onShowToast={showToast}
        />
      ) : (
        <StoreDetailsPage
          store={activeStore}
          onBackToHome={() => handleNavigate('home')}
          onSelectStore={(slug) => handleNavigate('store', slug)}
          onShowToast={showToast}
        />
      )}

      {/* 3. Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* 4. Mobile Sticky Bottom Action Bar */}
      <MobileBottomBar
        onFindStore={() => {
          if (currentView !== 'home') {
            handleNavigate('home');
            setTimeout(() => {
              const el = document.querySelector('#stores');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.querySelector('#stores');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 5. Notification Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;
