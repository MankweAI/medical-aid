import React from 'react';
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/context/CompareContext";
import CompareDock from "@/components/CompareDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Viewport must be a separate export in Next.js 14+
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "HealthOS",
  description: "Virtual Actuary Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* The App Constraint Container */}
        <div id="app-frame">
          <CompareProvider>
            {children}
            {/* CompareDock will now be visually constrained by the centered layout */}
            <CompareDock />
          </CompareProvider>
        </div>
      </body>
    </html>
  );
}