"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  address?: UserAddress;
}

export interface RegisteredAccount {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  password: string;
  role?: string;
  address?: UserAddress;
}

export interface OrderItem {
  productId: string;
  productName: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: "Processing" | "Confirmed" | "Shipped" | "Delivered";
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  authMode: "signin" | "signup";
  openAuthModal: (mode?: "signin" | "signup") => void;
  closeAuthModal: () => void;
  login: (userData: AuthUser) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<AuthUser>) => void;
  // Account Registration & Validation
  registerAccount: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    password: string;
  }) => { success: boolean; error?: string };
  authenticateUser: (
    identifier: string,
    passwordAttempt: string
  ) => { success: boolean; error?: string; user?: AuthUser };
  // Wishlist
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: {
      fullName: string;
      phone: string;
      addressLine: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: string;
  }) => Order;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "buraq_auth_user";
const ACCOUNTS_STORAGE_KEY = "buraq_registered_accounts";
const WISHLIST_STORAGE_KEY = "buraq_wishlist";
const ORDERS_STORAGE_KEY = "buraq_orders";

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    name: "Arjun Banerjee",
    email: "arjun.b@bengalinfra.com",
    phone: "+91 98301 23456",
    company: "Bengal Infrastructure & Projects",
    password: "password123",
    role: "Commercial Buyer",
    address: {
      street: "Plot 14, Sector V, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
    },
  },
];

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: "BURAQ-ORD-89421",
    date: "10 Nov 2026",
    status: "Confirmed",
    totalAmount: 34990,
    paymentMethod: "B2B Wholesale Invoice (Offline Transfer)",
    shippingAddress: {
      fullName: "Arjun Banerjee",
      phone: "+91 98301 23456",
      addressLine: "Plot 14, Sector V, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
    },
    items: [
      {
        productId: "high-bay-warehouse-lights",
        productName: "UFO Industrial LED High Bay Fixtures",
        category: "lighting",
        image: "/images/products/industrial-highbay-lights.jpg",
        price: 3499,
        quantity: 10,
      },
    ],
  },
  {
    id: "BURAQ-ORD-77104",
    date: "04 Nov 2026",
    status: "Delivered",
    totalAmount: 18400,
    paymentMethod: "Cash on Delivery",
    shippingAddress: {
      fullName: "Arjun Banerjee",
      phone: "+91 98301 23456",
      addressLine: "Plot 14, Sector V, Salt Lake City",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
    },
    items: [
      {
        productId: "solar-dc-cable",
        productName: "1.5kV DC Cross-Linked Solar PV Cables",
        category: "solar",
        image: "/images/products/solar-dc-cable.jpg",
        price: 4600,
        quantity: 4,
      },
    ],
  },
];

