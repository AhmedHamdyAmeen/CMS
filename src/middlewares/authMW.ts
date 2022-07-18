import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from "jsonwebtoken";

export const authMW: RequestHandler = (request: any, response, next) => {
  let decodedToken: any = null;
  try {
    let token = request.get("Authorization").split(" ")[1];
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    request.role = decodedToken.role;
    request.id = decodedToken.id;
    next();
  } catch (error: any) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};
