import React from "react";

export default function AsideUserSkeleton() {
  return (
    <div className="flex w-[100%] flex-col gap-4 my-5 p-3 h-fit">
      <div className="flex flex-col items-center gap-4">
        <div className="skeleton h-30 w-30 shrink-0 rounded-full"></div>
        <div className="skeleton h-6 w-28"></div>
        <br />
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
}
