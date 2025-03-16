"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface ChapterDescriptionFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  chapterDesription: z.string().min(1, {
    message: "Enter chapter Description",
  }),
});

function ChapterDescriptionForm({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterDesription: initialData.description || "",
    },
  });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${initialData.id}`);
      toggleEdit();
      toast.success("Chapter Description Updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="bg-slate-100 mt-6 p-4">
        <div className="flex justify-between">
          Chapter Description
          <div>
            {isEditing ? (
              <Button onClick={toggleEdit} variant={"ghost"}>
                Cancle
              </Button>
            ) : (
              <div className="font-medium flex items-center justify-between ">
                <Button onClick={toggleEdit} variant={"ghost"}>
                  <PencilIcon className="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          {/* SHOW NO DESCRIPTION WHEN NO DESCRIPTION */}
          {!isEditing && !initialData.description?.length && (
            <div className="text-sm text-slate-600 italic">No description</div>
          )}
          {/* SHOW DESCRIPTION WHEN THERE IS A DESCRIIPTION */}
          {!isEditing && initialData.description?.length && (
            <div>{initialData.description}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChapterDescriptionForm;
