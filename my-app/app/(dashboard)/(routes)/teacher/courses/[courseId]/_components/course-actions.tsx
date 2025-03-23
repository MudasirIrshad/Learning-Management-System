"use client";
import ConfirmModel from "@/components/model/confirm-model";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: Boolean;
  courseId: string;

  isPublished: Boolean;
}
function CourseActions({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course Deleted");
      router.push(`/teacher/courses`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
        router.refresh();
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        router.refresh();
      }
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
          onClick={onClick}
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

export default CourseActions;
