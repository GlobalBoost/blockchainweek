"use client";

import { useEffect } from "react";
import { consumeSpeakersRestore } from "@/lib/speakers-navigation";

export function HomeScrollRestore() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const state = consumeSpeakersRestore();
      if (state?.path === "/" && state.scrollY > 0) {
        window.scrollTo({
          top: state.scrollY,
          behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
