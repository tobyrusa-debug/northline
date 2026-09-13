import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/method")({ component: MethodPage });

const pillars = [
  {
    n: "01",
    title: "Strength first",
    body: "Squat, hinge, press, pull, carry. Loaded well, progressed weekly, stopped short of junk volume. If it does not make you stronger, it has to earn the slot.",
  },
  {
    n: "02",
    title: "Conditioning that serves",
    body: "Repeatability, not a puddle on the floor. Easy aerobic work most weeks. Hard intervals when the block asks for them. Never as punishment.",
  },
  {
    n: "03",
    title: "Food, without theatre",
    body: "Protein, steps, sleep, alcohol. Compose goes further. Nobody here will count your blueberries or sell you a pouch.",
  },
  {
    n: "04",
    title: "A week that holds",
    body: "Programs are written against your actual calendar. Travel, late dinners, kids, a season. If it only works in a perfect week, it is not a program.",
  },
];

function MethodPage() {
  return (
    <div>
      <PageIntro
        eyebrow="Method"
        title="How we train."
        body="Northline is a private floor in Bermondsey. Twelve racks, two coaches, no classes. The method is older than the room: lift, recover, repeat."
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="overflow-hidden">
          <img
            src="/images/studio.jpg"
            alt="The Northline studio"
            className="photo aspect-[16/8] w-full object-cover"
          />
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-px px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        {pillars.map((p) => (
          <article
            key={p.n}
            className="bg-bg-elevated p-6 shadow-border md:p-8"
          >
            <p className="text-xs tracking-[0.18em] text-muted">{p.n}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight">{p.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
          </article>
        ))}
      </section>

      <section className="bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="overflow-hidden">
            <img
              src="/images/method.jpg"
              alt="Hands on a barbell"
              className="photo aspect-[3/2] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-4xl tracking-tight">The room</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Unit 4, Maltby Street. A converted warehouse floor with twelve racks,
              enough plates, and no speakers louder than conversation. You will
              not share a coach. You will not wait for a bench. Appointments only.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Opening consult is forty-five minutes and complimentary. We screen
              how you move, then tell you which block fits — or that none of them
              do, yet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/book" className={cn(buttonVariants())}>
                Book a consult
              </Link>
              <Link to="/programs" className={cn(buttonVariants({ variant: "secondary" }))}>
                See programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
