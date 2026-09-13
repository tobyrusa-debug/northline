import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { getProgram, workouts } from "@/lib/data";

export const Route = createFileRoute("/workouts/")({ component: WorkoutsPage });

function WorkoutsPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Workouts"
        title="Sample sessions. Run them now."
        body="A handful of sessions from the four blocks. Timed rest, logged sets, saved to your journal. The real program is still coached."
      />
      <div className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
        {workouts.map((w) => {
          const program = getProgram(w.program);
          return (
            <Link
              key={w.id}
              to="/workouts/$id"
              params={{ id: w.id }}
              className="rounded-2xl bg-bg-elevated p-6 shadow-border transition-[box-shadow] duration-150 hover:shadow-border-hover"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {program?.name ?? w.program} · {w.level}
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">{w.title}</h2>
              <p className="mt-2 text-sm text-muted">
                {w.durationMin} min · {w.focus} · {w.exercises.length} movements
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
