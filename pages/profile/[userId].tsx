import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";

import NoComments from "../../components/NoComments";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface InterfaceProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: InterfaceProps) => {
  const { user, userVideos, userLikedVideos } = data;

  /* FOR SHOWING LINE STYLE WHICH PART USER CLICK */
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  // if user click video than apply this videos func
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  // else apply likes funct below
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  /* FOR SHOWING LINE STYLE WHICH PART USER CLICK */

  /* VIDEOS/LIKED SECTION FUNC */
  const [videosList, setVideosList] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        // connected to line 11 & getServerSideProps
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  /* VIDEOS/LIKED SECTION FUNC  */

  return (
    <div className="w-full">
      {/* WRAPPER */}
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user-profile"
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex md:text-2xl gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <GoVerified className="text-green-600 md:text-xl text-md" />
          </p>
          <p className="capitalize md:text-xl font-medium text-gray-600 text-sm">
            {user.userName}
          </p>
        </div>
      </div>
      {/* WRAPPER */}

      <div>
        <div className="flex gap-16 lg:gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full ">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        {/* VIDEO SECTION */}
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, index: number) => (
              <VideoCard post={post} key={index} />
            ))
          ) : (
            <NoComments
              text={`No ${showUserVideos ? "" : "Liked"} Videos yet`}
            />
          )}
        </div>
        {/* VIDEO SECTION */}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
