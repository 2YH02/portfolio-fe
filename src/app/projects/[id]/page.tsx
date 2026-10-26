import Nav from "@/components/common/Nav";
import { GlassBox } from "@/components/ui/GlassBox";
import { projects, type Members, type Section } from "@/data";
import { serializeJsonLd } from "@/lib/content/jsonLd";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { ProjectImageTarget } from "../components/ProjectTransition";

export const dynamic = "force-static";

export const generateStaticParams = () =>
  projects.map((project) => ({ id: String(project.id) }));

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
      images: project.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title: `프로젝트 - ${project.title}`,
      description: project.description,
      images: project.thumbnail,
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const index = projects.findIndex((project) => project.id === ~~id);
  const project = projects[index];

  if (!project) {
    notFound();
  }

  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://www.yonghun.me/projects/${id}`,
    image: project.thumbnail,
    keywords: project.techStack.join(", "),
    author: {
      "@type": "Person",
      name: "이용훈",
      url: "https://www.yonghun.me",
    },
  };

  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Nav className="bg-black/40" />

      <article className="mx-auto max-w-4xl px-6 pt-32 pb-24 sm:pt-36">
        <Link
          href="/projects"
          className="project-detail-copy mb-6 text-sm text-gray-400 hover:text-white"
        >
          <span className="flex items-center">
            <BsArrowLeftShort size={22} />
            Projects
          </span>
        </Link>

        {/* 기본 정보 */}
        <header className="mt-10 mb-12">
          <div className="project-detail-copy">
            <p className="mb-3 text-sm text-indigo-200">{project.category}</p>
            <h1 className="text-3xl font-bold md:text-4xl">{project.title}</h1>
            <p className="mt-3 text-lg text-gray-300">{project.tagline}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-indigo-200">{highlight}</li>
              ))}
            </ul>
          </div>

          <figure className="mt-8">
            <ProjectImageTarget id={project.id}>
              <GlassBox className="relative aspect-video p-0 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.thumbnailAlt}
                  fill
                  sizes="(min-width: 896px) 848px, 100vw"
                  priority
                  className="object-cover"
                />
              </GlassBox>
            </ProjectImageTarget>
          </figure>

          <GlassBox className="project-detail-copy mt-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
              <MetaItem label="담당 역할">{project.role}</MetaItem>
              <MetaItem label="개발 인원">
                {project.teamSize ? `${project.teamSize}명` : formatMembers(project.members)}
              </MetaItem>
              {project.period && (
                <MetaItem label="개발 기간">{project.period}</MetaItem>
              )}
              <MetaItem label="담당 작업" className="sm:col-span-2">{project.contribution}</MetaItem>
              <MetaItem label="링크">
                <div className="flex flex-col gap-1">
                  {project.deployUrl && (
                    <ExternalLink href={project.deployUrl}>
                      {project.deployUrl.replace(/^https?:\/\//, "")}
                    </ExternalLink>
                  )}
                  {project.repository.map((url) => (
                    <ExternalLink key={url} href={url}>
                      {url.replace("https://github.com/", "GitHub · ")}
                    </ExternalLink>
                  ))}
                  {project.repositoryPrivate && (
                    <span className="text-gray-400">GitHub · 비공개 저장소</span>
                  )}
                </div>
              </MetaItem>
              <MetaItem label="사용 기술" className="sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-indigo-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </MetaItem>
            </dl>
          </GlassBox>
        </header>

        {/* 개요 */}
        <section className="project-detail-copy mb-16">
          <SectionTitle>프로젝트 소개</SectionTitle>
          <p className="leading-relaxed text-gray-300">{project.description}</p>
        </section>

        {/* 핵심 기능 및 성과 */}
        {project.sections && (
          <section className="project-detail-copy mb-16">
            <SectionTitle>주요 작업</SectionTitle>
            <ol className="flex flex-col gap-10">
              {project.sections.map((section, i) => (
                <SectionItem key={section.title} section={section} index={i} />
              ))}
            </ol>
          </section>
        )}

        {project.additionalWork.length > 0 && (
          <section className="project-detail-copy mb-20">
            <SectionTitle>그 외 작업</SectionTitle>
            <ul className="flex flex-col gap-3 text-gray-300">
              {project.additionalWork.map((item) => <li key={item} className="border-l border-white/10 pl-4 leading-relaxed">{item}</li>)}
            </ul>
          </section>
        )}

        {/* 다음 프로젝트 */}
        {next.id !== project.id && (
          <Link href={`/projects/${next.id}`} className="project-detail-copy w-full">
            <GlassBox withAction className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">다음 프로젝트</p>
                <p className="mt-1 text-lg group-hover:drop-shadow-glow">
                  {next.title}
                </p>
              </div>
              <BsArrowRightShort
                size={28}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </GlassBox>
          </Link>
        )}
      </article>
    </main>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-2xl font-bold text-blue-500">{children}</h2>
);

const MetaItem = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={className}>
    <dt className="mb-1.5 text-xs text-gray-400">{label}</dt>
    <dd className="text-gray-200">{children}</dd>
  </div>
);

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="break-all text-[#7c86ff] hover:text-white"
  >
    {children}
  </a>
);

const SectionItem = ({
  section,
  index,
}: {
  section: Section;
  index: number;
}) => {
  return (
    <li className="border-l border-white/10 pl-6">
      <span className="font-mono text-sm text-blue-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-1 mb-4 text-lg font-semibold">{section.title}</h3>

      <p className="mb-4 leading-relaxed text-gray-300">{section.description}</p>
      <ul className="flex flex-col gap-2 text-gray-300">
        {section.items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed">
            <span aria-hidden="true" className="text-gray-500">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {section.result && <p className="mt-4 leading-relaxed text-indigo-200">{section.result}</p>}
    </li>
  );
};

function formatMembers(members: Members | null = {}): string {
  if (!members) return "1명";

  const labelMap = {
    fe: "FE",
    be: "BE",
    ui: "UI/UX",
    pm: "PM",
  };

  const order: (keyof Members)[] = ["fe", "be", "ui", "pm"];

  let total = 0;
  const parts: string[] = [];

  for (const key of order) {
    const cnt = members[key] ?? 0;
    if (cnt > 0) {
      total += cnt;
      parts.push(`${labelMap[key]}: ${cnt}`);
    }
  }

  if (total === 0) {
    return "0명";
  }

  return `${total}명 (${parts.join(", ")})`;
}
