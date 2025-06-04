import { projects } from "@/data";
import { notFound } from "next/navigation";
import DetailClient from "./pageClient";

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
    keywords: "포트폴리오, 프로젝트",
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

  return <DetailClient project={project} />;
}
