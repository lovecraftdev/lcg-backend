import express from "express";
import { addCollection, getCollectionsBySearch } from "../Controllers/Collection-Controllers.js";
const router = express.Router();

router.get("/getBySearch", getCollectionsBySearch);
router.post("/add-collection", addCollection);

export default router;
