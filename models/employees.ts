import mongoose from 'mongoose';

import { locationSchema } from './locations';

// interface IEmployee {
//     _id: mongoose.Types.ObjectId;
//     fullName: string;
//     email: string;
//     password: string;
//     phoneNumber: string;
//     profileImage?: string;
//   }

//create schema object
const employeeSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
    },
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        validate: {
            validator: function(phoneNumber: string) {
              return /\d{3}-\d{3}-\d{4}/.test(phoneNumber); //(127)(83)(3881)
            },
            message: (props: { value: any; }) => `${props.value} is not a valid phone number!`
        },
    },
    profileImage:{
        type: String,
    },
    //1:1 embedded relationships
    address: locationSchema,
    // clinic: clinicSchema,
});

//mapping
mongoose.model("employees",employeeSchema);