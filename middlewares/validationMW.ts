import { validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction, Router } from 'express';

const validationMW = (request: Request, respone:Response, next:NextFunction) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
  };
  const result = validationResult(request).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    return respone.json({ errors: result.array() });
  }
};


export default validationMW;