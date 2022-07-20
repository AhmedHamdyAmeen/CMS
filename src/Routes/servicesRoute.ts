import { Router } from "express";
import{bodyValidator ,ParamValidator,postValidator,putValidator } from "../middlewares/serviceValidation.MW"


// import {
//   adminAuth,
//   adminAndDoctorAuth,
//   allAuth,
// } from "../middlewares/authorization.MW";
import { servicesController } from "../controllers/controllers.module";

// import { authMW } from "../middlewares/authMW";

const router = Router();

// router.use(authMW);

router.route("/services") 
.get(servicesController.getAllService)
.post(bodyValidator,postValidator,servicesController.createService)

router
  .route("/services/:id")
  .put(ParamValidator,putValidator,servicesController.updateService)
  .get(ParamValidator, servicesController.getServiceById)
  .delete(bodyValidator,servicesController.deleteService)

  

export default router;