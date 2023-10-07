import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Connected to database");
    });
  } catch (e) {
    console.log("Connection failed " + e.message);
  }
};

export default db;
