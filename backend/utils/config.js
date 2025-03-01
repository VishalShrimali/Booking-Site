import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Set Mongoose strictQuery option (suppressing the deprecation warning)
mongoose.set('strictQuery', true);

const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        return connectionInstance;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exits with failure code if connection fails
    }
};

// Export the connection function
export { connectionDB };