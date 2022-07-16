import { RequestHandler } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const mailgun = require("mailgun-js");
const DOMAIN = "sandbox9ef16654558246898368760ecc18807f.mailgun.org";
const api_key = "51a767a7ce0baf3de8394e657cf1b7ef-1b8ced53-b7fdf769";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

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
      clinics: request.body.clinics,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, saltRounds),
      phoneNumber: request.body.phoneNumber,
    });
    Doctor.findOne({ fullName: request.body.fullName })
      .then((duplicateDoctors) => {
        if (!duplicateDoctors) {
          return object.save().then((data) => {
            response.status(201).json({ msg: "doctor created", data });
          });
        } else {
          next(new Error("doctor fullName already exist"));
        }
      })
      .catch((error) => next(error));
  };

  changePassword: RequestHandler = (request, response, next) => {
    console.log("changePassword controller");
    Doctor.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("doctor not found"));
        if (bcrypt.compareSync(request.body.oldPassword, data.password)) {
          if (bcrypt.compareSync(request.body.newPassword, data.password)) {
            next(new Error("you entered the same password"));
          }
          data.password = bcrypt.hashSync(request.body.newPassword, saltRounds);
          return data.save().then((data: any) => {
            response.status(200).json({ msg: "doctor updated", data });
          });
        } else next(new Error("old password incorrect!"));
      })
      .catch((error) => next(error));
  };

  forgotPassword: RequestHandler = (request, response, next) => {
    console.log(request.body.email);
    Doctor.findOne({ email: request.body.email })
      .then((doctor: any) => {
        if (!doctor) throw new Error("doctor is Not Exist!");
        let token = jwt.sign(
          { _id: doctor._id, email: request.body.email },
          "mySecret",
          {
            expiresIn: "10m",
          }
        );
        const data = {
          from: "samaahamdy719@gmail.com",
          to: request.body.email,
          subject: "Password Reseting Link",
          html: `
          <h2 style="color: red; font-size: 50px">Password Reseting</h2>
          <pre style="font-size: 30px;">
          Hello ${doctor.fullName},
          
          Please click on the given link to reset password..
        <a href="http://localhost:8080/authentication/resetPassword/${token}">Reset Password</a>
          If you did not forget password, Change your password now 👀.
          Happy Emailing!
            Freelancico Team.
          </pre>
        `,
        };
        Doctor.updateOne({ _id: doctor._id }, { resetLink: token }).then(
          (newData: any) => {
            if (!newData) throw new Error("Reset Password Link error!");

            mg.messages().send(data, function (error: any) {
              if (error) next(error);
              response.status(200).json({
                data: "Reset Password link has been sent to your Email, kindly check your mail and follow the instructions",
              });
            });
          }
        );
      })
      .catch((error) => next(error));
  };

  resetPassword: RequestHandler = (request, response, next) => {
    let token = request.params.token;

    Doctor.findOne({ resetLink: token })
      .then((data: any) => {
        if (!data) next(new Error("doctor with this token doesn't exist!"));

        if (bcrypt.compareSync(request.body.newPassword, data.password)) {
          next(new Error("you entered the same password"));
        } else {
          data.password = bcrypt.hashSync(request.body.newPassword, saltRounds);
          return data.save().then(() => {
            response
              .status(200)
              .json({ msg: "Password Reseting done successfully" });
          });
        }
      })
      .catch((error: any) => next(error));
  };

  updateDoctor: RequestHandler = (request, response, next) => {
    console.log("updateDoctor controller");
    Doctor.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) next(new Error("doctor not found"));
        for (let prop in request.body) {
          if (
            !(
              prop == "name" ||
              prop == "email" ||
              prop == "password" ||
              prop == "role" ||
              prop == "resetLink" ||
              prop == "appointments"
            )
          )
            data[prop] = request.body[prop];
        }
        return data.save().then((data: any) => {
          response.status(200).json({ msg: "doctor updated", data });
        });
      })
      .catch((error) => next(error));
  };

  adminDoctor: RequestHandler = (request, response, next) => {
    console.log("adminDoctor controller");
    Doctor.findOne({ _id: request.params.id })
      .then((data: any) => {
        if (!data) throw Error("doctor not found");
        data.role == "doctor" ? (data.role = "admin") : (data.role = "doctor");
        return data.save().then((data: any) => {
          response
            .status(200)
            .json({ msg: "doctor role changed", role: data.role });
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
