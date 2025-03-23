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
    if (
      !course ||
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !course.price
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const publishCourse = await prisma.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishCourse);
  } catch (error) {
    console.log("CHAPTER PUBLISH", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
