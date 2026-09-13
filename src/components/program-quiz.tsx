import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { getProgram } from "@/lib/data";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: "goal",
    prompt: "What do you want from the next block?",
    options: [
      { id: "rebuild", label: "Get strong again after time off" },
      { id: "compose", label: "Drop fat and keep the muscle" },
      { id: "compete", label: "Perform better in a sport" },
      { id: "latitude", label: "Stay consistent while I travel" },
    ],
  },
  {
    id: "days",
    prompt: "How many days can you train in a normal week?",
    options: [
      { id: "2", label: "Two or three" },
      { id: "4", label: "Four" },
      { id: "5", label: "Five or more" },
    ],
  },
  {
    id: "place",
    prompt: "Where will most of the work happen?",
    options: [
      { id: "studio", label: "In the Bermondsey studio" },
      { id: "mix", label: "A mix of studio and elsewhere" },
      { id: "travel", label: "Hotels, home, wherever I land" },
    ],
  },
] as const;

function recommend(goal: string, days: string, place: string) {
  if (place === "travel") return "latitude";
  if (goal === "compete") return "compete";
  if (goal === "compose") return days === "2" ? "rebuild" : "compose";
  if (goal === "latitude") return "latitude";
  return "rebuild";
}

export function ProgramQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const current = questions[step];
  const done = step >= questions.length;
  const pick = done ? recommend(answers[0] ?? "", answers[1] ?? "", answers[2] ?? "") : null;
  const program = pick ? getProgram(pick) : null;

  function choose(id: string) {
    const next = [...answers.slice(0, step), id];
    setAnswers(next);
    setStep(step + 1);
  }

  return (
    <div className="rounded-2xl bg-bg-elevated p-6 shadow-border md:p-8">
      <p className="eyebrow">Find a program</p>
      {!done || !program ? (
        <>
          <h3 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
            {current?.prompt}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {step + 1} of {questions.length}
          </p>
          <div className="mt-6 grid gap-2">
            {current?.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => choose(opt.id)}
                className="min-h-12 rounded-lg px-4 py-3 text-left text-sm text-fg shadow-border transition-[box-shadow,background-color] duration-150 hover:bg-bg-subtle hover:shadow-border-hover"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 className="mt-3 font-display text-3xl tracking-tight">{program.name}</h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{program.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/programs/$slug"
              params={{ slug: program.slug }}
              className={cn(buttonVariants())}
            >
              Read {program.name}
            </Link>
            <Link
              to="/book"
              search={{ program: program.slug }}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Book a consult
            </Link>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
            >
              Start again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
