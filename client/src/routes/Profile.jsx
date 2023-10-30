import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Card from "../components/Card";
import PieChartComponent from "../components/PieChartComponent";
import { Container, Typography } from "@mui/material";
import TextProfileCard3 from "../components/TextProfileCard3";
import CircleAvatar from "../components/CircleAvatar";
import axios from "axios";
import { handleAuth } from "../functions/handleAuth";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../functions/cookies";
import Skeleton from "react-loading-skeleton";
import { transformDateFormat } from "../functions/formatters";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initRequest();
  }, []);

  const initRequest = async () => {
    const profileUrl = "http://localhost:8080/api/v1/youtube/profile";
    const statisticsUrl = "http://localhost:8080/api/v1/youtube/statistics";
    await handleAuth(navigate, setLoading);
    const accessToken = getCookie("access_token");
    const profileResponse = await axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setProfile(profileResponse.data);

    const statisticsResponse = await axios.get(statisticsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setStatistics(statisticsResponse.data);
    console.log(statisticsResponse.data);
  };
  return (
    <div className="bg-primary pt-[50px] lg:pt-[70px] min-h-[100vh]">
      <div className="p-[20px] grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <Card>
          <div className="flex items-center h-full w-full">
            <div className="p-[20px] grid grid-cols-2 grid-rows-3 gap-6 w-full">
              <div className="xl:col-span-2 col-span-1 col-start-2 flex flex-col justify-center">
                <h3 className="text-primary text-center xl:text-2xl text:md">
                  Channel Name
                </h3>
                <h3 className="text-primary font-bold text-center xl:text-2xl text:md">
                  {profile?.youtubeChannelName || <Skeleton />}
                </h3>
              </div>
              <div className="xl:row-span-2 row-start-1 row-span-3 flex justify-center items-center">
                <div
                  style={{
                    backgroundImage: `url(${profile?.profilePictureUrl})`,
                  }}
                  className={`h-[150px] w-[150px] rounded-full md:w-[240px] md:h-[240px] bg-cover`}></div>
              </div>
              <div className="flex justify-center flex-col items-center xl:items-start">
                <h3 className="text-primary font-bold xl:text-xl text:sm">
                  1st Video
                </h3>
                <h3 className="text-primary xl:text-xl text:md font-['Karla']">
                  {profile && profile.youtubeFirstVideoDate ? (
                    transformDateFormat(profile.youtubeFirstVideoDate)
                  ) : profile ? (
                    "No videos yet"
                  ) : (
                    <Skeleton />
                  )}
                </h3>
              </div>
              <div className="flex justify-center flex-col items-center xl:items-start">
                <h3 className="text-primary font-bold xl:text-xl text:md">
                  Registered
                </h3>
                <h3 className="text-primary xl:text-xl text:md font-['Karla']">
                  {profile ? (
                    transformDateFormat(profile?.youtubeRegistrationDate)
                  ) : (
                    <Skeleton />
                  )}
                </h3>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="w-full h-full grid grid-cols-2 grid-rows-[1fr,2fr]">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-primary text-center xl:text-2xl text:md">
                Subscribers
              </h3>
              <h3 className="text-primary font-bold text-center xl:text-2xl text:md font-['Karla']">
                {statistics?.subscriberCount || <Skeleton />}
              </h3>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-primary text-center xl:text-2xl text:md">
                Countries
              </h3>
              <h3 className="text-primary font-bold text-center xl:text-2xl text:md font-['Karla']">
                4
              </h3>
            </div>
            <div className="w-fill col-span-2 pb-4">
              <PieChartComponent />
            </div>
          </div>
        </Card>
        <Card classAdd="lg:col-span-2 py-[20px] md:px-[40px] px-[20px]">
          <h3 className="text-[#517C77] xl:text-2xl text:md pb-[40px]">
            Last Uploaded Video
          </h3>
          <h3 className="text-[#828282] md:text-2xl text-md pb-[65px]">
            SHOCK!!! I have found, what I have found and didn’t believe that I
            have found it!!!
          </h3>
          <div className="flex justify-around pb-[65px]">
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Views"}
              sText={statistics?.viewCount || <Skeleton />}
            />
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Videos"}
              sText={statistics?.videoCount || <Skeleton />}
            />
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Dislikes"}
              sText={"460"}
            />
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Posted"}
              sText={"3h"}
            />
          </div>
          <div className="flex justify-around pb-[30px]">
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Earned"}
              sText={"345.5$"}
            />
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Retention"}
              sText={"19m"}
            />
            <TextProfileCard3
              fColor={"#517C77"}
              sColor={"#517C77"}
              fText={"Comments"}
              sText={"11.2k"}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
