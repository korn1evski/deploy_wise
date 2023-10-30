import React from "react";
import CircleAvatar from "./CircleAvatar";
import { useNavigate } from "react-router-dom";

const VideoResult = ({
  click,
  videoId,
  img,
  title,
  channelTitle,
  published,
  channelImg,
  viewCount,
}) => {
  const navigate = useNavigate();
  return (
    <div
      id={videoId}
      className="w-full lg:h-[210px] md:h-[180px] h-[340px] relative mb-[30px]">
      <div className="w-full h-full flex flex-col md:flex-row">
        <CircleAvatar
          imageUrl={img}
          size={"full"}
          howRounded={"xl"}
          classAdd="2xl:w-[23%] lg:w-[30%] md:w-[35%] relative">
          <div className="bg-[#000] opacity-70 w-[50px] h-[25px] bottom-2 right-2 absolute rounded-md flex items-center justify-center">
            <h4 className="text-[#fff] font-bold text-sm">15:20</h4>
          </div>
        </CircleAvatar>
        <div className="md:pl-[20px] 2xl:w-[75%] lg:w-[68%] md:w-[63%]">
          <h3 className="lg:text-2xl md:text-md sm:text-sm text-[#2F4846] font-[500] md:pt-[0] pt-[20px]">
            {title}
          </h3>
          <h4 className="lg:text-sm text-xs text-[#747474] py-[12px]">
            {viewCount} views · {published}
          </h4>
          <div className="flex items-center">
            <CircleAvatar
              size={"8"}
              imageUrl={channelImg}
              howRounded={"full"}
            />
            <h4 className="lg:text-sm text-xs text-[#747474] pl-2">
              {channelTitle}
            </h4>
          </div>
        </div>
      </div>
      <div
        className="rounded-full bg-[#517C77] absolute right-0 bottom-0 cursor-pointer"
        onClick={() => click(videoId)}>
        <h3 className="text-[#fff] lg:text-2xl text-md font-[Karla] px-4 py-2">
          Analyze the video
        </h3>
      </div>
    </div>
  );
};

export default VideoResult;
