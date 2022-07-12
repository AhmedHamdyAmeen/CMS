import mongoose, { Date, Types, Schema } from "mongoose";
import medicinesSchema from "./medicines.model";

function itemsLimit(items: Array<Number>) {
  return items.length >= 1;
}

interface IPrescription {
  _id: Types.ObjectId;
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  medicines: Array<Object>;
  date: Date;
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
