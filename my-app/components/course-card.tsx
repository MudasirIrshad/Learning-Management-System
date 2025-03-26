import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}
function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) {
  return (
    <div>
      <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image alt={title} fill className="object-cover" src={imageUrl} />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">{category}</p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge size={"sm"} icon={BookOpen} />
              </div>
              <span>
                {chaptersLength}{" "}
                {chaptersLength === 1 || chaptersLength === 0
                  ? "Chapter"
                  : "Chapters"}{" "}
              </span>
            </div>
            {progress !== null ? (
              <div>Todo progress component.</div>
            ) : (
              <div>Rs. {price}</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CourseCard;
