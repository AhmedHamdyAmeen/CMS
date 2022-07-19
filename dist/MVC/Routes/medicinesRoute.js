"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicinesController_1 = require("./../Controllers/medicinesController");
const validationMW_1 = __importDefault(require("./../Middlewares/validationMW"));
const medicinesVA_1 = __importDefault(require("./../Models/medicinesVA"));
const router = (0, express_1.Router)();
router
    .route("/medicines") //
    .get(medicinesController_1.getMedicines)
    .post(medicinesVA_1.default, validationMW_1.default, medicinesController_1.addMedicines)
    .put(medicinesVA_1.default, validationMW_1.default, medicinesController_1.updateMedicines);
router
    .route("/medicine/:id?")
    .get(medicinesController_1.getMedicine)
    .post(medicinesVA_1.default, validationMW_1.default, medicinesController_1.addMedicine)
    .put(medicinesVA_1.default, validationMW_1.default, medicinesController_1.updateMedicine)
    .delete(medicinesController_1.deleteMedicine);
exports.default = router;
