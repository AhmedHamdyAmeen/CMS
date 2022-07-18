import AuthController from "./auth.controller";
import ToggleRoleController from "./toggleRole.controller";
import DoctorController from "./doctor.controller";
import PrescriptionController from "./prescription.controller";
import PatientController from "./patient.controller";

export const authController = new AuthController();
export const toggleRoleController = new ToggleRoleController();
export const doctorController = new DoctorController();
export const prescriptionController = new PrescriptionController();
export const patientController = new PatientController();
