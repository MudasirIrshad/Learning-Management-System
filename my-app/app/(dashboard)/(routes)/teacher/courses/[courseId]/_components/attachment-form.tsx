"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Loader2, PencilIcon, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}
const formSchema = z.object({
  url: z.string().min(1),
});
function AttachmentForm({ initialData, courseId }: AttachmentFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
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
  const onDelete = async (id: string) => {
    try {
      console.log("THis is the id", id);
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachement Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
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
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments?.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">No attachments</p>
          )}
          {initialData.attachments.length > 0 && (
            <>
              <div className="space-y-2">
                {initialData.attachments.map((attachment) => {
                  return (
                    <div
                      key={attachment.id}
                      className="flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-700 rounded-md"
                    >
                      <File className="h-4 w-4 mr-2 flex-shrink-0" />
                      <p className="text-xs line-clamp-1">{attachment.name}</p>
                      {deletingId === attachment.id && (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      )}
                      {deletingId !== attachment.id && (
                        <button
                          className="ml-auto hover:opacity-75"
                          onClick={() => {
                            onDelete(attachment.id);
                          }}
                        >
                          <X className="h-4 w-4 ml-2 text-gray-900" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
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
