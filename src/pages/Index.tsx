import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingBag, PenSquare, Trophy, CreditCard, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: BookOpen, title: "Library", desc: "Browse and borrow from our extensive catalog of Christian literature.", link: "/library" },
  { icon: ShoppingBag, title: "Bookstore", desc: "Purchase books, devotionals, and study materials.", link: "/store" },
  { icon: PenSquare, title: "Blog", desc: "Read articles, testimonies, and ministry updates.", link: "/blog" },
  { icon: Trophy, title: "Quiz", desc: "Test your Bible knowledge and compete with others.", link: "/quiz" },
  { icon: CreditCard, title: "Rentals", desc: "Rent digital books and study resources.", link: "/rentals" },
  { icon: Users, title: "Membership", desc: "Join the fellowship and access exclusive resources.", link: "/auth/register" },
];

const Index = () => (
  <div>
    {/* Hero Section */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Campus fellowship" className="h-full w-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>
      <div className="container relative z-10 flex min-h-[520px] flex-col items-center justify-center py-20 text-center">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl animate-fade-in">
          DLCF FUTA LIBRARY
        </h1>
        <p className="mt-4 max-w-xl text-lg font-semibold uppercase tracking-widest text-primary-foreground/90 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          Raising Saintly Intellectuals
        </p>
        <div className="mt-8 flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/library">Explore Library</Link>
          </Button>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/auth/register">Join Fellowship</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="container py-20">
      <h2 className="text-center font-display text-3xl font-bold text-foreground">Everything You Need</h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
        A unified platform for learning, growing, and connecting.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Link
            key={f.title}
            to={f.link}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <f.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to Grow Deeper?</h2>
        <p className="mt-2 text-primary-foreground/80">Create your account and start exploring today.</p>
        <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link to="/auth/register">Get Started</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default Index;
