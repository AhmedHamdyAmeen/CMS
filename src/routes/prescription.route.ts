import { adminAndEmployeeAuth } from "./../middlewares/authorization.MW";
import { Router } from "express";

import { post, put, idValidator } from "../middlewares/prescription.MW";
import { prescriptionController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/authentication.MW";
import {
  doctorAuth,
  adminAuth,
  allAuth,
} from "../middlewares/authorization.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(
    doctorAuth,
    post,
    resultValidator,
    prescriptionController.createPrescription
  )
  .get(adminAndEmployeeAuth, prescriptionController.getAllPrescriptions);

router
  .route("/:id")
  .put(
    doctorAuth,
    put,
    resultValidator,
    prescriptionController.updatePrescription
  )
  .all(idValidator, resultValidator)
  .get(allAuth, prescriptionController.getPrescription)
  .delete(adminAuth, prescriptionController.deletePrescription);

export default router;
