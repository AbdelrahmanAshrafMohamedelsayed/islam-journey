"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
}

const cardVariants = {
  default:
    "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
  elevated: "bg-white dark:bg-slate-900 shadow-lg dark:shadow-slate-900/50",
  outlined: "bg-transparent border-2 border-slate-300 dark:border-slate-700",
  glass:
    "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/20 dark:border-slate-700/50",
  gradient:
    "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border border-emerald-200 dark:border-emerald-800",
};

const paddingVariants = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hoverable = false,
      clickable = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200",
          cardVariants[variant],
          paddingVariants[padding],
          hoverable && "hover:shadow-xl hover:-translate-y-1",
          clickable && "cursor-pointer active:scale-[0.99]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Card Header
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

// Card Title
const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Card Description
const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Card Content
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

// Animated Card - with controlled props
interface AnimatedCardProps {
  variant?: "default" | "elevated" | "outlined" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hoverable,
      clickable,
      children,
      onClick,
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={onClick}
        className={cn(
          "rounded-2xl transition-colors duration-200",
          cardVariants[variant],
          paddingVariants[padding],
          clickable && "cursor-pointer",
          className,
        )}
      >
        {children}
      </motion.div>
    );
  },
);

AnimatedCard.displayName = "AnimatedCard";

// Feature Card - Special card for landing page features
interface FeatureCardProps extends CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        hoverable
        className={cn("group", className)}
        {...props}
      >
        <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </Card>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
