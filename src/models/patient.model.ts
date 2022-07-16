import mongoose from "mongoose";
import { Schema } from "mongoose";

import { locationSchema } from "./location.model";
import IPatient, { EGender } from "../interfaces/patient.interface";

/****** 🟢rania ******/
let validatePhoneNumber = function (phoneNumber: string) {
  let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //one form of phonenumber (-)
  return regex.test(phoneNumber);
};

const patientSchema = new Schema<IPatient>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
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
