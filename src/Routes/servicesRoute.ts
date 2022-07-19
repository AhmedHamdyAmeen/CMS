import { Router } from "express";


import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/authorization.MW";
import { servicesController } from "../controllers/controllers.module";

import { authMW } from "../middlewares/authMW";

const router = Router();

router.use(authMW);

router.route("/services") 
.get(authMW, servicesController.getAllService)
.post(authMW,adminAuth,servicesController.createService)

router
  .route("services/:id")
  .put(authMW,adminAuth,servicesController.updateService)
  .delete(authMW,adminAuth,servicesController.deleteService)
  

export default router;