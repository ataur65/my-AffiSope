import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";
import { Providers } from "./providers"; // Import Providers
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/theme`);
    if (!res.ok) {
      console.error('Failed to fetch settings:', res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching settings for metadata:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: settings?.metaTitle || "My Affiliate App",
    description: settings?.metaDescription || "A powerful affiliate marketing platform.",
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
    },
    openGraph: {
      images: settings?.metaLogoUrl ? [settings.metaLogoUrl] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers> {/* Use Providers instead of SessionProvider */}
          {children}
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}