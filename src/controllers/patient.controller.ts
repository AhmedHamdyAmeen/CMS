import { RequestHandler } from "express";
import mongoose from "mongoose";
import "../models/patient.model";

let Patient = mongoose.model("patients");

export default class PatientController {
  createPatient: RequestHandler = (request, response, next) => {
    console.log("createPatient controller");
    let object = new Patient({
      _id: new mongoose.Types.ObjectId(),
      fullName: request.body.fullName,
      age: request.body.age,
      gender: request.body.gender,
      location: {
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
      },
      phoneNumber: request.body.phoneNumber,
      notes: request.body.notes,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ msg: "patient created", data });
      })
      .catch((error) => next(error));
  };

  updatePatient: RequestHandler = (request, response, next) => {
    console.log("updatePatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        for (let prop in request.body) {
          if (prop == "address" || prop == "city" || prop == "state") {
            data.location[prop] = request.body[prop] || data.location[prop];
          } else if (prop == "appointments" || prop == "services") continue;
          else data[prop] = request.body[prop] || data[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "patient updated", data });
        });
      })
      .catch((error) => next(error));
  };

  addServicePatient: RequestHandler = (request, response, next) => {
    console.log("addServicePatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("patient not found"));
        for (let service in request.body.services) {
          data.services.push(request.body.services[service]);
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "patient updated", data });
        });
      })
      .catch((error) => next(error));
  };

  getPatient: RequestHandler = (request, response, next) => {
    console.log("getPatient controller");
    Patient.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("patient not found");
        response.status(200).json({ msg: "patient get", data });
      })
      .catch((error) => next(error));
  };

  deletePatient: RequestHandler = (request, response, next) => {
    console.log("deletePatient controller");
    Patient.deleteOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("patient not found");
        response.status(200).json({ msg: "patient deleted" });
      })
      .catch((error) => next(error));
  };

  getAllPatients: RequestHandler = (request, response, next) => {
    console.log("getAllPatients controller");
    let sortingObj: any = {};
    if (request.body.sortKey) {
      for (let key of request.body.sortKey) {
        if (key == "fullName" || key == "age") {
          sortingObj[key] = 1;
        }
      }
    }
    console.log("sortingObj = ", sortingObj);
    Patient.find({})
      .sort(sortingObj)
      .then((data: any) => {
        response.status(200).json({ msg: "patient getAll", data });
      })
      .catch((error) => next(error));
  };
}
