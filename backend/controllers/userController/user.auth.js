import { CustomError } from "../../errorHandler/error.js";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import transporter from "../../utils/nodemailer.js";
import email_otp from "../../models/otp.model.js";

export const user_signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new CustomError(400, "username, email, and password are required.");
    }

    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      throw new CustomError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const new_user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await new_user.save();

    const user_token = generate_token(new_user);

    res.cookie("global_words_user", user_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "Lax",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.status(201).json({
      _id: new_user._id,
      username: new_user.username,
      email: new_user.email,
      role: new_user.role,
      createdAt: new_user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

export const google_signin = async (req, res, next) => {
  try {
    const { uid, username, email, photoURL } = req.body;

    let user = await User.findOne({ google_id: uid });
    if (!user) {
      user = new User({
        google_id: uid,
        email: email,
        username: username,
        profile_picture: photoURL,
      });

      await user.save();
    }

    const { achievements, profile_picture, role, course_enrolled, streak } =
      user;
    const user_token = generate_token(user);
    res
      .cookie("global_words_user", user_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "none",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        username,
        email,
        profile_picture,
        achievements,
        role,
        course_enrolled,
        streak,
      });
  } catch (err) {
    next(err);
  }
};

export const user_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email });

    if (userFound) {
      let isPasswordCorrect = await bcrypt.compare(
        password,
        userFound.password
      );
      if (isPasswordCorrect) {
        const user_token = generate_token(userFound);
        const { achievements, username, role, course_enrolled, streak } =
          userFound;
        return res
          .cookie("global_words_user", user_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none",
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          })
          .status(200)
          .json({
            email,
            achievements,
            username,
            role,
            course_enrolled,
            streak,
          });
      } else {
        throw new CustomError(401, "Incorrect Password.");
      }
    } else {
      throw new CustomError(404, "user not found.");
    }
  } catch (err) {
    next(err);
  }
};

export const user_logout = async (req, res, next) => {
  try {
    res
      .clearCookie("global_words_user")
      .status(200)
      .json({ Message: "Logout successfull." });
  } catch (err) {
    next(err);
  }
};

export const send_email_OTP = async (req, res, next) => {
  try {
    let otp = generate_otp();
    let email = req.body.email;
    let newOtp = await email_otp.findOne({ email: email });
    if (newOtp) {
      newOtp.otp = otp;
    } else {
      newOtp = new email_otp({
        email: email,
        otp: otp,
      });
    }

    await newOtp.save();

    const mailOptions = {
      from: process.env.AWS_SMTP_EMAIL,
      to: email,
      subject: "Email verification",
      text: `${otp} is the code to verify your email at GlobalWords.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error in sending mail:", error);
        return res
          .status(500)
          .json({ success: false, message: "Error in sending mail" });
      } else {
        console.log("Email sent:", info.response);
        return res
          .status(200)
          .json({ success: true, message: "Email sent successfully" });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const verify_email = async (req, res, next) => {
  try {
    let { email, otp } = req.body;
    let generated_otp = await email_otp.findOne({ email: email });
    let verified = false;
    if (otp == generated_otp.otp) {
      verified = true;
    }

    res.status(200).json({ email, verified });
  } catch (err) {
    next(err);
  }
};

const generate_token = (userdata) => {
  const token = jwt.sign(
    {
      id: userdata._id,
      email: userdata.email,
      role: userdata.role,
    },
    process.env.JWT_SECRET,

    { expiresIn: "30d" }
  );

  const encrypted_token = crypto.AES.encrypt(
    token,
    process.env.ENCRYPTION_KEY,
    {
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7,
    }
  ).toString();

  return encrypted_token;
};

const generate_otp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
