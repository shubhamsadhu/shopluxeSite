import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { ToastContainer } from './components/ToastContainer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBrowse } from './components/CategoryBrowse';
import { TrendingProducts } from './components/TrendingProducts';
import { PromoBanners } from './components/PromoBanners';
import { SocialProofNewsletter } from './components/SocialProofNewsletter';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetails } from './components/ProductDetails';
import { ProductComparison } from './components/ProductComparison';
import { BlogSection } from './components/BlogSection';
import { AccountDashboard } from './components/AccountDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';
import { AddProductModal } from './components/AddProductModal';
import { ContactAboutModal } from './components/ContactAboutModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useStore();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [contactAboutType, setContactAboutType] = useState<'contact' | 'about' | null>(null);

  return (
    <div className="min-h-screen bg-[#fafaf8] text-zinc-900 font-sans flex flex-col selection:bg-zinc-950 selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Navigation Bar */}
      <Header
        activeModal={contactAboutType}
        onOpenContact={() => setContactAboutType('contact')}
        onOpenAbout={() => setContactAboutType('about')}
        onCloseModal={() => setContactAboutType(null)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Hero />
            <CategoryBrowse />
            <TrendingProducts />
            <PromoBanners />
            <SocialProofNewsletter />
          </div>
        )}

        {activeTab === 'shop' && (
          <ShopCatalog
            onOpenAddProduct={() => setIsAddProductOpen(true)}
          />
        )}

        {activeTab === 'details' && (
          <ProductDetails />
        )}

        {activeTab === 'compare' && (
          <ProductComparison />
        )}

        {activeTab === 'blog' && (
          <BlogSection />
        )}

        {activeTab === 'account' && (
          <AccountDashboard />
        )}
      </main>

      {/* Footer matching reference design */}
      <Footer
        onOpenAbout={() => setContactAboutType('about')}
        onOpenContact={() => setContactAboutType('contact')}
      />

      {/* Slide-over & Dialog Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <SearchModal />
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
      <ContactAboutModal
        type={contactAboutType}
        onClose={() => setContactAboutType(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
