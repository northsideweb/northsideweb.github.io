import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/utils";
import { CinematicFooter } from "@/components/CinematicFooter";
import { CinematicHero } from "@/components/CinematicHero";
import { LogoLockup } from "@/components/Logo";

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------------------
// Scroll-reveal helper
// -------------------------------------------------------------------------
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    return () => mm.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// -------------------------------------------------------------------------
// Header
// -------------------------------------------------------------------------
function Header() {
  return (
    // no backdrop-blur: re-blurring the animating hero under the bar every
    // scrubbed frame is expensive; a near-opaque bg reads the same
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0A1524]/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center" aria-label="Northside Web, home">
          <LogoLockup variant="brand" className="h-13 w-auto" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-semibold text-white/60 md:flex">
          <a href="#services" className="transition-colors hover:text-white">Services</a>
          <a href="#work" className="transition-colors hover:text-white">Work</a>
          <a href="#process" className="transition-colors hover:text-white">Process</a>
          <a href="#local" className="transition-colors hover:text-white">Local</a>
        </nav>
        <a
          href="mailto:northsideweb2@gmail.com"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}

// -------------------------------------------------------------------------
// Belief statement
// -------------------------------------------------------------------------
function Point() {
  return (
    <section aria-label="What we believe" className="relative overflow-hidden">
      {/* full-bleed aerial shore background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${asset("photo-shore.jpg")})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/55 to-background" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-6 py-40 text-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">The point</p>
          <p className="mt-8 text-3xl font-extrabold leading-snug tracking-tight md:text-4xl">
            Most local websites are rented templates. Slow, forgettable, invisible
            on Google. Your business deserves better than that.
          </p>
          <p className="mt-6 text-xl font-semibold text-foreground/70">
            We build sites with <em className="font-bold not-italic text-primary">craft</em>, then we keep them fast, forever.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------
// Services
// -------------------------------------------------------------------------
const SERVICES = [
  {
    num: "01",
    title: "Custom websites",
    body: "Designed from a blank page around your business. Fast, sharp, and impossible to mistake for a template.",
    points: ["Design from scratch", "Words that win work", "Built to rank on Google", "Live in weeks"],
  },
  {
    num: "02",
    title: "Hosting",
    body: "Your site lives on fast Australian servers and stays up. We watch it around the clock so you never have to.",
    points: ["Australian servers", "Daily backups", "Security locked down", "Speed checked monthly"],
  },
  {
    num: "03",
    title: "Maintenance",
    body: "Send us the change, it's done that week. Updates, edits and fixes on one flat plan, no surprise invoices.",
    points: ["Content changes included", "Software kept current", "Fixes inside days", "One flat monthly bill"],
  },
];

function Services() {
  return (
    <section id="services" className="bg-muted/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">What we do</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Three jobs. Done <span className="text-primary">properly</span>.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1}>
              <article className="group flex h-full flex-col rounded-3xl border border-border bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <span className="text-sm font-black text-secondary">{s.num}</span>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{s.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-semibold">
                      <svg className="h-4 w-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------
// Work
// -------------------------------------------------------------------------
const WORK = [
  { name: "Bower & Co.", desc: "Premium home builder, Manly to Palm Beach", tags: "Design · Build · Hosting", video: "/work-builder.mp4", poster: "/work-builder.jpg" },
  { name: "Saltgrain", desc: "Freshwater's neighbourhood café", tags: "Design · Build · Hosting", video: "/work-cafe.mp4", poster: "/work-cafe.jpg" },
  { name: "Saltline", desc: "Boutique reformer pilates studio", tags: "Design · Build · Hosting", video: "/work-pilates.mp4", poster: "/work-pilates.jpg" },
  { name: "Stillwater", desc: "Private boat charters on Pittwater", tags: "Design · Build · Photography", video: "/work-charter.mp4", poster: "/work-charter.jpg" },
];

/** Browser-framed site preview: plays the scroll-through while on screen. */
function WorkVideoCard({ name, video, poster }: { name: string; video: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-primary/10">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-3 flex-1 truncate rounded-md bg-background/80 px-3 py-1 text-center text-[10px] font-semibold tracking-wide text-muted-foreground">
          {name.toLowerCase().replace(/[^a-z]/g, "")}.com.au
        </span>
      </div>
      <video
        ref={videoRef}
        src={asset(video)}
        poster={asset(poster)}
        muted
        loop
        playsInline
        preload="metadata"
        className="block w-full"
        aria-label={`Scrolling preview of the ${name} website`}
      />
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Selected work</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Built here. Working <span className="text-primary">everywhere</span>.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {WORK.map((w, i) => (
            <Reveal key={w.name} delay={(i % 2) * 0.1}>
              <div className="group">
                <WorkVideoCard name={w.name} video={w.video} poster={w.poster} />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight">{w.name}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{w.desc}</p>
                  </div>
                  <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-muted-foreground">{w.tags}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------
// Process
// -------------------------------------------------------------------------
const STEPS = [
  { num: "01", title: "Talk", body: "A coffee in person or a call. We learn what your business needs and quote a fixed price. No obligation." },
  { num: "02", title: "Design", body: "You see the design before we build a thing. We refine it together until it feels right." },
  { num: "03", title: "Build", body: "We build it fast, accessible and ready to rank. You watch progress on a live link the whole way." },
  { num: "04", title: "Care", body: "Launch is the start. We host, protect and update your site every month, so it stays as good as day one." },
];

function Process() {
  return (
    <section id="process" className="bg-muted/60 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">How it works</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Four steps. No <span className="text-primary">surprises</span>.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <li className="h-full rounded-3xl border border-border bg-background p-7 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">
                  {s.num}
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------
// Local
// -------------------------------------------------------------------------
function Local() {
  return (
    <section id="local" className="relative overflow-hidden py-28">
      {/* full-bleed coastal house background */}
      <div
        className="absolute inset-0 bg-cover bg-[center_70%]"
        style={{ backgroundImage: `url(${asset("photo-house.jpg")})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/25"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Why us</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            We answer the phone. We're <span className="text-primary">here</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            No ticket queues. No offshore help desk. The person who built your
            site answers your call, from a studio ten minutes up the road, not
            ten time zones away.
          </p>
          <ul className="mt-8 space-y-3">
            {["One person, start to finish", "Changes done the same week", "Meetings over coffee, not tickets"].map((p) => (
              <li key={p} className="flex items-center gap-3 font-semibold">
                <svg className="h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="mailto:northsideweb2@gmail.com"
            className="mt-10 inline-block rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:brightness-110"
          >
            Meet us for a coffee
          </a>
        </Reveal>
        {/* right column intentionally open, the house background shows through */}
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------
// App
// -------------------------------------------------------------------------
export default function App() {
  return (
    <>
      <Header />
      {/* Opaque wrapper so the fixed footer stays hidden until the curtain reveal */}
      <main className="relative z-10 bg-background">
        <CinematicHero id="top" />
        <Point />
        <Services />
        <Work />
        <Process />
        <Local />
      </main>
      <CinematicFooter />
    </>
  );
}
