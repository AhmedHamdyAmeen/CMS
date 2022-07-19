import express from "express";
import { param } from "express-validator";

import {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from "./../Controllers/permissionsController";

// const validationMW = require("./../Middlewares/validationMW");
// const clintValidationArray = require("./../Models/medicinesValidationArray");

const router = express.Router();

router.route("/permission").get().post().put();

router
  .route("/permission/:id")
  .all([param("id").isNumeric().withMessage("Id isn't correct")])
  .get()
  .delete();

export default router;
