import { createBrowserRouter } from "react-router-dom";

import { Root } from "./components/root";
import { Home } from "./pages/home";
import { Features } from "./pages/features";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

// ✅ USER PANEL
import { DashboardLayout } from "./components/dashboard-layout";
import { Dashboard } from "./pages/dashboard";
import { AnalysisResults } from "./pages/analysis-results";
import { ProductHistory } from "./pages/product-history";
// import { ReportDetails } from "./pages/report-details";
import { AccountSettings } from "./pages/account-settings";

// 🔥 NEW (IMPORTANT)
import  RequestProduct  from "./pages/RequestProduct";

// ✅ ADMIN PANEL
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminLayout } from "./components/AdminLayout"; 

export const router = createBrowserRouter([
  // ----------------------------
  // PUBLIC ROUTES
  // ----------------------------
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "features", Component: Features },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },

  // ----------------------------
  // USER PANEL (/app)
  // ----------------------------
  {
    path: "/app",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },

      // 🔥 NEW ROUTE (USER SEND REQUEST)
      { path: "request", Component: RequestProduct },

      // { path: "results/:id", Component: AnalysisResults },
      { path: "history", Component: ProductHistory },
      { path: "results/:id", Component: AnalysisResults },
      { path: "settings", Component: AccountSettings },
    ],
  },

  // ----------------------------
  // ADMIN PANEL (/admin)
  // ----------------------------
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
    ],
  },
]);