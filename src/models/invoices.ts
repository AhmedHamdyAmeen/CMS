import mongoose from "mongoose";

import { Schema,Types } from "mongoose"


let invoicesSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    doctors: {
        type: mongoose.Types.ObjectId,
        // required: true,
        ref: "doctors"
    },
    patients: {
        type: mongoose.Types.ObjectId,
        // required: true,
        ref: "patients"
    },

    medicines: [{
        type: mongoose.Types.ObjectId,
        ref: "medicines"
    }],

    paymentMethod: {
        type:String,
        enum: ["cash", "credit card", "insurance card"],
        required:true
    },

    services: [{
        type: mongoose.Types.ObjectId,
        ref: "clinicServies"
    }],

    totalCost: {
        type: Number,
        required:true
    },

    isPaid:{
        type:Boolean,
        default:false
    }

},{_id:false})


export default mongoose.model("invoices",invoicesSchema)