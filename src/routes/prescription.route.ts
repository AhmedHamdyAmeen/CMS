import { Router } from "express";

import { post, put, getDelete } from "../middlewares/prescription.MW";
import { prescriptionController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(post, resultValidator, prescriptionController.createPrescription) //doctor
  .get(prescriptionController.getAllPrescriptions); //employee

router
  .route("/:id")
  .put(put, resultValidator, prescriptionController.updatePrescription) //doctor (his own prescription)
  .all(getDelete, resultValidator)
  .get(prescriptionController.getPrescription) //employee & doctor (his own prescription)
  .delete(prescriptionController.deletePrescription); //doctor (his own prescription)

export default router;
