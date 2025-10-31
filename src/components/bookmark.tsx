import "@styles/bookmark.css";
import { type PropsWithChildren, type HTMLAttributes } from "react";

export type BookmarkProps = PropsWithChildren<{
  variant: "light" | "dark";
}> &
  HTMLAttributes<HTMLDivElement>;

function classFromVariant(variant: BookmarkProps["variant"]) {
  switch (variant) {
    case "light":
      return "bookmark bookmark--light";
    case "dark":
      return "bookmark";
  }
}
export default function Bookmark({
  className,
  variant = "dark",
  children,
}: BookmarkProps) {
  return (
    <div
      className={`${classFromVariant(variant)} bookmark-gradient ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
