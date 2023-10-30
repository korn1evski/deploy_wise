import React from "react";

const CircleAvatar = ({
  children,
  classAdd = "",
  imageUrl,
  size,
  howRounded,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={`h-${size} w-${size} rounded-${howRounded} bg-cover ${classAdd} bg-center`}></div>
  );
};

export default CircleAvatar;
