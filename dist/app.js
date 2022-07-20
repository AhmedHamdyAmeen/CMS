"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv");
const medicinesRoute_1 = __importDefault(require("./MVC/Routes/medicinesRoute"));
// * 1)  Create Server
const server = (0, express_1.default)();
// todo: Connect to the DB
mongoose_1.default
    .connect(process.env.DB_URL || "mongodb://localhost:27017/CMS")
    .then(() => {
    console.log("DB Connected");
    // * 2 ) Listen to server and port number
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Server is running on: http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
// * 3 ) Create Middleware & Endpoints
// 3 a) CORS MW
// CORS => Cross-Origin Resource Sharing
// It is a package allow the outside domains to connect with node server..
// CORS must be used before the Rout.
server.use((0, cors_1.default)({ origin: "*" }));
// 3 b) Morgan MW to log the url & method
server.use((0, morgan_1.default)(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        // tokens.res(req, res, 'content-length'), '-',
        // tokens['response-time'](req, res), 'ms'
    ].join(" ");
}));
// ^  EndPoints == Routes ==>
// communication channel to grab data
server.use(express_1.default.json()); // parse matched json http request bodies =>> express.json() must be before routes
server.use(medicinesRoute_1.default);
// 3 c) Not Found MW
server.use("/", (request, response, next) => {
    response.status(404).json({ data: "Not Found" });
});
// 3 d) Error Handling MW
server.use((error, req, res, next) => {
    res.status(500).json({ message: "Internal Error" + error });
});
