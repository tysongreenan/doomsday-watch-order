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
    "Public homework tracker for Avengers: Doomsday (December 18, 2026). The official Disney+ countdown of 15 titles, plus optional X-Men and Fantastic Four tracks. Check off progress in your browser.",
  openGraph: {
    title: "Avengers: Doomsday watch order",
    description:
      "Official Disney+ countdown of 15 titles, plus optional deeper tracks. Progress saves on this device.",
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
