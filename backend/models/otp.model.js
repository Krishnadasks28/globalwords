import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
const email_otp = mongoose.model("otp", otpSchema);

export default email_otp;
