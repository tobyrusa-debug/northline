import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { coaches, programOfCoach } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/coaches")({ component: CoachesPage });

function CoachesPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Coaches"
        title="Two people. Your name on the board."
        body="You work with Toby or Georgie. Cover is the other one — arranged, not improvised. If the fit is wrong after the consult, we will say so."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-5 pb-20 md:px-8 md:pb-28">
        {coaches.map((c, i) => {
          const owned = programOfCoach(c.id);
          const reverse = i % 2 === 1;
          return (
            <article
              key={c.id}
              className={cn(
                "grid items-center gap-8 md:grid-cols-2 md:gap-14",
                reverse && "md:[&>div:first-child]:order-2",
              )}
            >
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="photo aspect-[3/4] w-full object-cover object-top"
                />
              </div>
              <div>
                <p className="eyebrow">{c.role}</p>
                <h2 className="mt-2 font-display text-4xl">{c.name}</h2>
                <p className="mt-2 text-sm text-muted">{c.credentials}</p>
                <p className="mt-5 text-base leading-relaxed text-muted">{c.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-sm px-3 py-1 text-xs text-muted shadow-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {owned.map((p) => (
                    <Link
                      key={p.slug}
                      to="/programs/$slug"
                      params={{ slug: p.slug }}
                      className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/book"
                  search={{ coach: c.id }}
                  className={cn(buttonVariants(), "mt-8")}
                >
                  Book with {c.name.split(" ")[0]}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
