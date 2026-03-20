import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingBag, PenSquare, Trophy, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import dlcfLogo from "@/assets/dlcf-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/library", label: "Library", icon: BookOpen },
  { to: "/store", label: "Store", icon: ShoppingBag },
  { to: "/blog", label: "Blog", icon: PenSquare },
  { to: "/quiz", label: "Quiz", icon: Trophy },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={dlcfLogo} alt="DLCF FUTA Logo" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-bold text-foreground">DLCF FUTA LIBRARY</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                {user?.role === "admin" || user?.role === "superadmin" ? (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>Admin Panel</DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/auth/login")}>Sign In</Button>
              <Button onClick={() => navigate("/auth/register")}>Join Us</Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}>Dashboard</Button>
                  <Button variant="ghost" className="justify-start text-destructive" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => { navigate("/auth/login"); setMobileOpen(false); }}>Sign In</Button>
                  <Button onClick={() => { navigate("/auth/register"); setMobileOpen(false); }}>Join Us</Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
