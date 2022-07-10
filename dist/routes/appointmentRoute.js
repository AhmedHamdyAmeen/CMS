"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const appointmentsController_1 = require("../controllers/appointmentsController");
exports.appointmentRoute = (0, express_1.Router)();
exports.appointmentRoute.route("/appointments")
    .get(appointmentsController_1.appointmentController.getAllAppointments)
    .post([
    //name
    (0, express_validator_1.body)("date").isAlpha().withMessage("appointment's date should be a date"),
    (0, express_validator_1.body)("doctor").isEmail().withMessage("appointment's email invalid"),
    (0, express_validator_1.body)("password").isLength({ min: 4 }).withMessage("appointment's password should be > 4"),
    (0, express_validator_1.body)("secondEmail").optional({ checkFalsy: true, nullable: true })
        .isEmail().withMessage("appointment's second email invalid"),
    (0, express_validator_1.body)("phone").optional({ checkFalsy: true, nullable: true })
        .isLength({ min: 11 }).withMessage("children number must be > 2"),
], 
// resultValidator,
appointmentsController_1.appointmentController.addAppointment)
    .put([], 
// resultValidator,
appointmentsController_1.appointmentController.updateAppointment);
exports.appointmentRoute.route("/appointments/:id")
    .delete([
// param("id").isMongoId().withMessage("appointment id wrong")
], 
// validationMW.validate,
appointmentsController_1.appointmentController.deleteAppointment);
