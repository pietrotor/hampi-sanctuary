import Image from "next/image";
import { site } from "@/lib/copy";

type Variant = "green" | "sage" | "bone";

const LOCKUP = { width: 466, height: 500 };
const MARK = { width: 176, height: 317 };

/**
 * The supplied lockup is vertical, so the mark alone is used wherever the
 * wordmark would be too small to read (nav). Variant is chosen by the
 * background the logo sits on, never by decoration.
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

export function BrandMark({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <Image
      src={`/logo-mark-${variant}.png`}
      alt=""
      width={MARK.width}
      height={MARK.height}
      data-logo=""
      className={className}
    />
  );
}
