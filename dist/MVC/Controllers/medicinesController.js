"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicine = exports.updateMedicines = exports.updateMedicine = exports.addMedicine = exports.addMedicines = exports.getMedicine = exports.getMedicines = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const medicinesSchema_1 = __importDefault(require("./../Models/medicinesSchema"));
const getMedicines = (req, res, next) => {
    medicinesSchema_1.default.find({})
        .then((medicines) => {
        if (!medicines)
            next(new Error("Medicines is empty!"));
        res.status(200).json({ medicines });
    })
        .catch((error) => next(error));
};
exports.getMedicines = getMedicines;
const getMedicine = (req, res, next) => {
    medicinesSchema_1.default.findOne({ _id: req.params.id })
        // .populate("type", "_id name")
        .then((medicine) => {
        if (!medicine)
            next(new Error("Sorry, the medicine not found!"));
        res.status(200).json({ medicine });
    })
        .catch();
};
exports.getMedicine = getMedicine;
const addMedicines = (req, res, next) => {
    let medicinesArr = req.body.medicines;
    try {
        medicinesArr.forEach((medicine, idx) => {
            medicinesSchema_1.default.findOne({ tradeName: medicine.tradeName })
                .then((data) => {
                if (data)
                    throw new Error(`${medicine.tradeName}: exist already`);
                const newMedicine = new medicinesSchema_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    tradeName: medicine.tradeName,
                    scientificName: medicine.scientificName,
                    type: medicine.type,
                    cost: medicine.cost,
                });
                return newMedicine
                    .save()
                    .then((data) => res.status(200).json({ msg: "Medicine Added!", data, idx }))
                    .catch((error) => next(error));
            })
                .catch((error) => next(error));
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addMedicines = addMedicines;
const addMedicine = (req, res, next) => {
    try {
        medicinesSchema_1.default.findOne({ tradeName: req.body.tradeName })
            .then((medicine) => {
            if (medicine)
                next(new Error("This medicine exist already"));
            let newMedicine = new medicinesSchema_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                tradeName: req.body.tradeName,
                scientificName: req.body.scientificName,
                type: req.body.type,
                cost: req.body.cost,
            });
            newMedicine
                .save()
                .then((data) => res.status(200).json({ msg: "Medicine Added!", data }))
                .catch((error) => next(error));
        })
            .catch((error) => next(error));
    }
    catch (error) {
        next(error);
    }
};
exports.addMedicine = addMedicine;
const updateMedicine = (req, res, next) => {
    res.status(201).json({ data: "Updated Ya Man🥰" });
};
exports.updateMedicine = updateMedicine;
const updateMedicines = (req, res, next) => {
    let medicinesArr = req.body.medicines;
    try {
        medicinesArr.forEach((medicine, idx) => {
            medicinesSchema_1.default.findOne({
                tradeName: medicine.tradeName,
                scientificName: medicine.scientificName,
            })
                .then(async (data) => {
                if (!data)
                    throw new Error(`${medicine.tradeName} not exist!`);
                for (let item in medicine) {
                    data[item] = medicine[item];
                }
                let savedMedicine = await data.save();
                if (savedMedicine)
                    res.status(200).json({ msg: "Medicines Updated!", savedMedicine });
            })
                .catch((error) => next(error));
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateMedicines = updateMedicines;
const deleteMedicine = (req, res, next) => {
    medicinesSchema_1.default.deleteOne({ _id: req.params.id })
        .then((data) => {
        res.status(201).json({ msg: "Medicine Deleted!", data });
    })
        .catch((error) => next(error));
};
exports.deleteMedicine = deleteMedicine;
