import React, { useState } from "react";
import tutor from "/images/tutor.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStar } from "@fortawesome/free-solid-svg-icons";

function VideoPlayer() {
  const [play, setPlay] = useState(false);

  return (
    <div className="h-96">
      {play ? (
        <div>
          <iframe
            
            height="215"
            src="https://www.youtube.com/embed/ti39UJYgc5s?si=G84m5m98xYpKLMf6"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            className="rounded-t-lg w-80 md:w-96"
          ></iframe>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setPlay(true)}>
          <img
            src={tutor}
            alt=""
            className={`w-80 md:w-96 absolute object-cover rounded-t-lg`}
          />

          <div className="relative z-10 flex justify-between top-32 md:top-40 left-6">
            <FontAwesomeIcon
              icon={faPlayCircle}
              className="text-white text-4xl"
            />

            <div className="text-[#FBA424] text-xl roboto-medium pe-10">
              <FontAwesomeIcon icon={faStar} className="" />
              <span className="ms-1 mt-5">5.0</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`bg-white rounded-b-lg text-left relative z-10 ${
          !play ? "top-[142px] md:top-44" : ""
        } w-80 md:w-96 px-6 py-4 leading-normal`}
      >
        <h1 className="roboto-bold">Mikasa</h1>
        <p className="roboto-regular text-gray-400 text-sm">
          Professional Teacher
        </p>
        <div className="flex mt-2 gap-5">
          <div className="">
            <span className="roboto-bold me-2">English</span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
          </div>

          <div>
            <span className="roboto-bold me-2">Hindi</span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-green-400 me-1 text-xs"></span>
            <span className="border-l-2 border-gray-400 me-1 text-xs"></span>
            <span className="border-l-2 border-gray-400 me-1 text-xs"></span>
          </div>
        </div>

        <div className="mt-2">
          <p className="roboto-regular text-gray-400 text-sm">
            Lesson starts from
          </p>
          <p className="roboto-bold">USD 8.50</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
