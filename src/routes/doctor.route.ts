import { Router } from "express";

import { post, put, getDelete, login } from "../middlewares/doctor.MW";
import { doctorController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/auth.MW";

const router = Router();

router
  .route("/login")
  .post(login, resultValidator, doctorController.loginDoctor);

router.route("/signUp").post(post, resultValidator, doctorController.signUp);

router.use(auth);

router.route("/").get(doctorController.getAllDoctors); //reseptionist

router
  .route("/:id")
  .put(put, resultValidator, doctorController.updateDoctor) //doctor
  .all(getDelete, resultValidator)
  .get(doctorController.getDoctor) //all users
  .delete(doctorController.deleteDoctor); //??

export default router;
