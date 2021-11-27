import express, { Router } from "express";
import reqParamsValidation from "../middlewares/reqParamsValidation";
import controller from "../controllers/employees";

let router: Router = express.Router();
router.get("/employees", controller.getEmployees);
router.get("/employees/:id", reqParamsValidation, controller.getEmployee);
router.delete("/employees/:id", reqParamsValidation, controller.deleteEmployee);
router.post("/employees", controller.addEmployee);

export = router;
