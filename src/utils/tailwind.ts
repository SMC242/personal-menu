export type ElementSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export function sizeToClasses(size: ElementSize): string {
  switch (size) {
    case "xs":
      return "h-1 w-1";
    case "sm":
      return "h-2 w-2";
    case "md":
      return "h-3 w-3";
    case "lg":
      return "h-4 w-4";
    case "xl":
      return "h-6 w-6";
    case "xxl":
      return "h-8 w-8";
  }
}
