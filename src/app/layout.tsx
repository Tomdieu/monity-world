import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

export const metadata: Metadata = {
  title: "Monity world",
  description: "Monity world",
};

const Inter = localFont({
  src: [
    {
      path: "../../public//fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
          suppressHydrationWarning
        className={`antialiased flex h-screen w-screen ${Inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
