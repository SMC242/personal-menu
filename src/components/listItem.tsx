import type { PropsWithChildren } from "react";

export type ListItemProps = PropsWithChildren<{
  className?: string;
}>;

function ListItem({ className, children }: ListItemProps) {
  return (
    <li className={`list-inside list-['-_'] ${className ?? ""}`}>{children}</li>
  );
}
export default ListItem;
