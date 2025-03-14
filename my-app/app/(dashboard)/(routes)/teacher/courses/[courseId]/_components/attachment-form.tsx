"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, PencilIcon, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attahments: Attachment[] };
  courseId: string;
}
const formSchema = z.object({
  attachmentUrl: z.string().min(1),
});
function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Attachment updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachment
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancle</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a file
            </>
          )}
          {isEditing && initialData.attahments && (
            <>
              <PencilIcon className="h-4 w-4" />
              Edit file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attahments && (
            <p className="text-sm mt-2 text-slate-500 italic">No attachments</p>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your student might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
}

export default AttachmentForm;
