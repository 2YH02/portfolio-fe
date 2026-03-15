import { projects } from "@/data";
import { notFound } from "next/navigation";
import DetailClient from "./DetailClient";

export const dynamic = "force-static";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const project = projects.find((project) => project.id === ~~id);

  if (!project) {
    return {
      title: "프로젝트",
    };
  }

  return {
    title: `프로젝트 - ${project.title}`,
    description: project.description,
    keywords: `${project.techStack.join(", ")}, 포트폴리오, 프로젝트`,
    alternates: {
      canonical: `https://www.yonghun.me/projects/${id}`,
    },
    openGraph: {
      type: "website",
      url: `https://www.yonghun.me/projects/${id}`,
      title: `프로젝트 - ${project.title}`,
      description: project.description,
      images: project.images[0],
    },
    twitter: {
      card: "summary_large_image",
      title: `프로젝트 - ${project.title}`,
      description: project.description,
      images: project.images[0],
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = projects.find((project) => project.id === ~~id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://www.yonghun.me/projects/${id}`,
    image: project.images[0],
    keywords: project.techStack.join(", "),
    author: {
      "@type": "Person",
      name: "이용훈",
      url: "https://www.yonghun.me",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DetailClient project={project} />
    </>
  );
}
