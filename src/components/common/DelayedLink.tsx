"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface DelayedLinkProps {
  href: string;
  ms?: number;
  replace?: boolean;
  children: React.ReactNode;
  className?: React.ComponentProps<"a">["className"];
  onClick?: VoidFunction;
}

const DelayedLink = ({
  href,
  ms = 0,
  replace = false,
  children,
  onClick,
  className,
}: DelayedLinkProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    setTimeout(() => {
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    }, ms);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "hover:drop-shadow-glow transition duration-300",
        className
      )}
    >
      {children}
    </a>
  );
};

export default DelayedLink;
