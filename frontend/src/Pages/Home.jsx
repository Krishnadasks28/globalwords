import React from "react";
import Navbar from "../components/Navbar";
import backgroudIMG from "/images/global_words_bg.png";
import VideoPlayer from "../components/VideoPlayer";
import one_on_one from "/images/one_on_one.png";
import natives from '/images/natives.png'
import gamified from '/images/gamified.png'

function Home() {
  return (
    <div className="h-screen pb-10 bg-[#FBFBFB]">
      <Navbar />

      {/* Banner */}
      <div className="">
        <img
          src={backgroudIMG}
          alt=""
          className="absolute left-0 w-full md:h-[35rem] md:object-cover"
        />
        <div className="relative z-10 p-8 lg:w-1/2 flex justify-center text-center items-center md:h-[35rem]">
          <div className="">
            <div className="leading-loose mb-3 roboto-bold">
              <h1 className=" text-3xl text-white text-stroke-blue text-stroke-1 mb-1 md:text-5xl">
                Start your journey
              </h1>
              <p className="font-bold text-lg text-white text-stroke-blue text-stroke-1 lg:text-2xl">
                A fresh take on language learning
              </p>
            </div>
            <div className="flex flex-col justify-center w-full items-center roboto-medium">
              <button className="bg-[#FBA424] px-12 py-2 rounded-full text-white block mb-3 md:px-16">
                Start Learning
              </button>
              <button className="bg-[#F5F5F5] px-12 py-2 rounded-full text-[#588DA4] md:px-16">
                Start Teaching
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      {/* languages and teachers */}
      <div className="flex justify-center text-center bg-gray-200 mt-10 py-8">
        <div>
          <h1 className="roboto-bold text-2xl">Pick your language and tutor</h1>
          {/* langauge selector */}
          <div className="mt-6 pb-10">
            <span className="font-semibold text-base px-6 py-2 bg-white rounded-full cursor-pointer hover:bg-gray-100">
              English
            </span>
          </div>

          {/* intro videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
            <VideoPlayer />
            <VideoPlayer />
            <VideoPlayer />
            <VideoPlayer />
            <VideoPlayer />
            <VideoPlayer />
          </div>
        </div>
      </div>
      {/*  */}

      {/* description */}
      <div className="text-center flex flex-col justify-center mt-16 pb-10 px-5">
        <div>
          <h1 className="roboto-bold text-3xl">Why Choose Global Words ? </h1>
          <p className="roboto-regular mt-3 lg:px-40">
            At Global Words, we offer courses taught by experienced
            professionals and native speakers, ensuring you learn in an
            authentic and engaging way. Our platform combines interactive
            lessons with real-time conversations, allowing you to practice
            speaking with native speakers. Whether you're learning for travel,
            work, or personal growth, our approach makes language learning
            interesting and effective, giving you the confidence to communicate
            in real-life situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 px-16 mt-14">
          <div className="flex flex-col text-center items-center justify-center">
            <div className="">
              <img src={one_on_one} alt="" className="rounded-full w-60" />
            </div>
            <h1 className="roboto-medium text-xl mt-2">1-on-1 lessons</h1>
            <p className="roboto-regular text-gray-600 lg:px-10">
              Find teachers from all over the world sharing their languages,
              dialects, and cultures
            </p>
          </div>

          <div className="flex flex-col text-center items-center justify-center mt-5">
            <div className="">
              <img src={natives} alt="" className="rounded-full w-60" />
            </div>
            <h1 className="roboto-medium text-xl mt-2">Speak with natives</h1>
            <p className="roboto-regular text-gray-600 lg:px-10">
              Connect with native speakers for real-time conversations and
              improve your language skills effectively.
            </p>
          </div>

          <div className="flex flex-col text-center items-center justify-center mt-5 md:col-span-2 lg:col-span-1">
            <div className="">
              <img src={gamified} alt="" className="rounded-full w-60" />
            </div>
            <h1 className="roboto-medium text-xl mt-2">Gamified approach</h1>
            <p className="roboto-regular text-gray-600 md:px-10">
              By adopting a game-like format, our platform transforms the
              learning experience into an engaging and interactive adventure.
            </p>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default Home;
