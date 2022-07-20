import { Router } from "express";

import { appointmentController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";
import {
  adminAndEmployeeAuth,
  adminAuth,
  allAuth,
  adminAndDoctorAuth,
} from "./../middlewares/authorization.MW";
import {
  postAppointmentValidator,
  putAppointmentValidator,
  idAppointmentValidator,
} from "../middlewares/appointment.MW";

const appointmentRoute = Router();

// appointmentRoute.use(auth);
appointmentRoute
  .route("/")
  .get(
    // adminAndEmployeeAuth,
    appointmentController.getAllAppointments)
  .post(
    // adminAndEmployeeAuth,
    postAppointmentValidator,
    resultValidator,
    appointmentController.createAppointment
  )
  .put(
    // adminAndEmployeeAuth,
    putAppointmentValidator,
    resultValidator,
    appointmentController.updateAppointment
  );

appointmentRoute.route("/doctor/:id").get(
  // adminAndEmployeeAuth,
  idAppointmentValidator,
  resultValidator,
  appointmentController.getAppointmentByDoctor
);

appointmentRoute.route("/employee/:id").get(
  // adminAndDoctorAuth,
  idAppointmentValidator,
  resultValidator,
  appointmentController.getAppointmentByEmployee
);

appointmentRoute
  .route("/:id")
  .all(idAppointmentValidator, resultValidator)
  .get(
    // allAuth,
    appointmentController.getAppointmentById)
  .delete(
    // adminAuth,
    appointmentController.deleteAppointment);

export default appointmentRoute;