import { Router } from "express";


import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/authorization.MW";
import { invoicesController } from "../controllers/controllers.module";

import { authMW } from "../middlewares/authMW";

const router = Router();

router.use(authMW);

router.route("/invoices")
.get(authMW, invoicesController.getAllInvoices)
.post(authMW,invoicesController.getoneInvoices)

router
  .route("invoices/:id")
  .put(authMW,adminAuth,invoicesController.updateInvoices)
  .delete(authMW,adminAuth,invoicesController.deleteInvoice)
  

export default router;