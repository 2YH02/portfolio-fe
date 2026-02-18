"use client";

import { useState } from "react";
import DelayedLink from "../common/DelayedLink";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        className="sm:hidden fixed left-6 top-10 bg-black/40 flex items-center justify-center p-3 rounded-full z-20"
        onClick={toggleOpen}
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute left-0 w-full h-[3px] bg-white origin-center transition-all duration-200 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 rotate-0"
            }`}
          />

          <span
            className={`absolute left-0 top-1/2 w-full h-[3px] -translate-y-1/2 bg-white origin-center transition-all duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />

          <span
            className={`absolute left-0 w-full h-[3px] bg-white origin-center transition-all duration-200 ${
              isOpen
                ? "top-1/2 -translate-y-1/2 -rotate-45"
                : "bottom-0 rotate-0"
            }`}
          />
        </div>
      </button>

      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <nav
          className={`fixed top-0 left-0 w-64 h-full backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl z-10 transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col p-8 pt-28 text-white">
            <li>
              <DelayedLink ms={0} className="w-full h-full py-2" href="/">
                HOME
              </DelayedLink>
            </li>
            <li>
              <DelayedLink ms={0} className="w-full h-full py-2" href="/projects">
                PROJECTS
              </DelayedLink>
            </li>
            <li>
              <DelayedLink ms={0} className="w-full h-full py-2" href="/about">
                ABOUT
              </DelayedLink>
            </li>
            <li>
              <DelayedLink ms={0} className="w-full h-full py-2" href="/posts">
                POSTS
              </DelayedLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
