import mongoose, { Document } from 'mongoose';

import ILocation from './location.interface';

export default interface IEmployee extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: String;
    email: String;
    password: String;
    phoneNumber: String;
    profileImage?: String;
    address: ILocation;
    role: string
}