import path from "path";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";
import itemRoute from "./routes/api/items.js";
import authRoute from "./routes/api/auth.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// connect to DB
connectDB();

// routes middleware
app.use("/api/items", itemRoute);
app.use("/api/auth", authRoute);

// server sataic assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on PORT:" + PORT);
});
