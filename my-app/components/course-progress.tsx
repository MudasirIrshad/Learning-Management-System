import React from "react";

interface CourseProgressProps {
  variant?: "default" | "success";
  value: number;
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700 ",
  success: "text-emerald-700"
};
const sizeByVariant = {
  default: "text-sm ",
  success: "text-xs"
};

function CourseProgress({ variant, value, size }: CourseProgressProps) {
  return (
    <div>
      <div></div>
    </div>
  );
}

export default CourseProgress;
