import express,{ Request, Response, NextFunction, Router } from 'express';
import { body, param } from "express-validator";

import { appointmentController } from "../controllers/appointmentsController";
import resultValidator from "../middlewares/validationMW";

export const appointmentRoute = Router();

appointmentRoute.route("/appointments")
    .get(appointmentController.getAllAppointments)
    .post([
        //name
        body("date").isAlpha().withMessage("appointment's date should be a date"),
        
        body("doctor").isEmail().withMessage("appointment's email invalid"),
        body("password").isLength({min:4}).withMessage("appointment's password should be > 4"),

        body("secondEmail").optional({ checkFalsy: true, nullable: true })
        .isEmail().withMessage("appointment's second email invalid"),
        
        body("phone").optional({ checkFalsy: true, nullable: true })
        .isLength({min:11}).withMessage("children number must be > 2"),
    ],
    // resultValidator,
    appointmentController.addAppointment)
    .put([
    ],
    // resultValidator,
    appointmentController.updateAppointment);

appointmentRoute.route("/appointments/:id")
    .delete([
        // param("id").isMongoId().withMessage("appointment id wrong")
    ],
    // validationMW.validate,
    appointmentController.deleteAppointment);