import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Connection/DatabaseConnect.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8010;
dbConnect();

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
