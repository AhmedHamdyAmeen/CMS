import mongoose from "mongoose";
import { Types, Schema } from "mongoose";

let validateEmail = function (email: string) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

/****** 🔴rania ******/
let validatePhoneNumber = function (phoneNumber: string) {
  let regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //one form of phonenumber (-)
  return regex.test(phoneNumber);
};

enum EGender {
  Male = "Male",
  Female = "Female",
}

enum EDepartment {
  Dermatology = "Dermatology",
  Pathology = "Pathology",
  Neorolgy = "Neorolgy",
  Oncology = "Oncology",
  ENT = "ENT",
  Radiology = "Radiology",
  Dentistry = "Dentistry",
  Ophthalmology = "Ophthalmology",
}

interface IDoctor {
  _id: Types.ObjectId;
  fullName: string;
  department: EDepartment;
  email: string;
  password: string;
  phoneNumber?: string;
  image?: string;
  gender?: EGender;
}

const doctorSchema = new Schema<IDoctor>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    unique: true,
    required: true,
  },
  department: {
    type: String,
    enum: EDepartment,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  image: {
    type: String,
  },
  gender: {
    type: String,
    enum: EGender,
  },
  //apiontment:[apointmentSchema]
  //patients:[patientSchema]
});

export default mongoose.model<IDoctor>("doctors", doctorSchema);
