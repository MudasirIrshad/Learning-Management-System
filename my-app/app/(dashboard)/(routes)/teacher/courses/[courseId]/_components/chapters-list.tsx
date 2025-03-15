"use client";
import { Chapter } from "@prisma/client";
import React from "react";
interface ChapterListProps {
  items: Chapter[];
  onReorder: (
    updateData: {
      id: string;
      position: number;
    }[]
  ) => void;
  onEdit: (id: string) => void;
}
function ChapterList({ items, onReorder, onEdit }: ChapterListProps) {
  return <div>ChapterList</div>;
}

export default ChapterList;
