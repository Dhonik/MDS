import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { HomePage } from './pages/HomePage';
import { StoreDetailsPage } from './components/store/StoreDetailsPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Toast } from './components/common/Toast';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'store' | 'admin'>('home');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('thuckalay-market');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with browser URL / hash for clean store deep-linking and admin routing
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;

      if (hash.startsWith('#/admin') || hash === '#admin') {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('#/stores/') || hash.startsWith('#store-') || hash.startsWith('#stores/')) {
        const slug = hash.replace('#/stores/', '').replace('#stores/', '').replace('#store-', '');
        setSelectedStoreSlug(slug);
        setCurrentView('store');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
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
    } else if (view === 'admin') {
      setCurrentView('admin');
      window.location.hash = `#/admin`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (window.location.hash.includes('/stores/') || window.location.hash.includes('/admin')) {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  if (currentView === 'admin') {
    return <AdminDashboard onBackToHome={() => handleNavigate('home')} />;
  }

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
          slug={selectedStoreSlug}
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
