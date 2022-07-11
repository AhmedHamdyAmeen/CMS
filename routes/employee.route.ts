import express from "express";
import { employeeController } from "../controllers/controllers.module";

export const employeeRoute = express.Router();

employeeRoute
  .route("/employees")
  .get(employeeController.getAllEmployees)
  .post(
    [
      //name
      // body("fullName").isAlpha().withMessage("Employee's firstname should be characters")
      // .isLength({min:3}).withMessage("Employee firstname lenghth should be > 3"),
      // body("email").isEmail().withMessage("Employee's email invalid"),
      // body("password").isLength({min:4}).withMessage("Employee's password should be > 4"),
      // body("profileImage").optional({ checkFalsy: true, nullable: true })
      // .isAlpha().withMessage("Employee's profile image invalid"),
      // body("phoneNumber").optional({ checkFalsy: true, nullable: true })
      // .isLength({min:11}).withMessage("Employee's phone number invalid"),
    ],
    // resultValidator,
    employeeController.createEmployee
  )
  .put(
    [],
    // resultValidator,
    employeeController.updateEmployee
  );

employeeRoute
  .route("/employees/:id")
  .all(
    [
      // param("id").isMongoId().withMessage("Employee id wrong")
    ]
    // resultValidator
  )
  .get(employeeController.getEmployeeById)
  .delete(employeeController.deleteEmployee);
