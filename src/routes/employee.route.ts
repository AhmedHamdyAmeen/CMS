import express from "express";

import { employeeController } from "../controllers/controllers.module";
import resultValidator from '../middlewares/validation.MW';
import auth from "../middlewares/auth.MW";
import { hashPassword } from "../middlewares/hashPassword.MW";
import {
  postEmployeeValidator,
  putEmployeeValidator,
  idEmployeeValidator,
} from "./../middlewares/employee.MW";
import {
  allAuth,
  adminAndDoctorAuth,
  adminAuth,
} from "./../middlewares/authorization.MW";

const employeeRoute = express.Router();

// employeeRoute.use(auth);

employeeRoute
  .route("/")
  .get(
    // allAuth,
    employeeController.getAllEmployees)
  .post(
    // adminAndDoctorAuth,
    postEmployeeValidator,
    resultValidator,
    hashPassword,
    employeeController.createEmployee
  )
  .put(
    // adminAndDoctorAuth,
    putEmployeeValidator,
    resultValidator,
    employeeController.updateEmployee
  );

employeeRoute
  .route("/:id")
  .all(idEmployeeValidator, resultValidator)
  .get(
    // allAuth,
    employeeController.getEmployeeById)
  .delete(
    // adminAuth,
    employeeController.deleteEmployee);

export default employeeRoute;