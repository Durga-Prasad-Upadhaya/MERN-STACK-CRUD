import mongoose from "mongoose";

export const connectDB = async () => { 
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB Connected!");
  } catch (err) {
    console.log("Database Error:", err);
    process.exit();
  }
};
