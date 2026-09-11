import React from 'react';
import { useStore, ActiveTab } from '../context/StoreContext';
import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Pin,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface FooterProps {
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenContact }) => {
  const { setActiveTab, setSelectedCategory, setIsAuthModalOpen, currentUser } = useStore();

  const navigateTo = (tab: ActiveTab, category?: string) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-store-footer" className="bg-[#141923] text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-zinc-950 flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  SHOPLUXE
                </span>
                <span className="text-[10px] tracking-[0.25em] font-medium text-zinc-400 uppercase mt-0.5">
                  EVERYTHING YOU NEED
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Your one-stop shop for quality products at the best prices. Shop smart, live better. Handcrafted essentials and curated affiliate bargains across premier global retailers.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Pinterest"
              >
                <Pin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'All')} className="hover:text-white transition-colors">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Fashion')} className="hover:text-white transition-colors">
                  Collections
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAbout ? onOpenAbout() : navigateTo('home')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact ? onOpenContact() : navigateTo('home')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => onOpenContact ? onOpenContact() : null} className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Shipping Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Returns & Refunds</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* My Account (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200">
              MY ACCOUNT
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => {
                    if (currentUser) {
                      navigateTo('account');
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Account
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Order History
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('compare')} className="hover:text-white transition-colors">
                  Product Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  {currentUser ? 'Switch Account' : 'Login / Register'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-200">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">support@shopluxe.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>123 Commerce St, New York, NY 10001, USA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar copyright and disclosure */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <p>© 2024 Shopluxe. All Rights Reserved.</p>
            <p className="text-[10px] text-zinc-600 mt-0.5">
              Affiliate Disclosure: ShopLuxe earns a small commission on qualifying affiliate sales at zero extra cost to you.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
