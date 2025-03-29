"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}
function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
  return (
    <div>
      <Button size={"sm"}>Enroll for Rs. {price}</Button>
    </div>
  );
}

export default CourseEnrollButton;
