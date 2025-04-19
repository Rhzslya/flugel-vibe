"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #1DB954 0%, rgba(29, 185, 84, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #1DB954 0%, rgba(29, 185, 84, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, #1DB954 0%, rgba(29, 185, 84, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.2% at 100% 50%, #1DB954 0%, rgba(29, 185, 84, 0) 100%)",
  };

  const highlight =
    "radial-gradient(circle at center, #1DB954 0%, transparent 70%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex border content-center isolate transition duration-500 items-center flex-col gap-10 h-min justify-center overflow-visible p-px w-fit rounded-xl",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#1DB954]/20 px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>

      {/* Background yang lebih gelap agar glow ga bocor */}
      <div className="absolute inset-0 rounded-[inherit] bg-black/90 z-0 pointer-events-none" />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] z-[1] pointer-events-none"
        style={{
          filter: "blur(6px)",
          mixBlendMode: "screen",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />

      {/* Border highlight */}
      <div className="bg-[#1DB954]/30 absolute z-[2] inset-[2px] rounded-[inherit]" />
    </Tag>
  );
}
