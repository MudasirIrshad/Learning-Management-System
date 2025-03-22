import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string; chapterId: string };
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    const muxData = await prisma.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
        console.log("Here");
        
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const publishedChapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("CHAPTER PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
