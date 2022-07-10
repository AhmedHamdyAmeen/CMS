"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// const express = require("express");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
/************ routes */
const employeeRoute_1 = require("./routes/employeeRoute");
const appointmentRoute_1 = require("./routes/appointmentRoute");
/************ */
// const dbUrl: string = process.env.DB_URL;
//create server obejct
const app = (0, express_1.default)();
mongoose_1.default.connect("mongodb://localhost:27017/CMS")
    .then(() => {
    console.log("DB Connected.");
    //listen to port number
    app.listen(process.env.PORT || 8080, () => {
        console.log("Listening on localhost:8080");
    });
})
    .catch((error) => console.log("Db Connection Error " + error));
/****************** MiddleWare *****************/
//1- MW url and method
app.use((0, morgan_1.default)('dev')); //method-url-status-ms- :res[content-length]
//2- all users CORS MW
app.use((0, cors_1.default)());
/****************** Routes *****************/
app.use(express_1.default.json()); //body parsing
app.use(employeeRoute_1.employeeRoute);
app.use(appointmentRoute_1.appointmentRoute);
//3- Not Found MW
app.use((request, response) => {
    console.log('Not Found MW');
    response.status(404).json({ message: "Not Found" });
});
//4- Error MW
app.use((error, request, response, next) => {
    console.log('Error MW');
    // let errorStatus = response.status || 500;
    response.status(500).json({ message: "Internal Error:\n" + error });
});
