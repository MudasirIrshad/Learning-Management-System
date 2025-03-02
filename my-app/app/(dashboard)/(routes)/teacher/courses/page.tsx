import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CoursesPage() {
  return (
    <div className="p-6">
      <Link href={"/teacher/createcourse"}>
        <Button>Add Course</Button>
      </Link>
    </div>
  );
}

export default CoursesPage;
