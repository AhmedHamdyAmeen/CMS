import mongoose, { Document } from "mongoose";

import ILocation from "./location.interface";

export default interface IClinic extends Document {
  _id: mongoose.Types.ObjectId;
  employees: [mongoose.Types.ObjectId];
  doctors: [mongoose.Types.ObjectId];
  clinicService: [mongoose.Types.ObjectId];
  phoneNumber: String;
  location: ILocation;
}
