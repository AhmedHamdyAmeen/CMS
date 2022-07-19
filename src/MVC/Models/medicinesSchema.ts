import mongoose, { Schema, model, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IMedicines {
  _id: Types.ObjectId;
  tradeName: String;
  scientificName: String;
  type: String;
  cost: Number;
}

// 2. Create a Schema corresponding to the document interface.
const medicinesSchema = new Schema<IMedicines>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tradeName: { type: String, required: true },
  scientificName: { type: String },
  type: { type: Schema.Types.ObjectId, ref: "ClinicServices " },
  cost: { type: Number, required: true },
});

// 3. Create a Model.
const Medicines = model<IMedicines>("Medicines", medicinesSchema);

export default Medicines;
