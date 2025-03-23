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

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    const unPublishCourse = await prisma.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(unPublishCourse);
  } catch (error) {
    console.log("CHAPTER PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
