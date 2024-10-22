import * as React from "react";
import { cn } from "@/lib/utils";

const inputVariants = {
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-4 py-2",
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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof inputVariants.variant;
  icon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "default", icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={cn(
            inputVariants.base,
            inputVariants.variant[variant],
            Icon && "pl-10",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
