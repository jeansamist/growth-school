import GTM from "@/components/GTM";
import { AppLayout } from "@/components/layouts/app-layout";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
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
      <head>
        <GTM />
        {/* <title>lorem</title> */}
      </head>
      <body className={`${font.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3K58L5C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) w */}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
