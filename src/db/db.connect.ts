import mongoose from "mongoose";

const initializeMongoDB = async (MONGODB_URI: string) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.log("Error while connecting to MongoDB");
  }
};

export { initializeMongoDB };
