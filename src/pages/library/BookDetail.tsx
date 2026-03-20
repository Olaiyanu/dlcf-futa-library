import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, hasRole } = useAuth();
  const { toast } = useToast();

  // Mock data — replace with React Query call
  const book = {
    id,
    title: "Deeper Christian Life",
    author: "W.F. Kumuyi",
    category: "Devotional",
    available: true,
    description: "A comprehensive guide to living a deeper Christian life, filled with scriptural truths and practical teachings for spiritual growth.",
    pages: 320,
    year: 2020,
    isbn: "978-0-123456-78-9",
  };

  const handleBorrow = () => {
    if (!isAuthenticated) {
      toast({ title: "Sign in required", description: "Please log in to borrow books.", variant: "destructive" });
      return;
    }
    toast({ title: "Book reserved!", description: `"${book.title}" has been reserved for pickup.` });
  };

  return (
    <div className="container max-w-3xl py-10">
      <Link to="/library" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </Link>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-lg bg-secondary text-6xl">📘</div>
          <div className="flex-1">
            <Badge>{book.category}</Badge>
            <h1 className="mt-2 font-display text-2xl font-bold text-foreground">{book.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground"><User className="h-4 w-4" />{book.author}</p>
            <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{book.pages} pages</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{book.year}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{book.description}</p>
            <div className="mt-6 flex gap-3">
              {book.available ? (
                <Button onClick={handleBorrow}>
                  {hasRole(["member", "admin", "superadmin"]) ? "Borrow Book" : "Sign in to Borrow"}
                </Button>
              ) : (
                <Button disabled variant="secondary">Currently Unavailable</Button>
              )}
              <Button variant="outline">Reserve</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
