"use client";
import { UserButton } from "@clerk/nextjs";
import { Divide, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SearchInput from "./search-input";

export default function NavbarRoutes() {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <div>
            <Link href={"/"}>
              <Button size={"sm"} variant={"ghost"}>
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href={"/teacher/courses"}>
              <Button size={"sm"} variant={"ghost"}>
                Teacher Mode
              </Button>
            </Link>
          </div>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
