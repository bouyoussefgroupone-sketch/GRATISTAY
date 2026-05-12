import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRATISTAY",
  description:
    "Plateforme de reservation experientielle avec moteur Bonus Stay et back-office international.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
