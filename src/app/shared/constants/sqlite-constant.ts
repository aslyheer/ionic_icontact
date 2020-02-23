import { Employee } from "../models/employee";

export const DBNAME = "contact.db";
export const EMPLOYEE_TBL = "employee";
export const createInsertStatement = (employee: Employee) => {
  return `INSERT INTO employee(firstName, middleName, lastName, fullName, address, country, projectGroup, officialEmail, personalEmail, mobilePhoneA, mobilePhoneB, homePhoneA, homePhoneB, emergencyPhoneA, emergencyPhoneB, bloodGroup, birthDay, imageUrl, imageCode) VALUES('${employee.firstName}', '${employee.middleName}', '${employee.lastName}', '${employee.fullName}', '${employee.address}', '${employee.country}', '${employee.projectGroup}', '${employee.officialEmail}', '${employee.personalEmail}', '${employee.mobilePhoneA}', '${employee.mobilePhoneB}', '${employee.homePhoneA}', '${employee.homePhoneB}', '${employee.emergencyPhoneA}', '${employee.emergencyPhoneB}', '${employee.bloodGroup}', '${employee.birthDay}', '${employee.imageUrl}', '${employee.imageCode}')`;
};
