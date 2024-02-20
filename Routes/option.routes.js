import { Router } from "express";
import {
  addOption,
  addOptionsToProducts,
} from "../Controllers/option.controller.js";

const router = Router();

router.route("/create-option").post(addOption);
router.route("/add-option-to-product").post(addOptionsToProducts);

export default router;
