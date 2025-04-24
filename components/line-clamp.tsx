"use client";
import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";

export type LineClampProps = {
  text: string;
};

export const LineClamp: FunctionComponent<LineClampProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "opacity-70 leading-normal text-balance lg:text-lg xl:text-xl",
          isOpen ? "line-clamp-none" : "line-clamp-4"
        )}
      >
        {text}
      </div>
      <div
        className="p-1 bg-black/10 text-black text-xs font-medium rounded-full text-center cursor-pointer mt-2 hover:bg-black/20 transition-all duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Voir moins" : "Voir plus"}
      </div>
    </>
  );
};
