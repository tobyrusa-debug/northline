import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { coaches, getProgram, workouts } from "@/lib/data";
import { cn, formatGBP } from "@/lib/utils";

export const Route = createFileRoute("/programs/$slug")({
  component: ProgramDetail,
});

function ProgramDetail() {
  const { slug } = Route.useParams();
  const program = getProgram(slug);
  if (!program) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20">
        <h1 className="font-display text-3xl tracking-tight">Program not found</h1>
        <Link to="/programs" className="mt-4 inline-block text-sm text-muted hover:text-fg">
          All programs
        </Link>
      </div>
    );
  }

  const team = coaches.filter((c) => program.coachIds.includes(c.id));
  const samples = workouts.filter((w) => w.program === program.slug);

  return (
    <div>
      <PageIntro eyebrow="Program" title={program.name} body={program.tagline} />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="overflow-hidden">
          <img src={program.image} alt="" className="photo aspect-[16/8] w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.3fr_0.8fr] md:px-8 md:py-20">
        <div>
          <p className="text-base leading-relaxed text-muted md:text-lg">{program.summary}</p>

          <h2 className="mt-10 font-display text-2xl tracking-tight">Who it is for</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {program.forWho.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl tracking-tight">A typical week</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {program.weekly.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          {samples.length > 0 ? (
            <>
              <h2 className="mt-10 font-display text-2xl tracking-tight">Sample sessions</h2>
              <div className="mt-4 grid gap-3">
                {samples.map((w) => (
                  <Link
                    key={w.id}
                    to="/workouts/$id"
                    params={{ id: w.id }}
                    className="flex min-h-14 items-center justify-between rounded-lg bg-bg-elevated px-4 py-3 text-sm shadow-border hover:shadow-border-hover"
                  >
                    <span>
                      {w.title}
                      <span className="ml-2 text-muted">
                        {w.durationMin} min · {w.focus}
                      </span>
                    </span>
                    <span className="text-muted">Run</span>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <aside className="h-fit bg-bg-elevated p-6 shadow-border md:sticky md:top-24">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Investment</p>
          <p className="mt-2 font-display text-4xl tracking-tight">{formatGBP(program.price)}</p>
          <p className="mt-1 text-sm text-muted">
            {program.duration} · {program.priceNote}
          </p>
          <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted">
            {program.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            to="/book"
            search={{ program: program.slug }}
            className={cn(buttonVariants(), "mt-6 w-full")}
          >
            Book this block
          </Link>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-subtle">Coaches</p>
          <div className="mt-3 space-y-3">
            {team.map((c) => (
              <Link key={c.id} to="/coaches" className="flex items-center gap-3">
                <img src={c.image} alt="" className="size-11 rounded-md object-cover" />
                <span>
                  <span className="block text-sm">{c.name}</span>
                  <span className="block text-xs text-muted">{c.role}</span>
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
