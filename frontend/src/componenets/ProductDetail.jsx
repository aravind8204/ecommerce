import React, { useState, useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
// import { ShoppingCart, Search, User, Menu, X, ChevronDown, LogIn } from "lucide-react";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import { useApp } from "../context/AppContext";
import { useParams } from "react-router-dom";


const ProductDetail = () => {
  const { isLoggedIn, addToCart, decreaseQty, cartItems, products, cartCount } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [qty,setQty] = useState(0);

  const {id} = useParams();

//   const product = {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 199.99,
//     category: "Electronics",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
//     description:
//       "High-quality wireless headphones with noise cancellation, deep bass, and 40-hour battery life.",
//     features: [
//       "Active Noise Cancellation",
//       "40 Hours Battery",
//       "Bluetooth 5.3",
//       "Fast Charging",
//     ],
//   };

  const product = products.find((product)=> product._id===id);

  useEffect(() => {
  if (!product) return;

  const cartProduct = cartItems.find(
    (i) => i.product._id === product._id
  );

  if (cartProduct) {
    setQty(cartProduct.quantity);
  } else {
    setQty(0);
  }
}, [cartItems, product]);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  const handleIncrease = () => {
    setQty((count)=>count+1)
  }

  const handleDecrease = () => {
    setQty((count)=>count-1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

        {/* Cart Sidebar (same as Home) */}
              {showCart && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-50"
                  onClick={() => setShowCart(false)}
                >
                  <div
                    className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between mb-6">
                      <h2 className="text-2xl font-bold">Shopping Cart</h2>
                      <X onClick={() => setShowCart(false)} className="cursor-pointer" />
                    </div>
        
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-500">Cart is empty</p>
                    ) : (
                                  <>
                                    {/* Cart Items */}
                                    <div className="space-y-4">
                                    {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-20 h-20 object-cover rounded"
                                    />
                    
                                    <div className="flex-1">
                                      <h3 className="font-semibold">{item.title}</h3>
                                      <p className="text-blue-600 font-bold">
                                        ${item.price} × {item.qty}
                                      </p>
                    
                                      {/* Quantity Controls */}
                                      <div className="flex items-center gap-2 mt-2">
                                        <button
                                          onClick={() => decreaseQty(item.id)}
                                          className="px-2 py-1 border rounded"
                                        >
                                          −
                                        </button>
                    
                                        <span className="font-semibold">{item.qty}</span>
                    
                                        <button
                                          onClick={() => addToCart({item,cartItems})}
                                          className="px-2 py-1 border rounded"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                    
                                    {/* Remove Button */}
                                    <button
                                      onClick={() => removeFromCart(item.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                                    {/* Cart Total & Checkout */}
                                    <div className="mt-6 pt-6 border-t">
                                      <div className="flex justify-between text-xl font-bold mb-4">
                                        <span>Total:</span>
                                        <span>${getTotalPrice()}</span>
                                      </div>
                                      <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                                        Checkout
                                      </button>
                                    </div>
                                  </>
                                )}
                  </div>
                </div>
              )}

      {/* Product Detail */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow">
          {/* Image */}
          <img
            src={product.image}
            alt={product.title}
            className=" h-96 object-cover rounded w-fit"
          />

          {/* Details */}
          <div>
            <span className="text-sm text-gray-500 uppercase">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold mt-2">{product.title}</h1>

            <p className="text-gray-600 mt-4">{product.description}</p>

            <ul className="mt-4 list-disc list-inside text-gray-600">
              {//product.features.map((f, i) => (
                //<li key={i}>{f}</li>
              //))
              }
            </ul>

            <p className="text-3xl text-blue-600 font-bold mt-6">
              ${product.price}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleDecrease}
                className="p-2 border rounded hover:bg-gray-100"
                disabled={qty === 0}
              >
                <Minus />
              </button>

              <span className="text-xl font-bold">{qty}</span>

              <button
                onClick={handleIncrease}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Plus />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart({product,qty})}
              className="mt-6 w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
