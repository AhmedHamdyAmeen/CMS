import mongoose from 'mongoose';
export const locationSchema = new mongoose.Schema({
    postalCode:{
        type: Number
    },
    city:{
        type: String
    },
    address:{
        type: String
    },
    state:{
        type: String
    }
},{_id: false });