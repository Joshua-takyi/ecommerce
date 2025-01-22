import mongoose from "mongoose";
import logger from "./logger";

export const connectDb = async () => {
	if (mongoose.connections[0].readyState) {
		logger.info("Already connected to MongoDB");
		return;
	}

	if (!process.env.MONGODB_URI) {
		throw new Error("MONGODB_URI is not defined in environment variables");
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error("MongoDB connection error:", error);
		throw error; // Re-throw the error to be handled by the caller
	}
};
