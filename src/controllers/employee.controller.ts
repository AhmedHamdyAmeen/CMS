import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";

import Employee from "../models/employee.model";

export default class EmployeeController {
  getAllEmployees(request: Request, response: Response, next: NextFunction) {
    Employee.find({},{ password: 0 })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  getEmployeeById(request: Request, response: Response, next: NextFunction) {
    Employee.find({ _id: request.params.id }, { password: 0 })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }

  createEmployee(request: Request, response: Response, next: NextFunction) {
    let addressObject = {
      address: request.body.address,
      city: request.body.city,
      state: request.body.state,
    };
    let object = new Employee({
      _id: new mongoose.Types.ObjectId(),
      fullName: request.body.fullName,
      email: request.body.email,
      password: request.body.password,
      clinic: request.body.clinic,
      //not required
      phoneNumber: request.body.phone,
      address: addressObject,
      profileImage: request.body.profileImage,
    });
    object
      .save()
      .then((data) => {
        response.status(201).json({ data: "added" });
      })
      .catch((error) => next(error));
  }

  updateEmployee(request: Request, response: Response, next: NextFunction) {
    Employee.findById(request.body.id)
      .then((data: any) => {
        if (!data) next(new Error("Employee not found"));
        else {
          for (let key in request.body) {
            if (
              key === "city" ||
              key === "state" ||
              key === "address"
            ) {
              /*****************address */
              data.address[key] = request.body[key];
            } else if (key === "password")
              next(new Error("can not change employee password"));
            else if (key === "clinic")
            {
              // if (request.role == "doctor" || request.role == "admin") data.clinic = request.body.clinic;
              // else {
              //   error.message = "Not Authorized";
              //   error.status = 403;
              //   next(error);
           
            }
            else data[key] = request.body[key];
          }
          return data.save();
        }
      })
      .then((data) => {
        response.status(201).json({ data: "updated" });
      })
      .catch((error) => next(error));
  }

  deleteEmployee(request: Request, response: Response, next: NextFunction) {
    Employee.deleteOne({ _id: request.params.id })
      .then((data) => {
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }
}

