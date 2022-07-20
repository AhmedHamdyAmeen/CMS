import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let post = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .optional()
    .isString()
    .withMessage("patient fullName should be string"),
  check("age")
    .optional()
    .isNumeric()
    .withMessage("patient age should be number"),
  check("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("patient gender should be either 'Male' or 'Female' "),
  check("address")
    .optional()
    .isString()
    .withMessage("patient address should be string"),
  check("city")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
  check("phoneNumber")
    .isNumeric()
    .optional()
    .withMessage("patient phoneNumber should be number")
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) //🟢rania
    .withMessage("patient phone number should be valid"),
  check("notes")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
];

export let put = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .optional()
    .isString()
    .withMessage("patient fullName should be string"),
  check("age")
    .optional()
    .isNumeric()
    .withMessage("patient age should be number"),
  check("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("patient gender should be either 'Male' or 'Female' "),
  check("address")
    .optional()
    .isString()
    .withMessage("patient address should be string"),
  check("city")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
  check("phoneNumber")
    .isNumeric()
    .optional()
    .withMessage("patient phoneNumber should be number")
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) //🔴rania
    .withMessage("patient phone number should be valid"),
  check("notes")
    .optional()
    .isString()
    .withMessage("patient city should be string"),
];
export let idValidator = [
  check("id")
    .notEmpty()
    .withMessage("patient id is required")
    .isMongoId()
    .withMessage("patient id should be objectId"),
];

export let addServices = [
  check("services")
    .notEmpty()
    .withMessage("patient services is required")
    .isArray({ min: 1 })
    .withMessage("patient services should be array & min 1 service"),
];

export let removeServices = [
  check("service")
    .notEmpty()
    .withMessage("patient service is required")
    .isMongoId()
    .withMessage("invalid service value"),
];
