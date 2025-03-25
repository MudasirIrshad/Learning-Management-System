import prisma from "@/lib/prisma";
import React from "react";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";

export default async function SearchPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-2">
        <div>
          <Categories items={categories} />
        </div>
      </div>
    </>
  );
}
