import { Router } from "express";
import * as reportController from "../controllers/report";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/attendance", reportController.getAttendanceReport);

export default router;
