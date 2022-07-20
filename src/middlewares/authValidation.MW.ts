import { check } from "express-validator";
import { Request, Response, NextFunction } from "express";

import { passwordRegex } from "./../helpers/regex";

export let forgotPassword = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("email")
    .notEmpty()
    .withMessage("doctor email is required")
    .isEmail()
    .withMessage("doctor email should be valid email"),
];

export let resetPassword = [
  (request: Request, response: Response, next: NextFunction) => {
    console.log("validationMW");
    next();
  },
  check("token")
    .notEmpty()
    .withMessage("doctor token is required")
    .isString()
    .withMessage("doctor token should be string"),

  check("newPassword")
    .notEmpty()
    .withMessage("doctor newPassword is required")
    .isString()
    .withMessage("doctor newPassword should be string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/
    )
    .withMessage(
      "doctor newPassword should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export let login = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email should be valid email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .matches(passwordRegex)
    .withMessage(
      "password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export const oldPassword = [
  check("oldPassword")
    .notEmpty()
    .withMessage("password is required")
    .matches(passwordRegex)
    .withMessage(
      "password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];
