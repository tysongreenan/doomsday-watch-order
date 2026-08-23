import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { WatchOrderApp } from "@/components/WatchOrderApp";
import { essentialTitles } from "@/lib/titles";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Countdown to Avengers: Doomsday",
    description:
      "Doomsday prep list: official Disney+ 15 plus Spider-Man: Brand New Day, in timeline order by default.",
    numberOfItems: essentialTitles.length,
    itemListElement: essentialTitles.map((title) => ({
      "@type": "ListItem",
      position: title.order,
      name: `${title.title} (${title.year})`,
    })),
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <main className="flex-1">
        <WatchOrderApp />
      </main>
      <SiteFooter />
    </div>
  );
}
