import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
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

    const attachment = await prisma.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("Attahcment Delete id backend error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
