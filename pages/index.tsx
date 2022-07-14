import type { NextPage } from "next";
import axios from "axios";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoVideo from "../components/NoVideo";
import { BASE_URL } from "../utils";
import NoComments from "../components/NoComments";

interface InterfaceProps {
  videos: Video[];
}

const Home = ({ videos }: InterfaceProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full ">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoComments text={"No Videos"} />
      )}
    </div>
  );
};

// FETCH DATA in Nextjs
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  // if topic exists, then
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    // api/post => api\post > index.ts folder
    response = await axios.get(`${BASE_URL}/api/post`);
    // const { data } = await axios.get("http://localhost:3000/api/auth");
  }

  return {
    props: {
      videos: response.data,
    },
  };
};

// FETCH DATA in Nextjs

export default Home;
