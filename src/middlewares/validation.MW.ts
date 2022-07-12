import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default function resultValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("resultValidationMW");
  let result: any = validationResult(request);
  if (!result.isEmpty()) {
    console.log("result is not empty");
    let message = result.errors.reduce(
      (current: String, error: any) => current + error.msg + " ",
      ""
    );
    let error: any = new Error(message);
    error.status = 422;
    throw error;
  } else {
    console.log("result is empty");
    next();
  }
}
