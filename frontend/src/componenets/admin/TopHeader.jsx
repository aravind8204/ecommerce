import { Menu, Search, Bell, User, LogIn, ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";

const TopHeader = ({ setSidebarOpen, 
                      setSearchQuery, 
                      searchQuery, 
                      setShowProfileMenu, 
                      showProfileMenu }) => {
  
  const {isLoggedIn} = useApp();
  
  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/signin");
  };
  return (
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
  );
};

export default TopHeader;
