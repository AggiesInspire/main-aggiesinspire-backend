import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import channelRoutes from "./routes/channels.js";

const app = express();
dotenv.config();

app.use(express.static("public"));

//index.js
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      throw err;
    });
};

// update youtube channel statistics to mongodb
app.use("/api/channels", channelRoutes);

// get request for front-end to communicate
app.get("/api/channels", channelRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  // connect to database
  connect();
  console.log("Connected to server");
});

export default app;
