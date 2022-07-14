import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

export let post = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("fullName")
    .notEmpty()
    .withMessage("doctor fullName is required")
    .isString()
    .withMessage("doctor fullName should be string"),
  check("department")
    .notEmpty()
    .withMessage("doctor department is required")
    .isString()
    .withMessage("doctor department should be string")
    .isIn([
      "Dermatology",
      "Pathology",
      "Neorolgy",
      "Oncology",
      "ENT",
      "Radiology",
      "Dentistry",
      "Ophthalmology",
    ]).withMessage(`doctor department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology")`),
  check("email")
    .notEmpty()
    .withMessage("doctor email is required")
    .isEmail()
    .withMessage("doctor email should be email"),
  check("password")
    .notEmpty()
    .withMessage("doctor password is required")
    .isString()
    .withMessage("doctor password should be string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
    )
    .withMessage(
      "doctor password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  check("phoneNumber")
    .isNumeric()
    .optional()
    .withMessage("doctor phoneNumber should be number")
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) //🔴rania
    .withMessage("doctor phone number should be valid"),
  check("image")
    .isString()
    .optional()
    .withMessage("doctor image should be string"),
  check("gender")
    .isIn(["Male", "Female"])
    .optional()
    .withMessage(`doctor gender should be either "Male" or "Female"`),
];

export let put = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("id")
    .notEmpty()
    .withMessage("prescription id is required")
    .isMongoId()
    .withMessage("prescription id should be objectId"),
  check("fullName")
    .isString()
    .optional()
    .withMessage("doctor fullName should be string"),
  check("department")
    .isString()
    .optional()
    .withMessage("doctor department should be string")
    .isIn([
      "Dermatology",
      "Pathology",
      "Neorolgy",
      "Oncology",
      "ENT",
      "Radiology",
      "Dentistry",
      "Ophthalmology",
    ]).withMessage(`doctor department should be in ("Dermatology",
    "Pathology",
    "Neorolgy",
    "Oncology",
    "ENT",
    "Radiology",
    "Dentistry",
    "Ophthalmology",)`),
  check("phoneNumber")
    .isNumeric()
    .optional()
    .withMessage("doctor phoneNumber should be number")
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) //🔴rania
    .withMessage("doctor phone number should be valid"),
  check("image")
    .isString()
    .optional()
    .withMessage("doctor image should be string"),
  check("gender")
    .isIn(["Male", "Female"])
    .optional()
    .withMessage(`doctor gender should be either "Male" or "Female"`),
];

export let getDelete = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("id")
    .notEmpty()
    .withMessage("doctor id is required")
    .isMongoId()
    .withMessage("doctor id should be mongoId"),
];

export let login = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("email")
    .notEmpty()
    .withMessage("doctor email is required")
    .isEmail()
    .withMessage("doctor email should be valid email"),
  check("password")
    .notEmpty()
    .withMessage("doctor password is required")
    .isString()
    .withMessage("doctor password should be string"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
  // )
  // .withMessage(
  //   "doctor password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  // ),
];
