import mongoose, { Types, Schema } from "mongoose";

interface IMedicines {
  medicine: Types.ObjectId;
  frequency: string;
}

const medicinesSchema = new mongoose.Schema<IMedicines>(
  {
    medicine: {
      type: Schema.Types.ObjectId,
      ref: "medicines",
    },
    frequency: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export default medicinesSchema;
