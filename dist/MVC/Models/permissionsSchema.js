"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const permissionsSchema = new mongoose_1.Schema({
    _id: { type: Number, required: true },
    role: { type: String, required: true },
    operation: [{ type: String }],
    user: { type: Number, ref: "" },
});
// 3. Create a Model.
const Permissions = (0, mongoose_1.model)("Permissions", permissionsSchema);
exports.default = Permissions;
