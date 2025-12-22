import { Package, Users } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";


const StatsCards = () => {
  
  const {products,users} = useAdmin();
  
  const stats = [
    { title: "Products", value: products?.length, icon: Package },
    { title: "Users", value: users?.length, icon: Users },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow">
          <stat.icon />
          <h3 className="text-xl font-bold">{stat.value}</h3>
          <p>{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
