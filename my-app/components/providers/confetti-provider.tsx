"use client";
import ReactConfetti from "react-confetti";
import { useConfettiStore } from "@/hooks/use-confetti-store";

import React from "react";

function ConfettiProvider() {
  const confetti = useConfettiStore();
  if (!confetti.isOpen) {
    return null;
  }
  return (
    <div>
      <ReactConfetti
        className="pointer-events-none z-[100"
        numberOfPieces={500}
        recycle={false}
        onConfettiComplete={() => {
          confetti.onClose();
        }}
      />
    </div>
  );
}

export default ConfettiProvider;
