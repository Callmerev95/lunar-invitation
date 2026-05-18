import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Lunar Invitation - Elegant Digital Wedding Invitation",
  description: "Create stunning, minimalist luxury wedding invitations with Lunar Invitation. Premium digital templates for modern couples.",
  keywords: ["wedding invitation", "digital invitation", "elegant", "invitation card"],
  openGraph: {
    title: "Lunar Invitation",
    description: "Elegant Digital Wedding Invitation",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#FAF7F2] text-[#3A2F2F] antialiased">
        {children}
      </body>
    </html>
  );
}