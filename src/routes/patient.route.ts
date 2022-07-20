import { Router } from "express";

import { post, put, getDelete, addServices } from "../middlewares/patient.MW";
import { patientController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(post, resultValidator, patientController.createPatient) //employee
  .get(patientController.getAllPatients); //employee

router
  .route("/:id")
  .all(getDelete, resultValidator)
  .put(put, resultValidator, patientController.updatePatient) //employee
  .get(patientController.getPatient) //employee & doctor (his own patient)
  .delete(patientController.deletePatient); //??

router
  .route("/:id/addService")
  .put(
    getDelete,
    addServices,
    resultValidator,
    patientController.addServicePatient
  );

export default router;
