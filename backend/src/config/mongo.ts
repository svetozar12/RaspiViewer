import mongoose from "mongoose";

const mongoUrl = "mongodb://host.docker.internal:27017/test";

export async function connectMongo(): Promise<void> {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Disconnect from MongoDB
export async function disconnectMongo(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB:", error);
    throw error;
  }
}
