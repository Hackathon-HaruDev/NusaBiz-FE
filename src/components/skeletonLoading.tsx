import React from "react";

interface SkeletonProps {
  h:number,
  w:number
}

const Skeleton: React.FC<SkeletonProps> = ({ h,w }) => {
  return (
    <div
      className={`
        animate-pulse bg-gray-300/90 rounded-md h-${h} w-${w}`
      }
    />
  );
};

export default Skeleton;
