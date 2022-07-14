import React from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { MdOutlineVideocamOff } from "react-icons/md";

interface InterfaceProps {
  text: string;
}

const NoComments = ({ text }: InterfaceProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-8xl">
        {text === "No Comments Yet, Be the first to comment" ? (
          <GoCommentDiscussion />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoComments;
