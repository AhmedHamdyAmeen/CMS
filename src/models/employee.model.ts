import mongoose, { Schema } from "mongoose";

import IEmployee from "../interfaces/employee.interface"; 
import { locationSchema } from "./location.model";

import { emailRegex, passwordRegex } from "../utilities/regex";

const employeeSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
    },
    fullName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return emailRegex.test(email);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password: string) {
          return passwordRegex.test(password);
        },
        message: (props: { value: any }) =>
          `${props.value} is too weak for a password!`,
      },
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
    role: {
      type: String,
      default: "employee"
    },
    //1:1 embedded relationships
    address: {
      type: locationSchema,
    }
  }
);

//mapping
export default mongoose.model <IEmployee> ("employees",employeeSchema);