import * as React from "react";
import { cn } from "@/lib/utils";

const textAreaVariants = {
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2",
  variant: {
    default:
      "bg-white text-black border-slate-200 border-2 border-b-[4px] focus:border-b-2 hover:bg-slate-100 text-slate-500",
    primary:
      "bg-white text-sky-500 border-sky-200 border-2 border-b-[4px] focus:border-b-2 hover:bg-slate-100",
    secondary:
      "bg-white text-green-500 border-green-200 border-2 border-b-[4px] focus:border-b-2 hover:bg-slate-100",
    danger:
      "bg-white text-rose-500 border-rose-200 border-2 border-b-[4px] focus:border-b-2 hover:bg-slate-100",
    super:
      "bg-white text-indigo-500 border-indigo-200 border-2 border-b-[4px] focus:border-b-2 hover:bg-slate-100",
  },
};

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: keyof typeof textAreaVariants.variant;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textAreaVariants.base,
          textAreaVariants.variant[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea, textAreaVariants };
