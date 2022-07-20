import { Router } from "express";

import { post, idValidator } from "../middlewares/doctor.MW";
import { forgotPassword, resetPassword } from "../middlewares/doctor.MW";
import { login, oldPassword } from "../middlewares/authValidation.MW";
import { allAuth } from "../middlewares/userAccess.MW";
import { authController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth  from "../middlewares/auth.MW";

const router = Router();

router
  .route("/login/:userType")
  .post(login, resultValidator, authController.login);

router
  .route("/signUp/:userType")
  .post(post, resultValidator, authController.signUp);

router
  .route("/forgotPassword/:userType")
  .post(forgotPassword, resultValidator, authController.forgotPassword);

router
  .route("/resetPassword/:token")
  .post(resetPassword, resultValidator, authController.resetPassword);

router.use(auth);

router
  .route("/changePassword/:userType")
  .post(allAuth, login, oldPassword, resultValidator, authController.changePassword);

export default router;
