import mongoose from 'mongoose';

import IAppointment from "../interfaces/appointments.interface";

//create schema object
const appointmentSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
    },
    date:{
        type: Date,
        required: true,
    },
    doctor:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "doctors"
    },
    patient:{
        type: mongoose.Types.ObjectId,
        ref: "patients",
        required: true,
    },
    description:{
        type: String,
        maxLength: 500
    },
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "employees",
        required: true,
    },
    //1:many child ref relationship
    clinic: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "clinics"
    }
},
    {
    timestamps: true
});

//mapping
export default mongoose.model <IAppointment> ("appointments",appointmentSchema);