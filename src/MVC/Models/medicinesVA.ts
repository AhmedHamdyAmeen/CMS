import { body, param, query } from "express-validator";

export default [
  body("medicines.*.tradeName")
    .isString()
    .withMessage("tradeName must be a String"),

  body("medicines.*.scientificName")
    .isString()
    .withMessage("scientificName must be a String"),

  body("medicines.*.type")
  .isString()
  .withMessage("type must be a String"),

  body("medicines.*.cost").isNumeric().withMessage("cost must be a Number"),
];
