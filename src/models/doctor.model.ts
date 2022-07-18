import mongoose from "mongoose";
import { Types, Schema } from "mongoose";

import IDoctor, { EDepartment, EGender } from "../interfaces/doctor.interface";
import { locationSchema } from "./location.model";

let validateEmail = function (email: string) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

/****** 🟢rania ******/
let validatePhoneNumber = function (phoneNumber: string) {
  let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //one form of phonenumber (-)
  return regex.test(phoneNumber);
};

const doctorSchema = new Schema<IDoctor>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  clinics: { type: [Schema.Types.ObjectId], required: true },
  department: {
    type: String,
    enum: EDepartment,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: [validatePhoneNumber, "Please fill a valid phone number"],
  },
  address: locationSchema,
  gender: {
    type: String,
    enum: EGender,
  },
  appointments: { type: [Schema.Types.ObjectId] },
  role: { type: String, default: "doctor" },
  resetLink: { type: String, default: "" },
});

export default mongoose.model<IDoctor>("doctors", doctorSchema);
