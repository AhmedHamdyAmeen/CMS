"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const locations_1 = require("./locations");
//create schema object
const appointmentSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId,
    },
    date: {
        type: Date,
        required: true,
    },
    doctor: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "doctors"
    },
    patient: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "patients",
        required: true,
    },
    description: {
        type: String,
    },
    //1:1 embedded relationships
    location: locations_1.locationSchema,
    // clinic: clinicSchema,
});
//mapping
mongoose_1.default.model("appointments", appointmentSchema);
