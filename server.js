import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";
import itemRoute from "./routes/api/items.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());

// connect to DB
connectDB();

// routes middleware
app.use("/api/items", itemRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on PORT:" + PORT);
});
