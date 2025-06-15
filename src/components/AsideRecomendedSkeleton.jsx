import React from "react";

export default function AsideRecommendedSkeleton() {
  return (
    <div className="flex w-[100%] flex-col gap-4 my-5 p-3">
      <div className="flex flex-col items-center gap-4">
        <br />
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
}
