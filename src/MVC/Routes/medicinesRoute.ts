import { Router } from "express";

import { medicineController } from "./../Controllers/controllers.module";

import validationMW from "./../Middlewares/validationMW";
import medicinesVA from "./../Models/medicinesVA";

const router = Router();

router
  .route("/medicines")
  .get(medicineController.getMedicines)
  .post(medicinesVA, validationMW, medicineController.addMedicines)
  .put(medicinesVA, validationMW, medicineController.updateMedicines);

router
  .route("/medicine/:id?")
  .get(medicineController.getMedicine)
  // .post(medicinesVA, validationMW, addMedicine)
  .put(medicinesVA, validationMW, medicineController.updateMedicine)
  .delete(medicineController.deleteMedicine);

router.post(
  "/medicine",
  medicinesVA,
  validationMW,
  medicineController.addMedicine
);

export default router;
