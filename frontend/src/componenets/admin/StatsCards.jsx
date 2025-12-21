import { Package, Users } from "lucide-react";

const stats = [
  { title: "Products", value: 120, icon: Package },
  { title: "Users", value: 85, icon: Users },
];

const StatsCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
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
