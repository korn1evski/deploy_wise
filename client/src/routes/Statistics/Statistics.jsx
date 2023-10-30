import { useParams } from "react-router-dom";
import Card from "../../components/card_info/card_info";
import CardTags from "../../components/card_tags/card_tags";
import CardGraph from "../../components/card_graph/card_graph";
import CardHelp from "../../components/card_help/card_help";
import "./Statistics.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setPrevPage } from "../../features/resultsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export default function Statistics() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [data, setData] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    initRequest();
    fetchSummary();
  }, []);

  const initRequest = async () => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&type=video&key=${API_KEY}`;
    const response = await axios.get(url);
    const newTags = [];
    if (response.data.items[0].snippet.tags != null) {
      response.data.items[0].snippet.tags.map((tag) =>
        newTags.push({ tag: tag })
      );
      setTags(newTags);
      setVideoInfo(response.data.items[0].snippet);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5050/results/${videoId}`);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="stats">
        <div className="stats-header">
          <svg
            onClick={() => {
              dispatch(setPrevPage("statistics"));
              navigate("/results");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="30"
            viewBox="0 0 13 30"
            fill="none"
            className="cursor-pointer">
            <path
              d="M12.5875 0.476675C12.0374 -0.158892 11.1457 -0.158892 10.5956 0.476675L1.23754 11.2905C-0.412068 13.1967 -0.412576 16.287 1.23639 18.1939L10.4901 28.8953C11.0401 29.531 11.9319 29.531 12.4819 28.8953C13.0319 28.2598 13.0319 27.2292 12.4819 26.5937L3.22577 15.8979C2.67575 15.2622 2.67575 14.2318 3.22577 13.5963L12.5875 2.7783C13.1375 2.14272 13.1375 1.11226 12.5875 0.476675Z"
              fill="#2F4846"
            />
          </svg>
          <p>{videoInfo?.title || <Skeleton />}</p>
        </div>
        <div className="card-box">
          <div className="cards-wrapper">
            <div className="pair">
              {data ? (
                <Card text={data["1_paragraph_summary"]} />
              ) : (
                <Card text="Please wait while your request is being processed" />
              )}
              <CardTags tags={tags} />
            </div>
            <div className="pair">
              <CardGraph />
              {data ? (
                <CardHelp
                  text={data["similar_video_idea_summary"]}
                  tags={data["tags"]}
                />
              ) : (
                <CardHelp
                  text="Please wait while your request is being processed"
                  tags={["Please wait while your request is being processed"]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
