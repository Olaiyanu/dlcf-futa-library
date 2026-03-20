import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { BookOpen, ShoppingBag, LayoutDashboard, User, Trophy, BookMarked, CreditCard, LogOut } from "lucide-react";
import Navbar from "./Navbar";

const sidebarItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/books", label: "My Books", icon: BookMarked },
  { to: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { to: "/dashboard/quizzes", label: "My Quizzes", icon: Trophy },
  { to: "/dashboard/rentals", label: "Rentals", icon: CreditCard },
  { to: "/profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex flex-1 gap-6 py-6">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-20 rounded-xl bg-card p-4 shadow-sm border border-border">
            <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
