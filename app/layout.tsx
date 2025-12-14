import React from 'react';
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/context/CompareContext";
import { PersonaProvider } from "@/context/PersonaContext";
import ActionDock from "@/components/PinsFab";
import TrustFooter from "@/components/TrustFooter";
import SplashScreen from "@/components/SplashScreen";

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
  title: "INTELLIHEALTH",
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
        <SplashScreen>
          <div id="app-frame">
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
        </SplashScreen>
      </body>
    </html>
  );
}