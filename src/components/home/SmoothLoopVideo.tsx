"use client";

import React, { useRef, useEffect, useState } from "react";

interface SmoothLoopVideoProps {
  src: string;
  className?: string;
  videoClassName?: string;
  fadeDuration?: number; // duration of cross-fade in seconds (default: 1.0s)
  maxOpacity?: string; // active video opacity (default: opacity-75)
}

/**
 * SmoothLoopVideo
 * Solves the video loop "jitter / jump-cut" seam by seamlessly cross-fading
 * between two synchronized video instances before the clip reaches its end.
 */
export const SmoothLoopVideo: React.FC<SmoothLoopVideoProps> = ({
  src,
  className = "",
  videoClassName = "",
  fadeDuration = 1.0,
  maxOpacity = "opacity-75",
}) => {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"A" | "B">("A");
  const activeRef = useRef<"A" | "B">("A");
  const isSwitchingRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const vA = videoRefA.current;
    if (vA) {
      vA.play().catch(() => {});
    }

    // High-efficiency timer (every 100ms instead of 60fps RAF) saves 90% CPU and battery
    const intervalId = setInterval(() => {
      const currentActive = activeRef.current;
      const currentVideo = currentActive === "A" ? videoRefA.current : videoRefB.current;
      const nextVideo = currentActive === "A" ? videoRefB.current : videoRefA.current;

      if (currentVideo && nextVideo && currentVideo.duration && !isNaN(currentVideo.duration)) {
        const timeLeft = currentVideo.duration - currentVideo.currentTime;

        // Trigger seamless crossfade before the video hits its end
        if (timeLeft <= fadeDuration && !isSwitchingRef.current) {
          isSwitchingRef.current = true;

          // Start the next video from the beginning
          nextVideo.currentTime = 0;
          nextVideo.play().catch(() => {});

          const nextActive = currentActive === "A" ? "B" : "A";
          setActive(nextActive);

          // After crossfade finishes, pause the old video to free GPU memory and decoding overhead
          setTimeout(() => {
            isSwitchingRef.current = false;
            if (currentActive === "A" && videoRefA.current) {
              videoRefA.current.pause();
            } else if (currentActive === "B" && videoRefB.current) {
              videoRefB.current.pause();
            }
          }, (fadeDuration + 0.1) * 1000);
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [fadeDuration]);

  const handleEnded = (player: "A" | "B") => {
    const targetRef = player === "A" ? videoRefA : videoRefB;
    if (targetRef.current && activeRef.current !== player) {
      targetRef.current.pause();
      targetRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <video
        ref={videoRefA}
        muted
        playsInline
        preload="auto"
        onEnded={() => handleEnded("A")}
        style={{ willChange: "opacity" }}
        className={`absolute inset-0 w-full h-full object-cover object-[80%_25%] scale-[1.14] origin-top-left pointer-events-none transition-opacity duration-1000 ease-in-out ${
          active === "A" ? maxOpacity : "opacity-0"
        } ${videoClassName}`}
      >
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={videoRefB}
        muted
        playsInline
        preload="auto"
        onEnded={() => handleEnded("B")}
        style={{ willChange: "opacity" }}
        className={`absolute inset-0 w-full h-full object-cover object-[80%_25%] scale-[1.14] origin-top-left pointer-events-none transition-opacity duration-1000 ease-in-out ${
          active === "B" ? maxOpacity : "opacity-0"
        } ${videoClassName}`}
      >
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

