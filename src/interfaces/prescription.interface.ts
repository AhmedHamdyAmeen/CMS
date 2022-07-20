import { Types, Schema } from "mongoose";

export default interface IPrescription {
  _id: Types.ObjectId;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  medicines: Array<Object>;
  date: Date;
}
