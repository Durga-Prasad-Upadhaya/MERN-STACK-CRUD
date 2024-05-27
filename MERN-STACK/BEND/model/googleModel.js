import mongoose from "mongoose";

const googleModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add User Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email Address"],
      unique: [true, "Email Address Already Registered!"],
    },
    isGoogle: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("googleUser", googleModel);
