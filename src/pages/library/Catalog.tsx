import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";

const MOCK_BOOKS = [
  { id: "1", title: "Deeper Christian Life", author: "W.F. Kumuyi", category: "Devotional", available: true, cover: "📘" },
  { id: "2", title: "The Christian Pilgrim", author: "John Bunyan", category: "Classic", available: true, cover: "📗" },
  { id: "3", title: "Prayer & Fasting", author: "W.F. Kumuyi", category: "Prayer", available: false, cover: "📕" },
  { id: "4", title: "Holiness & Godliness", author: "W.F. Kumuyi", category: "Doctrine", available: true, cover: "📙" },
  { id: "5", title: "Bible Study Companion", author: "DLCF Press", category: "Study", available: true, cover: "📓" },
  { id: "6", title: "Youth on Fire", author: "DLCF Press", category: "Youth", available: false, cover: "📒" },
];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const filtered = MOCK_BOOKS.filter(
    (b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Library Catalog</h1>
        <p className="mt-1 text-muted-foreground">Browse and borrow from our collection</p>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search books…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((book) => (
          <Link
            key={book.id}
            to={`/library/${book.id}`}
            className="group flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary text-3xl">
              {book.cover}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-display text-base font-semibold text-foreground group-hover:text-primary">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={book.available ? "default" : "secondary"}>
                  {book.available ? "Available" : "Borrowed"}
                </Badge>
                <span className="text-xs text-muted-foreground">{book.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
