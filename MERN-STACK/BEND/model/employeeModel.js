import mongoose from "mongoose";

const empSchema = mongoose.Schema(
  {
    ename: {
      type: String,
      required: [true, "Please Add Emp Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email Address"],
    },
    emobile: {
      type: String,
      required: [true, "Please Add Employee Mobile Number"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Emp", empSchema);
