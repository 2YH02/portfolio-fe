import { ProjectTransitionProvider } from "./components/ProjectTransition";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <ProjectTransitionProvider>{children}</ProjectTransitionProvider>;
}
