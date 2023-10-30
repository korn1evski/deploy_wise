import React from "react";

const TextProfileCard3 = ({ fColor, sColor, fText, sText }) => {
  return (
    <div>
      <h3
        className={`md:text-[30px] sm:text-2xl text-md text-[${fColor}] pb-2`}>
        {fText}
      </h3>
      <h3
        className={`md:text-[40px] sm:text-2xl text-md text-[${sColor}] font-bold font-['Karla']`}>
        {sText}
      </h3>
    </div>
  );
};

export default TextProfileCard3;
