import { createFileRoute, Link } from "@tanstack/react-router";
import { ProgramQuiz } from "@/components/program-quiz";
import { PageIntro } from "@/components/site-shell";
import { programs } from "@/lib/data";
import { formatGBP } from "@/lib/utils";

export const Route = createFileRoute("/programs/")({ component: ProgramsPage });

function ProgramsPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Programs"
        title="The programs"
        body="Four programs, written for different lives. All of them 1:1. All of them long enough to matter."
      />
      <div className="mx-auto max-w-6xl space-y-5 px-5 pb-16 md:px-8 md:pb-24">
        {programs.map((p) => (
          <Link
            key={p.slug}
            to="/programs/$slug"
            params={{ slug: p.slug }}
            className="group grid overflow-hidden bg-bg-elevated shadow-border md:grid-cols-[1.1fr_1fr]"
          >
            <div className="aspect-[16/10] md:aspect-auto md:min-h-[280px]">
              <img
                src={p.image}
                alt=""
                className="photo h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {p.duration} · {p.sessions}
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">{p.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{p.summary}</p>
              <p className="mt-6 text-sm text-fg">
                {formatGBP(p.price)}
                <span className="text-muted"> · {p.priceNote}</span>
              </p>
            </div>
          </Link>
        ))}
        <div className="pt-8">
          <ProgramQuiz />
        </div>
      </div>
    </div>
  );
}
