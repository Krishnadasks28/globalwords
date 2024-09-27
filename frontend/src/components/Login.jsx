import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice";
import { signUpWithGoogle } from "../utils/signup";
import { useNavigate } from "react-router-dom";

function Login({ showLoginModel }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCredChange = (e) => {
    const { value, name } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(credentials.email)) {
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              credentials: "include",
            });
            if (response.ok) {
              dispatch(saveUser(await response.json()));
              showLoginModel(false);
              resolve();
            } else if (response.status == 404) {
              toast.error("User does not exist.");
              reject();
            } else if (response.status == 401) {
              toast.error("Incorrect password.");
              reject();
            } else {
              reject();
            }
          } catch (err) {
            reject();
          }
        }),
        {
          loading: "Loging in...",
          success: "User Logged In.",
          error: "Failed to log in.",
        }
      );
    } else {
      toast.error("Not a valid email.");
    }
  };

  return (
    <div className="z-20 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center px-5 text-center">
      <div className="flex flex-col">
        <button
          className="place-self-end mb-1 hover:bg-white hover:text-black px-2 py-[6px] text-center flex justify-center items-center border-2 border-white text-white rounded-full"
          onClick={() => showLoginModel(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="flex flex-col w-full md:w-fit bg-white p-5 md:p-10 rounded-xl border-2 border-gray-300">
          <h1 className="roboto-bold text-2xl hidden md:block">
            Welcome back to Global Words
          </h1>
          <h1 className="roboto-regular">Log in to continue.</h1>

          <div className="leading-loose flex flex-col mt-5 mb-5 roboto-regular">
            <input
              type="email"
              className="border-2 w-full rounded-md p-1 placeholder:text-sm focus:border-blue-600 focus:outline-none"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={handleCredChange}
            />
            <input
              type="password"
              className="border-2 w-full rounded-md p-1 my-3 placeholder:text-sm focus:border-blue-600 focus:outline-none"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              onChange={handleCredChange}
            />

            <button
              disabled={
                credentials.email.length < 5 || credentials.password.length < 3
              }
              className="w-full px-4 py-1 text-white roboto-regular bg-blue-600 border-2 rounded-md mt-3 hover:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              onClick={login}
            >
              Log In
            </button>
          </div>

          <div className="flex justify-center items-center mb-5">
            <span className="w-1/2 border-2 border-gray-200 h-0"></span>
            <span className="px-4 roboto-regular text-gray-500">OR</span>
            <span className="w-1/2 border-2 border-gray-200 h-0"></span>
          </div>

          <div>
            <button
              className="w-full px-4 py-2 bg-white border-blue-600 border-2 rounded-md hover:bg-[#FBA424] hover:border-[#FBA424] hover:text-white roboto-regular"
              onClick={() =>
                signUpWithGoogle(dispatch, saveUser, showLoginModel).then(() =>
                  navigate("/courses")
                )
              }
            >
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
