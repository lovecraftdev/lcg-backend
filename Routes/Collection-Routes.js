import express from "express";
import {
  addCollection,
  getAllCollections,
  getCollectionsBySearch,
} from "../Controllers/Collection-Controllers.js";
const router = express.Router();

router.get("/getBySearch", getCollectionsBySearch);
router.get("/getAllCollections", getAllCollections);
router.post("/add-collection", addCollection);

export default router;
