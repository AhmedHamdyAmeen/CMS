import { Router } from "express";

import {
  put,
  getDelete,
} from "../middlewares/doctor.MW";
import { doctorController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router.route("/").get(doctorController.getAllDoctors); //employee&admin

router
  .route("/:id")
  .put(put, resultValidator, doctorController.updateDoctor) //doctor & admin
  .all(getDelete, resultValidator)
  .get(doctorController.getDoctor) //all users
  .delete(doctorController.deleteDoctor); //admin

export default router;
