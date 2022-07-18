import express, { Request, Response, NextFunction, Router } from "express";

import { searchController } from "../controllers/controllers.module";

export const searchRoute = Router();

searchRoute.route("/appointments").get(searchController.getAppointment);
searchRoute.route("/employees").get(searchController.getEmployee);