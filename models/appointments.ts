import mongoose from 'mongoose';

import { locationSchema } from './locations';

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
    },
    //1:1 embedded relationships
    location: locationSchema,
    // clinic: clinicSchema,
});

//mapping
mongoose.model("appointments",appointmentSchema);