import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  /** ================= States ================= */
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /** ================= Axios Instance ================= */
  const api = axios.create({
    baseURL: backendUrl,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  /** ================= Items ================= */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/items");
      setItems(data || []);
      toast.success("Items loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch items");
      console.error("Fetch items error:", error);
    } finally {
      setLoading(false);
    }
  };

  /** ================= Cart ================= */
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart?.items || []);
      toast.success("Cart loaded!");
    } catch (error) {
      toast.error("Failed to fetch cart");
      console.error("Cart fetch error:", error);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    try {
      const { data } = await api.post("/cart", { itemId, quantity });
      setCart(data.cart?.items || []);
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      setCart(data.cart?.items || []);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove from cart");
      console.error(error);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      setCart(data.cart?.items || []);
      toast.success("Cart updated!");
    } catch (error) {
      toast.error("Failed to update cart");
      console.error(error);
    }
  };

  /** ================= Wishlist ================= */
  const fetchWishlist = async () => {
    try {
      const { data } = await api.get("/wishlist");
      setWishlist(data.items || []);
      toast.success("Wishlist loaded!");
    } catch (error) {
      toast.error("Failed to fetch wishlist");
      console.error("Wishlist fetch error:", error);
    }
  };

  const addToWishlist = async (itemId) => {
    try {
      const { data } = await api.post("/wishlist", { itemId });
      setWishlist(data.items || []);
      toast.success("Item added to wishlist!");
    } catch (error) {
      toast.error("Failed to add to wishlist");
      console.error(error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const { data } = await api.delete(`/wishlist/${itemId}`);
      setWishlist(data.items || []);
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      console.error(error);
    }
  };

  /** ================= User Profile ================= */
  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setUser(data.userData || null);
      toast.success("Profile loaded!");
    } catch (error) {
      toast.error("Failed to fetch profile");
      console.error("Profile fetch error:", error);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const { data } = await api.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        fetchProfile();
        toast.success("Profile updated!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  /** ================= Orders ================= */
  const createOrder = async (orderData) => {
    try {
      const { data } = await api.post("/orders", orderData);
      if (data.success) {
        toast.success("Order placed successfully!");
        setOrders((prev) => [data.order, ...prev]);
        fetchCart(); // refresh cart after order completion
      }
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      if (data.success) {
        setOrders(data.orders || []);
        toast.success("Orders loaded!");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Fetch orders error:", error);
    }
  };

  /** ================= App Load ================= */
  useEffect(() => {
    fetchItems();
    if (localStorage.getItem("token")) {
      fetchCart();
      fetchWishlist();
      fetchProfile();
      fetchOrders();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        api,
        user,
        setUser,
        items,
        cart,
        wishlist,
        orders,
        loading,
        fetchItems,
        fetchCart,
        fetchWishlist,
        fetchProfile,
        fetchOrders,
        addToCart,
        removeFromCart,
        updateCartItem,
        addToWishlist,
        removeFromWishlist,
        updateProfile,
        createOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
