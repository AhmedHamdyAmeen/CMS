import mongoose, { Document } from "mongoose";

export default interface ILocation extends Document {
  postalCode: Number;
  city: String;
  address: String;
  state: String;
}
