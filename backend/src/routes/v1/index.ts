import express from "express";
import authRoutes from "./auth.route";
import inspectionRoutes from "./inspection.route";
import basicRoutes from "./basic.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/inspections", inspectionRoutes);
router.use("/basics", basicRoutes);

export default router;
