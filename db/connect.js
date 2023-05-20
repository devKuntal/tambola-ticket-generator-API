import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("Database connected successfully"));
};

export default connectDB;
