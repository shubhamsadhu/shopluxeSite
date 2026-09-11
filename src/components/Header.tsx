import React, { useState } from 'react';
import { useStore, ActiveTab } from '../context/StoreContext';
import {
  ShoppingBag,
  Search,
  User as UserIcon,
  Scale,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  PlusCircle,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  onOpenAddProduct?: () => void;
  onOpenContact?: () => void;
  onOpenAbout?: () => void;
  onCloseModal?: () => void;
  activeModal?: 'contact' | 'about' | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddProduct,
  onOpenContact,
  onOpenAbout,
  onCloseModal,
  activeModal
}) => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    cartTotal,
    setIsCartOpen,
    setIsSearchModalOpen,
    setIsAuthModalOpen,
    currentUser,
    logout,
    comparisonList,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigateTo = (tab: ActiveTab, category?: string) => {
    if (onCloseModal) {
      onCloseModal();
    }
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine active highlighted states
  const isHomeActive = activeTab === 'home' && !activeModal;
  const isShopActive = activeTab === 'shop' && selectedCategory !== 'Fashion' && !activeModal;
  const isCollectionsActive = activeTab === 'shop' && selectedCategory === 'Fashion' && !activeModal;
  const isAboutActive = activeModal === 'about';
  const isBlogActive = activeTab === 'blog' && !activeModal;
  const isContactActive = activeModal === 'contact';
  const isCompareActive = activeTab === 'compare' && !activeModal;

  const getNavClass = (isActive: boolean) =>
    `relative py-2 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
      isActive
        ? 'text-zinc-950 font-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-950'
        : 'text-zinc-500 hover:text-zinc-950 font-bold'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      {/* Main Navbar */}
      <div className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs group-hover:bg-zinc-800 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 leading-none">
                SHOPLUXE
              </span>
              <span className="text-[10px] tracking-[0.25em] font-medium text-zinc-400 uppercase mt-0.5">
                EVERYTHING YOU NEED
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* HOME */}
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={getNavClass(isHomeActive)}
            >
              HOME
            </button>

            {/* SHOP with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                id="nav-shop-btn"
                onClick={() => navigateTo('shop', 'All')}
                className={`flex items-center gap-1 transition-colors py-2 relative text-xs tracking-wider uppercase cursor-pointer ${
                  isShopActive
                    ? 'text-zinc-950 font-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-950'
                    : 'text-zinc-500 hover:text-zinc-950 font-bold'
                }`}
              >
                <span>SHOP</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform" />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-zinc-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-zinc-100 text-[11px] font-semibold text-zinc-400 uppercase">
                    Browse Catalogue
                  </div>
                  <button
                    onClick={() => navigateTo('shop', 'All')}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between ${
                      activeTab === 'shop' && selectedCategory === 'All'
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-700">Full Store</span>
                  </button>
                  <button
                    onClick={() => navigateTo('shop', 'Affiliate')}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between ${
                      activeTab === 'shop' && selectedCategory === 'Affiliate'
                        ? 'bg-amber-50 text-amber-950 font-bold'
                        : 'text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <span>Affiliate Partner Deals</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Verified Deals</span>
                  </button>
                  <button
                    onClick={() => navigateTo('shop', 'ShopLuxe Direct')}
                    className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between ${
                      activeTab === 'shop' && selectedCategory === 'ShopLuxe Direct'
                        ? 'bg-emerald-50 text-emerald-950 font-bold'
                        : 'text-zinc-800 hover:bg-zinc-50'
                    }`}
                  >
                    <span>ShopLuxe Exclusive</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Our Brand</span>
                  </button>
                  <div className="my-1 border-t border-zinc-100" />
                  <div className="px-4 py-1 text-[10px] uppercase font-bold text-zinc-400">Categories</div>
                  {['Electronics', 'Home & Living', 'Accessories', 'Beauty', 'Sports'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => navigateTo('shop', cat)}
                      className={`w-full text-left px-4 py-1.5 text-xs font-medium transition-colors ${
                        activeTab === 'shop' && selectedCategory === cat
                          ? 'bg-zinc-100 text-zinc-950 font-bold'
                          : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COLLECTIONS */}
            <button
              id="nav-collections-btn"
              onClick={() => navigateTo('shop', 'Fashion')}
              className={getNavClass(isCollectionsActive)}
            >
              COLLECTIONS
            </button>

            {/* ABOUT US */}
            <button
              id="nav-about-btn"
              onClick={() => {
                if (onOpenAbout) onOpenAbout();
              }}
              className={getNavClass(isAboutActive)}
            >
              ABOUT US
            </button>

            {/* BLOG */}
            <button
              id="nav-blog-btn"
              onClick={() => navigateTo('blog')}
              className={getNavClass(isBlogActive)}
            >
              BLOG
            </button>

            {/* CONTACT US */}
            <button
              id="nav-contact-btn"
              onClick={() => {
                if (onOpenContact) onOpenContact();
              }}
              className={getNavClass(isContactActive)}
            >
              CONTACT US
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              title="Search products..."
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Comparison Tool Button */}
            <button
              id="header-compare-btn"
              onClick={() => navigateTo('compare')}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isCompareActive ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
              title="Compare Products"
              aria-label="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {comparisonList.length > 0 && (
                <span className={`absolute -top-1 -right-1 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center ${
                  isCompareActive ? 'bg-amber-400 text-zinc-950' : 'bg-amber-600 text-white'
                }`}>
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* User Profile / Auth */}
            <div className="relative">
              {currentUser ? (
                <div
                  className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-zinc-100 transition-colors"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <img
                    src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-zinc-800 max-w-[90px] truncate">
                    {currentUser.displayName}
                  </span>
                </div>
              ) : (
                <button
                  id="header-auth-btn"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
                  title="Sign In / Register"
                  aria-label="Sign In"
                >
                  <UserIcon className="w-5 h-5" />
                </button>
              )}

              {/* User Dropdown */}
              {userMenuOpen && currentUser && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-zinc-100">
                    <p className="text-xs font-bold text-zinc-900 truncate">{currentUser.displayName}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigateTo('account');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>My Account & Orders</span>
                  </button>
                  {onOpenAddProduct && (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAddProduct();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-medium"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add Product / Deal</span>
                    </button>
                  )}
                  <div className="my-1 border-t border-zinc-100" />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart with Price Indicator */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-zinc-800 group-hover:text-zinc-950 transition-colors" />
                <span className="absolute -top-2 -right-2 bg-zinc-900 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-bold text-zinc-800 group-hover:text-zinc-950 transition-colors hidden sm:inline">
                ${cartTotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-100">
            <button
              onClick={() => navigateTo('home')}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isHomeActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop', 'All')}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isShopActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => navigateTo('shop', 'Fashion')}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isCollectionsActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAbout) onOpenAbout();
              }}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isAboutActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('blog')}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isBlogActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Blog & Guides
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className={`p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isContactActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => navigateTo('compare')}
              className={`col-span-2 p-2.5 rounded-xl text-xs font-bold text-center uppercase tracking-wider transition-colors ${
                isCompareActive ? 'bg-zinc-950 text-white shadow-xs' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              Compare Products ({comparisonList.length})
            </button>
          </div>

          <div className="pt-2">
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Featured Categories</div>
            <div className="flex flex-wrap gap-1.5">
              {['Electronics', 'Fashion', 'Home & Living', 'Accessories', 'Beauty', 'Sports'].map(cat => (
                <button
                  key={cat}
                  onClick={() => navigateTo('shop', cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'shop' && selectedCategory === cat
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {onOpenAddProduct && (
            <button
              onClick={() => {
                onOpenAddProduct();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Product / Affiliate Link</span>
            </button>
          )}

          {!currentUser && (
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 border border-zinc-300 rounded-xl text-xs font-bold text-zinc-900 hover:bg-zinc-50"
            >
              Sign In or Register
            </button>
          )}
        </div>
      )}
    </header>
  );
};
