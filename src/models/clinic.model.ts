import mongoose, { Schema } from "mongoose";

import IClinic from "../interfaces/clinic.interface";
import { locationSchema } from "./location.model";

const clinicSchema: Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  phoneNumber: {
    type: String,
    min: 11,
    max: 11,
  },
  //1:many parent ref rs
  employees: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "employees",
  },
  //many:many 2 way ref rs
  doctors: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: "doctors",
  },
  services: {
    type: [mongoose.Types.ObjectId],
    ref: "services",
  },
  //1:1 embedded relationships
  location: {
    type: locationSchema,
  },
});

//mapping
export default mongoose.model<IClinic>("clinics", clinicSchema);
