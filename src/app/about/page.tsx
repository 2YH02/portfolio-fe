import AboutClient from "./AboutClient";

export const dynamic = "force-static";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "이용훈",
  url: "https://www.yonghun.me",
  jobTitle: "웹 개발자",
  description: "기억에 남는 순간을 만들고 싶은 웹 개발자입니다.",
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
