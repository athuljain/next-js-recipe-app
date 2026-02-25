// import mongoose from "mongoose";

// export const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;

//   await mongoose.connect("mongodb://127.0.0.1:27017/recipeapp");
// };


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const name=process.env.my_name

export const connectDB = async () => {
  // Check if we have a connection URI
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // If already connected, don't connect again
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};