import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { navLinks, STUDIO } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteShell() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-medium text-muted transition-colors duration-150 hover:text-fg"
                activeProps={{ className: "text-fg" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/book" className={cn(buttonVariants({ size: "sm" }), "max-sm:px-3")}>
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a consult</span>
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-fg md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg px-5 pb-8 pt-4 md:hidden">
          <div className="flex h-12 items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex min-h-12 items-center border-b border-border text-2xl font-display tracking-tight"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link to="/book" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
            Book a consult
          </Link>
        </div>
      ) : null}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-fg text-bg">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8 md:py-16">
          <div>
            <Logo className="text-bg" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bg/70">
              One-to-one training on Maltby Street. Strength, composition, and a
              week you can actually keep.
            </p>
            <p className="mt-6 text-sm text-bg/70">{STUDIO.address}</p>
            <p className="mt-1 text-sm text-bg/70">{STUDIO.hours}</p>
          </div>
          <div>
            <p className="eyebrow text-bg/50">Visit</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-bg/70 transition-colors hover:text-bg">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/book" className="text-bg/70 transition-colors hover:text-bg">
                  Book
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-bg/50">Desk</p>
            <ul className="mt-4 space-y-2.5 text-sm text-bg/70">
              <li>
                <a className="hover:text-bg" href={`mailto:${STUDIO.email}`}>
                  {STUDIO.email}
                </a>
              </li>
              <li>
                <a className="hover:text-bg" href={`tel:+442079460182`}>
                  {STUDIO.phone}
                </a>
              </li>
            </ul>
            <Button
              asChild
              className="mt-6 bg-bg text-fg hover:opacity-90"
              size="sm"
            >
              <Link to="/book">Book a consult</Link>
            </Button>
          </div>
        </div>
        <div className="border-t border-bg/15 px-5 py-4 text-center text-xs text-bg/50 md:px-8">
          Northline Studio · Bermondsey · Sessions by appointment
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.12] md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{body}</p>
    </header>
  );
}
