import { RequestHandler } from "express";
import mongoose from "mongoose";

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

import "../models/employee.model";
const Employee = mongoose.model("employees");

export default class ToggleRoleController {
  toggleDoctorRole: RequestHandler = (request: any, response, next) => {
    console.log("toggleDoctorRole controller");
    Doctor.findOne({ _id: request.body.id })
      .then((user: any) => {
        if (!user) throw Error("user not found");
        if (user.role != "admin") user.role = "admin";
        else user.role = "doctor";

        return user.save().then((user: any) => {
          response
            .status(200)
            .json({ msg: "doctor role changed", role: user.role });
        });
      })
      .catch((error) => next(error));
  };
  toggleEmployeeRole: RequestHandler = (request: any, response, next) => {
    console.log("toggleEmployeeRole controller");
    Employee.findOne({ _id: request.body.id })
      .then((user: any) => {
        if (!user) throw Error("user not found");
        if (user.role != "admin") user.role = "admin";
        else user.role = "employee";

        return user.save().then((user: any) => {
          response
            .status(200)
            .json({ msg: "employee role changed", role: user.role });
        });
      })
      .catch((error) => next(error));
  };
}
