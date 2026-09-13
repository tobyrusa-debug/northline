import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProgramQuiz } from "@/components/program-quiz";
import { buttonVariants } from "@/components/ui/button";
import { coaches, faqs, programs, testimonials } from "@/lib/data";
import { cn, formatGBP } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-stretch md:grid-cols-2">
          <div className="flex flex-col justify-end px-5 py-12 md:px-8 md:py-20 lg:py-24">
            <p className="eyebrow">Maltby Street · Bermondsey</p>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
              One coach. One client. A real week.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Toby and Georgie Raworth coach strength, composition, and athletic
              work in a quiet Bermondsey studio. No classes. Appointments only.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className={cn(buttonVariants({ size: "lg" }))}>
                Book a consult
              </Link>
              <Link
                to="/programs"
                className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
              >
                View programs
              </Link>
            </div>
          </div>
          <div className="relative order-first aspect-[4/5] md:order-last md:aspect-auto md:min-h-full">
            <img
              src="/images/coach-toby.jpg?v=5"
              alt="Toby Raworth, head coach"
              className="photo h-full w-full object-cover object-top md:absolute md:inset-0"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            ["1 : 1", "Always. No classes."],
            ["12 racks", "A quiet floor."],
            ["2 coaches", "Toby and Georgie."],
            ["45 min", "Complimentary consult."],
          ].map(([k, v], i) => (
            <div
              key={k}
              className={cn(
                "px-5 py-7 md:px-8",
                i % 2 === 1 && "bg-bg-elevated",
                "md:even:bg-bg-elevated md:odd:bg-transparent",
              )}
            >
              <p className="font-display text-2xl md:text-3xl">{k}</p>
              <p className="mt-1 text-sm text-muted">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Programs</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Four blocks.</h2>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg"
          >
            All programs <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {programs.map((p) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden bg-bg-elevated shadow-border"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="photo h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="text-sm text-muted">
                    {p.duration} · {formatGBP(p.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="overflow-hidden">
            <img
              src="/images/method.jpg"
              alt="Chalked hands on a knurled barbell"
              className="photo aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Method</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Strength first. Everything else earns its place.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              We load the lifts that matter, condition so you can repeat them, and
              keep nutrition to protein, steps, and sleep. No shake of the month.
              No twelve-exercise circuits.
            </p>
            <Link to="/method" className={cn(buttonVariants({ variant: "secondary" }), "mt-7")}>
              How we train
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow">Coaches</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Toby and Georgie.</h2>
        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 md:gap-8">
          {coaches.map((c) => (
            <Link key={c.id} to="/coaches" className="group">
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="photo aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-3 text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted">{c.role}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.1fr] md:px-8 md:py-24">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Not sure which block?</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
              Three questions. A recommendation. Then a consult if it still makes
              sense — we would rather send you away than sell the wrong twelve weeks.
            </p>
          </div>
          <ProgramQuiz />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow">From the floor</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">What changed.</h2>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="bg-bg p-6 md:p-8">
              <p className="font-display text-xl leading-snug md:text-2xl">{t.quote}</p>
              <footer className="mt-6 text-sm text-muted">
                {t.name}
                <span className="text-subtle"> · {t.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-4xl">Questions</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium">
                  {f.q}
                  <span className="text-muted transition-transform duration-150 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-fg text-bg">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <h2 className="max-w-xl font-display text-4xl md:text-5xl">
            Come in. We will tell you if it is not for you.
          </h2>
          <p className="mt-4 max-w-md text-bg/70">
            A 45-minute consult. No contract on the day. Bermondsey, or a video call
            if you are not in London.
          </p>
          <Link
            to="/book"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-bg text-fg hover:opacity-90")}
          >
            Book a consult
          </Link>
        </div>
      </section>
    </div>
  );
}
