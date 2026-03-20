import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

const QUESTIONS = [
  { q: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "David"], answer: 1 },
  { q: "How many days did God take to create the world?", options: ["5", "6", "7", "10"], answer: 1 },
  { q: "What is the first book of the Bible?", options: ["Exodus", "Genesis", "Leviticus", "Psalms"], answer: 1 },
  { q: "Who was thrown into the lion's den?", options: ["Shadrach", "Daniel", "Elijah", "Jonah"], answer: 1 },
  { q: "What was the name of Moses' brother?", options: ["Joshua", "Caleb", "Aaron", "Levi"], answer: 2 },
];

const QuizPlay = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (finished || timeLeft <= 0) { setFinished(true); return; }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished]);

  const handleNext = () => {
    if (selected === QUESTIONS[current].answer) setScore((s) => s + 1);
    if (current + 1 >= QUESTIONS.length) { setFinished(true); return; }
    setCurrent((c) => c + 1);
    setSelected(null);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (finished) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-10">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">🏆</div>
          <h2 className="font-display text-2xl font-bold text-foreground">Quiz Complete!</h2>
          <p className="mt-2 text-4xl font-bold text-primary">{score}/{QUESTIONS.length}</p>
          <p className="mt-1 text-muted-foreground">Correct answers</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={() => navigate("/quiz")}>Back to Quizzes</Button>
            <Button variant="outline" onClick={() => navigate("/quiz/leaderboard")}>Leaderboard</Button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[current];

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Question {current + 1}/{QUESTIONS.length}</span>
        <span className="flex items-center gap-1 text-sm font-mono text-muted-foreground">
          <Clock className="h-4 w-4" />{mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <Progress value={((current + 1) / QUESTIONS.length) * 100} className="mb-8" />

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-foreground">{question.q}</h2>
        <div className="mt-6 space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full rounded-lg border p-3 text-left text-sm font-medium transition-colors ${
                selected === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={handleNext} disabled={selected === null}>
          {current + 1 === QUESTIONS.length ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};

export default QuizPlay;
