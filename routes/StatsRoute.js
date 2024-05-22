import express from "express";
import { 
    getStatistics
} from "../controllers/StatisticsController.js";

import { verifyUser} from "../middleware/AuthUser.js"; 
const router = express.Router();



router.get('/stats', verifyUser,getStatistics);

export default router;