import { getImageProps } from "next/image";
import { CountdownClock } from "@/components/CountdownClock";
import { HERO_POSTER_SRC, HERO_PRIMARY_SRC } from "@/lib/hero";

export function Hero() {
  const common = {
    alt: "",
    fill: true,
    sizes: "100vw",
    priority: true,
  } as const;
  const {
    props: { srcSet: posterSrcSet },
  } = getImageProps({ ...common, src: HERO_POSTER_SRC });
  const { props: wideProps } = getImageProps({
    ...common,
    src: HERO_PRIMARY_SRC,
  });

  return (
    <header className="hero">
      <div className="hero-chrome" aria-hidden />
      <div className="hero-media" aria-hidden>
        <picture>
          <source media="(max-width: 639px)" srcSet={posterSrcSet} />
          <img {...wideProps} alt="" className="hero-photo" />
        </picture>
        <div className="hero-overlay" />
        <div className="hero-grain" />
      </div>
      <div className="hero-copy">
        <CountdownClock>
          <p className="hero-lede">Watch what matters before December 18.</p>
        </CountdownClock>
      </div>
    </header>
  );
}
