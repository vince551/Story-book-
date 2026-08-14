import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoryBook — Read. Share. Discover.",
  description: "A premium community for readers to discover books, share reviews and build reading habits.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}