import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Connection/DatabaseConnect.js";
import productRoutes from "./Routes/Product-Routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8010;
dbConnect();

app.use(express.json());
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
