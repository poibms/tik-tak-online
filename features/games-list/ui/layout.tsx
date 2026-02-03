import { PropsWithChildren, ReactNode } from "react";

export function Layout({
  children,
  actions,
}: {
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-end ga">{actions}</div>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
