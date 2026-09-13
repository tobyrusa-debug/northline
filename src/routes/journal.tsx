import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { PageIntro } from "@/components/site-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { coaches, getWorkout, sessionTypes } from "@/lib/data";
import { useJournal } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const [ready, setReady] = useState(false);
  const bookings = useJournal((s) => s.bookings);
  const logs = useJournal((s) => s.logs);
  const calculator = useJournal((s) => s.calculator);
  const cancelBooking = useJournal((s) => s.cancelBooking);

  useEffect(() => setReady(true), []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="h-8 w-48 rounded-md bg-bg-subtle" />
        <div className="mt-6 h-32 rounded-2xl bg-bg-subtle" />
      </div>
    );
  }

  return (
    <div>
      <PageIntro
        eyebrow="Journal"
        title="Bookings, sessions, numbers."
        body="Kept on this device. Book a consult, run a sample workout, or save fuel targets — they land here."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
        <section>
          <h2 className="font-display text-2xl tracking-tight">Upcoming</h2>
          {bookings.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No bookings yet.{" "}
              <Link to="/book" className="text-fg underline-offset-4 hover:underline">
                Book a consult
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {bookings.map((b) => {
                const coach = coaches.find((c) => c.id === b.coachId);
                const session = sessionTypes.find((s) => s.id === b.sessionType);
                return (
                  <li
                    key={b.id}
                    className="rounded-xl bg-bg-elevated p-4 shadow-border"
                  >
                    <p className="text-sm font-medium">
                      {session?.name ?? b.sessionType} · {coach?.name}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {format(parseISO(`${b.date}T00:00:00`), "EEE d MMM")} at {b.time}
                    </p>
                    <p className="mt-1 text-xs text-subtle">{b.name}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="mt-2 px-0 text-muted"
                      onClick={() => cancelBooking(b.id)}
                    >
                      Cancel
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl tracking-tight">Completed sessions</h2>
          {logs.length === 0 ? (
            <p className="mt-4 text-sm text-muted">
              No sessions logged.{" "}
              <Link to="/workouts" className="text-fg underline-offset-4 hover:underline">
                Run a sample workout
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {logs.map((l) => {
                const w = getWorkout(l.workoutId);
                return (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-bg-elevated p-4 shadow-border"
                  >
                    <span>
                      <span className="block text-sm">{l.title}</span>
                      <span className="text-xs text-muted">
                        {format(parseISO(l.completedAt), "d MMM")} · {l.durationMin} min
                      </span>
                    </span>
                    {w ? (
                      <Link
                        to="/workouts/$id"
                        params={{ id: w.id }}
                        className="text-xs text-muted hover:text-fg"
                      >
                        Repeat
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="md:col-span-2">
          <h2 className="font-display text-2xl tracking-tight">Fuel</h2>
          {calculator ? (
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-bg-elevated p-5 shadow-border sm:grid-cols-4">
              {[
                ["Calories", `${calculator.calories}`],
                ["Protein", `${calculator.protein} g`],
                ["Carbs", `${calculator.carbs} g`],
                ["Fat", `${calculator.fat} g`],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs uppercase tracking-[0.14em] text-subtle">{k}</p>
                  <p className="mt-1 font-display text-2xl tabular-nums">{v}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">
              No targets saved.{" "}
              <Link to="/tools" className="text-fg underline-offset-4 hover:underline">
                Open the calculator
              </Link>
              .
            </p>
          )}
          <Link to="/book" className={cn(buttonVariants(), "mt-8 inline-flex")}>
            Book a consult
          </Link>
        </section>
      </div>
    </div>
  );
}
