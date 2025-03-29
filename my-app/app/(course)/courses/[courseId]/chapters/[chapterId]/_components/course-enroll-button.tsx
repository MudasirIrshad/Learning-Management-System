"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}
function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    console.log("THIS IS THE COURSE ID", courseId);
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={onClick} disabled={isLoading} size={"sm"}>
        Enroll for Rs. {price}
      </Button>
    </div>
  );
}

export default CourseEnrollButton;
