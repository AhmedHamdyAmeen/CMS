"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("../models/employees");
let Employee = mongoose_1.default.model("employees");
class EmployeeController {
    getAllEmployees(request, response, next) {
        Employee.find({})
            .then(data => {
            response.status(200).json(data);
        })
            .catch(error => {
            next(error);
        });
    }
    addEmployee(request, response, next) {
        let object = new Employee({
            _id: new mongoose_1.default.Types.ObjectId(),
            fullName: request.body.fullName,
            password: request.body.password,
            email: request.body.email,
            PhoneNumber: request.body.phone,
            profileImage: request.body.profilePicture,
            address: request.body.address,
        });
        object.save()
            .then(data => {
            response.status(201).json({ data: "added" });
        })
            .catch(error => next(error));
    }
    updateEmployee(request, response, next) {
        Employee.findById(request.body.id)
            .then(data => {
            if (data)
                return data.save();
        })
            .then(data => {
            response.status(201).json({ data: "updated" });
        })
            .catch(error => next(error));
    }
    deleteEmployee(request, response, next) {
        Employee.deleteOne({ _id: request.params.id })
            .then(data => {
            response.status(200).json({ data: "delete " + request.params.id });
        })
            .catch(error => next(error));
    }
}
exports.employeeController = new EmployeeController();
