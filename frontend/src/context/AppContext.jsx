import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

/* =========================================================
   CONTEXT CREATION
========================================================= */
const AppContext = createContext();

/* =========================================================
   APP PROVIDER
========================================================= */
export const AppProvider = ({ children }) => {
  /* ---------- COOKIES ---------- */
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  /* ---------- AUTH STATE ---------- */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  /* ---------- CART STATE ---------- */
  const [cartItems, setCartItems] = useState([]);

  /* -------- PRODUCT STATE --------- */
  const [products,setProducts] = useState([]);

  const [totalPages, setTotalPages] = useState(1);

  /* ---------- ROUTER ---------- */
  const navigate = useNavigate();

  /* =========================================================
     STATIC DATA (TEMPORARY / DEMO)
  ========================================================= */
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  // const products = [
  //   {
  //     id: 1,
  //     name: "Wireless Headphones",
  //     price: 99.99,
  //     category: "Electronics",
  //     image:
  //       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Watch",
  //     price: 249.99,
  //     category: "Electronics",
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 3,
  //     name: "Designer T-Shirt",
  //     price: 29.99,
  //     category: "Clothing",
  //     image:
  //       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 4,
  //     name: "Running Shoes",
  //     price: 89.99,
  //     category: "Sports",
  //     image:
  //       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 5,
  //     name: "Coffee Maker",
  //     price: 79.99,
  //     category: "Home & Garden",
  //     image:
  //       "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 6,
  //     name: "Bestseller Novel",
  //     price: 19.99,
  //     category: "Books",
  //     image:
  //       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 7,
  //     name: "Laptop",
  //     price: 999.99,
  //     category: "Electronics",
  //     image:
  //       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  //   },
  //   {
  //     id: 8,
  //     name: "Yoga Mat",
  //     price: 34.99,
  //     category: "Sports",
  //     image:
  //       "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
  //   },
  // ];

  /* =========================================================
     PRODUCT FUNCTIONS
  ========================================================= */

  // Get all products
  const getAllProducts = async(page=1) => {
    try{
      const res = await api.get(`/product/products?page=${page}`);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    }catch(err){
      console.log(err);
    }
  }

  /* =========================================================
     CART FUNCTIONS
  ========================================================= */

  const getCartItems = async() => {
    try {
      const res = await api.get("/cart/find", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.log(err);
    }
  }


  // Add product to cart
//   const addToCart = (product) => {
//   setCartItems((prev) => {
//     const existing = prev.find((item) => item.id === product.id);

//     if (existing) {
//       return prev.map((item) =>
//         item.id === product.id
//           ? { ...item, qty: item.qty + 1 }
//           : item
//       );
//     }

//     return [...prev, { ...product, qty: 1 }];
//   });
// };

  const addToCart = async ({ product, qty }) => {
  try {
    if (qty <= 0) {
      // remove if quantity is zero
      const cartItem = cartItems.find(
        (i) => i.product._id === product._id
      );
      if (cartItem) {
        await removeFromCart(cartItem._id);
      }
      return;
    }

    await api.post(
      "/cart/addcart",
      { productId: product._id, quantity: qty },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    );

    getCartItems();
  } catch (err) {
    console.log(err);
  }
};



  // Remove product from cart using index
  const removeFromCart = async(id) => {
  try{
    const res = await api.delete(`/cart/delete/${id}`,{headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(res)
  }catch(err){
    console.log(err);
  }
};


  // Total items count
  const cartCount = cartItems.reduce(
  (t, i) => t + (i.quantity || 0),
  0
);



  // Total cart price
  const getTotalPrice = () => {
  return cartItems
    .reduce((total, item) => {
      const price = item.product?.price ?? item.price ?? 0;
      const qty = item.qty ?? item.quantity ?? 1;
      return total + price * qty;
    }, 0)
    .toFixed(2);
};

  /* =========================================================
     AUTH FUNCTIONS
  ========================================================= */

  // Login user
  const login = async (email, password) => {
    try {
      const res = await api.post("/user/login", { email, password });

      alert(res.data.message);
      setCookie("token", res.data.token, { path: "/" , maxAge:60*60*24*7});
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Logout user
  const logout = () => {
    removeCookie("token", { path: "/" });
    setUser({});
    setIsLoggedIn(false);
    navigate("/");
  };

  // Signup user
  const signup = async (name, email, mobileNumber, password) => {
    try {
      await api.post("/user/create", {
        name,
        email,
        mobileNumber,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================================================
     USER & OTP FUNCTIONS
  ========================================================= */

  // Fetch logged-in user details
  const getUser = async () => {
    try {
      const res = await api.get("/user/getuser", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  // Send OTP for forgot password
  const sendOtp = async ({ email }) => {
    try {
      const res = await api.post("/user/sendotp", { email });
      if (res.status === 200) alert("OTP sent successfully");
    } catch (err) {
      console.log(err);
    }
  };

  // Verify OTP
  const verifyOtp = async ({ email, otp }) => {
    try {
      return await api.post("/user/verifyotp", { email, otp });
    } catch (err) {
      console.log(err);
    }
  };

  /* =========================================================
     SIDE EFFECTS
  ========================================================= */

  // Check login status when token changes
useEffect(() => {
  getAllProducts();
}, [products]);

useEffect(() => {
  if (cookies.token) {
    setIsLoggedIn(true);
    getUser();
    getCartItems();
  } else {
    setIsLoggedIn(false);
  }
}, [cookies.token,getCartItems]);


  /* =========================================================
     CONTEXT PROVIDER
  ========================================================= */
  return (
    <AppContext.Provider
      value={{
        // Auth
        login,
        logout,
        signup,
        isLoggedIn,
        user,
        navigate,

        // OTP
        sendOtp,
        verifyOtp,

        // Cart
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
        getTotalPrice,

        // Products
        products,
        categories,
        totalPages,
        getAllProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* =========================================================
   CUSTOM HOOK
========================================================= */
export const useApp = () => useContext(AppContext);
