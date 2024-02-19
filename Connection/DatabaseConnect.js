import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASSWORD)
    );
    console.log(`Connected to ${connection.name}`);
  } catch (error) {
    console.log("Connection failled", error);
  }
};

export default dbConnect;
