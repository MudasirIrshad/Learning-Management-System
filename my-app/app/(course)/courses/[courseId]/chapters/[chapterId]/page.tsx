import { getChapter } from "@/actions/get-chapters";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/course-videoplayer";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import CourseProgressButton from "./_components/course-progress-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = await auth();

  if (!userId) return redirect("/");

  const {
    chapter,
    course,
    muxData,
    attachements,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label="You already completed this chapter"
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant={"warning"}
        />
      )}
      <Link href={"/search"}>
        <Button size={"sm"} variant={"ghost"} className="mt-2 ml-2">
          <ArrowLeft className="h-4 w-4 " />
          Back
        </Button>
      </Link>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            playbackId={muxData?.playbackId!}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <>
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            </>
          ) : (
            <div>
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            </div>
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachements.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachements.map((attachement) => (
                <div>
                  <a
                    href={attachement.id}
                    target="_blank"
                    key={attachement.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <p className="line-clamp-1">{attachement.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
