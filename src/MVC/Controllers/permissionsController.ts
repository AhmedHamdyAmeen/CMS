import { Router, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Medicines from "./../Models/medicinesSchema";

const getPermissions = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};

const getPermission = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // response.status(200).json({ data: "Aho Ya Man🥰" });
};

const createPermission = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // response.status(200).json({ data: "Created Ya Man🥰" });
};

const updatePermission = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // response.status(201).json({ data: "Updated Ya Man🥰" });
};

const deletePermission = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // response.status(201).json({ data: "Deleted Ya Man🥰" });
};

export {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
};
