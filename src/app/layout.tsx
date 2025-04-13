import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/utils/fonts";
import Footer from "@/components/Footer";

// Mendefinisikan font Poppins dan Lora

export const metadata: Metadata = {
  title: "FlugelVibe",
  description:
    "FlugelVibe is a mood-based music recommender that generates personalized playlists to match your current vibe. Whether you're feeling happy, sad, or chill, FlugelVibe helps you discover the perfect soundtrack to enhance your day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-[#F4D793]`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
