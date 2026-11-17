"use client";

import React from "react";

/** Round user avatar: profile photo when set, otherwise the first letter of the name. */
export function UserAvatar({
  name,
  src,
  className = "w-8 h-8 text-sm",
}: {
  name: string;
  src?: string | null;
  className?: string;
}) {
  return src ? (
    <img src={src} alt={name} className={`rounded-full object-cover bg-[#F2F7F4] shrink-0 ${className}`} />
  ) : (
    <span className={`rounded-full bg-[#07543F] text-white flex items-center justify-center font-semibold shrink-0 ${className}`}>
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}
