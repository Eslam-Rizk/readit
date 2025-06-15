import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseSVG from "./CloseSVG";
import axios from "axios";
import { useUser } from "../contexts/userContext";
import DeleteSVG from "./DeleteSVG";
import EditSVG from "./EditSVG";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

export default function PosterDetails({
  userName,
  date,
  userId,
  type,
  id,
  setData,
}) {
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

  function handleEdit(type, id) {
    console.log("Edit clicked");
  }
  async function handleDelete(type, id) {
    console.log("Delete clicked");
    const confirmed = window.confirm("You really want to delete this?");
    if (!confirmed) return;

    try {
      await axios.delete(`${apiUrl}/${type}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success(
        `${
          type.slice(0, 1).toUpperCase() + type.slice(1)
        } deleted successfully.`
      );
    } catch (error) {
      console.error(`Error deleting element from ${type}:`, error.message);
      toast.error(`Error deleting from ${type}, please try again!`);
    }
  }
  function handleHide(id) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    async function getUserImage() {
      try {
        const res = await axios.get(`${apiUrl}/users?id=${userId}`);
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
              onClick={() => handleEdit(type, id)}
              className="cursor-pointer"
            >
              <EditSVG />
            </button>
            <button
              onClick={() => handleDelete(type, id)}
              className="cursor-pointer"
            >
              <DeleteSVG />
            </button>
          </>
        )}
        <button
          onClick={() => handleHide(id)}
          className="rounded-full text-xs cursor-pointer"
        >
          <CloseSVG />
        </button>
      </div>
    </div>
  );
}
