import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductType } from '../types';
import { X, PlusCircle, ExternalLink, Package, Image as ImageIcon } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const { addProduct, currentUser } = useStore();

  const [type, setType] = useState<ProductType>('own');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Accessories' | 'Electronics' | 'Home & Living' | 'Fashion' | 'Beauty' | 'Sports' | 'Toys & Games'>('Electronics');
  const [price, setPrice] = useState('49.99');
  const [originalPrice, setOriginalPrice] = useState('69.99');
  const [discountBadge, setDiscountBadge] = useState('NEW');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = useState('Crafted with precision engineering and high quality materials.');
  const [brand, setBrand] = useState('ShopLuxe Studio');
  
  // Affiliate specific fields
  const [affiliateUrl, setAffiliateUrl] = useState('https://www.amazon.com?tag=shopluxe-20');
  const [affiliateVendor, setAffiliateVendor] = useState('Amazon.com');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProduct({
      title: title.trim() || 'New Showcase Item',
      slug: (title || 'new-product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      type,
      price: parseFloat(price) || 29.99,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      discountBadge: discountBadge || undefined,
      rating: 5.0,
      reviewCount: 1,
      image: image.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      galleryImages: [image.trim()],
      description: description.trim(),
      features: [
        'Premium build quality tested by ShopLuxe quality control',
        'Direct warranty and customer support coverage',
        'Fast and insured domestic shipping'
      ],
      specs: {
        brand: brand.trim() || 'ShopLuxe Brand',
        warranty: '1-Year Full Warranty',
        colorOptions: ['Default']
      },
      inStock: true,
      stockQuantity: 25,
      affiliateUrl: type === 'affiliate' ? affiliateUrl : undefined,
      affiliateVendor: type === 'affiliate' ? affiliateVendor : undefined,
      affiliateCommissionNotice: type === 'affiliate' ? 'Earns commission on verified sales.' : undefined,
      isShopLuxeExclusive: type === 'own',
      creatorId: currentUser?.uid
    });

    onClose();
  };

  return (
    <div id="add-product-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-950">
              List Product or Affiliate Deal
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Publish directly to the ShopLuxe catalogue for all shoppers
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-950">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Inventory Type Toggle */}
          <div>
            <label className="block font-bold text-zinc-800 uppercase mb-2">Item Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('own')}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  type === 'own'
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>ShopLuxe Direct (Own Product)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('affiliate')}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  type === 'affiliate'
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Affiliate Partner Deal</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Product Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ergonomic Bluetooth Mechanical Keyboard"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium"
              >
                {['Accessories', 'Electronics', 'Home & Living', 'Fashion', 'Beauty', 'Sports', 'Toys & Games'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Brand / Maker</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="ShopLuxe Studio"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Original ($)</label>
              <input
                type="number"
                step="0.01"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 uppercase mb-1">Badge</label>
              <input
                type="text"
                value={discountBadge}
                onChange={(e) => setDiscountBadge(e.target.value)}
                placeholder="-20% / NEW"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
              />
            </div>
          </div>

          {/* If Affiliate, ask for URL & Vendor */}
          {type === 'affiliate' && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
              <div>
                <label className="block font-bold text-amber-900 uppercase mb-1">Affiliate Destination URL</label>
                <input
                  type="url"
                  required={type === 'affiliate'}
                  value={affiliateUrl}
                  onChange={(e) => setAffiliateUrl(e.target.value)}
                  placeholder="https://www.amazon.com/dp/...?tag=myid-20"
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-zinc-900"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 uppercase mb-1">Retailer / Vendor Name</label>
                <input
                  type="text"
                  value={affiliateVendor}
                  onChange={(e) => setAffiliateVendor(e.target.value)}
                  placeholder="Amazon, Best Buy, Sephora, Target"
                  className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-zinc-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Image URL</label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 uppercase mb-1">Short Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer mt-2"
          >
            Publish to Store
          </button>
        </form>

      </div>
    </div>
  );
};
