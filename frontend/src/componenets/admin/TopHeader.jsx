import { Menu, Bell, User } from "lucide-react";

const TopHeader = ({ setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
        <Menu />
      </button>

      <div className="flex items-center gap-4">
        <Bell />
        <User />
      </div>
    </header>
  );
};

export default TopHeader;
