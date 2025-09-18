import * as React from "react";
import { cn } from "@lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-1 text-base shadow-sm transition-colors outline-none md:text-sm",
        "placeholder:text-muted-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
