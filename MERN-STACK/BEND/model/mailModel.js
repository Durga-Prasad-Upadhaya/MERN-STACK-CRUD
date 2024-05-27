import mongoose from "mongoose";

const mailSchema = mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    required: [true, "Please Add Email Address"],
  },
  feedback: {
    type: String,
    required: [true, "Please Your Feedback"],
  },
});

export default mongoose.model("Mail", mailSchema);
