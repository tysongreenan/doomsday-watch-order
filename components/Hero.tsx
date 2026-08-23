import { CountdownClock } from "@/components/CountdownClock";
import { HERO_POSTER_SRC, HERO_PRIMARY_SRC } from "@/lib/hero";

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-chrome" aria-hidden />
      <div className="hero-media" aria-hidden>
        <picture>
          <source media="(max-width: 639px)" srcSet={HERO_POSTER_SRC} />
          <img
            src={HERO_PRIMARY_SRC}
            alt=""
            className="hero-photo"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-overlay" />
      </div>
      <div className="hero-copy">
        <CountdownClock>
          <p className="hero-lede">Watch what matters before December 18.</p>
        </CountdownClock>
      </div>
    </header>
  );
}
