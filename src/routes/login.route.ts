import express from "express";

import { login } from "../controllers/login.controller";

import resultValidator from "../middlewares/validation.MW";
import { loginValidator } from "../middlewares/employee.MW";

const loginRoute = express.Router();

/**Login route
 */
loginRoute
  .route("/login/employee")
  .post(loginValidator, resultValidator, login);

export default loginRoute;
