import express from "express";
import { param } from "express-validator";

import { employeeController } from "../controllers/controllers.module";
import resultValidator from '../middlewares/validation.MW';
import { hashPassword } from "../middlewares/hashPassword.MW";
import {
  postEmployeeValidator,
  putEmployeeValidator,
} from "./../middlewares/employee.MW";

export const employeeRoute = express.Router();

employeeRoute
  .route("/employees")
  .get(employeeController.getAllEmployees)
  .post(
    postEmployeeValidator,
    resultValidator,
    hashPassword,
    employeeController.createEmployee
  )
  .put(
    putEmployeeValidator,
    resultValidator,
    employeeController.updateEmployee
  );

employeeRoute
  .route("/employees/:id")
  .all(
    [
      param("id").isMongoId().withMessage("Employee id wrong")
    ],
    resultValidator
  )
  .get(employeeController.getEmployeeById)
  .delete(employeeController.deleteEmployee);
