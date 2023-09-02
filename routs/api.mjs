import express from "express";
const router = express.Router();

import {
  generateAddress,
  generateMnemonic,
  generateUuid,
  getestimatedfee,
} from "../controllers/index.mjs";

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

// ... routes will go here
router.get("/getEstimatedFee", getestimatedfee);

router.get("/generateAddress", generateAddress);

router.get("/generateUuid", generateUuid);
router.get("/generateMnemnoic", generateMnemonic);

export default router;
