import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";
require("../models/appointments");

let Appointment = mongoose.model("appointments");

class AppointmentController {
    getAllAppointments(request:Request,response:Response,next:NextFunction){
        Appointment.find({})
            .then(data=>{
                response.status(200).json(data);
            })
            .catch(error=>{
                next(error);
            })
    }
    addAppointment(request:Request,response:Response,next:NextFunction){
        let object = new Appointment({
            _id: new mongoose.Types.ObjectId(),
            date : request.body.date,
            doctor : request.body.doctor,
            patient : request.body.patient,
            description: request.body.description,
            location: request.body.location,
        });
        object.save()
            .then(data=>{
                response.status(201).json({data:"added"});
            })
            .catch(error=>next(error))      
    }

    updateAppointment(request:Request,response:Response,next:NextFunction){
        Appointment.findById(request.body.id)
            .then(data => {
                if(data) return data.save()
            })
            .then(data=>{
                response.status(201).json({data:"updated"});
            })
            .catch(error=>next(error))    
    }

    deleteAppointment(request:Request,response:Response,next:NextFunction){
        Appointment.deleteOne({_id:request.params.id})
        .then(data=>{
            response.status(200).json({data:"delete " + request.params.id})
        })
        .catch(error=>next(error)); 
    }
}

export const appointmentController = new AppointmentController();

