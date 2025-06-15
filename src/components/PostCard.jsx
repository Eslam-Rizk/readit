import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import PosterDetails from "./PosterDetails";
import ImageCard from "./ImageCard";
import CheckLoggedInUser from "../utils/LoggedInUser";
import ImageModal from "./ImageModal";
import CloseSVG from "./CloseSVG";
import ImageSVG from "./ImageSVG";
import SubmitSVG from "./SubmitSVG";
import CommentsSVG from "./CommentsSVG";
const apiUrl = import.meta.env.VITE_API_URL;

export default function PostCard({ post, posts, setPosts }) {
  const fileInputRef = useRef(null);
  const [postImages, setPostImages] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentImage, setCommentImage] = useState(null);

  async function toggleComments() {
    setShowComments(!showComments);
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCommentImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("image: ", file);
    }
  }

  useEffect(() => {
    async function getPostImages() {
      try {
        const res = await axios.get(
          `${apiUrl}/images?type=posts&cardId=${post.id}`
        );
        setPostImages(res.data);
      } catch (error) {
        console.error("error fetching post images");
      }
    }
    async function getPostComments() {
      try {
        const res = await axios.get(`${apiUrl}/comments?postId=${post.id}`);
        setComments(res.data);
      } catch (error) {
        console.error("error fetching comments");
      }
    }
    getPostImages();
    getPostComments();
  }, []);

  return (
    <div className="flex flex-col items-center bg-base-300 rounded-lg w-[100%] my-5">
      <div className="flex w-[100%]">
        {/* post user details */}
        <PosterDetails
          userName={post.userName}
          date={post.createdAt}
          userId={post.userId}
          type={"posts"}
          id={post.id}
          setData={setPosts}
        />
      </div>
      {/* post content */}
      <div className="flex flex-col">
        {/* post body */}
        <p className="p-5">{post.body}</p>
        {/* post images */}
        {postImages.length > 0 && (
          <div className="flex flex-wrap justify-center w-[100%]">
            {postImages.map((img) => (
              <div key={img.id}>
                <img
                  src={img.url}
                  alt="post-Image"
                  className="w-full  object-cover rounded-lg my-2 cursor-pointer"
                  onClick={() =>
                    document.getElementById("image_modal").showModal()
                  }
                />
                <ImageModal src={img.url} alt={"post-Image"} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* comments button */}
      <button
        onClick={toggleComments}
        className="flex text-primary m-2 cursor-pointer mr-auto"
      >
        <CommentsSVG />
        <p>{comments.length}</p>
      </button>
      {/* comments section */}
      {showComments &&
        (comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="w-[100%] my-1">
              <CommentCard
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            </div>
          ))
        ) : (
          <div>No Comments.</div>
        ))}
      {/* comment input section */}
      <div className="flex flex-col items-center border rounded-lg w-[100%] p-2 mt-2">
        <div className="flex flex-row justify-between items-center gap-2 w-[100%]">
          <input
            className="ml-2 w-[80%] focus:outline-none"
            type="text"
            placeholder="add comment ..."
          />
          {/* file upload hidden*/}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
          />
          {/* file upload activate */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer text-primary"
          >
            <ImageSVG />
          </button>
          <button className="cursor-pointer rounded-full text-primary">
            <SubmitSVG />
          </button>
        </div>
        {commentImage && (
          <div className="relative">
            <img src={commentImage} alt="img" className="h-30 w-30" />
            <button
              onClick={() => setCommentImage(null)}
              className="absolute top-0 right-1 font-bold cursor-pointer hover:scale-110"
            >
              <CloseSVG />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
