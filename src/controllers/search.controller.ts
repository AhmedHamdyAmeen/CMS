import { Request, Response, NextFunction } from "express";

import Employee from "../models/employee.model";
import Appointment from "../models/appointment.model";

interface IQuery {
  [key: string]: any;
}

export default class FilterAppointmentController {
  getAppointment = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const [filterQuery, sortQuery] = this.handleFilterQuery(request.query);
    Appointment.find(filterQuery)
      .sort(sortQuery)
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  getEmployee = (request: Request, response: Response, next: NextFunction) => {
    const [filterQuery, sortQuery] = this.handleFilterQuery(request.query);
    Employee.find(filterQuery)
      .sort(sortQuery)
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  handleFilterQuery = (queryObject: IQuery) => {
    if (queryObject) {
      let filterQuery: IQuery;
      let sortQuery: IQuery;
      filterQuery = {};
      sortQuery = {};
      for (let key in queryObject) {
        if (queryObject[key] && key !== "key") {
          filterQuery[key] = queryObject[key];
        } else if (key === "key") {
          if (typeof key === "string") sortQuery[queryObject.key] = 1;
          else {
            for (let sortKey of queryObject.key) {
              sortQuery[sortKey] = 1;
            }
          }
        }
      }
      return [filterQuery, sortQuery];
    }
  };
}

