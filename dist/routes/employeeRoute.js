"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoute = void 0;
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
exports.employeeRoute = (0, express_1.Router)();
exports.employeeRoute.route("/employees")
    .get(employeeController_1.employeeController.getAllEmployees)
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
employeeController_1.employeeController.addEmployee)
    .put([], 
// resultValidator,
employeeController_1.employeeController.updateEmployee);
exports.employeeRoute.route("/employees/:id")
    .delete([
// param("id").isMongoId().withMessage("Employee id wrong")
], 
// validationMW.validate,
employeeController_1.employeeController.deleteEmployee);
