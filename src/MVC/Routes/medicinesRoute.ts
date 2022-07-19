import { Router } from "express";

import {
  getMedicines,
  getMedicine,
  addMedicines,
  addMedicine,
  updateMedicine,
  updateMedicines,
  deleteMedicine,
} from "./../Controllers/medicinesController";

import validationMW from "./../Middlewares/validationMW";
import medicinesVA from "./../Models/medicinesVA";

const router = Router();

router
  .route("/medicines")
  .get(getMedicines)
  .post(medicinesVA, validationMW, addMedicines)
  .put(medicinesVA, validationMW, updateMedicines);

router
  .route("/medicine/:id?")
  .get(getMedicine)
  // .post(medicinesVA, validationMW, addMedicine)
  .put(medicinesVA, validationMW, updateMedicine)
  .delete(deleteMedicine);

router.post("/medicine", medicinesVA, validationMW, addMedicine);

export default router;
