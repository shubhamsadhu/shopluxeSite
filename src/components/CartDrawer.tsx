import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    setIsCheckoutOpen,
    viewProductDetails
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-base font-extrabold uppercase tracking-wide text-zinc-950">
                Shopping Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="cart-drawer-close-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-bold text-zinc-800">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-zinc-600" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-700">🎉 Congratulations! You unlocked Free Shipping!</span>
                ) : (
                  <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> for Free Shipping</span>
                )}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-950 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900">Your cart is currently empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Browse our exclusive ShopLuxe collection or check out trending items to add to your order.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-3 bg-[#fbfbf9] rounded-2xl border border-zinc-200/80 items-center"
                >
                  <div
                    onClick={() => {
                      viewProductDetails(item.product);
                      setIsCartOpen(false);
                    }}
                    className="w-16 h-16 rounded-xl bg-white border border-zinc-200 p-1 flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        viewProductDetails(item.product);
                        setIsCartOpen(false);
                      }}
                      className="text-xs font-bold text-zinc-900 truncate hover:text-[#b3834f] cursor-pointer"
                    >
                      {item.product.title}
                    </h4>
                    {item.selectedColor && (
                      <span className="text-[10px] text-zinc-500 block">Color: {item.selectedColor}</span>
                    )}
                    <span className="text-xs font-extrabold text-zinc-950 block mt-1">
                      ${item.product.price.toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-950">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-zinc-950">
                    {cartTotal >= 50 ? 'FREE' : '$9.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Estimated Total</span>
                  <span>${(cartTotal + (cartTotal >= 50 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted & Guaranteed Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
