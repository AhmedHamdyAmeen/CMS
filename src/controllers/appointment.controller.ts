import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Appointment from "../models/appointment.model";

export default class AppointmentController {
  getAllAppointments(request: Request, response: Response, next: NextFunction) {
    Appointment.find({}, { date: 1, doctor: 1 })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  getAppointmentById(request: Request, response: Response, next: NextFunction) {
    Appointment.find({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  getAppointmentByDoctor(request: Request, response: Response, next: NextFunction) {
    Appointment.find({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  createAppointment(request: Request, response: Response, next: NextFunction) {
    Appointment.find({
      date: request.body.date,
      doctor: request.body.doctor,
    }).then((data) => {
      if (data.length) {
        next(new Error("appointment already reserved"));
      } else {
        let object = new Appointment({
          _id: new mongoose.Types.ObjectId(),
          date: request.body.date,
          doctor: request.body.doctor,
          patient: request.body.patient,
          description: request.body.description,
          clinic: request.body.clinic,
        });
        object
          .save()
          .then((data) => {
            response.status(201).json({ data: "added" });
          })
          .catch((error) => next(error));
      }
    });
  }

  updateAppointment(request: Request, response: Response, next: NextFunction) {
    Appointment.findById(request.body.id)
      .then((data: any) => {
        if (!data) next(new Error("appointment not found"));
        else {
          for (let key in request.body) {
            data[key] = request.body[key];
          }
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  deleteAppointment(request: Request, response: Response, next: NextFunction) {
    Appointment.deleteOne({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("appointment not found"));
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }
}
