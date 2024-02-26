import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Connection/DatabaseConnect.js";
import productRoutes from "./Routes/Product-Routes.js";
import collectionRoutes from "./Routes/Collection-Routes.js";
import optionRoutes from "./Routes/option.routes.js";
import customerRouter from "./Routes/Customer-Routes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8010;
dbConnect();

app.use(cors());
app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/option", optionRoutes);
app.use("/api/customers", customerRouter);

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
});
