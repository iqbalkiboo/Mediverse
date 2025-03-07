import React from 'react';

const Shimmer = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="flex-1 py-2 pr-4">
        <div className="h-4 bg-[#C2C2C2] rounded-full col-span-2"></div>
      </div>
    </div>
  );
};

export default Shimmer;
