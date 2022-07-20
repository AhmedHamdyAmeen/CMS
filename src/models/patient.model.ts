import mongoose from "mongoose";
import { Schema } from "mongoose";

import { locationSchema } from "./location.model";
import IPatient, { EGender } from "../interfaces/patient.interface";
import { validatePhoneNumber, validateFullName } from "./../helpers/functions";

const patientSchema = new Schema<IPatient>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    validate: [validateFullName, "Please fill a valid fullName"],
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: EGender,
  },
  location: locationSchema,
  phoneNumber: {
    type: String,
    validate: [validatePhoneNumber, "Please fill a valid phone number"],
  },
  services: { type: [Schema.Types.ObjectId] },
  appointments: { type: [Schema.Types.ObjectId] },
  notes: { type: String },
});

export default mongoose.model<IPatient>("patients", patientSchema);
