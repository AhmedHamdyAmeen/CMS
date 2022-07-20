"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_module_1 = require("./../Controllers/controllers.module");
const validationMW_1 = __importDefault(require("./../Middlewares/validationMW"));
const medicinesVA_1 = __importDefault(require("./../Models/medicinesVA"));
const router = (0, express_1.Router)();
router
    .route("/medicines")
    .get(controllers_module_1.medicineController.getMedicines)
    .post(medicinesVA_1.default, validationMW_1.default, controllers_module_1.medicineController.addMedicines)
    .put(medicinesVA_1.default, validationMW_1.default, controllers_module_1.medicineController.updateMedicines);
router
    .route("/medicine/:id?")
    .get(controllers_module_1.medicineController.getMedicine)
    // .post(medicinesVA, validationMW, addMedicine)
    .put(medicinesVA_1.default, validationMW_1.default, controllers_module_1.medicineController.updateMedicine)
    .delete(controllers_module_1.medicineController.deleteMedicine);
router.post("/medicine", medicinesVA_1.default, validationMW_1.default, controllers_module_1.medicineController.addMedicine);
exports.default = router;
