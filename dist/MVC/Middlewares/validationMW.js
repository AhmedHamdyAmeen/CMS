"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = (request, response, next) => {
    let result = (0, express_validator_1.validationResult)(request);
    if (!result.isEmpty()) {
        let errorMessages = result.errors.reduce((current, error) => ` ${current} ${current == "" ? "" : "&"} ${error.msg} `, "");
        let error = new Error(errorMessages);
        error.status = 422; // 422 => input validation error
        throw error;
    }
    else {
        next();
    }
};
