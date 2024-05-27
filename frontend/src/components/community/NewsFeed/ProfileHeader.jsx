// src/components/NewsFeed/ProfileHeader.js
import React from "react";
import { Image } from "react-bootstrap";

function ProfileHeader({ img, name, title, time }) {
  return (
    <div className="tw-inline-flex tw-items-center tw-gap-x-3 tw-mb-4">
      <Image
        src={img}
        alt="profile"
        roundedCircle
        className="tw-w-[50px] tw-h-[50px] tw-object-cover"
      />
      <div className="tw-flex tw-flex-col tw-justify-center tw-items-start">
        <p className="tw-font-semibold tw-text-lg tw-flex tw-items-center">
          {name}{" "}
          <span className="tw-text-gray-500 tw-ml-2 tw-font-normal tw-text-sm">
            {title}
          </span>
        </p>
        <time className="tw-text-xs tw-text-gray-500">{time}</time>
      </div>
    </div>
  );
}

export default ProfileHeader;
