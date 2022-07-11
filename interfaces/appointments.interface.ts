import mongoose, { Document } from 'mongoose';

export default interface IAppointment extends Document {
  _id: mongoose.Types.ObjectId;
  date: Date;
  doctor: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  clinic: mongoose.Types.ObjectId;
  description?: String;
}