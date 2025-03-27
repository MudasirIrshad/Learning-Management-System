import { Category, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";
import prisma from "@/lib/prisma";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const whereClause: any = {
      isPublished: true,
    };

    // Only apply title filter if it's defined and not empty
    if (title && title.trim() !== "") {
      whereClause.title = {
        contains: title,
        mode: "insensitive", // Make search case-insensitive
      };
    }

    // Only apply category filter if categoryId is defined
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // If no courses are found, return an empty array
    if (courses.length === 0) {
      return [];
    }

    // Check if the user has purchased each course
    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("GET COURSES ERROR", error);
    return [];
  }
};
