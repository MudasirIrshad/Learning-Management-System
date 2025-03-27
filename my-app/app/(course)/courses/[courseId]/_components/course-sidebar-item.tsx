"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

function CourseSidebarItem({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine the icon based on conditions
  const Icon = useMemo(
    () => (isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle),
    [isLocked, isCompleted]
  );

  // Check if the current chapter is active
  const isActive = pathname?.includes(id);

  // Handle navigation
  const handleClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "relative flex items-center gap-x-2 text-sm font-medium pl-6 py-4 transition-all",
        "text-slate-500 hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <Icon
        size={22}
        className={cn(
          "transition-colors",
          isActive ? "text-slate-700" : "text-slate-500",
          isCompleted && "text-emerald-700"
        )}
      />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto absolute inset-y-0 right-0 w-1 bg-sky-700 transition-opacity opacity-100" />
      )}
    </button>
  );
}

export default CourseSidebarItem;
