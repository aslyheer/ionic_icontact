import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { SyncronizerService } from "./syncronizer.service";
import { Employee } from "../../../shared/models/employee";
import { SqliteService } from "../services/sqlite.service";
import { DownloadFileService } from "../../../shared/services/download-file.service";
import { Ionloader } from "../../../shared/components/loader/ionloader.service";
import { Router } from "@angular/router";
import { HomeService } from "./home.service";
import { Platform } from "@ionic/angular";
import { Filter, Country } from "src/app/shared/constants/common-constant";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  public users: Employee[] = [];
  public allUsers: Employee[] = [];
  public tggleTpNav = false;

  /*
   * check if user opens app first time,
   * it first validate the user and after validation
   * it fetch the data and save to the sqlite database
   */

  init() {
    this._plateForm.is("cordova")
      ? localStorage.getItem("isFirstTime") == "1"
        ? this.validateUser()
        : this.getDataFromSqlite()
      : localStorage.getItem("isFirstTime") == "1"
      ? this.validateUser()
      : this.fetchEmployeeData();
  }

  /**
   * make user signin with gmail and
   * validate gmail with database.
   * if valid it fetch data from sqlite or database based
   * on which device running
   */
  validateUser() {
    this._loader.openLoader();
    this._authService
      .signWithGmail()
      .then(response => {
        this._authService.isEmailLegit(response.user.email).subscribe(res => {
          if (!res.status) {
            return this.backToTheSlide();
          }
          this._loader.closeLoader();
          this._plateForm.is("cordova")
            ? this.synchronizeData()
            : this.fetchEmployeeData();
        });
      })
      .catch(err => {
        return this.backToTheSlide();
      });
  }

  /*
   * get data from database and
   * set it to user and all user avriable
   */
  fetchEmployeeData() {
    this._employeeService.getEmployee().subscribe(res => {
      this.users = res;
      this.allUsers = res;
    });
  }

  /*
   * get data from sqlite server and
   * set it to user and all user
   */
  getDataFromSqlite() {
    this._loader.openLoader();
    this._sqlLIteService.getRows().then(res => {
      return this._downloadFileService
        .getObjectsWithImageUrl(res)
        .then(employees => {
          this.users = employees;
          this.allUsers = employees;
          this._loader.closeLoader();
        });
    });
  }

  /*
   * get data from sqlite server and
   * set it to user and all user
   */
  synchronizeData() {
    this._synchronizeService.synchroize().then(response => {
      if (response.status) {
        localStorage.setItem("isFirstTime", "0");
        this._loader.closeLoader();
        this.getDataFromSqlite();
      } else {
        this._loader.closeLoader();
        alert(JSON.stringify(response));
      }
    });
  }

  /**
   * allUser variable save all original data and
   * data is filtered from users variable.
   * It filters country wise data.
   */
  filterData(data: string) {
    this.tggleTpNav = !this.tggleTpNav;
    switch (data) {
      case Filter.All:
        this.users = this.allUsers;
        break;
      case Filter.NEPAL:
        this.users = this.allUsers.filter(
          employee => employee.country == Country.NEPAL
        );
        break;
      case Filter.HOLLAND:
        this.users = this.allUsers.filter(
          employee => employee.country == Country.HOLLAND
        );
        break;
    }
  }

  /**
   * when inavlid user, it clear all localstorage
   * and navigate it to slide page
   */
  backToTheSlide() {
    this._loader.closeLoader();
    alert("Your are not authorized to access data !!");
    localStorage.clear();
    this._router.navigate(["slides"]);
    return;
  }

  constructor(
    private _synchronizeService: SyncronizerService,
    private _authService: AuthService,
    private _sqlLIteService: SqliteService,
    private _downloadFileService: DownloadFileService,
    private _loader: Ionloader,
    private _router: Router,
    private _employeeService: HomeService,
    private _plateForm: Platform
  ) {}

  ngOnInit() {
    this.init();
  }
}
