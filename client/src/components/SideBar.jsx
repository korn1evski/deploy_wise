import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { setShowSideBar, toggleSideBar } from "../features/sideBarSlice";
import HistoryTile from "./HistoryTile";

const SideBar = () => {
  const [fullScreen, setFullScreen] = useState(
    window.innerWidth > 1280 ? true : false
  );

  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar.showSideBar);
  const videosHistory = useSelector(state => state.history.history);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setFullScreen(true);
        dispatch(setShowSideBar(false));
      } else setFullScreen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return fullScreen ? (
    <>
      <div className={`bg-menu w-[300px] min-h-[100vh] flex flex-col items-center gap-4`}>
      </div>

      <div className={`bg-menu w-[280px] left-0 top-0 min-h-[100vh] flex flex-col items-center gap-4 fixed`}>
      <div className="h-[100px]"></div>
      {videosHistory.map(video => (
                      <HistoryTile name={video.name} videoId={video.videoId} key={video.videoId}/>
            ))}

            {videosHistory.length == 0 && <div><div  className="h-[500px]"></div><h1 className="text-[#fff] text-[20px]">NO HISTORY YET</h1></div>}
      </div>
    </>
  ) : (
    <>
      <div
        onClick={() => dispatch(toggleSideBar())}
        className={`z-[1000] backdrop-blur-md fixed top-0 left-0 w-full min-h-[100vh] ${
          sideBar ? "block" : "hidden"
        }`}></div>
      <div
        className={`z-[1000] bg-menu fixed text-[#B4B4B4] top-0 left-0 min-h-[100vh] w-[280px] flex flex-col items-center gap-[0.5px] transform ${
          sideBar ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-400`}>
        <RxCross2
          onClick={() => dispatch(toggleSideBar())}
          color="white"
          className="self-end mt-2 mr-2 cursor-pointer"
          size={24}
        />
        <img
          src={require("../assets/wise_logo.png")}
          className={"h-[30px] w-[70px] self-center"}
          alt=""
        />
        <div className="h-[30px]"></div>
        {videosHistory.map(video => (
                      <HistoryTile name={video.name} videoId={video.videoId} key={video.videoId}/>
            ))}
            {videosHistory.length == 0 && <h1 className="text-[#fff] text-[20px] absolute top-[50%] translate-y-[-50%]">NO HISTORY YET</h1>}
      </div>
    </>
  );
};

export default SideBar;
