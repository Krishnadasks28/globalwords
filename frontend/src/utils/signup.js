import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, provider } from "./firebase";

export const sendOTP = async (email, setOtpSent, setCredErrros) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(email)) {
    try {
      toast.promise(
        new Promise(async (resolve, reject) => {
          const response = await fetch("/api/user/sent_email_otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          });

          let result = await response.json();
          console.log(result);
          if (result.success) {
            setOtpSent(true);
            resolve();
          } else {
            reject();
          }
        }),
        {
          loading: "Sending OTP...",
          success: "OTP Successfully Send.",
          error: "Failed to send OTP, Try again!",
        }
      );
    } catch (err) {
      console.log(err);
    }

    setCredErrros(null);
  } else {
    setCredErrros({ email: "Not a valid email!" });
  }
};

export const verify_email = async (email, otp, setEmailVerified) => {
  toast.promise(
    new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/user/verify_email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
          let result = await response.json();
          if (result.verified) {
            setEmailVerified(true);
            resolve();
          } else {
            reject();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }),
    {
      loading: "Checking OTP...",
      success: "Email Verified.",
      error: "Incorrect OTP!",
    }
  );
};

export // sign up with google
const signUpWithGoogle = async (dispatch,saveUser,showModel) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { uid, displayName, email, photoURL } = result.user;

    const response = await fetch("http://localhost:3000/user/google_signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, username: displayName, email, photoURL }),
      credentials: "include",
    });
    if (response.ok) {
      const userData = await response.json();
      console.log("response : ", userData);
      dispatch(saveUser(userData));
      showModel(false);
    } else {
      console.log("error respone : ", response);
    }
  } catch (err) {
    console.log(err);
  }
};
