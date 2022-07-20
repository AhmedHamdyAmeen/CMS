"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const permissionsSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    role: { type: String, required: true },
    operation: [{ type: String }],
    user: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            refPath: "userModel",
        },
    ],
    userModel: {
        type: String,
        required: true,
        enum: ["doctors", "employees"],
    },
});
const Permissions = (0, mongoose_1.model)("Permissions", permissionsSchema);
exports.default = Permissions;
