import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PRODUCTS = [
  { id: "1", name: "Daily Manna Devotional 2026", price: 3500, category: "Devotional", emoji: "📖" },
  { id: "2", name: "DLCF Hymn Book", price: 1500, category: "Worship", emoji: "🎵" },
  { id: "3", name: "Bible Study Notebook", price: 800, category: "Stationery", emoji: "📓" },
  { id: "4", name: "Prayer Journal", price: 1200, category: "Journal", emoji: "✍️" },
  { id: "5", name: "Christian Living Guide", price: 2500, category: "Book", emoji: "📚" },
  { id: "6", name: "Campus Fellowship T-Shirt", price: 4000, category: "Merch", emoji: "👕" },
];

const Shop = () => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Bookstore</h1>
          <p className="mt-1 text-muted-foreground">Books, devotionals, and fellowship materials</p>
        </div>
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" /> Cart (0)
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.id} className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-secondary text-5xl">
              {product.emoji}
            </div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h3 className="font-display text-base font-semibold text-foreground">{product.name}</h3>
            <p className="mt-1 text-lg font-bold text-primary">₦{product.price.toLocaleString()}</p>
            <Button
              className="mt-3 w-full gap-2"
              size="sm"
              onClick={() => toast({ title: "Added to cart", description: product.name })}
            >
              <Plus className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
