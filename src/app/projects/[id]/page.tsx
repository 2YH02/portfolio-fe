import { projects } from "@/data";
import { notFound } from "next/navigation";
import DetailClient from "./pageClient";

export const dynamic = "force-static";

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
