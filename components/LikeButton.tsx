import React, { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

/* to see which user already liked the post & has login/not */
import useAuthStore from "../store/authStore";

interface InterfaceProps {
  // declare function, but if it doesnt return anything, return void
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: InterfaceProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
  useEffect(() => {
    // if user did like the post
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-row justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 border-solid border-2 border-gray-300"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 border-solid border-2 border-gray-300"
            onClick={handleLike}
          >
            <MdFavoriteBorder className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-bold ml-3">{likes?.length | 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
