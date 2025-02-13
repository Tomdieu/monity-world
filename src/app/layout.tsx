import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Monity world",
  description: "Monity world",
};

const Inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
      weight: "900",
      style: "black",
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
        className={`antialiased flex h-screen w-full relative ${Inter.variable}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
