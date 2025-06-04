"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import DelayedLink from "../common/DelayedLink";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const iconVariants = {
    top: {
      closed: { top: 0, y: 0, rotate: 0 },
      open: { top: "50%", y: "-50%", rotate: 45 },
    },
    middle: {
      closed: { top: "50%", y: "-50%", opacity: 1, rotate: 0 },
      open: { top: "50%", y: "-50%", opacity: 0, rotate: 0 },
    },
    bottom: {
      closed: { bottom: 0, y: 0, rotate: 0 },
      open: { top: "50%", y: "-50%", rotate: -45 },
    },
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <>
      <button
        className="sm:hidden fixed left-6 top-10 bg-black/40 flex items-center justify-center p-3 rounded-full z-20"
        onClick={toggleOpen}
      >
        <div className="relative w-6 h-6">
          <motion.span
            className="absolute left-0 w-full h-[3px] bg-white origin-center"
            variants={iconVariants.top}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          />

          <motion.span
            className="absolute left-0 w-full h-[3px] bg-white origin-center"
            variants={iconVariants.middle}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          />

          <motion.span
            className="absolute left-0 w-full h-[3px] bg-white origin-center"
            variants={iconVariants.bottom}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                className="fixed top-0 left-0 w-64 h-full backdrop-blur-lg bg-white/10 border border-white/10 shadow-xl z-10"
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="flex flex-col p-8 pt-28 text-white">
                  <li>
                    <DelayedLink ms={0} className="w-full h-full py-2" href="/">
                      HOME
                    </DelayedLink>
                  </li>
                  <li>
                    <DelayedLink
                      ms={0}
                      className="w-full h-full py-2"
                      href="/projects"
                    >
                      PROJECTS
                    </DelayedLink>
                  </li>
                  <li>
                    <DelayedLink
                      ms={0}
                      className="w-full h-full py-2"
                      href="/about"
                    >
                      ABOUT
                    </DelayedLink>
                  </li>
                  <li>
                    <DelayedLink
                      ms={0}
                      className="w-full h-full py-2"
                      href="/posts"
                    >
                      POSTS
                    </DelayedLink>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
