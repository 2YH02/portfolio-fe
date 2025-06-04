import GoogleAnalytics from "@/components/provider/GoogleAnalytics";
import InitHLJS from "@/components/provider/InitHLJS";
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
  title: "Yonghun - 포트폴리오",
  description: "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다.",
  keywords: "웹개발,프론트엔드,백엔드,포트폴리오,개발자,블로그",
  openGraph: {
    type: "website",
    url: "https://www.yonghun.me",
    title: "Yonghun - 포트폴리오",
    description: "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yonghun - 포트폴리오",
    description: "기억에 남는 순간을 만들고 싶은 웹 개발자 이용훈입니다.",
    images: "/metaimg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${geistNanum} antialiased overflow-hidden`}
      >
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <InitHLJS />
        <PathListener />
        <NoiseBackground />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
        {children}
      </body>
    </html>
  );
}
