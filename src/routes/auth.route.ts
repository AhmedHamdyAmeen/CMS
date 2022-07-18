import { Router } from "express";

import { post, idValidator } from "../middlewares/doctor.MW";
import { login, forgotPassword, resetPassword } from "../middlewares/doctor.MW";
import { doctorAuth } from "../middlewares/authorization.MW";
import { authController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/authentication.MW";

const router = Router();

router
  .route("/login/:userType")
  .post(login, resultValidator, authController.login);

router.route("/signUp").post(post, resultValidator, authController.signUp);

router
  .route("/forgotPassword")
  .post(forgotPassword, resultValidator, authController.forgotPassword);

router
  .route("/resetPassword/:token")
  .post(resetPassword, resultValidator, authController.resetPassword);

router.use(auth);

router
  .route("/:id/changePassword")
  .post(
    idValidator,
    resultValidator,
    doctorAuth,
    authController.changePassword
  );

export default router;
