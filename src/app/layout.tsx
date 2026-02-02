import type { Metadata } from "next";
import { Nav } from "@/src/components/Nav";
import { Banner } from "@/src/components/Banner";
import { Footer } from "@/src/components/Footer";
import { Providers } from "@/src/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZERO - Zombie Emergency Response Organization",
  description: "Be Prepared for anything...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Nav />
          <Banner />
          <main className="flex-1">
            {children}
            <div className="min-h-[4rem]" />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
