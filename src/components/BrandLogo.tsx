import Image from "next/image";
import { site } from "@/lib/copy";

type Variant = "green" | "sage" | "bone";

const LOCKUP = { width: 466, height: 500 };
const ROW = { width: 705, height: 317 };

/**
 * Two arrangements of one logo: the supplied vertical lockup, and a
 * horizontal row built by `scripts/build-logo-row.mjs` for short surfaces
 * like the nav. Variant is chosen by the background the logo sits on, never
 * by decoration. The mark on its own is still used by the icon routes, which
 * read the PNG directly.
 */
export function BrandLockup({
  variant,
  className,
  priority = false,
}: {
  variant: Variant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/logo-lockup-${variant}.png`}
      alt={site.name}
      width={LOCKUP.width}
      height={LOCKUP.height}
      priority={priority}
      data-logo=""
      className={className}
    />
  );
}

/**
 * Mark and wordmark side by side. Carries no "SANCTUARY": at the heights this
 * arrangement exists for, that line renders about four pixels tall.
 */
export function BrandRow({
  variant,
  className,
  priority = false,
}: {
  variant: Variant;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/logo-row-${variant}.png`}
      alt=""
      width={ROW.width}
      height={ROW.height}
      priority={priority}
      data-logo=""
      className={className}
    />
  );
}
