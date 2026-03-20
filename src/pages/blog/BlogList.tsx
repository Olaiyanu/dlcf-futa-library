import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

const POSTS = [
  { id: "1", title: "The Power of Early Morning Devotion", author: "Pastor David", date: "Feb 20, 2026", category: "Devotional", excerpt: "Discover how starting your day in God's presence transforms your campus life and spiritual growth." },
  { id: "2", title: "Navigating University Life as a Believer", author: "Grace Adeola", date: "Feb 18, 2026", category: "Campus Life", excerpt: "Practical tips for maintaining your faith while excelling in academics at FUTA." },
  { id: "3", title: "DLCF FUTA Crusade Highlights", author: "Media Team", date: "Feb 15, 2026", category: "Events", excerpt: "A recap of the powerful moments from our annual campus crusade event." },
  { id: "4", title: "Understanding the Book of Romans", author: "Bro. Samuel", date: "Feb 12, 2026", category: "Bible Study", excerpt: "A deep dive into Paul's epistle to the Romans and its relevance today." },
];

const BlogList = () => (
  <div className="container max-w-3xl py-10">
    <div className="mb-8">
      <h1 className="font-display text-3xl font-bold text-foreground">Blog</h1>
      <p className="mt-1 text-muted-foreground">Articles, devotionals, and fellowship updates</p>
    </div>

    <div className="space-y-4">
      {POSTS.map((post) => (
        <Link
          key={post.id}
          to={`/blog/${post.id}`}
          className="block rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Badge variant="secondary">{post.category}</Badge>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">{post.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default BlogList;
