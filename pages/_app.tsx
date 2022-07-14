import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isServerSideRender, setIsServerSideRender] = useState(true);

  // client side to run Component
  useEffect(() => {
    setIsServerSideRender(false);
  }, []);

  // if we are server side rendering, then dont show component from return
  if (isServerSideRender) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20 ">
          {/* LEFT: SIDEBAR*/}
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          {/* LEFT: SIDEBAR */}

          {/* RIGHT: VIDEOS */}
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Component {...pageProps} />
          </div>
          {/* RIGHT: VIDEOS */}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
