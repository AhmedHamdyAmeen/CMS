import { Router } from "express";

import { idValidator } from "../middlewares/doctor.MW";
import { adminAuth } from "../middlewares/authorization.MW";
import { toggleRoleController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import { auth } from "../middlewares/authentication.MW";

const router = Router();

router.use(auth, adminAuth, idValidator, resultValidator);

router.route("/toggleDoctorRole").get(toggleRoleController.toggleDoctorRole);

router
  .route("/toggleEmployeeRole")
  .get(toggleRoleController.toggleEmployeeRole);

export default router;
