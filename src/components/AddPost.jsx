import React, { useState } from "react";
import ImageSVG from "./ImageSVG";
import SubmitSVG from "./SubmitSVG";

export default function AddPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const CHAR_LIMIT = 280;

  const handleTextChange = (e) => setText(e.target.value);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setText("");
    setImage(null);
  };

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
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="max-h-48 rounded border mt-2"
        />
      )}
    </form>
  );
}
