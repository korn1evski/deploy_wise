import React, { useState, useEffect } from "react";

const LoadingIndicator = ({ isPagination = false }) => {

  const firstDiv = isPagination
    ? `relative w-full h-[40px]`
    : "absolute top-1/2  -translate-y-1/2";
  const secondDiv = isPagination
    ? "w-6 h-6 absolute left-[50%]"
    : "w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14";
  return (
    <div className={`${firstDiv} left-1/2 transform -translate-x-1/2`}>
      <div
        className={`${secondDiv} border-t-4 border-[#87CFC7] border-solid rounded-full animate-spin z-1000`}></div>
    </div>
  );
};

export default LoadingIndicator;
