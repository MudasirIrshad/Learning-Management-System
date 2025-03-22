"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";

interface ChapterActionsProps {
  disabled: Boolean;
  courseId: string;
  chapterId: string;
  isPublished: Boolean;
}
function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => {}}
          disabled={disabled}
          variant="outline"
          size={"sm"}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <Button size={"sm"}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}

export default ChapterActions;
