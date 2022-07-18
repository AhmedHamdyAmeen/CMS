import { Router } from "express";

import {
  post,
  put,
  idValidator,
  addServices,
  removeServices,
} from "../middlewares/patient.MW";
import { patientController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/authentication.MW";
import {
  doctorAndEmployeeAuth,
  adminAuth,
  adminAndEmployeeAuth,
} from "../middlewares/authorization.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(
    adminAndEmployeeAuth,
    post,
    resultValidator,
    patientController.createPatient
  )
  .get(adminAndEmployeeAuth, patientController.getAllPatients);

router
  .route("/:id")
  .all(idValidator, resultValidator)
  .put(
    adminAndEmployeeAuth,
    put,
    resultValidator,
    patientController.updatePatient
  )
  .get(doctorAndEmployeeAuth, patientController.getPatient)
  .delete(adminAuth, patientController.deletePatient);

router
  .route("/:id/addService")
  .put(
    adminAndEmployeeAuth,
    idValidator,
    addServices,
    resultValidator,
    patientController.addServicePatient
  );

router
  .route("/:id/addService")
  .put(
    adminAndEmployeeAuth,
    idValidator,
    removeServices,
    resultValidator,
    patientController.removeServicePatient
  );

export default router;
