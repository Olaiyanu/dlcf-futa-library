import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogDetail = () => {
  const { id } = useParams();

  return (
    <div className="container max-w-3xl py-10">
      <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <article>
        <Badge variant="secondary">Devotional</Badge>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-foreground">The Power of Early Morning Devotion</h1>
        <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><User className="h-4 w-4" />Pastor David</span>
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Feb 20, 2026</span>
        </div>

        <div className="mt-8 space-y-4 text-foreground leading-relaxed">
          <p>There is something powerful about seeking God's face in the early hours of the morning. The Scriptures are replete with examples of men and women who made it a habit to commune with God before the day began.</p>
          <p>As students at FUTA, the demands of academic life can be overwhelming. Yet, it is precisely in these moments of pressure that our devotional life becomes most critical. Starting each day in God's presence provides the spiritual foundation needed to navigate lectures, assignments, and campus relationships with wisdom and grace.</p>
          <p>"But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." — Isaiah 40:31</p>
          <p>Let us commit to rising early, opening our Bibles, and spending quality time in prayer. The rewards are eternal.</p>
        </div>
      </article>

      {/* Comments */}
      <div className="mt-12 border-t border-border pt-8">
        <h3 className="font-display text-lg font-semibold text-foreground">Comments</h3>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-sm font-medium text-foreground">Grace Adeola</p>
            <p className="mt-1 text-sm text-muted-foreground">This really blessed me. God bless you, Pastor!</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Input placeholder="Write a comment…" className="flex-1" />
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
