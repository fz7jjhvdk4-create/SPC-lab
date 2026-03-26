import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "SPC-Lab – Precision Parts AB",
  description: "Webbaserad laborationsmiljö för statistisk processtyrning och kapabilitetsstudier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full">
      <body className="min-h-full bg-[#F5F6F8] text-[#1a1a2e] antialiased">
        <TopBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
