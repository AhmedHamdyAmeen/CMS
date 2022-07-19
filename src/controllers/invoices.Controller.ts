import { Request, Response, NextFunction } from "express";
import invoices from "../models/invoices"
// import doctors from "../models/doctors"
// import patients from "../models/patients"
import clinicServies from "../models/clinicServies"
// import medicines from "../models/medicines"
import mongoose from "mongoose";


export default class InvoicesController {
getAllInvoices=(req:Request,res:Response,next:NextFunction)=>{
    invoices.find({})
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error => {
        next(error)})
}



getoneInvoices=(req:Request,res:Response,next:NextFunction)=>{
    invoices.findOne({_id:req.params.id})
    .populate({path:"doctors",select:"tradeName"})
    .populate({path:"patients",select:"fullName"})
    .populate({path:"clinicServies",select:"name "})
    .populate({path:"medicines",select:"name cost"})
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error => {
        next(error)
    })
}

createInvoices=(req:Request,res:Response,next:NextFunction)=>{
    let invoicesObject= new invoices({
        _id:new mongoose.Types.ObjectId(),
        doctors:req.body.id,
        patients:req.body.id,
        medicines:req.body.id,
        paymentMethod:req.body.paymentMethod,
        services:req.body.services             

    })
}
updateInvoices(request: Request, response: Response, next: NextFunction) {
    invoices.findById(request.body.id)
      .then((data: any) => {
        if (!data) next(new Error("invoices not found"));
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

  deleteInvoice(request: Request, response: Response, next: NextFunction) {
    invoices.deleteOne({ _id: request.params.id })
      .then((data) => {
        if (!data) next(new Error("invoices not found"));
        response.status(200).json({ data: "delete " + request.params.id });
      })
      .catch((error) => next(error));
  }
}