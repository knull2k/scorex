import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { Video } from "../../types";
// FOR LIKE FUNCTIONALITY
import useAuthStore from "../../store/authStore";
import Comments from "../../components/Comments";
import LikeButton from "../../components/LikeButton";

// this interface to see what kind of postDetails  is
interface InterfaceProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: InterfaceProps) => {
  // postDetails.something // this will return error bcoz there is no 'something' in Video types

  // state to postDetails, so we can manually change the state eg: like button immediately using this staet
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  // for button X to go to homepage
  const router = useRouter();

  /* PLAY FUNCTIONS */
  const [isPlaying, setIsPlaying] = useState(false);
  const playVideoNow = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  /* PLAY FUNCTIONS */

  /* SOUND FUNCTION */
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);
  /* SOUND FUNCTION */

  /* LIKE FUNCTION */
  const { userProfile }: any = useAuthStore();

  const handleLike = async (like: boolean) => {
    // if user profile exist, let's trigger the like button
    if (userProfile) {
      // put = for update data
      // data comes from api folder > like.ts
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        // pass an object we want to send
        userId: userProfile._id,
        // user have to like specific post
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };
  /* LIKE FUNCTION */

  /* COMMENT FUNCTION */
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const addComment = async (e: { preventDefault: () => void }) => {
    // e.preventDefault(); is to prevent for page to reload once we post comment
    e.preventDefault();
    // if user profile n comment exist
    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });
        setPost({ ...post, comments: res.data.comments });
        // Clear comment after submit post
        setComment("");
        setIsPostingComment(false);
      }
    }
  };
  /* COMMENT FUNCTION */

  // IF VIDEO NOT EXISTS
  if (!post) return null;
  // IF VIDEO NOT EXISTS

  return (
    <div className="flex w-full absolute left-0 top-0 bg-gray-100 flex-wrap lg:flex-nowrap">
      {/* LEFT SIDE */}
      {/* <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center"> */}
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        {/* X button */}
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        {/* X button */}

        {/* VIDEO VIEW */}
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              // controls
              onClick={playVideoNow}
              src={post.video.asset.url}
              className="h-full cursor-pointer "
            ></video>
          </div>

          {/* PLAY ICON */}
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button onClick={playVideoNow}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
          {/* PLAY ICON */}
        </div>
        {/* VIDEO VIEW */}

        {/* MUTE BUTTON */}
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
        {/* MUTE BUTTON */}
      </div>
      {/* LEFT SIDE */}

      {/* RIGHT SIDE */}
      <div className="relative w-[1000px] md:w-[900px] lg:w-[650px]">
        {/* WRAPPER */}
        <div className="lg:mt-18 mt-10">
          {/* TOP */}
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 w-16 h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile-photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    {` `}
                    <GoVerified className="text-green-600 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          {/* TOP */}

          {/* CAPTION */}
          <p className="px-10 text-lg text-black font-semibold">
            {post.caption}
          </p>
          {/* CAPTION */}

          {/* LIKE ICON */}
          <div className=" px-10">
            {/* ALLOW LIKE IF USER LOG IN */}
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          {/* LIKE ICON */}

          {/* Comment Part */}
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
          {/* Comment Part */}
        </div>
      </div>
      {/* RIGHT SIDE */}
    </div>
  );
};

// get id from http://localhost:3000/detail/2KBe1d4VW0b0zbOhqER6GB
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  // once we get the id, we can call to the api to fetch the data from post
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  // const { data } = await axios.get(`http://localhost:3000/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
