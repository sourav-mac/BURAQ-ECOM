"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface StatItem {
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  desc: string;
}

const stats: StatItem[] = [
  {
    numericValue: 20,
    suffix: "+",
    label: "Engineers",
    desc: "Technical planning & oversight",
  },
  {
    numericValue: 40,
    suffix: "+",
    label: "Workers",
    desc: "Technical workforce & helpers",
  },
  {
    numericValue: 20,
    suffix: "+",
    label: "Employees",
    desc: "Core operations & coordination",
  },
  {
    numericValue: 3,
    label: "Product Categories",
    desc: "Lighting, Solar & Electrical",
  },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // smooth easeOutExpo
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-flex items-baseline font-sans font-black">
      {prefix && (
        <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-white/90 mr-1.5 tracking-normal">
          {prefix}
        </span>
      )}
      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
        {displayValue}
      </span>
      {suffix && (
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-buraq-accent ml-0.5">
          {suffix}
        </span>
      )}
    </span>
  );
}

export const StatsBanner: React.FC = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white via-[#FAF8F2] to-[#F7F4EE] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="depth-card-dark rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {stats.map((stat) => {
              return (
                <div
                  key={stat.label}
                  className="pl-4 sm:pl-6 border-l-2 border-white/20 flex flex-col justify-center"
                >
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      value={stat.numericValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-buraq-accent mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-300/85 mt-0.5 hidden sm:block leading-snug">
                    {stat.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
