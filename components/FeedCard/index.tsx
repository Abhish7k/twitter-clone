import Image from "next/image";
import React from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";

type Props = {};

const FeedCard = (props: Props) => {
  return (
    <div className="p-4 border-b border-gray-600 hover:bg-gray-950 cursor-pointer transition-all">
      <div className="h-full grid grid-cols-12">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/136176663?v=4"
            alt="profile-image"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 pl-3">
          <h5 className="font-semibold hover:underline">Abhishek</h5>
          <p>this is a very very long tweet</p>
          <div className="flex justify-between mt-2 pr-10">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <GoHeart />
            </div>
            <div>
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
