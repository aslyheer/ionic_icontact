import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FIREBASECOLL } from "../../../shared/constants/firebase-constant";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { CompanyService } from "../../../shared/services/company.service";

@Injectable({
  providedIn: "root"
})
export class SlideService {
  constructor(private _companyService: CompanyService) {}

  saveCompanyFlagToLocalStorage(companyCode: any) {
    localStorage.setItem("companyCode", companyCode);
  }

  /**
   *
   * @param companyCode
   * get company and if company is present,
   * it set company code to local storage
   */
  isCompanyNameExists(companyCode: string): Observable<any> {
    return this._companyService.getCompany(companyCode).pipe(
      map(objects => {
        if (objects.length > 0) {
          this.saveCompanyFlagToLocalStorage(companyCode);
          return {
            message: objects,
            status: true
          };
        } else {
          return { message: "data not found", status: false };
        }
      })
    );
  }
}
