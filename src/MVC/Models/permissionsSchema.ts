import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IPermissions {
  _id: Number;
  role: String;
  operation: String;
  user: String;
}

// 2. Create a Schema corresponding to the document interface.
const permissionsSchema = new Schema<IPermissions>({
  _id: { type: Number, required: true },
  role: { type: String, required: true },
  operation: [{ type: String }],
  user: { type: Number, ref: "" },
});

// 3. Create a Model.
const Permissions = model<IPermissions>("Permissions", permissionsSchema);

export default Permissions;
