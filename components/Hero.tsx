import { DOOMSDAY_LABEL, ESSENTIAL_COUNT } from "@/lib/titles";
import { DaysUntil } from "@/components/DaysUntil";

export function Hero() {
  return (
    <header className="relative z-10">
      <div className="site-chrome" aria-hidden />
      <div className="mx-auto w-full max-w-5xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-16">
        <p className="eyebrow text-primary">
          Public prep list · {DOOMSDAY_LABEL}
        </p>
        <h1 className="hero-title mt-3">
          Countdown to
          <span className="block text-primary">Doomsday</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          A streaming-style watch order anyone can use before December. Start
          with the official Disney+ countdown — {ESSENTIAL_COUNT} titles — then
          optionally dive deeper into X-Men and older Fantastic Four films.
        </p>
        <DaysUntil />
      </div>
    </header>
  );
}
