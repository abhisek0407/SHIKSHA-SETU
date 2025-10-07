import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiksha Setu-The Education Bridge",
  description: "This will help students in all sections of their studies",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{background: 'linear-gradient(135deg, #0d0d0d, #1a1a2e)', minHeight: '100vh', color: '#e0e0e0',fontFamily: 'Arial, sans-serif',
        }}>
        <Navbar/>
         <main>{children}</main>
      </body>
    </html>
  );
}
