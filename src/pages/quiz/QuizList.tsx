import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users } from "lucide-react";

const QUIZZES = [
  { id: "1", title: "Book of Genesis Challenge", questions: 20, time: "15 min", participants: 87, difficulty: "Medium", active: true },
  { id: "2", title: "New Testament Basics", questions: 15, time: "10 min", participants: 124, difficulty: "Easy", active: true },
  { id: "3", title: "Epistles of Paul", questions: 25, time: "20 min", participants: 56, difficulty: "Hard", active: false },
  { id: "4", title: "Psalms & Proverbs", questions: 20, time: "15 min", participants: 93, difficulty: "Medium", active: true },
];

const QuizList = () => (
  <div className="container py-10">
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Bible Quiz</h1>
        <p className="mt-1 text-muted-foreground">Test your knowledge and compete with fellow students</p>
      </div>
      <Button variant="outline" asChild>
        <Link to="/quiz/leaderboard" className="gap-2"><Trophy className="h-4 w-4" /> Leaderboard</Link>
      </Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {QUIZZES.map((quiz) => (
        <div key={quiz.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <Badge variant={quiz.active ? "default" : "secondary"}>{quiz.active ? "Active" : "Ended"}</Badge>
            <Badge variant="outline">{quiz.difficulty}</Badge>
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{quiz.title}</h3>
          <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{quiz.time}</span>
            <span>{quiz.questions} questions</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{quiz.participants}</span>
          </div>
          <Button className="mt-4 w-full" disabled={!quiz.active} asChild={quiz.active}>
            {quiz.active ? <Link to={`/quiz/${quiz.id}`}>Start Quiz</Link> : <span>Ended</span>}
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default QuizList;
