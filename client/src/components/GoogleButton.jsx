import React from "react";
import LoadingIndicator from "./LoadingIndicator";

const GoogleButton = ({ onClick, isLoading }) => {
  return (
    <div
      onClick={() => (isLoading ? null : onClick())}
      className={`rounded-xl md:w-[250px] md:h-[70px] w-[180px] h-[40px]bg-white flex items-center p-2 justify-around border transform transition-transform shadow-md ${
        isLoading ? "" : "hover:scale-105 cursor-pointer "
      }`}>
      {isLoading ? (
        <div
          className={`md:w-8 md:h-8 w-4 h-4 border-t-4 border-[#87CFC7] border-solid rounded-full animate-spin z-1000`}></div>
      ) : (
        <>
          <img
            className="md:w-[30px] md:h-[30px] w-[15px] h-[15px]"
            src="https://static-00.iconduck.com/assets.00/google-icon-256x256-hqxhu7j7.png"
            alt="google-logo"
          />
          <h4 className="font-bold md:text-md text-sm">Sign in with Google</h4>
        </>
      )}
    </div>
  );
};

export default GoogleButton;
