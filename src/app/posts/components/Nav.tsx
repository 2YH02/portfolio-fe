"use client";

import DelayedLink from "@/components/common/DelayedLink";
import { GlassBox } from "@/components/ui/GlassBox";

const Nav = () => {
  return (
    <nav className="fixed left-1/2 top-10 -translate-x-1/2">
      <GlassBox className="py-0 rounded-full">
        <ul className="flex">
          <li className="shrink-0">
            <DelayedLink className="py-4 px-8" href="/">
              HOME
            </DelayedLink>
          </li>
          <li className="shrink-0">
            <DelayedLink className="py-4 px-8" href="/projects">
              PROJECTS
            </DelayedLink>
          </li>
          <li className="shrink-0">
            <DelayedLink className="py-4 px-8" href="/about">
              ABOUT
            </DelayedLink>
          </li>
        </ul>
      </GlassBox>
    </nav>
  );
};

export default Nav;
