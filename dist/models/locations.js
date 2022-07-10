"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.locationSchema = new mongoose_1.default.Schema({
    postalCode: {
        type: Number
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    }
}, { _id: false });
