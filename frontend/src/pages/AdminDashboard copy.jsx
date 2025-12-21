import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Package, ShoppingCart, TrendingUp, DollarSign, 
  Menu, X, Bell, Search, ChevronDown, User, LogOut, Settings, 
  Eye, Edit, Trash2, Plus, Filter, Download, ArrowUp, ArrowDown, Save, LogIn
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AdminDashboard = () => {

  const {isLoggedIn} = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Products State
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 249.99, stock: 23, status: 'Active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
    { id: 3, name: 'Designer T-Shirt', category: 'Clothing', price: 29.99, stock: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    { id: 4, name: 'Running Shoes', category: 'Sports', price: 89.99, stock: 67, status: 'Active', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
    { id: 5, name: 'Coffee Maker', category: 'Home & Garden', price: 79.99, stock: 15, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100&h=100&fit=crop' },
    { id: 6, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 12, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' },
    { id: 7, name: 'Yoga Mat', category: 'Sports', price: 34.99, stock: 89, status: 'Active', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop' },
    { id: 8, name: 'Backpack', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
  ]);

  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active'
  });
  
  // Users State
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'Customer', joined: '2024-12-20', orders: 5, status: 'Active' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'Customer', joined: '2024-12-19', orders: 3, status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Customer', joined: '2024-12-18', orders: 0, status: 'Active' },
    { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Admin', joined: '2024-12-17', orders: 8, status: 'Active' },
    { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'Customer', joined: '2024-12-16', orders: 12, status: 'Active' },
    { id: 6, name: 'Frank Thomas', email: 'frank@example.com', role: 'Customer', joined: '2024-12-15', orders: 2, status: 'Inactive' },
  ]);

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'Active'
  });

  // Stats calculation
  const stats = [
    { title: 'Total Products', value: products.length, change: '+12', trend: 'up', icon: Package, color: 'bg-blue-500' },
    { title: 'Total Users', value: users.length, change: '+23', trend: 'up', icon: Users, color: 'bg-purple-500' },
    { title: 'Active Products', value: products.filter(p => p.status === 'Active').length, change: '+5', trend: 'up', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Low Stock Items', value: products.filter(p => p.stock < 20).length, change: '-3', trend: 'down', icon: DollarSign, color: 'bg-orange-500' },
  ];

  // Product CRUD Operations
  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active'
    });
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.category || !productForm.price || !productForm.stock) {
      alert('Please fill all fields');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productForm, price: parseFloat(productForm.price), stock: parseInt(productForm.stock) }
          : p
      ));
      alert('Product updated successfully!');
    } else {
      const newProduct = {
        id: products.length + 1,
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      };
      setProducts([...products, newProduct]);
      alert('Product added successfully!');
    }
    setShowProductModal(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      alert('Product deleted successfully!');
    }
  };

  // User CRUD Operations
  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      role: 'user',
      status: 'Active'
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name || !userForm.email) {
      alert('Please fill all fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...userForm }
          : u
      ));
      alert('User updated successfully!');
    } else {
      const newUser = {
        id: users.length + 1,
        ...userForm,
        joined: new Date().toISOString().split('T')[0],
        orders: 0
      };
      setUsers([...users, newUser]);
      alert('User added successfully!');
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('User deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out of stock':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-600 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
                setSearchQuery('');
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@shophub.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800">
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative" >
                            <button
                              onClick={() => setShowProfileMenu(!showProfileMenu)}
                              className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                {isLoggedIn ? (
                                  <User className="text-white w-5 h-5" />
                                ) : (
                                  <LogIn className="text-white w-5 h-5" />
                                )}
                              </div>
                              <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
              
                            {showProfileMenu && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                {isLoggedIn ? (
                                  <>
                                    <button
                                      onClick={handleLogout}
                                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    >
                                      Logout
                                    </button>
                                  </>
                                ) : (
                                  <a
                                    href="/signin"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                  >
                                    Sign In
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeTab === 'dashboard' && (
            <>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of your store statistics</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`flex items-center text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Manage Products</h3>
                  <p className="mb-4 text-white text-opacity-90">Add, edit, or remove products from your store</p>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Go to Products
                  </button>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Manage Users</h3>
                  <p className="mb-4 text-white text-opacity-90">View and manage all registered users</p>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Go to Users
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
                  <p className="text-gray-600 mt-1">Manage all products in your store</p>
                </div>
                <button
                  onClick={handleAddProduct}
                  className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Product</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Category</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Price</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Stock</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm font-semibold text-gray-800">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-700">{product.category}</td>
                          <td className="p-4 text-sm font-semibold text-gray-800">${product.price}</td>
                          <td className="p-4 text-sm text-gray-700">{product.stock}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                  <p className="text-gray-600 mt-1">Manage all registered users</p>
                </div>
                <button
                  onClick={handleAddUser}
                  className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add User</span>
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Name</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Email</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Role</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Joined</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Orders</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="p-4 text-sm font-semibold text-gray-800">{user.name}</td>
                          <td className="p-4 text-sm text-gray-700">{user.email}</td>
                          <td className="p-4 text-sm text-gray-700">{user.role}</td>
                          <td className="p-4 text-sm text-gray-700">{user.joined}</td>
                          <td className="p-4 text-sm text-gray-700">{user.orders}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleEditUser(user)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {(activeTab === 'orders' || activeTab === 'settings') && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
              <p className="text-gray-600">This section is under development</p>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Sports">Sports</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={productForm.status}
                  onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Update' : 'Save'}</span>
                </button>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingUser ? 'Edit User' : 'Add User'}
              </h2>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={userForm.status}
                  onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveUser}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingUser ? 'Update' : 'Save'}</span>
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;