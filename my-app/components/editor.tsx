"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  // Dynamically import react-quill, disable SSR
  const RecoilQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div>
      <div className="bg-white">
        {/* Use the dynamically imported RecoilQuill */}
        <RecoilQuill theme="snow" value={value} onChange={onChange} />
      </div>
    </div>
  );
};
