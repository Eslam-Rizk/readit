import React from "react";

export default function PostSkeleton() {
  return (
    <div className="flex w-[100%] flex-col rounded-lg gap-4 my-5 p-3">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-60 w-full"></div>
    </div>
  );
}
