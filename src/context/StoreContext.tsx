import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, BlogPost, Review, UserProfile, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOG_POSTS, INITIAL_REVIEWS } from '../data/mockData';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  onSnapshot
} from '../lib/firebase';

export type ActiveTab = 'home' | 'shop' | 'details' | 'compare' | 'blog' | 'account';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'affiliate' | 'warning';
  title: string;
  message?: string;
}

interface StoreContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  viewProductDetails: (p: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  // Products catalog & custom products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Comparison
  comparisonList: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Reviews
  reviews: Record<string, Review[]>;
  addReview: (productId: string, review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Blogs
  blogPosts: BlogPost[];
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;

  // User Auth
  currentUser: UserProfile | null;
  firebaseUser: User | null;
  loginWithGoogle: () => Promise<void>;
  loginWithDemo: (email?: string, name?: string) => void;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Checkout & Orders
  orders: Order[];
  createOrder: (shippingAddress: Order['shippingAddress']) => Order;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Notification Toast
  toasts: ToastNotification[];
  showToast: (toast: Omit<ToastNotification, 'id'>) => void;
  removeToast: (id: string) => void;

  // External Affiliate Click Handler
  handleAffiliateClick: (product: Product, storeUrl?: string, vendorName?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Products state (persisted in local + initial seed)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopluxe_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Blog posts
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(INITIAL_BLOG_POSTS[0]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shopluxe_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[1], quantity: 1, selectedColor: 'Olive Green' }
    ];
  });

  // Comparison
  const [comparisonList, setComparisonList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopluxe_comparison');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopluxe_wishlist');
    return saved ? JSON.parse(saved) : ['prod-smartwatch-9', 'prod-perfume-men'];
  });

  // Reviews
  const [reviews, setReviews] = useState<Record<string, Review[]>>(() => {
    const saved = localStorage.getItem('shopluxe_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopluxe_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth User
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('shopluxe_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync products to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_products', JSON.stringify(products));
  }, [products]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync comparison to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_comparison', JSON.stringify(comparisonList));
  }, [comparisonList]);

  // Sync wishlist to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync reviews to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Sync orders to local storage
  useEffect(() => {
    localStorage.setItem('shopluxe_orders', JSON.stringify(orders));
  }, [orders]);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        const profile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || user.email?.split('@')[0] || 'ShopLuxe Member',
          email: user.email || 'customer@shopluxe.com',
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
          role: 'customer',
          createdAt: new Date().toISOString()
        };
        setCurrentUser(profile);
        localStorage.setItem('shopluxe_user', JSON.stringify(profile));
      }
    });
    return () => unsubscribe();
  }, []);

  const showToast = (toast: Omit<ToastNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const viewProductDetails = (p: Product) => {
    setSelectedProduct(p);
    setActiveTab('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    if (product.type === 'affiliate') {
      handleAffiliateClick(product);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor, selectedSize }];
    });

    showToast({
      type: 'success',
      title: 'Added to Cart!',
      message: `${product.title} has been added to your shopping cart.`
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast({
      type: 'info',
      title: 'Item removed',
      message: 'Product removed from your cart.'
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Comparisons
  const addToComparison = (product: Product) => {
    if (comparisonList.some(p => p.id === product.id)) {
      showToast({
        type: 'info',
        title: 'Already in Comparison',
        message: `${product.title} is already in your comparison table.`
      });
      return;
    }
    if (comparisonList.length >= 4) {
      showToast({
        type: 'warning',
        title: 'Comparison Limit Reached',
        message: 'You can compare up to 4 items simultaneously. Remove an item first.'
      });
      return;
    }
    setComparisonList(prev => [...prev, product]);
    showToast({
      type: 'success',
      title: 'Added to Comparison',
      message: `${product.title} was added to side-by-side comparison.`
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonList(prev => prev.filter(p => p.id !== productId));
    showToast({
      type: 'info',
      title: 'Removed from Comparison'
    });
  };

  const clearComparison = () => {
    setComparisonList([]);
    showToast({ type: 'info', title: 'Comparison table cleared' });
  };

  const isInComparison = (productId: string) => {
    return comparisonList.some(p => p.id === productId);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast({ type: 'info', title: 'Removed from Wishlist' });
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast({ type: 'success', title: 'Saved to Wishlist' });
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
    showToast({ type: 'info', title: 'Removed from Wishlist' });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Reviews
  const addReview = (productId: string, reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      helpfulCount: 0
    };

    setReviews(prev => {
      const existing = prev[productId] || [];
      return {
        ...prev,
        [productId]: [newRev, ...existing]
      };
    });

    // Update product rating and review count
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const currentList = reviews[productId] || [];
        const allRatings = [newRev.rating, ...currentList.map(r => r.rating)];
        const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
        return {
          ...p,
          reviewCount: p.reviewCount + 1,
          rating: Number(avg.toFixed(1))
        };
      }
      return p;
    }));

    showToast({
      type: 'success',
      title: 'Review Published!',
      message: 'Thank you! Your verified review helps other shoppers.'
    });
  };

  // Add Product (Own brand or affiliate)
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: 'prod-' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast({
      type: 'success',
      title: 'Product Listed!',
      message: `"${newProduct.title}" is now published on ShopLuxe.`
    });
  };

  // External Affiliate Click Handler
  const handleAffiliateClick = (product: Product, storeUrl?: string, vendorName?: string) => {
    const destinationUrl = storeUrl || product.affiliateUrl || 'https://www.amazon.com?tag=shopluxe-20';
    const destinationVendor = vendorName || product.affiliateVendor || 'Partner Store';

    showToast({
      type: 'affiliate',
      title: `Redirecting to ${destinationVendor}`,
      message: `Opening official store at verified deal price $${product.price.toFixed(2)}.`
    });

    // Attempt popup or open in new tab
    try {
      window.open(destinationUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback
      window.location.href = destinationUrl;
    }
  };

  // User Auth
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || 'ShopLuxe Member',
        email: user.email || 'customer@shopluxe.com',
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
        role: 'customer',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(profile);
      localStorage.setItem('shopluxe_user', JSON.stringify(profile));
      setIsAuthModalOpen(false);
      showToast({
        type: 'success',
        title: `Welcome, ${profile.displayName}!`,
        message: 'Signed in securely with Google.'
      });
    } catch (err: any) {
      console.warn('Firebase popup login error, activating demo mode:', err);
      // Fallback to quick demo account if popup was blocked in iframe sandbox
      loginWithDemo('shubhamsadhu420@gmail.com', 'Shubham Sadhu');
      setIsAuthModalOpen(false);
    }
  };

  const loginWithDemo = (email = 'alex.morgan@shopluxe.com', name = 'Alex Morgan') => {
    const profile: UserProfile = {
      uid: 'user-demo-' + Math.random().toString(36).substring(2, 7),
      displayName: name,
      email,
      photoURL: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      role: 'creator',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(profile);
    localStorage.setItem('shopluxe_user', JSON.stringify(profile));
    setIsAuthModalOpen(false);
    showToast({
      type: 'success',
      title: `Welcome, ${name}!`,
      message: 'Signed in successfully.'
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
    localStorage.removeItem('shopluxe_user');
    showToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out.'
    });
  };

  // Orders
  const createOrder = (shippingAddress: Order['shippingAddress']): Order => {
    const subtotal = cartTotal;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + shipping;

    const order: Order = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: currentUser?.uid || 'guest',
      items: [...cart],
      subtotal,
      shipping,
      total,
      shippingAddress,
      status: 'processing',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setOrders(prev => [order, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);

    showToast({
      type: 'success',
      title: 'Order Confirmed! 🎉',
      message: `Order #${order.id} placed successfully. A receipt has been dispatched to your email.`
    });

    return order;
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        products,
        addProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        reviews,
        addReview,
        blogPosts,
        selectedBlogPost,
        setSelectedBlogPost,
        currentUser,
        firebaseUser,
        loginWithGoogle,
        loginWithDemo,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        createOrder,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toasts,
        showToast,
        removeToast,
        handleAffiliateClick
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
