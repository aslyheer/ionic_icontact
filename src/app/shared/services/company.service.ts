import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { FIREBASECOLL } from "../constants/firebase-constant";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
  constructor(private _afDb: AngularFireDatabase) {}
  getCompany(companyCode: string) {
    return this._afDb
      .list(FIREBASECOLL.COMPANY, ref =>
        ref.orderByChild("companyCode").equalTo(companyCode)
      )
      .valueChanges();
  }
}
