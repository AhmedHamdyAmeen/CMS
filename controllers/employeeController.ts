import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";
require("../models/employees");

let Employee = mongoose.model("employees");

class EmployeeController {
    getAllEmployees(request:Request,response:Response,next:NextFunction){
        Employee.find({})
            .then(data=>{
                response.status(200).json(data);
            })
            .catch(error=>{
                next(error);
            })
    }
    
    addEmployee(request:Request,response:Response,next:NextFunction){
        let object = new Employee({
            _id: new mongoose.Types.ObjectId(),
            fullName : request.body.fullName,
            password : request.body.password,
            email : request.body.email,
            phoneNumber: request.body.phone,
            profileImage: request.body.profilePicture,
            address: request.body.address,
        });
        object.save()
            .then(data=>{
                response.status(201).json({data:"added"});
            })
            .catch(error=>next(error))      
    }

    updateEmployee(request:Request,response:Response,next:NextFunction){
        Employee.findById(request.body.id)
            .then(data => {
                if(data) return data.save()
            })
            .then(data=>{
                response.status(201).json({data:"updated"});
            })
            .catch(error=>next(error))    
    }

    deleteEmployee(request:Request,response:Response,next:NextFunction){
        Employee.deleteOne({_id:request.params.id})
        .then(data=>{
            response.status(200).json({data:"delete " + request.params.id})
        })
        .catch(error=>next(error)); 
    }
}

export const employeeController = new EmployeeController();

