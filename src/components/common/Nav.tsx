import { cn } from "@/lib/utils";
import { GlassBox } from "../ui/GlassBox";
import HamburgerMenu from "../ui/HamburgerMenu";
import DelayedLink from "./DelayedLink";

interface NavProps {
  homeDelay?: number;
  projectsDelay?: number;
  aboutDelay?: number;
  postsDelay?: number;
  className?: React.ComponentProps<"div">["className"];
}

const Nav = ({
  homeDelay = 0,
  projectsDelay = 0,
  aboutDelay = 0,
  postsDelay = 0,
  className,
}: NavProps) => {
  return (
    <nav className="absolute top-10 left-10 sm:fixed sm:left-1/2 sm:top-10 sm:-translate-x-1/2 z-20 font-main">
      <HamburgerMenu />
      <GlassBox className={cn("py-0 rounded-full hidden sm:block", className)}>
        <ul className="flex">
          <li className="shrink-0">
            <DelayedLink ms={homeDelay} className="py-4 px-8" href="/">
              HOME
            </DelayedLink>
          </li>
          <li className="shrink-0">
            <DelayedLink
              ms={projectsDelay}
              className="py-4 px-8"
              href="/projects"
            >
              PROJECTS
            </DelayedLink>
          </li>
          <li className="shrink-0">
            <DelayedLink ms={aboutDelay} className="py-4 px-8" href="/about">
              ABOUT
            </DelayedLink>
          </li>
          <li className="shrink-0">
            <DelayedLink ms={postsDelay} className="py-4 px-8" href="/posts">
              POSTS
            </DelayedLink>
          </li>
        </ul>
      </GlassBox>
    </nav>
  );
};

export default Nav;
