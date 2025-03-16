"use client";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
  description: z.string().min(1, {
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
      description: initialData.description || "",
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
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggleEdit();
      toast.success("Chapter Description Updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-slate-100 mt-6 p-6 border rounded-lg shadow-sm">
      {/* Header with Title and Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <h3>Chapter Description</h3>
        {isEditing ? (
          <Button onClick={toggleEdit} variant="ghost">
            Cancel
          </Button>
        ) : (
          <Button onClick={toggleEdit} variant="ghost">
            <PencilIcon className="w-4 h-4 mr-2" /> Edit
          </Button>
        )}
      </div>

      {/* Description Display */}
      {!isEditing && (
        <div className="text-gray-700 text-sm bg-white rounded-md shadow-inner">
          {initialData.description?.length ? (
            <Preview value={initialData.description} />
          ) : (
            <p className="italic text-gray-500">No description available</p>
          )}
        </div>
      )}

      {/* Editing Mode */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ChapterDescriptionForm;
