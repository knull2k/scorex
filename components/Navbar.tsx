import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/scorex-logo.jpg";
// google login/logout
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
// AXIOS
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const Navbar = () => {
  // userProfile, addUser from authStore.ts
  const { userProfile, addUser, removeUser } = useAuthStore();

  /* SEARCH */
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  /* SEARCH */

  // addition
  const [user, setUser] = useState<IUser | null>();
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-300 py-2 px-4 ">
      <Link href="/">
        <div className="w-[50px] md:w-[60px]">
          <Image
            className="cursor-pointer rounded-full"
            src={Logo}
            alt="Scorex"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          className="absolute md:static top-10 -left-20 bg-white"
          onSubmit={handleSearch}
        >
          <input
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {/* IF USER PROFILE EXIST, THEN SHOW USER PROFILE  */}
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="profile-photo"
                  />
                </div>
              </Link>
            )}
            {/* LOGOUT BUTTOn */}
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
            >
              <AiOutlineLogout color="black" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            // createOrGetUser comes from utils/index.ts
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
