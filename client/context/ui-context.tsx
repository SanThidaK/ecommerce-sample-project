"use client";
import { createContext, useRef, useContext } from "react";

const AnimationContext = createContext<{ animatedDivRef: React.RefObject<HTMLDivElement> } | null>(null);

export function Layout({ children }: { children: React.ReactNode }) {
  const animatedDivRef = useRef<HTMLDivElement | null>(null);

  return (
    <AnimationContext.Provider value={{ animatedDivRef }}>
      <div>{children}</div>
    </AnimationContext.Provider>
  );
}

// custom hook
export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useAnimation must be used within <Layout>");
  return ctx;
}
