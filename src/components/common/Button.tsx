import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick?: VoidFunction;
  className?: React.ComponentProps<"button">["className"];
}

const Button = ({
  onClick,
  className,
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative backdrop-blur-lg bg-white/10 shadow-2xl inline-block py-3 px-6 text-white rounded-lg active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
