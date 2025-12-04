import React from 'react';
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/context/CompareContext";
import { PersonaProvider } from "@/context/PersonaContext"; // 1. Import
import ActionDock from "@/components/PinsFab";
import TrustFooter from "@/components/TrustFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <div id="app-frame">
          {/* 2. Wrap Everything in PersonaProvider */}
          <PersonaProvider>
            <CompareProvider>
              {children}
              <TrustFooter />
              <React.Suspense fallback={null}>
                <ActionDock />
              </React.Suspense>
            </CompareProvider>
          </PersonaProvider>
        </div>
      </body>
    </html>
  );
}