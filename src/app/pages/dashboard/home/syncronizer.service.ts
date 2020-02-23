import { Injectable } from "@angular/core";
import { SqliteService } from "../services/sqlite.service";
import { IEmployee, Employee } from "../../../shared/models/employee";
import { DownloadFileService } from "../../../shared/services/download-file.service";
import { UUID } from "angular2-uuid";
import { HomeService } from "./home.service";
@Injectable({
  providedIn: "root"
})
export class SyncronizerService {
  constructor(
    private _employeeService: HomeService,
    private _sqliteService: SqliteService,
    private _downloadFileService: DownloadFileService
  ) {}

  /**
   * set unique imageCode to all employee.
   * Here you are using angular2-uuid pluging to generate
   * unique id
   */
  getObjectsWithimageCode(employees: Employee[]) {
    return employees.map(employee => {
      employee.imageCode = UUID.UUID() + ".jpg";
      return employee;
    });
  }

  /**
   *
   * @param employees
   * insert the lsit of employee to sqlite and
   * fetch and save images to storage fro its url
   */
  saveAllEmployeeToSqlite(employees: Employee[]): Promise<any> {
    let promiseCollection = [];
    employees.map(employee => {
      // insert employee
      promiseCollection.push(this._sqliteService.insertRow(employee));
      // save employee photo
      promiseCollection.push(
        // if imageurl is null, it set imgfield to empty so that it later
        // get avatar
        employee.imageUrl
          ? this._downloadFileService.download(
              employee.imageCode,
              employee.imageUrl
            )
          : new Promise(resolve => resolve(""))
      );
    });
    return Promise.all(promiseCollection);
  }

  /**
   *
   * @param employees
   * unique image code is assigned to each employee.
   * delete all the old data from data and set new data.
   */
  saveAllToSqlite(employees: Employee[]): any {
    let employeeWithCode = this.getObjectsWithimageCode(employees);
    return this._sqliteService.deleteAllRows().then(res => {
      return this.saveAllEmployeeToSqlite(employeeWithCode)
        .then(data => {
          return {
            message: "Successfull Updated",
            status: true
          };
        })
        .catch(err => {
          alert(JSON.stringify(err));
        });
    });
  }

  /**
   *  get new data from databasse and
   * save it to the sqlite
   */
  synchroize(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this._employeeService.getEmployee().subscribe(
        data => {
          return data.length > 0
            ? this.saveAllToSqlite(data)
                .then(data => {
                  data.status
                    ? resolve({
                        message: data.message,
                        status: true
                      })
                    : reject({
                        message: data.message,
                        status: false
                      });
                })
                .catch(err => {
                  reject({
                    message: err.message,
                    status: false
                  });
                })
            : reject({
                message: data,
                status: false
              });
        },
        err => {
          reject({
            message: err.message,
            status: false
          });
        }
      );
    });
  }
}
