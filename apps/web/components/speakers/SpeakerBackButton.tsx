"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  readSpeakersReturnState,
  stageSpeakersRestore,
} from "@/lib/speakers-navigation";

export function SpeakerBackButton() {
  const router = useRouter();

  const handleBack = () => {
    const state = readSpeakersReturnState();
    if (state) {
      stageSpeakersRestore(state);
      router.push(state.path);
      return;
    }
    router.push("/speakers");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-un-blue/40 hover:bg-un-blue/10 hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back
    </button>
  );
}
