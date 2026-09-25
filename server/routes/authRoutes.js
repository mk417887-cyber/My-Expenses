import express from "express";
import { register, login , refresh} from "../controllers/authController.js";
import { authRateLimiter } from "../middleware/rateLimitMiddlewarte.js";

const router = express.Router();
 
router.post("/register", authRateLimiter, register);

router.post("/login", authRateLimiter, login);

router.post("/refresh", refresh);

export default router;