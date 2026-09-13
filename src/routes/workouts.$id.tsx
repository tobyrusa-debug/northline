import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { getProgram, getWorkout } from "@/lib/data";
import { useJournal } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workouts/$id")({
  component: WorkoutPlayer,
});

function formatRest(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function WorkoutPlayer() {
  const { id } = Route.useParams();
  const workout = getWorkout(id);
  if (!workout) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20">
        <h1 className="font-display text-3xl tracking-tight">Session not found</h1>
        <Link to="/workouts" className="mt-4 inline-block text-sm text-muted hover:text-fg">
          All workouts
        </Link>
      </div>
    );
  }
  return <WorkoutSession workout={workout} />;
}

function WorkoutSession({ workout }: { workout: NonNullable<ReturnType<typeof getWorkout>> }) {
  const program = getProgram(workout.program);
  const addLog = useJournal((s) => s.addLog);
  const [started, setStarted] = useState(false);
  const [exIndex, setExIndex] = useState(0);
  const [setNo, setSetNo] = useState(1);
  const [phase, setPhase] = useState<"work" | "rest" | "done">("work");
  const [rest, setRest] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const exercise = workout.exercises[exIndex];
  const totalSets = useMemo(
    () => workout.exercises.reduce((n, e) => n + e.sets, 0),
    [workout],
  );
  const doneSets = useMemo(() => {
    let n = 0;
    for (let i = 0; i < exIndex; i += 1) n += workout.exercises[i]?.sets ?? 0;
    return n + Math.max(0, setNo - 1);
  }, [exIndex, setNo, workout]);

  useEffect(() => {
    if (phase !== "rest") return;
    if (rest <= 0) {
      setPhase("work");
      return;
    }
    const t = window.setTimeout(() => setRest((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, rest]);

  function completeSet() {
    if (!exercise) return;
    const lastSet = setNo >= exercise.sets;
    const lastEx = exIndex >= workout.exercises.length - 1;
    if (lastSet && lastEx) {
      const minutes = startedAt
        ? Math.max(1, Math.round((Date.now() - startedAt) / 60000))
        : workout.durationMin;
      addLog({
        workoutId: workout.id,
        title: workout.title,
        completedAt: new Date().toISOString(),
        durationMin: minutes,
      });
      setPhase("done");
      toast.success("Session logged.");
      return;
    }
    if (exercise.restSec > 0) {
      setPhase("rest");
      setRest(exercise.restSec);
    }
    if (lastSet) {
      setExIndex((i) => i + 1);
      setSetNo(1);
    } else {
      setSetNo((n) => n + 1);
    }
  }

  if (phase === "done") {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 md:px-8">
        <p className="eyebrow">Session complete</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">{workout.title}</h1>
        <p className="mt-4 text-muted">Logged to your journal. The next one is tomorrow.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/journal" className={cn(buttonVariants())}>
            Open journal
          </Link>
          <Link to="/workouts" className={cn(buttonVariants({ variant: "secondary" }))}>
            Other sessions
          </Link>
        </div>
      </div>
    );
  }

  if (!started || !exercise) {
    return (
      <div className="mx-auto max-w-xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">
          {program?.name} · {workout.level}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{workout.title}</h1>
        <p className="mt-3 text-muted">
          {workout.durationMin} min · {workout.focus} · {workout.exercises.length} movements
        </p>
        <ol className="mt-8 divide-y divide-border border-y border-border">
          {workout.exercises.map((ex) => (
            <li key={ex.name} className="flex items-baseline justify-between gap-4 py-3">
              <span>
                <span className="block text-sm">{ex.name}</span>
                {ex.note ? <span className="text-xs text-muted">{ex.note}</span> : null}
              </span>
              <span className="shrink-0 text-sm tabular-nums text-muted">
                {ex.sets} × {ex.reps}
              </span>
            </li>
          ))}
        </ol>
        <Button
          className="mt-8 w-full"
          size="lg"
          onClick={() => {
            setStarted(true);
            setStartedAt(Date.now());
          }}
        >
          Start session
        </Button>
        <Link to="/workouts" className="mt-4 block text-center text-sm text-muted hover:text-fg">
          Back to workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col px-5 py-10 md:px-8 md:py-16">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
        <span>
          {doneSets + 1} / {totalSets} sets
        </span>
        <span>
          {exIndex + 1} / {workout.exercises.length}
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-bg-subtle">
        <div
          className="h-full bg-fg transition-[width] duration-300 ease-out"
          style={{ width: `${Math.round((doneSets / totalSets) * 100)}%` }}
        />
      </div>

      {phase === "rest" ? (
        <div className="flex min-h-[50dvh] flex-col items-center justify-center text-center">
          <p className="eyebrow">Rest</p>
          <p className="mt-4 font-display text-7xl tabular-nums tracking-tight">{formatRest(rest)}</p>
          <p className="mt-4 text-sm text-muted">
            Next · {exercise.name} · set {setNo}
          </p>
          <Button variant="secondary" className="mt-8" onClick={() => setPhase("work")}>
            Skip rest
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <h1 className="mt-10 font-display text-4xl tracking-tight md:text-5xl">{exercise.name}</h1>
          <p className="mt-3 text-lg text-muted">
            Set {setNo} of {exercise.sets} · {exercise.reps}
          </p>
          {exercise.note ? <p className="mt-2 text-sm text-muted">{exercise.note}</p> : null}
          <div className="mt-10">
            <Button size="lg" className="w-full" onClick={completeSet}>
              Complete set
            </Button>
            <button
              type="button"
              className="mt-4 w-full min-h-11 text-sm text-muted hover:text-fg"
              onClick={() => {
                setStarted(false);
                setPhase("work");
                setExIndex(0);
                setSetNo(1);
              }}
            >
              End session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
