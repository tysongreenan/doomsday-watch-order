import { DaysUntil } from "@/components/DaysUntil";
import { HeroCollage } from "@/components/HeroCollage";
import { DISNEY_PLUS_COUNT, DOOMSDAY_LABEL, ESSENTIAL_COUNT } from "@/lib/titles";

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
          A streaming-style watch order anyone can use before December.
          Timeline order is the default; switch to Release order anytime. The
          official Disney+ countdown is {DISNEY_PLUS_COUNT} titles — we treat
          Spider-Man: Brand New Day as essential #{ESSENTIAL_COUNT}, then add
          recommended deeper cuts and the upcoming Avengers films.
        </p>
        <DaysUntil />
      </div>
    </header>
  );
}
