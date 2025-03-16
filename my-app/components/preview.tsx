"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/quill.bubble.css";
interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const RecoilQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return <ReactQuill theme="bubble" value={value} readOnly />;
};
