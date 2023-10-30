import React from "react";

const Card = ({ children, classAdd = "" }) => {
  return (
    <div className={`shadow-card bg-tertiary rounded-[14px] ${classAdd}`}>
      {children}
    </div>
  );
};

export default Card;
