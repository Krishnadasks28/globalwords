import React, { useState } from "react";
import Global_Words_LOGO from "/images/Global_Words_LOGO.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/userSlice";
import { Toaster } from "react-hot-toast";
import SignUp from "./SignUp";
import Login from "./Login";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [signUpModel, showSignUpModel] = useState(false);
  const [loginModel,showLoginModel] = useState(false)
  return (
    <div className="flex justify-between lg:px-8 items-center roboto-medium">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="ps-10 lg:w-1/3 lg:ps-20">
        {/* logo */}
        <img src={Global_Words_LOGO} className="h-20" alt="logo" />
      </div>
      <div className="md:flex justify-between gap-5 hidden">
        {/* actions */}
        <div className="">
          <NavLink
            to={"#"}
            className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
          >
            Courses
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"#"}
            className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
          >
            Find a teacher
          </NavLink>
        </div>
        <div>
          <NavLink
            to={"#"}
            className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
          >
            Become a teacher
          </NavLink>
        </div>
        {user ? (
          <div>
            <NavLink
              className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
              onClick={() => dispatch(logout())}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <>
            <div>
              <NavLink
                className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
                onClick={() => showSignUpModel(true)}
              >
                Sign up
              </NavLink>
            </div>
            <div>
              <NavLink
                to={"#"}
                className={`px-4 py-2 rounded  hover:underline decoration-2 decoration-blue-600 active:underline`}
                onClick={()=>showLoginModel(true)}
              >
                Log in
              </NavLink>
            </div>
          </>
        )}
      </div>

      <div>{signUpModel && <SignUp showSignUpModel={showSignUpModel} />}</div>
      <div>{loginModel && <Login showLoginModel={showLoginModel} />}</div>
    </div>
  );
}

export default Navbar;
