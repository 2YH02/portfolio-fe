import { cn } from "@/lib/utils";

interface GlassBoxProps {
  children?: React.ReactNode;
  className?: string;
  withAction?: boolean;
}

export const GlassBox = ({
  children,
  withAction = false,
  className,
}: GlassBoxProps) => {
  return (
    <div
      className={cn(
        "relative backdrop-blur-lg bg-white/10 border border-white/10 shadow-2xl",
        "rounded-2xl",
        "p-6",
        withAction && "overflow-hidden group transition-all duration-200",
        className
      )}
    >
      {withAction && (
        <div className="absolute -top-3 left-0 w-2/12 opacity-0 h-[200%] group-hover:animate-leftToRight bg-[rgba(255,255,255,0.1)] rotate-12"></div>
      )}
      {children}
    </div>
  );
};
