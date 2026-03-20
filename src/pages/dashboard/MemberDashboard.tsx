import { useAuth } from "@/lib/auth";
import { BookOpen, ShoppingBag, Trophy, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Books Borrowed", value: "3", icon: BookOpen, link: "/dashboard/books" },
  { label: "Orders", value: "2", icon: ShoppingBag, link: "/dashboard/orders" },
  { label: "Quizzes Taken", value: "7", icon: Trophy, link: "/dashboard/quizzes" },
  { label: "Active Rentals", value: "1", icon: CreditCard, link: "/dashboard/rentals" },
];

const MemberDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's an overview of your activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{s.value}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Library Card */}
      <div className="mt-8 rounded-xl hero-gradient p-6 text-primary-foreground">
        <h3 className="font-display text-lg font-bold">Your Library Card</h3>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary-foreground/20 text-sm font-mono">
            QR Code
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm opacity-80">ID: {user?.membershipId}</p>
            <p className="text-sm opacity-80 capitalize">Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
