import prisma from "@/lib/prisma";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await prisma.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("chapter or course not found");
    }

    let muxData = null;
    let attachements: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachements = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await prisma.muxData.findUnique({
        where: {
          chapterId,
        },
      });
      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        chapterId_userId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachements,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("GET-CHATPER", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachements: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
