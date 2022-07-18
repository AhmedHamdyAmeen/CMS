import express, { Request, Response, NextFunction, Router } from "express";
import { param } from "express-validator";

import { appointmentController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { postAppointmentValidator, putAppointmentValidator } from "../middlewares/appointment.MW";

export const appointmentRoute = Router();

appointmentRoute
  .route("/appointments")
  .get(appointmentController.getAllAppointments)
  .post(
    postAppointmentValidator,
    resultValidator,
    appointmentController.createAppointment
  )
  .put(
    putAppointmentValidator,
    resultValidator,
    appointmentController.updateAppointment
  );

appointmentRoute
  .route("/appointments/:id")
  .all(
    [param("id").isMongoId().withMessage("invalid appointment id")],
    resultValidator,
  )
  .get(appointmentController.getAppointmentById)
  .delete(appointmentController.deleteAppointment);
