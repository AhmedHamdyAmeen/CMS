import EmployeeController from "./employee.controller";
import AppointmentController from "./appointment.controller";
import FilterAppointmentController from "./search.controller";

export const employeeController = new EmployeeController();
export const appointmentController = new AppointmentController();
export const searchController = new FilterAppointmentController();