"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const paypal = require("paypal-rest-sdk");
/************ routes */
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const appointment_route_1 = __importDefault(require("./routes/appointment.route"));
const search_route_1 = __importDefault(require("./routes/search.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const toggleRole_route_1 = __importDefault(require("./routes/toggleRole.route"));
const services_route_1 = __importDefault(require("./routes/services.route"));
const invoices_route_1 = __importDefault(require("./routes/invoices.route"));
const doctor_route_1 = __importDefault(require("./routes/doctor.route"));
const prescription_route_1 = __importDefault(require("./routes/prescription.route"));
const patient_route_1 = __importDefault(require("./routes/patient.route"));
const medicines_route_1 = __importDefault(require("./routes/medicines.route"));
paypal.configure({
    mode: "sandbox",
    client_id: "AatXrjo3Fo6-kb7kFwnnFD5umDluOc6BBZtLSv0xF80IBunZ4hSm9BPMzVyAS72iYPpDFi46ldVE76bv",
    client_secret: "ENGE-m5d8p8VYqqKR5yST78w_KtKf4iDpBt_MWHuQKFtnTmev5E1qNcOWznQc8CwYV5CuuYj23YoLvr9",
});
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
app.use(auth_route_1.default);
app.use("/payment", payment_route_1.default);
app.use("/toggleRole", toggleRole_route_1.default);
app.use(search_route_1.default);
app.use("/employee", employee_route_1.default);
app.use("/appointment", appointment_route_1.default);
app.use("/doctor", doctor_route_1.default);
app.use("/prescription", prescription_route_1.default);
app.use("/patient", patient_route_1.default);
app.use(medicines_route_1.default);
app.use(services_route_1.default);
app.use(invoices_route_1.default);
//3- Not Found MW
app.use((request, response) => {
    console.log("Not Found MW");
    response.status(404).json({ message: "Not Found" });
});
//4- Error MW
app.use((error, request, response, next) => {
    console.log("Error MW");
    // let errorStatus = (response.status || 500);
    response.status(500).json({ message: "Internal Error:\n" + error });
});
