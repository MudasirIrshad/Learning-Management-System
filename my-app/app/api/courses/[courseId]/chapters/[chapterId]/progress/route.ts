import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Un authorized", { status: 401 });
    }

    const userProgress = await prisma.userProgress.upsert({
      where: {
        chapterId_userId: {
          userId: userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("CHAPTER ID PROGRESS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
