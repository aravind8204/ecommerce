import React, { useState } from "react";
import Sidebar from "../componenets/admin/SideBar";
import TopHeader from "../componenets/admin/TopHeader";
import DashboardHome from "../componenets/admin/DashboardHome";
import ProductTable from "../componenets/admin/ProductTable";
import UserTable from "../componenets/admin/UserTable";
import ProductModal from "../componenets/admin/ProductModal";


const AdminDashboard = () => {

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
    
    // Users State
    const [users, setUsers] = useState([
      { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'Customer', joined: '2024-12-20', orders: 5, status: 'Active' },
      { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'Customer', joined: '2024-12-19', orders: 3, status: 'Active' },
      { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Customer', joined: '2024-12-18', orders: 0, status: 'Active' },
      { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Admin', joined: '2024-12-17', orders: 8, status: 'Active' },
      { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'Customer', joined: '2024-12-16', orders: 12, status: 'Active' },
      { id: 6, name: 'Frank Thomas', email: 'frank@example.com', role: 'Customer', joined: '2024-12-15', orders: 2, status: 'Inactive' },
    ]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <TopHeader setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "products" && <ProductTable products={products} />}
          {activeTab === "users" && <UserTable getStatusColor={getStatusColor} setUsers={setUsers} users={users} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
