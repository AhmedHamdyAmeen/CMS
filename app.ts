require('dotenv').config()
// const express = require("express");
import express,{ Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

/************ routes */
import { employeeRoute } from './routes/employeeRoute';
import { appointmentRoute } from './routes/appointmentRoute';
/************ */
// const dbUrl: string = process.env.DB_URL;

//create server obejct
const app = express();
mongoose.connect("mongodb://localhost:27017/CMS")
    .then(()=>{
        console.log("DB Connected.");
        //listen to port number
        app.listen(process.env.PORT||8080,()=>{
            console.log("Listening on localhost:8080");
        });            
    })
    .catch((error:Error)=>console.log("Db Connection Error " + error));

/****************** MiddleWare *****************/
//1- MW url and method
app.use(morgan('dev')); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** Routes *****************/
app.use(express.json());//body parsing

app.use(employeeRoute);
app.use(appointmentRoute);

//3- Not Found MW
app.use((request:Request,response:Response)=>{
    console.log('Not Found MW');
    response.status(404).json({message:"Not Found"});
});

//4- Error MW
app.use((error:Error,request:Request,response:Response,next:NextFunction)=>{
    console.log('Error MW');
    // let errorStatus = response.status || 500;
    response.status(500).json({message:"Internal Error:\n" + error});
})