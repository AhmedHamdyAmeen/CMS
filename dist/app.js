"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
/************ routes */
const employee_route_1 = require("./routes/employee.route");
const appointment_route_1 = require("./routes/appointment.route");
const search_route_1 = require("./routes/search.route");
const login_route_1 = __importDefault(require("./routes/login.route"));
//create server obejct
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.DB_URL || "mongodb://localhost:27017/CMS")
    .then(() => {
    console.log(`DB Connected. ${process.env.DB_URL}`);
    //listen to port number
    app.listen(process.env.PORT || 8080, () => {
        console.log("Listening on localhost:8080");
    });
})
    .catch((error) => console.log("Db Connection Error " + error));
/****************** MiddleWare *****************/
//1- MW url and method
app.use((0, morgan_1.default)("dev")); //method-url-status-ms- :res[content-length]
//2- all users CORS MW
app.use((0, cors_1.default)());
/****************** Routes *****************/
app.use(express_1.default.json()); //body parsing
app.use(search_route_1.searchRoute);
app.use(employee_route_1.employeeRoute);
app.use(appointment_route_1.appointmentRoute);
app.use(login_route_1.default);
//3- Not Found MW
app.use((request, response) => {
    console.log("Not Found MW");
    response.status(404).json({ message: "Not Found" });
});
//4- Error MW
app.use((error, request, response, next) => {
    console.log("Error MW");
    let errorStatus = response.status || 500;
    response.status(errorStatus).json({ message: "Internal Error:\n" + error });
});
