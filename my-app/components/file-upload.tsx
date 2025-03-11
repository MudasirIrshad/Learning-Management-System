"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0) {
          toast.error("No file uploaded.");
          return;
        }
        onChange(res[0]?.url);
        toast.success("File uploaded successfully!");
      }}
      onUploadError={(error) => {
        console.error("Upload error:", error);
        toast.error(error.message || "An error occurred during upload.");
      }}
    />
  );
};
