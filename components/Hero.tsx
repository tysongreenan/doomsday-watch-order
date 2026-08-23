import { DaysUntil } from "@/components/DaysUntil";
import { HeroCollage } from "@/components/HeroCollage";
import { DOOMSDAY_LABEL, ESSENTIAL_COUNT } from "@/lib/titles";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-chrome" aria-hidden />
      <HeroCollage />
      <div className="hero-copy">
        <p className="eyebrow text-primary">
          Public prep list · {DOOMSDAY_LABEL}
        </p>
        <h1 className="hero-title mt-3">
          Countdown to
          <span className="block text-primary">Doomsday</span>
        </h1>
        <p className="hero-lede">
          A streaming-style watch order anyone can use before December. Start
          with the official Disney+ countdown — {ESSENTIAL_COUNT} titles — then
          optionally dive deeper into X-Men and older Fantastic Four films.
        </p>
        <DaysUntil />
      </div>
    </header>
  );
}
