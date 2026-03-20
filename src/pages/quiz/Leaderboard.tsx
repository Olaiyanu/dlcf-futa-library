import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal } from "lucide-react";

const LEADERS = [
  { rank: 1, name: "Blessing Okonkwo", score: 98, quizzes: 12 },
  { rank: 2, name: "Samuel Adeyemi", score: 95, quizzes: 11 },
  { rank: 3, name: "Grace Adeola", score: 92, quizzes: 14 },
  { rank: 4, name: "David Okafor", score: 88, quizzes: 9 },
  { rank: 5, name: "Faith Abiodun", score: 85, quizzes: 10 },
  { rank: 6, name: "Emmanuel Taiwo", score: 82, quizzes: 8 },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-accent" />;
  if (rank <= 3) return <Medal className="h-5 w-5 text-muted-foreground" />;
  return <span className="text-sm font-bold text-muted-foreground">{rank}</span>;
};

const Leaderboard = () => (
  <div className="container max-w-2xl py-10">
    <Link to="/quiz" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Back to Quizzes
    </Link>
    <h1 className="font-display text-3xl font-bold text-foreground">Leaderboard</h1>
    <p className="mt-1 mb-8 text-muted-foreground">Top quiz performers this month</p>

    <div className="space-y-2">
      {LEADERS.map((leader) => (
        <div
          key={leader.rank}
          className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
            leader.rank <= 3 ? "border-primary/30 bg-primary/5" : "border-border bg-card"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center">{getRankIcon(leader.rank)}</div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{leader.name}</p>
            <p className="text-xs text-muted-foreground">{leader.quizzes} quizzes completed</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">{leader.score}%</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Leaderboard;
