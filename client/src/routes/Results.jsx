import React, { useEffect, useState, useRef } from "react";
import VideoResult from "../components/VideoResult";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  getTimeSinceUpload,
  formatViewCount,
} from "../functions/videoResultHelpFunctions";
import {
  setVideosGlobal,
  setChannelsGlobal,
  setTotalCountGlobal,
  setVideosInfoGlobal,
  setPageGlobal,
  setScrollPosition,
  setPrevPage,
  setVideoId,
} from "../features/resultsSlice";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [videos, setVideos] = useState([]);
  const [videosInfo, setVideosInfo] = useState([]);
  const [channels, setChannels] = useState([]);
  const search = useSelector((state) => state.search.text);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState("");
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const maxResults = 10;
  const prev = useSelector((state) => state.results.prevPage);
  const videosState = useSelector((state) => state.results.videos);
  const videoInfoState = useSelector((state) => state.results.videosInfo);
  const channelsState = useSelector((state) => state.results.channels);
  const pageState = useSelector((state) => state.results.page);
  const totalCountState = useSelector((state) => state.results.totalCount);
  const scrollPosition = useSelector((state) => state.results.scrollPosition);
  const videoIdGlobal = useSelector((state) => state.results.videoId);

  useEffect(() => {
    console.log(videoIdGlobal);
    const element = document.getElementById(videoIdGlobal);
    if (element != null && videoIdGlobal !== "") {
      dispatch(setVideosGlobal([]));
      dispatch(setVideosInfoGlobal([]));
      dispatch(setChannelsGlobal([]));
      dispatch(setPageGlobal(""));
      dispatch(setTotalCountGlobal(0));
      dispatch(setScrollPosition(0));
      dispatch(setPrevPage(""));
      dispatch(setVideoId(""));
      element.scrollIntoView();
    }
  }, [videos]);

  const request = async () => {
    if (prev === "statistics" && videosState.length !== 0) {
      console.log("entered");
      setVideos(videosState);
      setVideosInfo(videoInfoState);
      setChannels(channelsState);
      setPage(pageState);
      setTotalCount(totalCountState);
      return;
    }
    try {
      setLoading(true);

      const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${search}&key=${API_KEY}&part=snippet&type=video&maxResults=${maxResults}&pageToken=${page}`;
      const response = await axios.get(apiUrl);

      setPage(response.data.nextPageToken);
      setTotalCount(response.data.pageInfo.totalResults);

      const videoIds = response.data.items
        .map((video) => video.id.videoId)
        .join(",");

      response.data.items.forEach((video) => {
        if (videos.includes(video)) {
          console.log(video);
        }
      });
      const channelIds = response.data.items
        .map((video) => video.snippet.channelId)
        .join(",");

      const videoInfoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}&maxResults=${maxResults}`;
      const channelInfoUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${API_KEY}&maxResults=${maxResults}`;

      const [videoInfoResponse, channelInfoResponse] = await Promise.all([
        axios.get(videoInfoUrl),
        axios.get(channelInfoUrl),
      ]);

      setVideosInfo((prevVideosInfo) => [
        ...prevVideosInfo,
        ...videoInfoResponse.data.items,
      ]);
      setChannels((prevChannels) => [
        ...prevChannels,
        ...channelInfoResponse.data.items,
      ]);
      const newVideos = response.data.items.filter(
        (video) => !videos.some((v) => v.id.videoId === video.id.videoId)
      );
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      console.log("end");
    } catch (error) {
      console.error("Error fetching data from YouTube API:", error);
    } finally {
      setLoading(false);
      console.log("here");
    }
  };

  useEffect(() => {
    request();
  }, [fetching]);

  useEffect(() => {
    if (search !== "") {
      setVideos([]);
      setVideosInfo([]);
      setChannels([]);
      setPage("");
      setTotalCount(0);
      setFetching((fetching) => !fetching);
    }
  }, [search]);

  const debounce = (func, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (scrollPosition && !loading && videos.length < totalCount) {
      setFetching((fetching) => !fetching);
    }
  };

  const debouncedScroll = debounce(handleScroll, 600);

  useEffect(() => {
    document.addEventListener("scroll", debouncedScroll);
    return () => {
      document.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  function getChannelImage(video) {
    const matchingChannel = channels.find(
      (channel) => video.snippet.channelId === channel.id
    );
    return matchingChannel ? matchingChannel.snippet.thumbnails.medium.url : "";
  }

  function getVideoViews(video) {
    const matchingVideo = videosInfo.find(
      (videoInfo) => videoInfo.id === video.id.videoId
    );
    return matchingVideo ? matchingVideo.statistics.viewCount : "";
  }
  const videoResultClick = (videoId) => {
    dispatch(setChannelsGlobal(channels));
    dispatch(setVideosGlobal(videos));
    dispatch(setVideosInfoGlobal(videosInfo));
    dispatch(setPageGlobal(page));
    dispatch(setTotalCountGlobal(totalCount));
    dispatch(setScrollPosition(window.scrollY));
    dispatch(setVideoId(videoId));
    navigate(`/results/${videoId}`);
  };

  let lastMinusOne = -1;

  return (
    <div className="bg-primary min-h-[100vh]">
      <div className="w-[97%] bg-tertiary min-h-[100vh] my-0 mx-auto px-[16px] pt-[70px] lg:pt-[90px] pb-[5px] relative">
        {videos.length === 0 && !loading ? (
          <div className="text-center text-sm md:text-md lg:text-lg mt-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            No results found
          </div>
        ) : videos.length === 0 && loading ? (
          <LoadingIndicator />
        ) : (
          videos.map(function (video, index) {
            return (
              <VideoResult
                key={index}
                videoId={video.id.videoId}
                click={videoResultClick}
                img={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                channelTitle={video.snippet.channelTitle}
                published={getTimeSinceUpload(video.snippet.publishedAt)}
                channelImg={getChannelImage(video)}
                viewCount={formatViewCount(getVideoViews(video))}
              />
            );
          })
        )}

        {loading && videos.length > 0 && (
          <LoadingIndicator isPagination={true} />
        )}
      </div>
    </div>
  );
};

export default Results;
