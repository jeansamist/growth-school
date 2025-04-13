import { FunctionComponent, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Topbar } from "../topbar";

export const AppLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div>
      <Topbar />
      <main className="pt-6">{children}</main>
    </div>
  );
};
