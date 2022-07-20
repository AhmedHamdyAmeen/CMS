"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
module.exports = [
    // Validations
    (0, express_validator_1.body)("role")
        .isIn(["admin", "doctor", "employee"])
        .withMessage("Role must be admin, doctor, or employee"),
    (0, express_validator_1.body)("operation").isString().withMessage("operation must be a string"),
    (0, express_validator_1.body)()
];
