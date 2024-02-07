import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8010;


app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
