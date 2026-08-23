import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avengers: Doomsday watch order",
  description:
    "Watch order for Avengers: Doomsday (December 18, 2026). Timeline order is the default. Official Disney+ 15, plus Brand New Day, recommended deeper cuts, and the upcoming Avengers films. Check off progress and find where to watch in Canada.",
  openGraph: {
    title: "Avengers: Doomsday watch order",
    description:
      "Timeline-first Doomsday prep: official Disney+ 15, Brand New Day, recommended extras, and upcoming Avengers. Progress saves on this device.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="site-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
