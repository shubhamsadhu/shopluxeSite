import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Review } from '../types';
import {
  Star,
  ShoppingBag,
  ExternalLink,
  Scale,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Share2,
  ThumbsUp,
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const {
    selectedProduct,
    setActiveTab,
    setSelectedCategory,
    addToCart,
    handleAffiliateClick,
    addToComparison,
    removeFromComparison,
    isInComparison,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    currentUser,
    setIsAuthModalOpen,
    showToast
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <p className="text-zinc-600 mb-4">No product selected</p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-6 py-2.5 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedProduct.specs.colorOptions?.[0] || 'Default'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTabSub, setActiveTabSub] = useState<'specs' | 'features' | 'reviews'>('features');

  // Review Form state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewAuthorName, setReviewAuthorName] = useState<string>(currentUser?.displayName || '');

  const productReviews = reviews[selectedProduct.id] || [];
  const isFavorited = isInWishlist(selectedProduct.id);
  const isCompared = isInComparison(selectedProduct.id);

  const images = selectedProduct.galleryImages && selectedProduct.galleryImages.length > 0
    ? selectedProduct.galleryImages
    : [selectedProduct.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast({ type: 'warning', title: 'Please complete your review and comment' });
      return;
    }

    addReview(selectedProduct.id, {
      userName: reviewAuthorName.trim() || (currentUser ? currentUser.displayName : 'Verified Shopper'),
      userAvatar: currentUser?.photoURL,
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewTitle('');
    setReviewComment('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({ type: 'info', title: 'Link copied to clipboard!' });
    }
  };

  return (
    <div id="product-details-view" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('home')}
          className="hover:text-zinc-950 transition-colors font-medium"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <button
          onClick={() => {
            setActiveTab('shop');
            setSelectedCategory(selectedProduct.category);
          }}
          className="hover:text-zinc-950 transition-colors font-medium"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 font-bold truncate max-w-xs">
          {selectedProduct.title}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs">
        
        {/* Left: Interactive Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-square w-full bg-[#f8f8f6] rounded-2xl overflow-hidden border border-zinc-200/60 flex items-center justify-center p-6">
            <img
              src={images[activeImageIndex] || selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
            />
            {selectedProduct.discountBadge && (
              <span className="absolute top-4 left-4 bg-zinc-950 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {selectedProduct.discountBadge}
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-700 shadow-sm transition-colors"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-[#f8f8f6] border-2 p-1.5 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-zinc-950 shadow-xs'
                      : 'border-transparent hover:border-zinc-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box & Specs (6 cols) */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div>
            {/* Type badge & Category */}
            <div className="flex items-center gap-2 mb-2">
              {selectedProduct.type === 'affiliate' ? (
                <span className="bg-amber-100 text-amber-900 border border-amber-300/80 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span>Verified Affiliate Partner Deal</span>
                </span>
              ) : (
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  ShopLuxe Direct Exclusive
                </span>
              )}
              <span className="text-xs font-semibold text-zinc-400">
                {selectedProduct.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
              {selectedProduct.title}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-zinc-900">
                {selectedProduct.rating.toFixed(1)} / 5.0
              </span>
              <span className="text-xs text-zinc-400">•</span>
              <button
                onClick={() => setActiveTabSub('reviews')}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 underline cursor-pointer"
              >
                {selectedProduct.reviewCount} customer reviews
              </button>
            </div>

            {/* Pricing Row */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-zinc-100">
              <span className="text-3xl font-extrabold text-zinc-950">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-base text-zinc-400 line-through font-normal">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)} (
                    {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-4">
              {selectedProduct.description}
            </p>

            {/* Color / Variant Options */}
            {selectedProduct.specs.colorOptions && selectedProduct.specs.colorOptions.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
                  Select Color: <span className="font-semibold text-zinc-600">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {selectedProduct.specs.colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedColor === color
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Affiliate Commission Transparency Notice */}
            {selectedProduct.type === 'affiliate' && selectedProduct.affiliateCommissionNotice && (
              <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-tight text-[11px]">
                  <strong>Affiliate Disclosure:</strong> {selectedProduct.affiliateCommissionNotice}
                </span>
              </div>
            )}

            {/* Multi-Store Price Comparison Table for Affiliate Products */}
            {selectedProduct.type === 'affiliate' && selectedProduct.storeComparisons && selectedProduct.storeComparisons.length > 0 && (
              <div className="mt-6 border border-zinc-200 rounded-2xl p-4 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                    <span>Live Multi-Store Price Check</span>
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-medium">Updated 10m ago</span>
                </div>
                <div className="space-y-2">
                  {selectedProduct.storeComparisons.map((store, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 bg-white border border-zinc-200/80 rounded-xl text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900">{store.storeName}</span>
                        {store.badge && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            {store.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-zinc-950">${store.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAffiliateClick(selectedProduct, store.url, store.storeName)}
                          className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Go to Store</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Own Product: Quantity Selector */}
            {selectedProduct.type === 'own' && (
              <div className="mt-5 flex items-center gap-4">
                <label className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-zinc-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-200 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock • Ready to dispatch</span>
                </span>
              </div>
            )}

          </div>

          {/* Primary Action Buttons */}
          <div className="pt-6 border-t border-zinc-100 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {selectedProduct.type === 'affiliate' ? (
                <button
                  id="product-details-buy-affiliate-btn"
                  onClick={() => handleAffiliateClick(selectedProduct)}
                  className="w-full flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>BUY NOW ON {selectedProduct.affiliateVendor ? selectedProduct.affiliateVendor.toUpperCase() : 'PARTNER STORE'}</span>
                </button>
              ) : (
                <button
                  id="product-details-add-cart-btn"
                  onClick={() => addToCart(selectedProduct, quantity, selectedColor)}
                  className="w-full flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART • ${(selectedProduct.price * quantity).toFixed(2)}</span>
                </button>
              )}

              {/* Add / Remove from Compare button */}
              <button
                id="product-details-compare-btn"
                onClick={() => isCompared ? removeFromComparison(selectedProduct.id) : addToComparison(selectedProduct)}
                className={`py-3.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                  isCompared
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
              </button>

              {/* Wishlist Button */}
              <button
                id="product-details-wishlist-btn"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3.5 rounded-xl border transition-all shrink-0 ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                }`}
                title={isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Quick compare shortcut */}
            {isCompared && (
              <div className="flex items-center justify-between text-xs bg-amber-50 p-2.5 rounded-xl text-amber-900">
                <span>Product is queued in your side-by-side comparison matrix.</span>
                <button
                  onClick={() => setActiveTab('compare')}
                  className="font-bold underline cursor-pointer"
                >
                  View Comparison Tool →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Tabs Section: Key Features, Specifications, Customer Reviews */}
      <div className="mt-10 bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs">
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-3">
          <button
            onClick={() => setActiveTabSub('features')}
            className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors relative ${
              activeTabSub === 'features'
                ? 'text-zinc-950 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Key Highlights & Features
          </button>
          <button
            onClick={() => setActiveTabSub('specs')}
            className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors relative ${
              activeTabSub === 'specs'
                ? 'text-zinc-950 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTabSub('reviews')}
            className={`pb-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors relative ${
              activeTabSub === 'reviews'
                ? 'text-zinc-950 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-zinc-950'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Verified Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab 1: Key Features + Pros/Cons */}
        {activeTabSub === 'features' && (
          <div className="pt-6 space-y-8 animate-in fade-in">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 mb-4">
                Core Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-700 font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons Section */}
            {(selectedProduct.pros || selectedProduct.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                {selectedProduct.pros && (
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70">
                    <h4 className="text-xs font-black uppercase text-emerald-900 mb-2 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>The Advantages</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-emerald-950">
                      {selectedProduct.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.cons && (
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <h4 className="text-xs font-black uppercase text-zinc-800 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-zinc-500" />
                      <span>Things to Consider</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      {selectedProduct.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Technical Specifications Grid */}
        {activeTabSub === 'specs' && (
          <div className="pt-6 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {Object.entries(selectedProduct.specs).map(([key, val]) => {
                if (!val) return null;
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const displayValue = Array.isArray(val) ? val.join(', ') : val;
                return (
                  <div key={key} className="flex justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-xs">
                    <span className="font-bold text-zinc-500 uppercase tracking-wider">{formattedKey}</span>
                    <span className="font-semibold text-zinc-900 text-right">{displayValue}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Verified Reviews & Submit Form */}
        {activeTabSub === 'reviews' && (
          <div className="pt-6 space-y-8 animate-in fade-in">
            {/* Reviews List */}
            <div className="space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-zinc-200/80 bg-[#fbfbf9] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.userName}`}
                          alt={rev.userName}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-200"
                        />
                        <div>
                          <span className="text-xs font-bold text-zinc-900">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="ml-2 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-zinc-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`}
                        />
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-zinc-900">{rev.title}</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500 italic">No reviews yet for this product. Be the first to share your experience!</p>
              )}
            </div>

            {/* Write a Review Box */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-3">
                Write a Verified Customer Review
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-zinc-700">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={reviewAuthorName}
                      onChange={(e) => setReviewAuthorName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Headline / Title</label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Exceeded my expectations!"
                      className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Your Honest Feedback</label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share details on quality, fit, battery life, or shipping speed..."
                    className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
