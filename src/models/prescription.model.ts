import mongoose, { Date, Types, Schema } from "mongoose";
import medicinesSchema from "./medicines.model";

import IPrescription from "../interfaces/prescription.interface";

function itemsLimit(items: Array<Number>) {
  return items.length >= 1;
}

const prescriptionSchema = new Schema<IPrescription>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "doctors",
  },
  patient: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "patients",
  },
  medicines: {
    type: [medicinesSchema],
    required: true,
    validate: [itemsLimit, "medicines should have at least 1 item"],
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IPrescription>(
  "prescriptions",
  prescriptionSchema
);
