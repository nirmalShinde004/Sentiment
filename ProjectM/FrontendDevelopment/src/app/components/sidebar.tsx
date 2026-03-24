import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  History,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
    { icon: Search, label: "Request Product", path: "/app/request" },
    { icon: History, label: "My Results", path: "/app/history" },
    { icon: Settings, label: "Settings", path: "/app/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r p-6 flex flex-col">
      <Link to="/app" className="flex items-center gap-2 mb-8">
        <Sparkles />
        <span className="text-xl font-bold">SentimentX</span>
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