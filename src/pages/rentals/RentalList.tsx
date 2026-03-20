import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, BookOpen, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";

const RENTALS = [
  { id: "1", title: "Systematic Theology Vol. 1", price: 500, duration: "7 days", emoji: "📘" },
  { id: "2", title: "Bible Commentary: Gospels", price: 800, duration: "14 days", emoji: "📗" },
  { id: "3", title: "Church History Compendium", price: 600, duration: "7 days", emoji: "📙" },
  { id: "4", title: "Greek New Testament Study", price: 1000, duration: "30 days", emoji: "📕" },
];

const RentalList = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Digital Rentals</h1>
        <p className="mt-1 text-muted-foreground">Rent digital books and study resources</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {RENTALS.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-secondary text-3xl">{item.emoji}</div>
              <div className="flex-1">
                <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{item.duration}</span>
                  <span className="font-bold text-primary">₦{item.price}</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full gap-2"
              onClick={() => {
                if (!isAuthenticated) {
                  toast({ title: "Sign in required", variant: "destructive" });
                  return;
                }
                toast({ title: "Rental started!", description: `You now have access to "${item.title}"` });
              }}
            >
              <CreditCard className="h-4 w-4" /> Rent Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalList;
