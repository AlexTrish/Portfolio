import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Mercer — Frontend & Full Stack Developer",
  description: "Building digital experiences at the intersection of design and engineering.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full noise">{children}</body>
    </html>
  );
}
