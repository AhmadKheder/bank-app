import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#3366FF] text-white shadow-md hover:bg-[#2B5CD8] focus-visible:ring-[#3366FF]/50",
        destructive:
          "bg-red-600 text-white shadow-md hover:bg-red-500 focus-visible:ring-red-500/50",
        outline:
          "border border-[#6C757D] bg-white text-[#1A1A1A] hover:bg-[#F8F9FA] dark:bg-[#2D2D2D] dark:text-white dark:border-gray-600",
        secondary:
          "bg-[#F8F9FA] text-[#1A1A1A] shadow-sm hover:bg-[#E9ECEF] dark:bg-[#2D2D2D] dark:text-white dark:hover:bg-[#3A3A3A]",
        ghost:
          "text-[#3366FF] hover:bg-[#E3EAFD] dark:text-[#A3B8FF] dark:hover:bg-[#2D2D2D]",
        link: "text-[#3366FF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
