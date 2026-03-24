import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}