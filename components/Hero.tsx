import { DOOMSDAY_LABEL, ESSENTIAL_COUNT } from "@/lib/titles";
import { DaysUntil } from "@/components/DaysUntil";

export function Hero() {
  return (
    <header className="relative z-10 mx-auto max-w-3xl px-4 pb-8 pt-12 sm:pb-10 sm:pt-16">
      <p className="text-[11px] uppercase tracking-[0.28em] text-ember-hot">
        Public prep list · {DOOMSDAY_LABEL}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-wide text-balance sm:text-6xl">
        Homework before
        <span className="block text-ember-hot">Avengers: Doomsday</span>
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        A cinematic watch order anyone can use before December. Start with the
        official Disney+ countdown — {ESSENTIAL_COUNT} titles — then optionally
        dive deeper into X-Men and older Fantastic Four films.
      </p>
      <DaysUntil />
    </header>
  );
}
