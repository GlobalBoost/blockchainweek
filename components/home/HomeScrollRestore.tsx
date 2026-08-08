"use client";

import { useEffect, useState } from "react";
import { consumeSpeakersRestore } from "@/lib/speakers-navigation";

export function HomeScrollRestore() {
  const [pendingScroll, setPendingScroll] = useState<number | null>(null);

  useEffect(() => {
    const state = consumeSpeakersRestore();
    if (state?.path === "/" && state.scrollY > 0) {
      setPendingScroll(state.scrollY);
    }
  }, []);

  useEffect(() => {
    if (pendingScroll === null) return;
    window.scrollTo({ top: pendingScroll, behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto" });
    setPendingScroll(null);
  }, [pendingScroll]);

  return null;
}
