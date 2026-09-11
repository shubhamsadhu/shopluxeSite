import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  Heart,
  TrendingUp,
  LogOut,
  ExternalLink,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Trash2,
  Share2
} from 'lucide-react';

export const AccountDashboard: React.FC = () => {
  const {
    currentUser,
    logout,
    orders,
    wishlist,
    products,
    removeFromWishlist,
    viewProductDetails,
    addToCart,
    handleAffiliateClick,
    setActiveTab,
    setIsAuthModalOpen
  } = useStore();

  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'wishlist' | 'affiliate'>('orders');

  if (!currentUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-zinc-950">Member Account</h2>
        <p className="text-xs text-zinc-500 mt-1 mb-6">
          Sign in to view your orders, tracked deliveries, and saved items.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div id="account-dashboard-view" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Profile Summary */}
      <div className="bg-[#f5f4ef] rounded-3xl p-6 sm:p-8 border border-stone-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.displayName}`}
            alt={currentUser.displayName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black uppercase text-zinc-950">
                {currentUser.displayName}
              </h1>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                VIP Member
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('shop')}
            className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={logout}
            className="px-4 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-6">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'orders'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'wishlist'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Saved Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('affiliate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'affiliate'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Affiliate Activity</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeSubTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-zinc-200 text-center">
              <Package className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-zinc-900">No Direct Orders Yet</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Orders made for ShopLuxe Direct products will appear here with live tracking status.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-2xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 text-xs">
                  <div>
                    <span className="font-extrabold text-zinc-900">Order #{order.id}</span>
                    <span className="text-zinc-400 ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{order.status}</span>
                    </span>
                    <span className="font-black text-zinc-950">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.title} className="w-10 h-10 object-contain" />
                        <div>
                          <span className="font-bold text-zinc-900">{item.product.title}</span>
                          <span className="text-zinc-500 block text-[11px]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-zinc-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Shipping to {order.shippingAddress.address}, {order.shippingAddress.city}</span>
                  <span className="text-emerald-700 font-bold">Standard Tracked Delivery (3-5 Days)</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeSubTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-zinc-200 text-center">
              <Heart className="w-12 h-12 text-zinc-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-zinc-900">Your Wishlist is Empty</h3>
              <p className="text-xs text-zinc-500 mt-1">
                Click the heart icon on any product or affiliate deal to save it for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-zinc-200 p-4 flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-[#f8f8f6] rounded-xl p-3 mb-3 flex items-center justify-center">
                    <img src={p.image} alt={p.title} className="w-full h-full object-contain mix-blend-multiply" />
                    <button
                      onClick={() => removeFromWishlist(p.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-zinc-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h4
                      onClick={() => viewProductDetails(p)}
                      className="text-xs font-bold text-zinc-900 truncate hover:text-amber-700 cursor-pointer"
                    >
                      {p.title}
                    </h4>
                    <span className="text-sm font-extrabold text-zinc-950 block mt-1">${p.price.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-zinc-100">
                    {p.type === 'affiliate' ? (
                      <button
                        onClick={() => handleAffiliateClick(p)}
                        className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-amber-400" />
                        <span>Buy on {p.affiliateVendor || 'Store'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(p)}
                        className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Affiliate Transparency & Partner Analytics */}
      {activeSubTab === 'affiliate' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-base font-bold text-zinc-950">ShopLuxe Affiliate Network Transparency</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              ShopLuxe partners with vetted global vendors including Amazon, Best Buy, Walmart, and specialty brands. When visitors click through our curated price comparisons, we receive a small commission that helps keep our research free for shoppers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
              <span className="text-xs font-bold text-zinc-500 uppercase">Affiliate Partners</span>
              <p className="text-2xl font-black text-zinc-950 mt-1">12 Vetted Stores</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
              <span className="text-xs font-bold text-zinc-500 uppercase">Average Savings</span>
              <p className="text-2xl font-black text-zinc-950 mt-1">22.4% OFF</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
              <span className="text-xs font-bold text-zinc-500 uppercase">Commission Transparency</span>
              <p className="text-2xl font-black text-emerald-700 mt-1">100% Disclosed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
