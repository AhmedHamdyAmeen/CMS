import { body, param, query } from "express-validator";

export default [
  body("medicines.*.tradeName")
    .isString()
    .withMessage("tradeName must be a String"),

  body("medicines.*.scientificName")
    .isString()
    .withMessage("scientificName must be a String"),

  body("medicines.*.type")
    .isMongoId()
    .withMessage("type must be a Mongoose ObjectId"),

  body("medicines.*.cost").isNumeric().withMessage("cost must be a Number"),
];
