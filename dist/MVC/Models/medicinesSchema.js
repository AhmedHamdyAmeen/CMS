"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const medicinesSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    tradeName: { type: String, required: true },
    scientificName: { type: String },
    type: { type: mongoose_1.Schema.Types.ObjectId, ref: "ClinicServices " },
    cost: { type: Number, required: true },
});
// 3. Create a Model.
const Medicines = (0, mongoose_1.model)("Medicines", medicinesSchema);
exports.default = Medicines;
