const { check } = require("express-validator");

export const postEmployeeValidator = [
  //id
  check("id").optional().isMongoId().withMessage("invalid employee id"),
  //fullName
  check("fullName")
    .notEmpty()
    .withMessage("employee fullName required")
    .isString()
    .withMessage("employee fullName must be characters only"),
  //email
  check("email")
    .notEmpty()
    .withMessage("employee email required")
    .isEmail()
    .withMessage("invalid employee email"),
  //password
  check("password")
    .notEmpty()
    .withMessage("employee password required")
    .isLength({ min: 8, max: 15 })
    .withMessage("employee password must be 8~15"),
  //phoneNumber
  check("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("employee phoneNumber reqiured")
    .isLength({ min: 11, max: 11 })
    .withMessage("invalid employee phoneNumber"),
  //address
  check("address")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee address can't exceed 25 characters"),
  //city
  check("city")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee city can't exceed 25 characters"),
  //clinic
  check("clinic").isMongoId().withMessage("employee clinic must be a valid ID"),
];

export const putEmployeeValidator = [
  //fullName
  check("fullName")
    .optional()
    .notEmpty()
    .withMessage("employee fullName required")
    .isString()
    .withMessage("employee fullName must be characters only"),
  //email
  check("email")
    .optional()
    .notEmpty()
    .withMessage("employee email required")
    .isEmail()
    .withMessage("invalid employee email"),
  //phoneNumber
  check("phoneNumber")
    .optional()
    .notEmpty()
    .withMessage("employee phoneNumber reqiured")
    .isLength({ min: 11, max: 11 })
    .withMessage("invalid employee phoneNumber"),
  //address
  check("address")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee address can't exceed 25 characters"),
  //city
  check("city")
    .optional()
    .isLength({ max: 25 })
    .withMessage("employee city can't exceed 25 characters")
];

export const loginValidator = [
  //email
  check("email")
    .notEmpty()
    .withMessage("employee email required")
    .isEmail()
    .withMessage("invalid employee email"),
  //password
  check("password")
    .notEmpty()
    .withMessage("employee password required"),
];