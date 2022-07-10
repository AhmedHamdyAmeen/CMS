"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("../models/appointments");
let Appointment = mongoose_1.default.model("appointments");
class AppointmentController {
    getAllAppointments(request, response, next) {
        Appointment.find({})
            .then(data => {
            response.status(200).json(data);
        })
            .catch(error => {
            next(error);
        });
    }
    addAppointment(request, response, next) {
        let object = new Appointment({
            _id: new mongoose_1.default.Types.ObjectId(),
            date: request.body.date,
            doctor: request.body.doctor,
            patient: request.body.patient,
            description: request.body.description,
            location: request.body.location,
        });
        object.save()
            .then(data => {
            response.status(201).json({ data: "added" });
        })
            .catch(error => next(error));
    }
    updateAppointment(request, response, next) {
        Appointment.findById(request.body.id)
            .then(data => {
            if (data)
                return data.save();
        })
            .then(data => {
            response.status(201).json({ data: "updated" });
        })
            .catch(error => next(error));
    }
    deleteAppointment(request, response, next) {
        Appointment.deleteOne({ _id: request.params.id })
            .then(data => {
            response.status(200).json({ data: "delete " + request.params.id });
        })
            .catch(error => next(error));
    }
}
exports.appointmentController = new AppointmentController();
