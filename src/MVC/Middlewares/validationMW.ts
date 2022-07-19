import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default (request: Request, response: Response, next: NextFunction) => {
  let result: any = validationResult(request);
  if (!result.isEmpty()) {
    let errorMessages = result.errors.reduce(
      (current: any, error: any) =>
        ` ${current} ${current == "" ? "" : "&"} ${error.msg} `,
      ""
    );
    let error: any = new Error(errorMessages);
    error.status = 422; // 422 => input validation error
    throw error;
  } else {
    next();
  }
};
