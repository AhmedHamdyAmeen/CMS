import express,{ Request, Response, NextFunction, Router } from 'express';
import { body, param } from "express-validator";

import { employeeController } from "../controllers/employeeController";
import resultValidator from "../middlewares/validationMW";

export const employeeRoute = Router();

employeeRoute.route("/employees")
    .get(employeeController.getAllEmployees)
    .post([
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
    employeeController.addEmployee)
    .put([
    ],
    // resultValidator,
    employeeController.updateEmployee);

employeeRoute.route("/employees/:id")
    .delete([
        // param("id").isMongoId().withMessage("Employee id wrong")
    ],
    // validationMW.validate,
    employeeController.deleteEmployee);