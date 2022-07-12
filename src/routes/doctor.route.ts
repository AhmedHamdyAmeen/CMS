import { Router } from "express";

import { post, put, getDelete } from "../middlewares/doctor.MW";
import {
  createDoctor,
  updateDoctor,
  getDoctor,
  getAllDoctors,
  deleteDoctor,
} from "../controllers/doctor.controller";
import resultValidator from "../middlewares/validation.MW";

const router = Router();

router.route("/").post(post, resultValidator, createDoctor).get(getAllDoctors);

router
  .route("/:id")
  .put(put, resultValidator, updateDoctor)
  .all(getDelete, resultValidator)
  .get(getDoctor)
  .delete(deleteDoctor);

export default router;
