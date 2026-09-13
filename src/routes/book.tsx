import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { addDays, format, isSunday, startOfDay } from "date-fns";
import { toast } from "sonner";
import { PageIntro } from "@/components/site-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import {
  coaches,
  SATURDAY_TIMES,
  sessionTypes,
  slotTaken,
  WEEKDAY_TIMES,
} from "@/lib/data";
import { useJournal } from "@/lib/store";
import { cn } from "@/lib/utils";

type BookSearch = {
  program?: string;
  coach?: string;
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    program: typeof search.program === "string" ? search.program : undefined,
    coach: typeof search.coach === "string" ? search.coach : undefined,
  }),
  component: BookPage,
});

function buildDays() {
  const days: { iso: string; label: string; times: string[] }[] = [];
  let d = startOfDay(new Date());
  while (days.length < 14) {
    d = addDays(d, 1);
    if (isSunday(d)) continue;
    const iso = format(d, "yyyy-MM-dd");
    const times = d.getDay() === 6 ? SATURDAY_TIMES : WEEKDAY_TIMES;
    days.push({ iso, label: format(d, "EEE d MMM"), times });
  }
  return days;
}

function BookPage() {
  const search = Route.useSearch();
  const [days, setDays] = useState<{ iso: string; label: string; times: string[] }[]>([]);
  useEffect(() => {
    const next = buildDays();
    setDays(next);
    setDate((current) => current || next[0]?.iso || "");
  }, []);
  const addBooking = useJournal((s) => s.addBooking);
  const bookings = useJournal((s) => s.bookings);

  const initialType =
    search.program && sessionTypes.some((t) => t.id === search.program)
      ? search.program
      : "consult";
  const initialCoach =
    search.coach && coaches.some((c) => c.id === search.coach) ? search.coach : coaches[0].id;

  const [step, setStep] = useState(0);
  const [sessionType, setSessionType] = useState(initialType);
  const [coachId, setCoachId] = useState(initialCoach);
  const [date, setDate] = useState(days[0]?.iso ?? "");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [doneId, setDoneId] = useState<string | null>(null);

  const selectedDay = days.find((d) => d.iso === date) ?? days[0];
  const takenHere = new Set(
    bookings.filter((b) => b.date === selectedDay?.iso).map((b) => b.time),
  );

  function confirm() {
    if (!name.trim() || !email.trim() || !time || !date) {
      toast.error("Name, email, and a time are required.");
      return;
    }
    const booking = addBooking({
      sessionType,
      coachId,
      date,
      time,
      name: name.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });
    setDoneId(booking.id);
    toast.success("Booked. See you on the floor.");
  }

  const session = sessionTypes.find((t) => t.id === sessionType);
  const coach = coaches.find((c) => c.id === coachId);

  if (doneId) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 md:px-8">
        <p className="eyebrow">Booked</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">You are in.</h1>
        <p className="mt-4 text-muted">
          {session?.name} with {coach?.name} on {selectedDay?.label} at {time}. A
          confirmation sits in your journal — this is a local booking on this device.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/journal" className={cn(buttonVariants())}>
            Open journal
          </Link>
          <Link to="/" className={cn(buttonVariants({ variant: "secondary" }))}>
            Back to the studio
          </Link>
        </div>
      </div>
    );
  }

  const steps = ["Session", "Coach", "Time", "Details"];

  return (
    <div>
      <PageIntro
        eyebrow="Book"
        title="Forty-five minutes. Then we tell you the truth."
        body="Pick a session, a coach, and a time. The opening consult is complimentary — in Bermondsey or on a call."
      />
      <div className="mx-auto max-w-2xl px-5 pb-20 md:px-8">
        <ol className="mb-8 grid grid-cols-4 gap-2 text-center text-xs uppercase tracking-[0.14em] text-subtle">
          {steps.map((label, i) => (
            <li key={label} className={cn("border-b pb-2", i === step ? "border-fg text-fg" : "border-border")}>
              {label}
            </li>
          ))}
        </ol>

        {step === 0 ? (
          <div className="grid gap-2">
            {sessionTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSessionType(t.id)}
                className={cn(
                  "rounded-xl px-4 py-4 text-left shadow-border transition-[box-shadow] duration-150",
                  sessionType === t.id && "shadow-border-hover",
                )}
              >
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="text-sm text-muted">{t.detail}</span>
              </button>
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {coaches.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCoachId(c.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-3 text-left shadow-border",
                  coachId === c.id && "shadow-border-hover",
                )}
              >
                <img src={c.image} alt="" className="size-14 rounded-md object-cover" />
                <span>
                  <span className="block text-sm font-medium">{c.name}</span>
                  <span className="block text-xs text-muted">{c.role}</span>
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-3">
              {days.map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => {
                    setDate(d.iso);
                    setTime("");
                  }}
                  className={cn(
                    "min-w-[4.75rem] rounded-lg px-2 py-3 text-center text-xs shadow-border",
                    date === d.iso && "shadow-border-hover",
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {selectedDay?.times.map((t) => {
                const busy = slotTaken(selectedDay.iso, t) || takenHere.has(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={busy}
                    onClick={() => setTime(t)}
                    className={cn(
                      "h-11 rounded-md text-sm shadow-border disabled:opacity-30",
                      time === t && "shadow-border-hover",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              confirm();
            }}
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Anything we should know</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Injuries, travel, a fixture..."
              />
            </div>
            <p className="text-sm text-muted">
              {session?.name} with {coach?.name} · {selectedDay?.label} · {time || "no time yet"}
            </p>
          </form>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => {
                if (step === 2 && !time) {
                  toast.error("Pick a time.");
                  return;
                }
                setStep((s) => s + 1);
              }}
            >
              Continue
            </Button>
          ) : (
            <Button type="button" onClick={confirm}>
              Confirm booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
