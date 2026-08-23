import { heroCollagePieces } from "@/lib/hero-collage";
import { allTitles } from "@/lib/titles";
import { tmdbImageUrl } from "@/lib/tmdb";

export function HeroCollage() {
  const titlesById = new Map(allTitles.map((title) => [title.id, title]));

  return (
    <div className="hero-collage" aria-hidden>
      {heroCollagePieces.map((piece) => {
        const title = titlesById.get(piece.titleId);
        if (!title) return null;
        const path =
          piece.image === "poster"
            ? title.tmdb.posterPath
            : title.tmdb.backdropPath;
        const size = piece.image === "poster" ? "w780" : "w1280";
        const eager =
          piece.slot === "base" ||
          piece.slot === "avengers" ||
          piece.slot === "xmen";
        return (
          <div
            key={piece.slot}
            className={`hero-piece hero-piece-${piece.slot}`}
          >
            <img
              src={tmdbImageUrl(path, size)}
              alt=""
              width={piece.image === "poster" ? 780 : 1280}
              height={piece.image === "poster" ? 1170 : 720}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="hero-piece-img"
            />
          </div>
        );
      })}
      <div className="hero-vignette" />
    </div>
  );
}
