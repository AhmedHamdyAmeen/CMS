import { RequestHandler } from "express";
import mongoose from "mongoose";
import "../models/prescription.model";

let Prescription = mongoose.model("prescriptions");

export const createPrescription: RequestHandler = (request, response, next) => {
  console.log("createPrescription controller");
  let object = new Prescription({
    _id: new mongoose.Types.ObjectId(),
    doctor: request.body.doctor,
    patient: request.body.patient,
    medicines: request.body.medicines,
    date: request.body.date,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ msg: "prescription created", data });
    })
    .catch((error) => next(error));
};

export const updatePrescription: RequestHandler = (request, response, next) => {
  console.log("updatePrescription controller");
  Prescription.findOne({ _id: request.params.id })
    .then((data: any) => {
      if (!data) next(new Error("prescription not found"));
      return data.save().then((data: any) => {
        response.status(200).json({ msg: "prescription updated", data });
      });
    })
    .catch((error) => next(error));
};
//🔴 may be removed
export const getPrescription: RequestHandler = (request, response, next) => {
  console.log("getPrescription controller");
  Prescription.findOne({ _id: request.params.id })
    .populate({ path: "doctor", select: "fullName" })
    // .populate({ path: "patient", select: "fullName" })
    // .populate({ path: "medicines.id" })
    .then((data: any) => {
      if (!data) throw Error("prescription not found");
      response.status(200).json({ msg: "prescription get", data });
    })
    .catch((error) => next(error));
};

export const deletePrescription: RequestHandler = (request, response, next) => {
  console.log("deletePrescription controller");
  Prescription.deleteOne({ _id: request.params.id })
    .then((data: any) => {
      if (!data) throw Error("prescription not found");
      response.status(200).json({ msg: "prescription deleted" });
    })
    .catch((error) => next(error));
};

export const getAllPrescriptions: RequestHandler = (
  request,
  response,
  next
) => {
  console.log("getAllPrescriptions controller");
  let sortingObj: any = {};
  if (request.query != {}) {
    console.log(request.query);

    for (let prop in request.query) {
      if (prop == "doctor" || prop == "patient") {
        sortingObj[prop + ".fullName"] = request.query[prop];
      } else if (prop == "date") {
        sortingObj[prop] = request.query[prop];
      }
    }
  }
  console.log("sortingObj = ", sortingObj);
  Prescription.find({})
    .populate({ path: "doctor", select: "fullName" })
    // .populate({ path: "patient", select: "fullName" })
    // .populate({ path: "medicines.id" ,select:"name"})
    .sort(sortingObj)
    .then((data: any) => {
      response.status(200).json({ msg: "prescription getAll", data });
    })
    .catch((error) => next(error));
};
