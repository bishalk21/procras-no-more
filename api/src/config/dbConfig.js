import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const MONGO_CLIENT = "mongodb://localhost:27017/procraste_no_more";
    mongoose.set("strictQuery", false);
    const conn = mongoose.connect(MONGO_CLIENT);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
