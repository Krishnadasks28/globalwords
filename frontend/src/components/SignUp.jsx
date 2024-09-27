import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faClose,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { saveUser } from "../Redux/userSlice";
import toast from "react-hot-toast";
import { sendOTP, signUpWithGoogle, verify_email } from "../utils/signup";

function SignUp({ showSignUpModel }) {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    password_recheck: "",
  });

  const [credErrors, setCredErrros] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const [eye, setEye] = useState(faEye);
  const showPassword = () => {
    const pass_input = document.getElementById("password-input");
    const type =
      pass_input.getAttribute("type") === "password" ? "text" : "password";
    pass_input.setAttribute("type", type);
    if (type == "password") {
      setEye(faEye);
    } else {
      setEye(faEyeSlash);
    }
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signup = async () => {
    let password_error = false;
    let username_error = false;
    if (credentials.password != credentials.password_recheck) {
      setCredErrros({ password: "Password mismatch!!!" });
      password_error = true;
    } else {
      setCredErrros((prev) => ({
        ...prev,
        password: null,
      }));
      password_error = false;
    }

    if (credentials.username.length < 4) {
      setCredErrros((prev) => ({
        ...prev,
        username: "Username should not be less than 4 characters.",
      }));
      username_error = true;
    } else {
      setCredErrros((prev) => ({
        ...prev,
        username: null,
      }));
      username_error = false;
    }

    if (!password_error && !username_error) {
      console.log(credErrors);
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/user/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
              }),
              credentials: "include",
            });

            if (response.ok) {
              let result = await response.json();
              console.log(result);
              dispatch(saveUser(result));
              showSignUpModel(false);
              resolve();
            } else if (response.status == 409) {
              toast.error("User already exist,login to continue!");
              reject();
            } else {
              reject();
            }
          } catch (err) {
            reject();
          }
        }),
        {
          loading: "Creating new user...",
          success: "New User Added.",
          error: "Failed to create new user.",
        }
      );
    }
  };
  return (
    <div className="z-20 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col items-center justify-center px-5 text-center">
      <div className="flex flex-col">
        <button
          className="place-self-end mb-1 hover:bg-white hover:text-black px-2 py-[6px] text-center flex justify-center items-center border-2 border-white text-white rounded-full"
          onClick={() => showSignUpModel(false)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <div className="flex flex-col w-full md:w-fit bg-white p-5 md:p-10 rounded-xl border-2 border-gray-300">
          <h1 className="roboto-bold text-2xl hidden md:block">
            Start Your Journey With Global Words
          </h1>
          <h1 className="roboto-bold text-xl md:hidden ">
            Sign Up to Global Words
          </h1>
          <p className="text-sm roboto-medium text-gray-400 mt-1 text-center">
            Begin Your Language Adventure.
          </p>
          <div className="leading-loose flex flex-col mt-5 mb-5 roboto-regular">
            <div className={`w-full ${emailVerified ? "hidden" : ""}`}>
              {credErrors && credErrors.email ? (
                <span className="roboto-regular text-red-600 ">
                  {credErrors.email}
                </span>
              ) : (
                ""
              )}
              <div className="flex justify-center items-center gap-2">
                <input
                  type="text"
                  className="w-2/3 border-2 rounded-md p-1 placeholder:text-sm focus:border-blue-600 focus:outline-none"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleFormData}
                />
                <button
                  className="w-1/3 py-1 px-2 text-white  roboto-medium bg-green-500 border-2 rounded-md hover:bg-green-400 disabled:cursor-not-allowed disabled:hover:bg-green-500"
                  onClick={() =>
                    sendOTP(credentials.email, setOtpSent, setCredErrros)
                  }
                  disabled={credentials.email.length < 5}
                >
                  Send OTP
                </button>
              </div>
              <input
                type="number"
                className="border-2 appearance-none  w-full mt-2 rounded-md p-1 placeholder:text-sm focus:border-blue-600 focus:outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
                    e.preventDefault();
                  }
                }}
                disabled={otpSent == false}
              />
            </div>
            <div className={`${!emailVerified ? "hidden" : ""}`}>
              <div className="flex flex-col">
                {credErrors && credErrors.password ? (
                  <span className="roboto-regular text-red-600 ">
                    {credErrors.password}
                  </span>
                ) : (
                  ""
                )}

                {credErrors && credErrors.username ? (
                  <span className="roboto-regular text-red-600 ">
                    {credErrors.username}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <input
                type="text"
                className="border-2 w-full rounded-md p-1 my-3 placeholder:text-sm focus:border-blue-600 focus:outline-none"
                placeholder="Enter a username"
                name="username"
                value={credentials.username}
                onChange={handleFormData}
              />
              <input
                type="text"
                className="border-2 w-full rounded-md p-1 my-3 placeholder:text-sm focus:border-blue-600 focus:outline-none"
                placeholder="Create Password"
                name="password"
                value={credentials.password}
                onChange={handleFormData}
              />
              <div className="relative w-full">
                <input
                  type="password"
                  id="password-input"
                  className="border-2 w-full rounded-md p-1 placeholder:text-sm focus:border-blue-600 focus:outline-none"
                  placeholder="Re-enter password"
                  name="password_recheck"
                  value={credentials.password_recheck}
                  onChange={handleFormData}
                />
                <button
                  className="absolute inset-y-0 px-3 right-0"
                  onClick={showPassword}
                >
                  <FontAwesomeIcon icon={eye} className="text-gray-600" />
                </button>
              </div>
            </div>

            {emailVerified ? (
              <button
                className="w-full px-4 py-1 text-white roboto-regular bg-blue-600 border-2 rounded-md mt-3 hover:bg-blue-400"
                onClick={signup}
              >
                Create account
              </button>
            ) : (
              <button
                disabled={otp.length != 4}
                className="w-full px-4 py-1 text-white roboto-regular bg-blue-600 border-2 rounded-md mt-3 hover:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                onClick={() =>
                  verify_email(credentials.email, otp, setEmailVerified)
                }
              >
                Verify Email
              </button>
            )}
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
                signUpWithGoogle(dispatch, saveUser, showSignUpModel)
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

export default SignUp;
