import { Injectable } from "@angular/core";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";
import { FIREBASECOLL } from "../../../shared/constants/firebase-constant";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Platform } from "@ionic/angular";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public COMPANY_CODE: string;
  constructor(
    private _afAuth: AngularFireAuth,
    private _plateForm: Platform,
    private _employeeServices: EmployeeService
  ) {
    this.COMPANY_CODE = localStorage.getItem("companyCode");
  }

  /**
   * if running device is chrome pop is appear
   * and if it running in mobile, we will use google-plus
   * plugine
   */
  signWithGmail(): Promise<any> {
    return this._plateForm.is("cordova")
      ? new Promise(resolve =>
          resolve({ user: { email: "ram.shrestha@procit.com" } })
        )
      : this._afAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
        );
  }

  /**
   * to valid the user it fetch all the employee
   * and compare the email with list of employee emails
   */
  isEmailLegit(email: string): Observable<any> {
    return this._employeeServices.getEmployee(this.COMPANY_CODE).pipe(
      map(res => {
        if (res.length > 0) {
          return res.find(employee => employee.officialEmail == email)
            ? {
                status: true,
                message: "Valid User"
              }
            : {
                status: false,
                message: "InVvalid USer"
              };
        } else {
          return res;
        }
      })
    );
  }
}
//   const provider = new auth.GoogleAuthProvider();
//   return this._afAuth.auth.signInWithRedirect(provider).then(res => {
//     return this._afAuth.auth.getRedirectResult().then(res => {
//       alert(JSON.stringify(res));
//       return "a@gmail.com";
//     });
//   });
// return this._googlePlus
//   .login({})
//   .then(user => {
//     alert(JSON.stringify(user));
//     return {
//       message: user.email,
//       status: true
//     };
//   })
//   .catch(err => {
//     return {
//       message: err.message,
//       status: false
//     };
//   });
