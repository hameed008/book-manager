import mongoose from "mongoose";

export async function connectDB(username, password, dbName) {

  const MONGO_URI = `mongodb+srv://${username}:${password}@hameed.20n99cb.mongodb.net/${dbName}`;

  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to database`)
  } catch (error) {
    console.log(error)
    console.log(error.message);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Database Disconnected");
  process.exit(0)
});