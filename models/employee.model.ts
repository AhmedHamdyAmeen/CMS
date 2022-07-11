import mongoose, { Schema } from "mongoose";

import IEmployee from "../interfaces/employee.interface"; 
import { locationSchema } from "./location.model";

const employeeSchema: Schema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Types.ObjectId,
        },
        fullName: {
            type: String,
            required: true,
            minLength: 5,
            maxLength:15
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 15
        },
        phoneNumber: {
            type: String,
            // validate: {
            //     validator: function(phoneNumber: string) {
            //       return /\d{3}-\d{3}-\d{4}/.test(phoneNumber); //(127)(83)(3881)
            //     },
            //     message: (props: { value: any; }) => `${props.value} is not a valid phone number!`
            // },
        },
        profileImage: {
            type: String,
        },

        //1:1 embedded relationships
        address: {
            type: locationSchema
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
    }
);

//mapping
export default mongoose.model <IEmployee> ("employees",employeeSchema);