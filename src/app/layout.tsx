import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/config/fonts";
import { Provider } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Teslo | Shop",
  },
  description: "A simple e-commerce site built with Next.js and Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
