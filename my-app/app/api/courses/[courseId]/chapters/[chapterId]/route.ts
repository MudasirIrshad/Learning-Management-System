import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

// Ensure environment variables are defined
const muxTokenId = process.env.MUX_TOKEN_ID!;
const muxTokenSecret = process.env.MUX_TOKEN_SECRET!;

if (!muxTokenId || !muxTokenSecret) {
  throw new Error("Mux environment variables are missing");
}

// Initialize Mux
const { video } = new Mux({ tokenId: muxTokenId, tokenSecret: muxTokenSecret });

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: { chapterId: params.chapterId },
      });

      if (existingMuxData) {
        // await video.assets.delete(existingMuxData.assetId);
        await prisma.muxData.delete({ where: { id: existingMuxData.id } });
      }
    }

    const deletedChapter = await prisma.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.error("CHAPTERID DELETE ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const bodyText = await req.text();

    if (!bodyText)
      return new NextResponse("Empty request body", { status: 400 });

    let parsedBody;
    try {
      parsedBody = JSON.parse(bodyText);
    } catch (err) {
      console.error("JSON Parsing Error:", err);
      return new NextResponse("Invalid JSON", { status: 400 });
    }

    const { isPublished, ...values } = parsedBody;

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    // Fetch the current chapter
    const chapter = await prisma.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    // Handle video upload only if videoUrl is present
    if (values.videoUrl) {
      try {
        // Check if existing Mux asset exists
        const existingMuxData = await prisma.muxData.findFirst({
          where: { chapterId: params.chapterId },
        });

        // Delete the old Mux asset if it exists
        if (existingMuxData) {
          await video.assets.delete(existingMuxData.assetId);
          await prisma.muxData.delete({ where: { id: existingMuxData.id } });
        }

        // Create a new Mux asset
        const asset = await video.assets.create({
          input: values.videoUrl,
          playback_policy: ["public"], // FIX: Should be an array
          test: false,
        });

        // Store new Mux asset in the database
        await prisma.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id ?? null, // FIX: Avoid undefined issues
          },
        });
      } catch (muxError) {
        console.error("MUX VIDEO UPLOAD ERROR:", muxError);
        return new NextResponse("Mux upload failed", { status: 500 });
      }
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("CHAPTERID BACKEND ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
