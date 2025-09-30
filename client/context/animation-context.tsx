"use client";
import { createContext, useRef, useContext, useState, useEffect, useCallback } from "react";

interface AnimationContextType {
  isAnimationActive: boolean;
  setIsAnimationActive: (active: boolean) => void;
  animatedDivRef: React.RefObject<HTMLDivElement>;
  scrollThreshold: number;
  setScrollThreshold: (value: number) => void;
  showHeader: boolean;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const animatedDivRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [scrollThreshold, setScrollThreshold] = useState(50);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Show header if scrolling up, or if at the very top
    if (currentScrollY < lastScrollY.current || currentScrollY <= scrollThreshold) {
      setShowHeader(true);
    } else {
      // Hide header if scrolling down past the threshold
      setShowHeader(false);
    }

    setIsAnimationActive(currentScrollY > scrollThreshold);
    
    // Remember the current scroll position for the next check
    lastScrollY.current = currentScrollY;
  }, [scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AnimationContext.Provider
      value={{
        animatedDivRef,
        isAnimationActive,
        setIsAnimationActive,
        scrollThreshold,
        setScrollThreshold,
        showHeader,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export function useAnimation() {
  const ctx = useContext(AnimationContext);
  if (!ctx) throw new Error("useAnimation must be used within AnimationProvider");
  return ctx;
}

export default AnimationProvider;
