"use client";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import React, { useState } from "react";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}
function VideoPlayer({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  return (
    <div>
      <div className="relative aspect-video">
        {!isLocked && !isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 ">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        )}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 gap-y-2 text-secondary">
            <Lock className="h-8 w-8" />
            <p className="text-sm">Chapter is Locked</p>
          </div>
        )}
        {!isLocked && (
          <MuxPlayer
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={() => {}}
            playbackId={playbackId}
          />
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
