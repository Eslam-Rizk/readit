import React, { useState } from "react";
import ImageSVG from "./ImageSVG";
import SubmitSVG from "./SubmitSVG";
import axios from "axios";
import { toast } from "react-toastify";
import CloseSVG from "./CloseSVG";
const apiUrl = import.meta.env.VITE_API_URL;

export default function AddPost({ type, user, setData }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const CHAR_LIMIT = 280;

  const handleTextChange = (e) => setText(e.target.value);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  async function addPost() {
    let post;
    if (text || (image && image.startsWith("http"))) {
      try {
        const res = await axios.post(`${apiUrl}/${type}`, {
          id: new Date().getTime(), //[TODO]: using for json server incremental id conflict, remove with real backend
          type: type,
          body: text,
          userId: user.id,
          userName: user.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(res.data);
        post = res.data;
      } catch (error) {
        console.error("Error Adding post", error);
        toast.error("Error adding post, please try again!");
        return;
      }
      if (image && image.startsWith("http")) {
        try {
          const res = await axios.post(`${apiUrl}/images`, {
            type: type,
            cardId: post.id,
            userId: user.id,
            url: image,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log(res.data);
        } catch (error) {
          console.error("Error Adding post", error);
          toast.error("Error adding post image, please try again!");
          return;
        }
      }
      setData((prev) => [post, ...prev]);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
    setText("");
    setImage(null);
  };

  const isDisabled = text.trim() === "" && !image;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-base-300 rounded-lg w-[100%] my-5 p-5"
    >
      <textarea
        className="w-[100%] bg-transparent border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
        placeholder="What's on your mind?"
        value={text}
        onChange={handleTextChange}
        rows={2}
      />
      <div
        className={`text-xs text-right mb-1 ${
          text.length > CHAR_LIMIT ? "text-red-500" : "text-gray-500"
        }`}
      >
        {text.length}/{CHAR_LIMIT}
      </div>
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Image URL (optional)"
          value={image || ""}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="flex justify-end items-center gap-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isDisabled}
          >
            <SubmitSVG />{" "}
          </button>
        </div>
      </div>
      {image && image.startsWith("http") && (
        <div className="relative">
          <img src={image} alt="Preview" className=" rounded border mt-2" />
          <button
            onClick={() => setImage(null)}
            className="absolute top-1 right-1 font-bold cursor-pointer hover:scale-110"
          >
            <CloseSVG />
          </button>
        </div>
      )}
    </form>
  );
}

//[TODO]: replace image url with uploaded image
/*
<div className="flex justify-between items-center gap-4">
        <label className="cursor-pointer flex items-center text-primary">
          <ImageSVG />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          <SubmitSVG />{" "}
        </button>
      </div>
*/
