export interface IEmployee {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  country: string;
  projectGroup: string;
  knowledgeBase: string;
  officialEmail: string;
  personalEmail: string;
  mobilePhoneA: string;
  mobilePhoneB: string;
  homePhoneA: string;
  homePhoneB: string;
  emergencyPhoneA: string;
  emergencyPhoneB: string;
  bloodGroup: string;
  birthDay: string;
  imageUrl: string;
  imageCode: string;
  fullName: string;
}
export class Employee implements IEmployee {
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  address: string;
  country: string;
  projectGroup: string;
  knowledgeBase: string;
  officialEmail: string;
  personalEmail: string;
  mobilePhoneA: string;
  mobilePhoneB: string;
  homePhoneA: string;
  homePhoneB: string;
  emergencyPhoneA: string;
  emergencyPhoneB: string;
  bloodGroup: string;
  birthDay: string;
  imageUrl: string;
  imageCode: string;
  constructor(employee: IEmployee) {
    this.firstName = employee.firstName;
    this.middleName = employee.middleName;
    this.lastName = employee.lastName;
    this.fullName = employee.fullName
      ? employee.fullName
      : this.getfullName(employee);
    this.address = employee.address;
    this.country = employee.country;
    this.projectGroup = employee.projectGroup;
    this.knowledgeBase = employee.knowledgeBase;
    this.officialEmail = employee.officialEmail;
    this.personalEmail = employee.personalEmail;
    this.mobilePhoneA = employee.mobilePhoneA;
    this.mobilePhoneB = employee.mobilePhoneB;
    this.homePhoneA = employee.homePhoneA;
    this.homePhoneB = employee.homePhoneB;
    this.emergencyPhoneA = employee.emergencyPhoneA;
    this.emergencyPhoneB = employee.emergencyPhoneB;
    this.bloodGroup = employee.bloodGroup;
    this.birthDay = employee.birthDay;
    this.imageUrl = employee.imageUrl;
    this.imageCode = employee.imageCode;
  }
  getfullName(employee: IEmployee): string {
    return employee.middleName
      ? `${employee.firstName} ${employee.middleName} ${employee.lastName}`
      : `${employee.firstName} ${employee.lastName}`;
  }
}
