import { RequestHandler } from "express";
import mongoose from "mongoose";

import bcrypt from "bcrypt";
const saltRounds = 10;

import "../models/doctor.model";
const Doctor = mongoose.model("doctors");

export const createDoctor: RequestHandler = (request, response, next) => {
  console.log("createDoctor controller");
  let object = new Doctor({
    _id: new mongoose.Types.ObjectId(),
    fullName: request.body.fullName,
    department: request.body.department,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, saltRounds),
    phoneNumber: request.body.phoneNumber,
    image: request.body.image,
    gender: request.body.gender,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ msg: "doctor created", data });
    })
    .catch((error) => next(error));
};

export const updateDoctor: RequestHandler = (request, response, next) => {
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

export const getDoctor: RequestHandler = (request, response, next) => {
  console.log("getDoctor controller");
  Doctor.findOne({ _id: request.params.id }, { password: 0 })
    .then((data: any) => {
      if (!data) throw Error("doctor not found");
      response.status(200).json({ msg: "doctor get", data });
    })
    .catch((error) => next(error));
};

export const deleteDoctor: RequestHandler = (request, response, next) => {
  console.log("deleteDoctor controller");
  Doctor.deleteOne({ _id: request.params.id })
    .then((data: any) => {
      if (!data) throw Error("doctor not found");
      response.status(200).json({ msg: "doctor deleted" });
    })
    .catch((error) => next(error));
};

export const getAllDoctors: RequestHandler = (request, response, next) => {
  console.log("getAllDoctors controller");
  Doctor.find({}, { password: 0 })
    .then((data: any) => {
      response.status(200).json({ msg: "doctor getAll", data });
    })
    .catch((error) => next(error));
};
