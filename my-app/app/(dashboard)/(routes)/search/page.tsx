import prisma from "@/lib/prisma";
import React from "react";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "./_components/course-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
export default async function SearchPage(searchParams: SearchPageProps) {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  console.log(
    "Calling getCourses with:",
    searchParams.searchParams.categoryId,
    searchParams.searchParams.title
  );
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const courses = await getCourses({
    userId,
    title: searchParams.searchParams.title,
    categoryId: searchParams.searchParams.categoryId,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <div>
          <Categories items={categories} />
          <CoursesList items={courses} />
        </div>
      </div>
    </>
  );
}
