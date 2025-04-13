"use client";
import { FunctionComponent, useState } from "react";
import { AppLogo } from "./app-logo";
import { cn } from "@/lib/utils";

type Link = {
  title: string;
  href: string;
  isActive?: boolean;
};
export const Topbar: FunctionComponent = () => {
  const [links, setLinks] = useState<Link[]>([
    {
      title: "Accueil",
      href: "/",
      isActive: true,
    },
    {
      title: "Boutique",
      href: "/shop",
      isActive: false,
    },
    {
      title: "E-books",
      href: "/ebooks",
      isActive: false,
    },
    {
      title: "Best-sellers",
      href: "/bestsellers",
      isActive: false,
    },
  ]);
  return (
    <nav className="py-6 h-auto lg:h-[130px] bg-white border-b border-[#F0F0F0] flex items-center">
      <div
        className={
          "flex flex-col lg:flex-row lg:justify-between gap-6 items-center w-full px-6 lg:px-12 mx-auto"
        }
      >
        <a href="/">
          <AppLogo className="w-36 lg:w-auto" />
        </a>
        <div className="flex items-center gap-4 lg:gap-[55px]">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={cn(
                "font-bold text-sm sm:text-base hover:text-primary transition-color duration-200",
                link.isActive && "text-primary",
                link.href === "/bestsellers" && "text-secondary"
              )}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