const INITIAL_DEMO_WISHLIST: string[] = [
  "luxury-pendant-chandelier",
  "antique-brass-moroccan-lanterns",
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registeredAccounts, setRegisteredAccounts] =
    useState<RegisteredAccount[]>(DEFAULT_ACCOUNTS);
  const [wishlist, setWishlist] = useState<string[]>(INITIAL_DEMO_WISHLIST);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // 1. Registered Accounts Registry
      const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (storedAccounts) {
        const parsed = JSON.parse(storedAccounts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRegisteredAccounts(parsed);
        } else {
          setRegisteredAccounts(DEFAULT_ACCOUNTS);
          localStorage.setItem(
            ACCOUNTS_STORAGE_KEY,
            JSON.stringify(DEFAULT_ACCOUNTS)
          );
        }
      } else {
        setRegisteredAccounts(DEFAULT_ACCOUNTS);
        localStorage.setItem(
          ACCOUNTS_STORAGE_KEY,
          JSON.stringify(DEFAULT_ACCOUNTS)
        );
      }

      // 2. Active Logged-In User (Strict: only logged in if explicitly saved)
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && typeof parsed === "object" && parsed.email) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      // 3. Wishlist
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        const parsed = JSON.parse(storedWishlist);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      } else {
        localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(INITIAL_DEMO_WISHLIST)
        );
      }

      // 4. Orders
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      } else {
        localStorage.setItem(
          ORDERS_STORAGE_KEY,
          JSON.stringify(INITIAL_DEMO_ORDERS)
        );
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

      // Automatically register account if not present yet
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      let currentAccounts = registeredAccounts;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentAccounts = parsed;
        }
      }

      const cleanEmail = userData.email.toLowerCase();
      if (!currentAccounts.some((acc) => acc.email.toLowerCase() === cleanEmail)) {
        const newAcc: RegisteredAccount = {
          name: userData.name,
          email: cleanEmail,
          phone: userData.phone,
          company: userData.company,
          password: "", // Google verified
          role: userData.role || "Verified Google Buyer",
          address: userData.address,
        };
        const updated = [...currentAccounts, newAcc];
        setRegisteredAccounts(updated);
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {
      // Ignore
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const registerAccount = (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    password: string;
  }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhoneDigits = (data.phone || "").replace(/\D/g, "");

    // Retrieve freshest accounts from localStorage
    let currentAccounts = registeredAccounts;
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentAccounts = parsed;
        }
      }
    } catch {
      // Ignore
    }

    // Check if account with same email or phone already exists
    const existing = currentAccounts.find(
      (acc) =>
        acc.email.toLowerCase() === cleanEmail ||
        (cleanPhoneDigits &&
          cleanPhoneDigits.length >= 8 &&
          acc.phone &&
          acc.phone.replace(/\D/g, "") === cleanPhoneDigits)
    );

    if (existing) {
      return {
        success: false,
        error: "An account with this email address or phone already exists. Please Sign In.",
      };
    }

    if (data.password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long.",
      };
    }

    const newAccount: RegisteredAccount = {
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone?.trim() || undefined,
      company: data.company?.trim() || undefined,
      password: data.password,
      role: "B2B Contractor",
    };

    const nextAccounts = [...currentAccounts, newAccount];
    setRegisteredAccounts(nextAccounts);
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(nextAccounts));
    } catch {
      // Ignore
    }

    // Automatically log user in upon successful sign up
    const userObj: AuthUser = {
      name: newAccount.name,
      email: newAccount.email,
      phone: newAccount.phone,
      company: newAccount.company,
      role: newAccount.role,
    };
    login(userObj);

    return { success: true };
  };

  const authenticateUser = (
    identifier: string,
    passwordAttempt: string
  ): { success: boolean; error?: string; user?: AuthUser } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhoneDigits = identifier.replace(/\D/g, "");

    // Retrieve freshest accounts from localStorage
    let currentAccounts = registeredAccounts;
    try {
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentAccounts = parsed;
        }
      }
    } catch {
      // Ignore
    }

    // Find account by email or phone
    const account = currentAccounts.find((acc) => {
      const matchEmail = acc.email.toLowerCase() === cleanId;
      const matchPhone =
        cleanPhoneDigits &&
        cleanPhoneDigits.length >= 8 &&
        acc.phone &&
        acc.phone.replace(/\D/g, "").includes(cleanPhoneDigits);
      return matchEmail || matchPhone;
    });

    if (!account) {
      return {
        success: false,
        error: "No account found with this email or phone number. Please check your spelling or Sign Up first.",
      };
    }

    // STRICT PASSWORD CHECK!
    if (account.password !== passwordAttempt) {
      return {
        success: false,
        error: "Incorrect password! Please enter the exact password you created when signing up.",
      };
    }

    // Password matches! Log the user in
    const userObj: AuthUser = {
      name: account.name,
      email: account.email,
      phone: account.phone,
      company: account.company,
      role: account.role,
      address: account.address,
    };
    login(userObj);

    return { success: true, user: userObj };
  };

  const updateProfile = (updatedData: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const nextUser = {
        ...prev,
        ...updatedData,
        address: {
          ...(prev?.address || {}),
          ...(updatedData.address || {}),
        },
      };
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
      } catch {
        // Ignore
      }

      // Also update in registeredAccounts
      setRegisteredAccounts((accounts) => {
        const next = accounts.map((acc) =>
          acc.email.toLowerCase() === prev.email.toLowerCase()
            ? { ...acc, ...updatedData }
            : acc
        );
        try {
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });

      return nextUser;
    });
  };

  const addToWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev;
      const next = [productId, ...prev];
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.filter((id) => id !== productId);
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const toggleWishlist = (productId: string): boolean => {
    let isAdded = false;
    setWishlist((prev) => {
      let next: string[];
      if (prev.includes(productId)) {
        next = prev.filter((id) => id !== productId);
        isAdded = false;
      } else {
        next = [productId, ...prev];
        isAdded = true;
      }
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
    return isAdded;
  };

  const isWishlisted = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  const placeOrder = (orderData: {
    items: OrderItem[];
    totalAmount: number;
    shippingAddress: {
      fullName: string;
      phone: string;
      addressLine: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: string;
  }): Order => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      id: `BURAQ-ORD-${randomId}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Confirmed",
      ...orderData,
    };

    setOrders((prev) => {
      const next = [newOrder, ...prev];
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });

    return newOrder;
  };

  const openAuthModal = (mode: "signin" | "signup" = "signin") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        isLoggedIn: mounted && !!user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        updateProfile,
        registerAccount,
        authenticateUser,
        wishlist: mounted ? wishlist : INITIAL_DEMO_WISHLIST,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        orders: mounted ? orders : INITIAL_DEMO_ORDERS,
        placeOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
