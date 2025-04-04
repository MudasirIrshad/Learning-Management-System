import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    const { list } = await req.json();

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    for (let item of list) {
      await prisma.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }
    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("REORDERED", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
