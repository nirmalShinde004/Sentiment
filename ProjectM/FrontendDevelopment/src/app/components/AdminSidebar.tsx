import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";

export function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Shield, label: "Requests", path: "/admin" },
    { icon: Users, label: "Users", path: "/admin" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r p-6 flex flex-col">
      <Link to="/admin" className="flex items-center gap-2 mb-8">
        <Sparkles />
        <span className="text-xl font-bold">Admin Panel</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded",
                isActive ? "bg-primary text-white" : "hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link to="/" className="mt-auto flex gap-2">
        <LogOut />
        Logout
      </Link>
    </aside>
  );
}