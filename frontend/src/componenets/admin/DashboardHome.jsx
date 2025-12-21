import StatsCards from "./StatsCards";

const DashboardHome = ({setActiveTab}) => {
  return (
    <div className="flex-1 p-4 lg:p-8 overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <StatsCards />

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
    </div>
  );
};

export default DashboardHome;
