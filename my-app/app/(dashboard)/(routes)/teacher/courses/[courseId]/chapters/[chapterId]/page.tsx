import { IconBadge } from "@/components/icon-badge";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowLeft,
  Eye,
  EyeIcon,
  LayoutDashboard,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form copy";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const { userId } = await auth();
  if (!userId) return redirect("/");

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) return redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <div>
          <Banner
            variant={"warning"}
            label="This chapter is unpublished. It will not be visible in the course"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course Setup
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <div className="border border-sky-500 bg-sky-100 rounded-full p-1">
                <LayoutDashboard className="text-sky-600 " />
              </div>
              <h2 className="text-xl">Cusotmize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-x-2">
              <div className="bg-sky-100 p-1 border rounded-full border-sky-500">
                <EyeIcon className="text-sky-600" />
              </div>
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <div className="bg-sky-100 p-1 border rounded-full border-sky-500">
                <VideoIcon className="text-sky-600" />
              </div>
              <h2 className="text-xl">Add a video</h2>
            </div>
            <div>
              <ChapterVideoForm
                initialData={chapter}
                chapterId={params.chapterId}
                courseId={params.courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterIdPage;
