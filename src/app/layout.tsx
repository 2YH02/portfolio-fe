import PathListener from "@/components/provider/PathListener";
import NoiseBackground from "@/components/ui/NoiseBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistNanum = Nanum_Pen_Script({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yonghun",
  description: "포트폴리오, 블로그, 그리고 나",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistNanum} antialiased overflow-hidden`}
      >
        <PathListener />
        <NoiseBackground />
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="#a8a8a8"
        />
        {children}
      </body>
    </html>
  );
}
