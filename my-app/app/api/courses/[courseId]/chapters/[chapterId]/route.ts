import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

// Ensure environment variables are defined
if (!process.env.MUX_TOKEN_ID || !process.env.MUX_TOKEN_SECRET) {
  throw new Error("MUX API credentials are missing");
}

// Initialize MUX
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});
console.log("Mux Instance:", mux);
const { Video }: any = mux;

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { isPublished, ...values } = await req.json();

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
    console.log("This is the video",mux.video);
    
    // Handle video upload only if videoUrl is present
    // if (values.videoUrl) {
    //   try {
    //     // ✅ Validate Video URL
    //     if (!values.videoUrl.startsWith("http")) {
    //       return new NextResponse("Invalid video URL", { status: 400 });
    //     }

    //     // ✅ Log the upload URL
    //     console.log("Uploading video to MUX:", values.videoUrl);

    //     // ✅ Check if existing MUX asset exists
    //     const existingMuxData = await prisma.muxData.findFirst({
    //       where: { chapterId: params.chapterId },
    //     });

    //     // ✅ Delete old MUX asset if exists
    //     if (existingMuxData) {
    //       await Video.Assets.del(existingMuxData.assetId);
    //       await prisma.muxData.delete({ where: { id: existingMuxData.id } });
    //     }

    //     // ✅ Create a new MUX asset
    //     const asset = await Video.Assets.create({
    //       input: values.videoUrl,
    //       playback_policy: ["public"], // Must be an array
    //       test: false,
    //     });

    //     // ✅ Store new MUX asset in the database
    //     await prisma.muxData.create({
    //       data: {
    //         chapterId: params.chapterId,
    //         assetId: asset.id,
    //         playbackId: asset.playback_ids?.[0]?.id ?? null,
    //       },
    //     });

    //     console.log("Mux Video Upload Success:", asset);
    //   } catch (muxError) {
    //     console.error("MUX VIDEO UPLOAD ERROR:", muxError);
    //     return new NextResponse("Mux upload failed", { status: 500 });
    //   }
    // }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("CHAPTERID BACKEND ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
