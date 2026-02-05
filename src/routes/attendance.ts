import { Router } from "express";
import * as attendanceController from "../controllers/attendance";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/", attendanceController.getAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.upsertAttendance);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

export default router;
