import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Employee from "../models/employee.model";

export default class UsersAuth {
  login(request: Request, response: Response, next: NextFunction) {
    let User: any = null;
    request.params.userType === "employee" ? (User = Employee) : null;
    
    User.findOne({ email: request.body.email }, { email: 1, password: 1 })
      .then((data: any) => {
        if (!data) {
          //email not found
          let error: any = new Error("username or password incorrect!");
          error.status = 401;
          next(error);
        }
        if (bcrypt.compareSync(request.body.password, data.password)) {
          let token = jwt.sign(
            {
              id: data._id,
              role: data.role,
            },
            // process.env.SECRET_KEY,
            "secret",
            { expiresIn: "1h" }
          );
          response.status(200).json({ token, message: "login" });
        } else {
          next(new Error("username or password incorrect"));
        }
      })
      .catch((error: Error) => next(error));
  }
}
