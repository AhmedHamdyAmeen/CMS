import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");

module.exports.unHashPassword = async (password: String, original: String) => {
  bcrypt.compare(password, original);
};

module.exports.checkDuplicated = (value: any) => {
  const duplicated = value.filter(
    (item: any, index: any) => value.indexOf(item) !== index
  );
  return !Boolean(duplicated.length);
};

module.exports.hashPassword = (request: Request, response: Response, next: NextFunction) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (error: Error, salt: Number) {
    bcrypt
      .hash(request.body.password, salt)
      .then((hash: String) => {
        request.body.password = hash;
        next();
      })
      .catch((error: Error) => next(error));
  })
};
