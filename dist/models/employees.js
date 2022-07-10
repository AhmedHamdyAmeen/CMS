"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const locations_1 = require("./locations");
// interface IEmployee {
//     _id: mongoose.Types.ObjectId;
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     profileImage?: string;
//   }
//create schema object
const employeeSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (phoneNumber) {
                return /\d{3}-\d{3}-\d{4}/.test(phoneNumber); //(127)(83)(3881)
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
    },
    profileImage: {
        type: String,
    },
    //1:1 embedded relationships
    address: locations_1.locationSchema,
    // clinic: clinicSchema,
});
//mapping
mongoose_1.default.model("employees", employeeSchema);
