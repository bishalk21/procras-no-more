/* eslint-disable no-undef */
import mongoose from "mongoose";

export const dbConnect = () => {
  const MONGO_URL = process.env.MONGO_CLIENT;
  try {
    // const MONGO_CLIENT = "mongodb://localhost:27017/procraste_no_more";
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(MONGO_URL);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
