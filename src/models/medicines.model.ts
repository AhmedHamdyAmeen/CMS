import mongoose, { Schema, model, Types } from "mongoose";

interface IMedicines {
  _id: Types.ObjectId;
  tradeName: String;
  scientificName: String;
  type: String;
  cost: Number;
}

const medicinesSchema = new Schema<IMedicines>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tradeName: { type: String, required: true },
  scientificName: { type: String },
  type: { type: String },
  cost: { type: Number, required: true },
});

const Medicines = model<IMedicines>("Medicines", medicinesSchema);

export default Medicines;
