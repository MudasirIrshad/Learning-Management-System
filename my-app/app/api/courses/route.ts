import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { isTeacher } from "@/lib/teacher";
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { title } = await req.json();
    if (!userId || !isTeacher(userId))
      return new NextResponse("Unauthorized", { status: 401 });

    const course = await prisma.course.create({
      data: { title, userId },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("INternal Error", { status: 500 });
  }
}
