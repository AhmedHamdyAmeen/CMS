import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { cors } from "cors-ts";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);

import doctorRoutes from "./routes/doctor.route";
import prescriptionRoutes from "./routes/prescription.route";
import patientRoutes from "./routes/patient.route";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/CMS")
  // .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(8080, () => {
      console.log(`Listenning to port 8080...`);
    });
  })
  .catch((error) => console.log("Db Connection Error " + error));

app.use(morgan(":method :url"));
app.use(cors()); //how to know if it's working??
app.use(express.json());

app.use("/doctor", doctorRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/patient", patientRoutes);

app.use((request: Request, response: Response) => {
  response.status(404).json({ message: "Request Not Found" });
});

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    response.status(500).json({ message: error.message });
  }
);
