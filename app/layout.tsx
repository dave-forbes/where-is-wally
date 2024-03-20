import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameContextProvider } from "./Context/GameContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where's wally",
  description: "Where's wally photo tagging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GameContextProvider>{children}</GameContextProvider>
      </body>
    </html>
  );
}
