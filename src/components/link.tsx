import { type PropsWithChildren } from "react";
import { astroUrl } from "src/utils/astro.ts";
import "@styles/link.css";

export type LinkProps = PropsWithChildren<{
  /// Should be a relative URL. Will be qualified with the base URL
  href: string;
}>;

export default function Link({ children, href }: LinkProps) {
  return (
    <a href={astroUrl(href)} className="link">
      {children}
    </a>
  );
}
