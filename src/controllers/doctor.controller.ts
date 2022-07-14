import { RequestHandler } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
const saltRounds = 10;

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

export default class DoctorController {
  loginDoctor: RequestHandler = (request, response, next) => {
    Doctor.findOne({ email: request.body.email }).then((data: any) => {
      let role = "doctor";
      if (data && bcrypt.compareSync(request.body.password, data.password)) {
        let token = jwt.sign(
          {
            id: data._id,
            role: role,
          },
          "mysecret",
          { expiresIn: "1h" }
        );

        response.status(200).json({ token: token, role: role });
      } else {
        let error: any = new Error("email or password incorrect");
        error.status = 401;
        next(error);
      }
    });
  };

  signUp: RequestHandler = (request, response, next) => {
    console.log("signUp controller");
    let object = new Doctor({
      _id: new mongoose.Types.ObjectId(),
      fullName: request.body.fullName,
      department: request.body.department,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, saltRounds),
      phoneNumber: request.body.phoneNumber,
      // image: request.body.image,
      // gender: request.body.gender,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ msg: "doctor created", data });
      })
      .catch((error) => next(error));
  };

  updateDoctor: RequestHandler = (request, response, next) => {
    console.log("updateDoctor controller");
    Doctor.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("doctor not found"));
        for (let prop in request.body) {
          if (prop != "email" || "password") data[prop] = request.body[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "doctor updated", data });
        });
      })
      .catch((error) => next(error));
  };

  getDoctor: RequestHandler = (request, response, next) => {
    console.log("getDoctor controller");
    Doctor.findOne({ _id: request.params.id }, { password: 0 })
      .then((data: any) => {
        if (!data) throw Error("doctor not found");
        response.status(200).json({ msg: "doctor get", data });
      })
      .catch((error) => next(error));
  };

  deleteDoctor: RequestHandler = (request, response, next) => {
    console.log("deleteDoctor controller");
    Doctor.deleteOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("doctor not found");
        response.status(200).json({ msg: "doctor deleted" });
      })
      .catch((error) => next(error));
  };

  getAllDoctors: RequestHandler = (request, response, next) => {
    console.log("getAllDoctors controller");

    let sortingObj: any = {};
    if (request.body.sortKey) {
      for (let key of request.body.sortKey) {
        sortingObj[key] = 1;
      }
    }
    console.log("sortingObj = ", sortingObj);
    Doctor.find({}, { password: 0 })
      .sort(sortingObj)
      .then((data: any) => {
        response.status(200).json({ msg: "doctor getAll", data });
      })
      .catch((error) => next(error));
  };
}
