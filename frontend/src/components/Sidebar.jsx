import React, { useState } from "react";
import logo from "/images/Global_Words_LOGO.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import letters from "/images/icons/A.png";
import Leaderboards from "/images/icons/leaderboard.svg";
import findTeacher from "/images/icons/findTeacher.jfif";
import nativeChat from "/images/icons/nativeChat.jpg";
import settings from "/images/icons/settings.png";
import logoutIcon from "/images/icons/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user.user)
  const handleLogout = () => {
    dispatch(logout()) // Dispatch the async logout thunk
      .then(() => navigate("/home")); // Navigate after successful logout
  };
  return (
    <div className="w-1/4 hidden md:block border-gray-400 border-e-2 my-2 h-screen">
      <div className="flex flex-col">
        {/* logo */}
        <div className="flex justify-center items-center">
          <img src={logo} className="h-28" alt="" />
        </div>

        {/* options */}
        <div className="flex flex-col w-full noto-serif-medium text-xl gap-3 mt-5 px-8">
          <NavLink
            to={"/selectedCourse"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full "
                : "hover:bg-gray-300 py-3 rounded-full"
            }
          >
            <FontAwesomeIcon
              icon={faHome}
              className="text-indigo-600 w-1/4 text-2xl "
            />
            <span id="learn">Learn</span>
          </NavLink>
          {/*  */}
          <NavLink
            to={"/letters"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <div className="w-1/4 flex justify-center">
              <img src={letters} className="h-7" alt="" />
            </div>
            <span id="letters">Letters</span>
          </NavLink>
          {/*  */}

          <NavLink
            to={"/leaderboard"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <div className="flex justify-center w-1/4">
              <img src={Leaderboards} className="h-7" alt="" />
            </div>
            Leaderboards
          </NavLink>
          {/*  */}

          <NavLink
            to={"/find-teacher"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <div className="flex justify-center w-1/4">
              <img src={findTeacher} className="h-7" alt="" />
            </div>
            Find a teacher
          </NavLink>
          {/*  */}

          <NavLink
            to={"/native-char"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <FontAwesomeIcon
              icon={faVideoCamera}
              className="text-2xl w-1/4 text-blue-600"
            />
            Native chat
          </NavLink>
          {/*  */}

          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <div className="w-1/4 flex justify-center">
              <span className="text-base border-4 border-gray-400 rounded-full py-[1px] px-[8px] border-dotted">
                K
              </span>
            </div>
            Profile
          </NavLink>
          {/*  */}

          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-blue-300 bg-blue-300 py-3 rounded-full flex "
                : "hover:bg-gray-300 py-3 rounded-full flex"
            }
          >
            <div className="w-1/4 flex justify-center">
              <img src={settings} className="h-7" alt="" />
            </div>
            Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className={"hover:bg-gray-300 py-3 rounded-full flex"}
          >
            <div className="flex justify-center w-1/4">
              <img src={logoutIcon} className="h-7" alt="" />
            </div>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
