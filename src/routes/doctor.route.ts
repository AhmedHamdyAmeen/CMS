import { Router } from "express";

import {
  post,
  put,
  getDelete,
  login,
  forgotPassword,
  resetPassword,
} from "../middlewares/doctor.MW";
import { doctorController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/auth.MW";

const router = Router();

router
  .route("/login")
  .post(login, resultValidator, doctorController.loginDoctor);

router.route("/signUp").post(post, resultValidator, doctorController.signUp);

router
  .route("/forgotPassword")
  .post(forgotPassword, resultValidator, doctorController.forgotPassword);

router
  .route("/resetPassword/:token")
  .post(resetPassword, resultValidator, doctorController.resetPassword);

router.use(auth);

router
  .route("/:id/changePassword")
  .post(getDelete, resultValidator, doctorController.changePassword); //doctor

router
  .route("/:id/adminDoctor")
  .get(getDelete, resultValidator, doctorController.adminDoctor); //admin

router.route("/").get(doctorController.getAllDoctors); //employee&admin

router
  .route("/:id")
  .put(put, resultValidator, doctorController.updateDoctor) //doctor & admin
  .all(getDelete, resultValidator)
  .get(doctorController.getDoctor) //all users
  .delete(doctorController.deleteDoctor); //admin

export default router;
