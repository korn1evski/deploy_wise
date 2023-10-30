import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

const GoogleAPIComponent = () => {
  const [jwt, setJwt] = React.useState("");
  const [search, setSearch] = React.useState("");
  const handleButton = async () => {
    try {
      const response = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "snippet,contentDetails,statistics",
            myRating: "like",
            key: "AIzaSyDYrKehPnTTIphCsygKx0gP04rY07xHHrg",
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching user videos:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse.access_token);
      setJwt(tokenResponse.access_token);
    },
    scope:
      "https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner",
  });

  const handleSearch = () => {
    const API_KEY = 'AIzaSyDYrKehPnTTIphCsygKx0gP04rY07xHHrg';

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?q=${search}&key=${API_KEY}&part=snippet&type=video`;

    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data.items)
      })
      .catch((error) => {
        console.error('Error fetching data from YouTube API:', error);
      });
  };
  return (
    <div className="w-[100%] h-[100vh] pt-20">
      <button onClick={() => login()}>Click me</button>
      <button onClick={() => handleButton()}>Check request</button>
      <div>
        <input
          type="text"
          placeholder="Search for videos"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
    </div>
  );
};

export default GoogleAPIComponent;
