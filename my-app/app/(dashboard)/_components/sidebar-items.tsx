"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <div className="w-full">
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "relative flex items-center gap-x-2 w-full text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 h-12",
          isActive &&
            "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {label}
        </div>

        {/* Active State Border Indicator */}
        <div
          className={cn(
            "ml-auto opacity-0 border-r-4 border-sky-700 absolute inset-y-0 right-0 transition-all",
            isActive && "opacity-100"
          )}
        />
      </button>
    </div>
  );
}
