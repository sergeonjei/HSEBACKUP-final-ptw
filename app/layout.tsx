import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Permit to Work System",
  description: "A comprehensive permit to work system for managing work permits, risk assessments, and safety compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
} 