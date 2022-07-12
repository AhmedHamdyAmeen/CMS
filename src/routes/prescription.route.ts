import { Router } from "express";

import { post, put, getDelete } from "../middlewares/prescription.MW";
import {
  createPrescription,
  updatePrescription,
  getPrescription,
  getAllPrescriptions,
  deletePrescription,
} from "../controllers/prescription.controller";
import resultValidator from "../middlewares/validation.MW";

const router = Router();

router
  .route("/")
  .post(post, resultValidator, createPrescription) //doctor
  .get(getAllPrescriptions);

router
  .route("/:id")
  .put(put, resultValidator, updatePrescription) //doctor
  .all(getDelete, resultValidator)
  .get(getPrescription)
  .delete(deletePrescription); //doctor

export default router;
