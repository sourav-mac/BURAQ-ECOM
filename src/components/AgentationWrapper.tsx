"use client";

import dynamic from "next/dynamic";

const Agentation =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("agentation").then((mod) => mod.Agentation), {
        ssr: false,
      })
    : null;

export function AgentationWrapper() {
  if (process.env.NODE_ENV !== "development" || !Agentation) {
    return null;
  }

  return <Agentation />;
}
