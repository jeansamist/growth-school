import { cn } from "@/lib/utils";
import { ComponentProps, FunctionComponent } from "react";

export type TextareaProps = ComponentProps<"textarea">;

export const Textarea: FunctionComponent<TextareaProps> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border py-3 min-h-40 resize-y border-primary-soft shadow-sm shadow-muted/5 outline-none placeholder:text-muted/70 px-4 focus:border-primary transition-colors text-sm",
        className
      )}
      {...props}
    />
  );
};
