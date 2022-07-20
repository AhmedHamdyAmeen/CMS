"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const medicinesSchema_1 = __importDefault(require("./../Models/medicinesSchema"));
class MedicineController {
    constructor() {
        this.getMedicines = (req, res, next) => {
            medicinesSchema_1.default.find({})
                .then((medicines) => {
                if (!medicines)
                    next(new Error("Medicines is empty!"));
                res.status(200).json({ medicines });
            })
                .catch((error) => next(error));
        };
        this.getMedicine = (req, res, next) => {
            medicinesSchema_1.default.findOne({ _id: req.params.id })
                .then((medicine) => {
                if (!medicine)
                    next(new Error("Sorry, the medicine not found!"));
                res.status(200).json({ medicine });
            })
                .catch();
        };
        this.addMedicines = (req, res, next) => {
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
        this.addMedicine = (req, res, next) => {
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
        this.updateMedicine = (req, res, next) => {
            res.status(201).json({ data: "Updated Ya Man🥰" });
        };
        this.updateMedicines = (req, res, next) => {
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
                            res
                                .status(200)
                                .json({ msg: "Medicines Updated!", savedMedicine });
                    })
                        .catch((error) => next(error));
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteMedicine = (req, res, next) => {
            medicinesSchema_1.default.deleteOne({ _id: req.params.id })
                .then((data) => {
                res.status(201).json({ msg: "Medicine Deleted!", data });
            })
                .catch((error) => next(error));
        };
    }
}
exports.default = MedicineController;
