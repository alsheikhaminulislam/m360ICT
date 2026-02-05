import { Router } from "express";
import * as employeeController from "../controllers/employee";
import { authenticate } from "../middlewares/auth";
import upload from "../middlewares/upload";

const router = Router();

router.use(authenticate); // Protect all routes

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", upload.single("photo"), employeeController.createEmployee);
router.put("/:id", upload.single("photo"), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;
