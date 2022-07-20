import EmployeeController from "./employee.controller";
import AppointmentController from "./appointment.controller";
import FilterAppointmentController from "./search.controller";
import PaymentController from "./payment.controller";

import AuthController from "./auth.controller";
import ToggleRoleController from "./toggleRole.controller";
import DoctorController from "./doctor.controller";
import PrescriptionController from "./prescription.controller";
import PatientController from "./patient.controller";

/*---------------------------------------------------------------*/

export const employeeController = new EmployeeController();
export const appointmentController = new AppointmentController();
export const searchController = new FilterAppointmentController();
export const paymentController = new PaymentController();

export const authController = new AuthController();
export const toggleRoleController = new ToggleRoleController();
export const doctorController = new DoctorController();
export const prescriptionController = new PrescriptionController();
export const patientController = new PatientController();
