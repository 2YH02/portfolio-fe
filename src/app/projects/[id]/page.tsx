import { projects } from "@/data";
import DetailClient from "./pageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = projects.find((project) => project.id === ~~id);

  if (!project) return <div>asd</div>;

  return <DetailClient project={project} />;
}
