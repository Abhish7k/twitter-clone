"use client";

import FeedCard from "@/components/FeedCard";
import React, { useCallback } from "react";
import { BiBookmark, BiUser } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { PiBell } from "react-icons/pi";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <GoHomeFill />,
  },
  {
    title: "Explore",
    icon: <CgSearch />,
  },
  {
    title: "Notifications",
    icon: <PiBell />,
  },
  {
    title: "Messages",
    icon: <HiOutlineEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BiBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();

  console.log(user);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google Token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verification Success");

      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-44">
        {/* Sidebar */}
        <div className="col-span-3 px-2 py-2 pl-14">
          <div className="text-4xl p-3 -mr-20 h-fit w-fit rounded-full hover:bg-gray-900 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="mt-2 flex justify-start items-center gap-4 hover:bg-gray-900 rounded-full pl-3 pr-8 py-3 w-fit cursor-pointer"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xl">{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pr-10">
              <button className="w-full py-4 font-bold rounded-full bg-[#1D9BF0] hover:bg-[#1190e4] transition-all">
                Tweet
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-10 flex gap-4 items-center hover:bg-gray-900 hover:cursor-pointer py-4 pl-4 pr-[5%] rounded-full">
              {user && user.profileImageUrl && (
                <Image
                  src={user?.profileImageUrl}
                  alt="profile-image"
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              )}
              <h3 className="text-xl">
                {user.firstName}
                {user.lastName}
              </h3>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r border-l-[0.1px] border-slate-700">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4 p-5">
          {!user && (
            <div className="p-5 mx-16 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-xl">New to Twitter ?</h1>
              <div>
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
