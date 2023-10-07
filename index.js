import express from "express";
import dotenv from "dotenv";
import path from "path";

import db from "./db.js";
import channelRoutes from "./routes/channels.js";

const app = express();

app.use(express.json());

dotenv.config();

// connect to database
db();

app.use(express.static("public"));

//index.js
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// update youtube channel statistics to mongodb
app.use("/api/channels", channelRoutes);

// get request for front-end to communicate
app.get("/api/channels", channelRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Connected to server");
});

export default app;
