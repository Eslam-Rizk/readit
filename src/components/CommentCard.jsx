import React, { useEffect, useState } from "react";
import PosterDetails from "./PosterDetails";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function CommentCard({ comment, comments, setComments }) {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    async function getCommentImages(id) {
      try {
        const res = await axios.get(
          `${apiUrl}/images?type=comments&cardId=${id}`
        );
        setImgs(res.data);
      } catch (error) {
        console.error("error fetching comment images");
      }
    }

    getCommentImages(comment.id);
  }, []);
  return (
    <div className="flex flex-col items-center border-t gap-5 ">
      <div className="flex w-[100%]">
        <PosterDetails
          userName={comment.userName}
          date={comment.createdAt}
          userId={comment.userId}
          type={"comments"}
          id={comment.id}
          setData={setComments}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-sm">{comment.body}</div>
        <div className="flex flex-wrap justify-center w-[100%]">
          {imgs &&
            imgs.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt="comment"
                className="w-full h-[400px] object-cover rounded-lg m-2 cursor-pointer"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
