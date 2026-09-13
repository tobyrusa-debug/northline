import { createRootRoute, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site-shell";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Northline";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Northline is a private training studio in Bermondsey. One-to-one coaching for strength, composition, and a week that holds.",
      },
      { name: "theme-color", content: "#F3EFE6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20 md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Nothing on this rack.</h1>
      <p className="mt-3 text-muted">That page is not in the studio. Head back to the floor.</p>
      <Link
        to="/"
        className="mt-8 inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-fg"
      >
        Home
      </Link>
    </div>
  );
}

function RootComponent() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell />
        </AuthProvider>
        <Toaster
          theme="light"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#FAF7F0",
              color: "#1C1914",
              border: "1px solid #D4CDC0",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
