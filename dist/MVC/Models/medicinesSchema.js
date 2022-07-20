"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicinesSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    tradeName: { type: String, required: true },
    scientificName: { type: String },
    type: { type: String },
    cost: { type: Number, required: true },
});
const Medicines = (0, mongoose_1.model)("Medicines", medicinesSchema);
exports.default = Medicines;
