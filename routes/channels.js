import express from "express";

import update from "../controllers/update.js";
import statistics from "../controllers/statistics.js";

const router = express.Router();

router.get("/update", update);
router.get("/statistics", statistics);

export default router;
