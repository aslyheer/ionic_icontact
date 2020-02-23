import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import { FIREBASECOLL } from "../constants/firebase-constant";
import { IEmployee, Employee } from "../models/employee";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private _afDb: AngularFireDatabase) {}
  getEmployee(companyCode: string): Observable<Employee[]> {
    return this._afDb
      .list(FIREBASECOLL.COMPANY, ref =>
        ref.orderByChild("companyCode").equalTo(companyCode)
      )
      .valueChanges()
      .pipe(
        map(data => {
          let dataObj = data as any;
          return dataObj[0].companyEmployee.map(employee => {
            let companyObj = new Employee(employee as IEmployee);
            return companyObj;
          });
        })
      );
  }
}
