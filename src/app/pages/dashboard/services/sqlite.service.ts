import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { IEmployee, Employee } from "../../../shared/models/employee";
import { Platform } from "@ionic/angular";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient } from "@angular/common/http";
import {
  DBNAME,
  EMPLOYEE_TBL,
  createInsertStatement
} from "../../../shared/constants/sqlite-constant";
@Injectable({
  providedIn: "root"
})
export class SqliteService {
  databaseObj: SQLiteObject; // Database instance object
  readonly database_name: string = DBNAME; // DB name
  readonly table_name = EMPLOYEE_TBL;
  createDB() {
    this.sqlite
      .create({
        name: this.database_name,
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTable();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e));
      });
  }

  /**
   * it fetch the sql query of table from sql file
   * stored at assets and execute.
   * here the sqlite portal is used to run
   * query present in file
   */
  createTable() {
    this._httpClient
      .get("assets/migration/sqlite.sql", { responseType: "text" })
      .subscribe(sql => {
        this._sqlitePortal
          .importSqlToDb(this.databaseObj, sql)
          .then(() => {})
          .catch(err => {
            alert(JSON.stringify(err));
          });
      });
  }
  /**
   *
   * @param data
   * get sql insert statement and execute it
   */
  insertRow(data: Employee) {
    return this.databaseObj
      .executeSql(createInsertStatement(data), [])
      .catch(e => {
        alert("error " + JSON.stringify(e));
      });
  }

  getRows(): Promise<any> {
    return this.sqlite
      .create({
        name: this.database_name,
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        return this.databaseObj
          .executeSql("SELECT * FROM " + this.table_name, [])
          .then(res => {
            let row_data: Employee[] = [];
            if (res.rows.length > 0) {
              for (var i = 0; i < res.rows.length; i++) {
                row_data.push(new Employee(res.rows.item(i) as IEmployee));
              }
            }
            return row_data;
          })
          .catch(e => {
            alert("error " + JSON.stringify(e));
          });
      });
  }

  deleteAllRows() {
    return this.databaseObj
      .executeSql("DELETE FROM " + this.table_name, [])
      .catch(err => {
        alert(JSON.stringify(err));
      });
  }
  deleteRow(item) {
    this.databaseObj
      .executeSql(
        "DELETE FROM " + this.table_name + " WHERE pid = " + item.pid,
        []
      )
      .then(res => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e));
      });
  }

  constructor(
    private _plateForm: Platform,
    private _sqlitePortal: SQLitePorter,
    private sqlite: SQLite,
    private _httpClient: HttpClient
  ) {
    this._plateForm.is("cordova") ? this.createDB() : 0;
  }
}
