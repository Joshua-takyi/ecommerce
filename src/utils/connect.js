import mongoose from "mongoose";
import logger from "./logger";

export const connectDb = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			throw new Error("MONGODB_URI is not defined in environment variables");
		}
		await mongoose.connect(process.env.MONGODB_URI);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error("MongoDB connection error:", error);
		throw error; // Re-throw the error to be handled by the calling function
	}
};
