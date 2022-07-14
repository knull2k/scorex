import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoVerified } from "react-icons/go";

import NoComments from "../../components/NoComments";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const router = useRouter();
  const { searchTerm }: any = router.query;
  // search user account, not video
  const { allUsers } = useAuthStore();

  /* FOR SHOWING LINE STYLE WHICH PART USER CLICK */
  const [isAccounts, setIsAccounts] = useState(false);
  // if user click user than apply this account func
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  // else apply userVideos funct below
  const userVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  /* FOR SHOWING LINE STYLE WHICH PART USER CLICK */

  // 2:17
  /* search user account func */
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  /* search user account func */

  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full ">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${userVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>

      {/* if it isAccounts then show user accounts content else show video */}
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className="flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>

                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                        {user.userName.replaceAll(" ", "")}
                        <GoVerified className="text-green-600" />
                      </p>
                      <p className="capitalize text-gray-400 text-xs">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoComments text={`No Account Found: ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {/* loop video if there's video on what u search */}
          {videos.length ? (
            videos.map((video: Video, index) => (
              <VideoCard post={video} key={index} />
            ))
          ) : (
            <NoComments text={`No Video Found: ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
