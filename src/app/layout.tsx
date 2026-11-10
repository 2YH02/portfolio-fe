import GoogleAnalytics from "@/components/provider/GoogleAnalytics";
import PathListener from "@/components/provider/PathListener";
import { serializeJsonLd } from "@/lib/content/jsonLd";
import NoiseBackground from "@/components/ui/NoiseBackground";
import { Spotlight } from "@/components/ui/Spotlight";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Pen_Script } from "next/font/google";
import "highlight.js/styles/github-dark.css";
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
  variable: "--font-nanum-pen",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yonghun.me"),
  title: "개발자 이용훈 | Yonghun 포트폴리오",
  description: "개발자 이용훈의 포트폴리오입니다. 서비스와 앱, 개발 도구와 게임의 구현 과정, 성능과 사용성 개선 경험을 소개합니다.",
  authors: [{ name: "이용훈", url: "https://www.yonghun.me/about" }],
  creator: "이용훈",
  keywords: "이용훈,Yonghun,개발자,웹개발,프론트엔드,백엔드,포트폴리오,블로그",
  openGraph: {
    locale: "ko_KR",
    siteName: "개발자 이용훈 포트폴리오",
    type: "website",
    url: "https://www.yonghun.me",
    title: "개발자 이용훈 | Yonghun 포트폴리오",
    description: "개발자 이용훈의 포트폴리오입니다. 서비스와 앱, 개발 도구와 게임의 구현 과정, 성능과 사용성 개선 경험을 소개합니다.",
    images: "/metaimg.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "개발자 이용훈 | Yonghun 포트폴리오",
    description: "개발자 이용훈의 포트폴리오입니다. 서비스와 앱, 개발 도구와 게임의 구현 과정, 성능과 사용성 개선 경험을 소개합니다.",
    images: "/metaimg.png",
  },
  verification: {
    other: {
      "naver-site-verification": "a0b35ac99fea6cb5da0a0b6051930cb906c357ef",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "개발자 이용훈 | Yonghun 포트폴리오",
  url: "https://www.yonghun.me",
  inLanguage: "ko-KR",
  author: { "@type": "Person", name: "이용훈", url: "https://www.yonghun.me/about" },
  description: "개발자 이용훈이 만든 서비스와 앱, 개발 도구와 게임을 소개하는 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${geistNanum.variable} antialiased overflow-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <PathListener />
        <NoiseBackground />
        <Spotlight className="-top-40 left-1/2 -translate-x-1/2 md:translate-x-0 md:-top-20 md:left-60" />
        {children}
      </body>
    </html>
  );
}
