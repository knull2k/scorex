import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import NoComments from "./NoComments";

interface InterfaceProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: InterfaceComment[];
}

interface InterfaceComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: InterfaceProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-2 border-gray-400 pt-4 px-10 mt-4 bg-[#ededed] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[375px]">
        {/* <div className="overflow-scroll lg:h-[457px]"> */}
        {/* IF COMMENT EXIST, DO FOLLOWING */}
        {comments?.length > 0 ? (
          comments?.map((item: InterfaceComment, index: number) => (
            <>
              {/* does user posted comment? */}
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={index}>
                      {/* AVATAR n PROFILE NAME */}
                      <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              src={user.image}
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex gap-1 items-center text-[18px] font-bold leading-6 text-primary lowercase">
                            {user.userName}{" "}
                            <GoVerified className="text-green-600" />
                          </p>
                          {/* <p className="capitalize text-gray-400 text-xs">
                            {user.userName}
                          </p> */}
                        </div>
                      </Link>
                      {/* AVATAR n PROFILE NAME */}

                      {/* Comment Msg */}
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                      {/* Comment Msg */}
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoComments text="No Comments Yet, Be the first to comment" />
        )}
      </div>

      {/* FORM if user login */}
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              className="bg-gray-200 px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-500 flex-1 rounded-lg"
            />
            <button className="text-md text-black" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
      {/* FORM if user login */}
    </div>
  );
};

export default Comments;
