import { Router } from "express";

import { post, put, getDelete } from "../middlewares/prescription.MW";
import { prescriptionController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(post, resultValidator, prescriptionController.createPrescription) //doctor
  .get(prescriptionController.getAllPrescriptions); //receptionist

router
  .route("/:id")
  .put(put, resultValidator, prescriptionController.updatePrescription) //??
  .all(getDelete, resultValidator)
  .get(prescriptionController.getPrescription) //??
  .delete(prescriptionController.deletePrescription); //??

export default router;
