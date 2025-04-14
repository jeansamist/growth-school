import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layouts/app-layout";
const font = Cairo({
  variable: "--font-cairo-sans",
  weight: "variable",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Growth school",
  description: "Get items and courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
