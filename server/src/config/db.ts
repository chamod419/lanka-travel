import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Add it to the server .env file."
    );
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("");
    console.log("MongoDB connected successfully.");
    console.log(`Database: ${mongoose.connection.name}`);
    console.log("");
  } catch (error) {
    console.error("MongoDB connection failed.");

    if (error instanceof Error) {
      console.error(error.message);
    }

    throw error;
  }
}

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection state: connected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB connection state: reconnected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection state: disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}