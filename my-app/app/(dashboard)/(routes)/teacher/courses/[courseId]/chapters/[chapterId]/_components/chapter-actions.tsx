"use client";
import ConfirmModel from "@/components/model/confirm-model";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log("THIS IS THE CHAOTER ID:", chapterId);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      console.log("Entered");

      toast.success("Chapter Deleted");
      router.push(`/teacher/courses/${courseId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => {}}
          disabled={isLoading}
          variant="outline"
          size={"sm"}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModel onConfirm={onDelete}>
          <Button size={"sm"}>
            <Trash />
          </Button>
        </ConfirmModel>
      </div>
    </div>
  );
}

export default ChapterActions;
