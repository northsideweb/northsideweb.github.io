import { asset, cn } from "@/lib/utils";

/**
 * Brand logo assets processed from the original artwork
 * (black background removed; navy + white variants in /public).
 */
type LogoVariant = "navy" | "white" | "brand";

const MARK_SRC: Record<LogoVariant, string> = {
  navy: "/logo-mark-navy.png",
  white: "/logo-mark-white.png",
  brand: "/logo-mark-original.png", // exact artwork colors
};

const FULL_SRC: Record<LogoVariant, string> = {
  navy: "/logo-full-navy.png",
  white: "/logo-full-white.png",
  brand: "/logo-full-original.png", // exact artwork colors
};

export function LogoMark({
  className,
  variant = "navy",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    <img
      src={asset(MARK_SRC[variant])}
      alt=""
      aria-hidden="true"
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}

/** Full lockup: monogram + wordmark + strapline. */
export function LogoLockup({
  className,
  variant = "navy",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    <img
      src={asset(FULL_SRC[variant])}
      alt="Northside Web, websites that work"
      className={cn("select-none", className)}
      draggable={false}
    />
  );
}
