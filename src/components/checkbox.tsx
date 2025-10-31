import { type InputHTMLAttributes, type PropsWithChildren } from "react";
import CheckIcon from "@components/icons/check.tsx";

export type CheckboxProps = PropsWithChildren<{
  controlled?: boolean;
  elementSize?: "sm" | "md" | "lg" | "xl";
}> &
  InputHTMLAttributes<HTMLInputElement>;

function sizeToClasses(
  size: Exclude<CheckboxProps["elementSize"], undefined>,
): string {
  switch (size) {
    case "sm":
      return "h-2 w-2";
    case "md":
      return "h-3 w-3";
    case "lg":
      return "h-4 w-4";
    case "xl":
      return "h-8 w-8";
  }
}

export default function Checkbox({
  children,
  className,
  id,
  elementSize = "md",
  controlled = false,
  ...props
}: CheckboxProps) {
  const sizeClasses = sizeToClasses(elementSize);
  const classes = `appearance-none relative border-orange-50 ${sizeClasses} border rounded-sm bg-amber-50 peer ${className}`;
  const controlledProps = {
    // To make React happy. See https://react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it
    readOnly: controlled,
    // For accessibility
    "aria-disabled": controlled,
  };

  return (
    <span className="relative flex min-w-0 items-center gap-1">
      <input
        type="checkbox"
        id={id}
        className={classes}
        {...controlledProps}
        {...props}
      />
      <CheckIcon
        className={`pointer-events-none absolute bottom-2 left-0.5 hidden scale-x-140 scale-y-220 align-middle peer-checked:inline-block peer-hover:scale-x-180 peer-hover:scale-y-260 ${sizeClasses}`}
      />
      <label className="cursor-pointer align-middle" htmlFor={id}>
        {children}
      </label>
    </span>
  );
}
