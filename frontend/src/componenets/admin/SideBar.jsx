import { LayoutDashboard, Package, Users } from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "users", label: "Users", icon: Users },
];

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  return (
    <aside className={`w-64 bg-white shadow-lg ${sidebarOpen ? "block" : "hidden"} lg:block`}>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg ${
              activeTab === item.id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
