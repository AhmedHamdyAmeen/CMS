const { check } = require("express-validator");

export const postAppointmentValidator = [
  //id
  check("id").optional().isMongoId().withMessage("invalid Appointment id"),
  //date
  check("date")
    .notEmpty()
    .withMessage("Appointment date required")
    .isDate()
    .withMessage("Appointment date must be in YYYY/MM/DD format"),
  //doctor
  check("doctor")
    .notEmpty()
    .withMessage("Appointment doctor required")
    .isMongoId()
    .withMessage("invalid Appointment doctor"),
  //patient
  check("patient")
    .notEmpty()
    .withMessage("Appointment patient required")
    .isMongoId()
    .withMessage("invalid Appointment patient"),
  //description
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Appointment description reqiured")
    .isLength({ max: 500 })
    .withMessage("Appointment description can not exceed 500 characters"),
  //clinic
  check("clinic")
    .isMongoId()
    .withMessage("Appointment clinic must be a valid ID"),
];

export const putAppointmentValidator = [
  //id
  check("id").optional().isMongoId().withMessage("invalid Appointment id"),
  //date
  check("date")
    .optional()
    .notEmpty()
    .withMessage("Appointment date required")
    .isDate()
    .withMessage("Appointment date must be in YYYY/MM/DD format"),
  //doctor
  check("doctor")
    .optional()
    .notEmpty()
    .withMessage("Appointment doctor required")
    .isMongoId()
    .withMessage("invalid Appointment doctor"),
  //patient
  check("patient")
    .optional()
    .notEmpty()
    .withMessage("Appointment patient required")
    .isMongoId()
    .withMessage("invalid Appointment patient"),
  //description
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Appointment description reqiured")
    .isLength({ max: 500 })
    .withMessage("Appointment description can not exceed 500 characters"),
  //clinic
  check("clinic")
    .optional()
    .isMongoId()
    .withMessage("Appointment clinic must be a valid ID"),
];
