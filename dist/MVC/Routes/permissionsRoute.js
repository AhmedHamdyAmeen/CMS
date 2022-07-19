"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
// const validationMW = require("./../Middlewares/validationMW");
// const clintValidationArray = require("./../Models/medicinesValidationArray");
const router = express_1.default.Router();
router.route("/permission").get().post().put();
router
    .route("/permission/:id")
    .all([(0, express_validator_1.param)("id").isNumeric().withMessage("Id isn't correct")])
    .get()
    .delete();
exports.default = router;
