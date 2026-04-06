"use client";

import { ReactNode, Children, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 500;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function MobileCarousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevCountRef = useRef(total);

  // Reset index when children change (e.g. new wizard step)
  useEffect(() => {
    if (total !== prevCountRef.current) {
      setActiveIndex(0);
      setDirection(0);
      prevCountRef.current = total;
    }
  }, [total]);

  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= total) return;
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
    },
    [activeIndex, total],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
      if (activeIndex < total - 1) goTo(activeIndex + 1);
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
      if (activeIndex > 0) goTo(activeIndex - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  };

  if (total === 0) return null;

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1} className="outline-none">
      {/* Carousel viewport */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            {items[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous card"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-white/60 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 disabled:hover:border-gray-700 disabled:hover:text-white/60"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 3a1 1 0 0 1 .707 1.707L6.414 9l4.293 4.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5A1 1 0 0 1 10 3z" />
          </svg>
        </button>

        <span className="min-w-[4rem] text-center text-sm text-gray-400">
          {activeIndex + 1} of {total}
        </span>

        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === total - 1}
          aria-label="Next card"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-white/60 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 disabled:hover:border-gray-700 disabled:hover:text-white/60"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3a1 1 0 0 0-.707 1.707L9.586 9l-4.293 4.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5A1 1 0 0 0 6 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
