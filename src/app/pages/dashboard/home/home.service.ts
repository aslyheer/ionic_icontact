import { Injectable } from "@angular/core";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { Observable } from "rxjs";
import { Employee } from "src/app/shared/models/employee";

@Injectable({
  providedIn: "root"
})
export class HomeService {
  public COMPANY_CODE: string;
  constructor(private _employeeService: EmployeeService) {
    this.COMPANY_CODE = localStorage.getItem("companyCode");
  }
  /**
   *
   * @param companyCode
   * if company code is not provided,
   * it get code form local storage
   */
  getEmployee(companyCode?: string): Observable<Employee[]> {
    return this._employeeService.getEmployee(
      companyCode ? companyCode : this.COMPANY_CODE
    );
  }
}
