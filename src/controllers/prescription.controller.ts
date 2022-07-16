import { RequestHandler } from "express";
import mongoose from "mongoose";
import "../models/prescription.model";

let Prescription = mongoose.model("prescriptions");

export default class PrescriptionController {
  createPrescription: RequestHandler = (request, response, next) => {
    console.log("createPrescription controller");
    let object = new Prescription({
      _id: new mongoose.Types.ObjectId(),
      doctor: request.body.doctor, //will be taken from request.id
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

  updatePrescription: RequestHandler = (request, response, next) => {
    console.log("updatePrescription controller");
    Prescription.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("prescription not found"));
        for (let prop in request.body) {
          if (!(prop == "doctor" || prop == "patient"))
            data[prop] = request.body[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "prescription updated", data });
        });
      })
      .catch((error) => next(error));
  };
  //🔴 may be removed
  getPrescription: RequestHandler = (request, response, next) => {
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

  deletePrescription: RequestHandler = (request, response, next) => {
    console.log("deletePrescription controller");
    Prescription.deleteOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("prescription not found");
        response.status(200).json({ msg: "prescription deleted" });
      })
      .catch((error) => next(error));
  };

  getAllPrescriptions: RequestHandler = (request, response, next) => {
    console.log("getAllPrescriptions controller");
    let sortingObj: any = {};
    if (request.body.sortKey) {
      for (let key of request.body.sortKey) {
        if (key == "doctor" || key == "patient") {
          sortingObj[key + ".fullName"] = 1;
        } else if (key == "date") {
          sortingObj[key] = 1;
        }
      }
    }
    console.log("sortingObj = ", sortingObj);
    Prescription.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctor",
          foreignField: "_id",
          as: "doctor",
        },
      },
      // {
      //   $lookup: {
      //     from: "patients",
      //     localField: "patient",
      //     foreignField: "_id",
      //     as: "patient",
      //   },
      // },
      { $unwind: "$doctor" },
      { $sort: sortingObj },
    ])
      .then((data: any) => {
        response.status(200).json({ msg: "prescription getAll", data });
      })
      .catch((error) => next(error));
  };
}
