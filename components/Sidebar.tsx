import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import { IUser } from "../types";
import useAuthStore from "../store/authStore";
import { createOrGetUser } from "../utils";

const Sidebar = () => {
  // icon onClick change
  const [showSidebar, setShowSidebar] = useState(true);

  // const userProfile = false;

  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-green-700 rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor:pointer font-semibold text-black rounded";

  const { userProfile, addUser, removeUser } = useAuthStore();
  const [user, setUser] = useState<IUser | null>();
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-2 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {/* if showSidebar is true, then show */}
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-300 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4 cursor-pointer">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden font-bold xl:block capitalize">
                  Home
                </span>
              </div>
            </Link>
          </div>
          {!user ? (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Sign in to follow creators, like videos, and view comments.
              </p>
              <div className="pr-4">
                <button
                  className="bg-white text-lg text-[#000000] border-[1px] border-[#000000] font-bold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#000000] cursor-pointer"
                  type="button"
                  onClick={() => {}}
                >
                  Sign in
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
