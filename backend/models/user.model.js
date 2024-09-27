import mongoose, { Mongoose } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    google_id:{
      type:String,
      required:false
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    profile_picture: {
      type: String,
    },
    achievements: {
      type: [String],
      default: [],
    },
    streak: {
      type: Number,
      default: 0,
    },
    course_enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
