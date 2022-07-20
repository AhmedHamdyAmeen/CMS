import { Router } from "express";


import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/authorization.MW";
import { invoicesController } from "../controllers/controllers.module";
import{bodyValidator ,ParamValidator,postValidator,putValidator } from "../middlewares/invoicesValidation.MW"

import { authMW } from "../middlewares/authMW";

const router = Router();

// router.use(authMW);

router.route("/invoices")
.get(invoicesController.getAllInvoices)
.post(bodyValidator,postValidator,invoicesController.createInvoices)

router
  .route("/invoices/:id")
  .put( ParamValidator,putValidator,invoicesController.updateInvoices)
  .get( ParamValidator,invoicesController.getoneInvoices)
  .delete( bodyValidator,invoicesController.deleteInvoice)

  

export default router;