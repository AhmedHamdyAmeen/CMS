import { Router } from "express";


import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/userAccess.MW";
import { invoicesController } from "../controllers/controllers.module";
import{bodyValidator ,ParamValidator,postValidator,putValidator } from "../middlewares/invoices.MW"

import auth  from "../middlewares/auth.MW";

const router = Router();

// router.use(auth);

router.route("/invoices")
.get(invoicesController.getAllInvoices)
.post(bodyValidator,postValidator,invoicesController.createInvoices)

router
  .route("/invoices/:id")
  .put( ParamValidator,putValidator,invoicesController.updateInvoices)
  .get( ParamValidator,invoicesController.getoneInvoices)
  .delete( bodyValidator,invoicesController.deleteInvoice)

  

export default router;