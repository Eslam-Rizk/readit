import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseSVG from "./CloseSVG";
import axios from "axios";
import { useUser } from "../contexts/userContext";

export default function PosterDetails({ userName, date, userId }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(
    "src/assets/images/default-avatar.jfif"
  );

  const createdDate = new Date(date);
  const now = new Date();
  const diffMs = now - createdDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  let timeAgo = "";
  if (diffSec < 60) {
    timeAgo = `${diffSec} seconds ago`;
  } else if (diffMin < 60) {
    timeAgo = `${diffMin} minutes ago`;
  } else if (diffHour < 24) {
    timeAgo = `${diffHour} hours ago`;
  } else if (diffDay < 30) {
    timeAgo = `${diffDay} days ago`;
  } else {
    timeAgo = createdDate.toLocaleDateString();
  }

  useEffect(() => {
    async function getUserImage() {
      try {
        const res = await axios.get(`http://localhost:3000/users?id=${userId}`);
        setUserImage(res.data[0].avatar);
      } catch (error) {
        console.error("error fetching user image");
      }
    }
    getUserImage();
  }, []);

  return (
    <div className="flex flex-row justify-between w-[100%] rounded-md p-5">
      <div
        className="flex w-fit gap-2 cursor-pointer"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <img
          src={userImage}
          alt={userName}
          className="h-10 w-10 border rounded-full overflow-hidden"
        />{" "}
        <div>
          <p className="font-bold">{userName}</p>
          <div className="text-xs">{timeAgo}</div>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        {user?.id === userId && (
          <>
            <button
              onClick={() => console.log("Edit clicked")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              onClick={() => console.log("Delete clicked")}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </>
        )}
        <button
          onClick={() => console.log("Hide clicked")}
          className="rounded-full text-xs cursor-pointer"
        >
          <CloseSVG />
        </button>
      </div>
    </div>
  );
}
