"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    (0, express_validator_1.body)("tradeName").isString().withMessage("tradeName must be a String"),
    (0, express_validator_1.body)("scientificName")
        .isString()
        .withMessage("scientificName must be a String"),
    (0, express_validator_1.body)("type").isMongoId().withMessage("type must be a Mongoose ObjectId"),
    (0, express_validator_1.body)("cost").isNumeric().withMessage("cost must be a Number"),
];
