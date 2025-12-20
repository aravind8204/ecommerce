import React, { useState } from "react";
import { ShoppingCart, Search, User, Menu, X, ChevronDown, LogIn } from "lucide-react";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import { useApp } from "../context/AppContext";

const Product = () => {
  const {
    isLoggedIn,
    cartItems,
    addToCart,
    removeFromCart,
    cartCount,
    getTotalPrice,
    navigate,
    products,
    categories,decreaseQty
  } = useApp();

  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please login to access cart");
      navigate("/signin");
      return;
    }
    setShowCart(!showCart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                                  onClick={() => addToCart(item)}
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

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold mt-1 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Product;
