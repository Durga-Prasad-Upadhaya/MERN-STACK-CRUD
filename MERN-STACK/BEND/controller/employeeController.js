import express from "express";
const router = express.Router();

import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmpoyee,
  deleteEmployee,
  deleteAllEmployee,
} from "../service/employeeService.js";

router.route("/").get(getEmployees);
router.route("/:id").get(getEmployee);
router.route("/").post(createEmployee);
router.route("/:id").put(updateEmpoyee);
router.route("/:id").delete(deleteEmployee);
router.route("/").delete(deleteAllEmployee);

export default router;
