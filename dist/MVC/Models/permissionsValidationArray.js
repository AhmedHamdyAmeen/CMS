"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
module.exports = [
    (0, express_validator_1.check)('_id', '_id is required'),
    (0, express_validator_1.check)('tradeName', 'tradeName must be Characters').isAlpha(),
    (0, express_validator_1.check)('scientificName', 'scientificName must be Characters').isAlpha(),
    (0, express_validator_1.check)('type', 'type is required').isAlpha(),
    (0, express_validator_1.check)('cost', 'cost must be a Number').isNumeric()
];
