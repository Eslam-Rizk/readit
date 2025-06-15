import React from "react";
import CloseSVG from "./CloseSVG";

export default function ImageModal({ src, alt }) {
  return (
    <>
      <dialog id="image_modal" className="modal">
        <div className="modal-box p-0 relative">
          <button
            className="cursor-pointer absolute top-0 right-0 m-4"
            onClick={() => document.getElementById("image_modal").close()}
          >
            <CloseSVG/>
          </button>
          <img src={src} alt={alt} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
