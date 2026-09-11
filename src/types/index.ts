export type ProductType = 'own' | 'affiliate';

export interface AffiliateStorePrice {
  storeName: 'Amazon' | 'Best Buy' | 'Walmart' | 'Sephora' | 'Target' | 'Nike';
  price: number;
  url: string;
  inStock: boolean;
  badge?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'Accessories' | 'Electronics' | 'Home & Living' | 'Fashion' | 'Beauty' | 'Sports' | 'Toys & Games';
  type: ProductType;
  price: number;
  originalPrice?: number;
  discountBadge?: string; // e.g. "-20%", "-15%", "BESTSELLER", "EXCLUSIVE"
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: {
    brand: string;
    model?: string;
    material?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
    colorOptions?: string[];
    origin?: string;
  };
  inStock: boolean;
  stockQuantity?: number;
  // Affiliate specific
  affiliateUrl?: string;
  affiliateVendor?: string; // e.g. "Amazon.com", "Best Buy"
  affiliateCommissionNotice?: string;
  storeComparisons?: AffiliateStorePrice[];
  // Own product specific
  isShopLuxeExclusive?: boolean;
  creatorId?: string;
  createdAt: string;
  pros?: string[];
  cons?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
  featuredProductId?: string;
  secondaryProductIds?: string[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role?: 'customer' | 'creator' | 'admin';
  createdAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
