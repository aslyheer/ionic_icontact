import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { SlideService } from "./slides.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Ionloader } from "../../../shared/components/loader/ionloader.service";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"]
})
export class SlidesPage implements OnInit {
  public companyCode = new FormControl("");
  ngOnInit() {}

  /**
   * before navigating it to the
   * home, it set isFirstTime Variable to localstorage so
   * that when home page is rendered, it validate and fetch the data
   */
  navigateToHome() {
    this._loader.closeLoader();
    localStorage.setItem("isFirstTime", "1");
    this._router.navigate(["home"]);
  }

  /**
   * navigate to the home page if the
   * company code is valid
   */
  goToHome() {
    if (this.companyCode.valid) {
      this._loader.openLoader();
      this._companyFileHandler
        .isCompanyNameExists(this.companyCode.value)
        .subscribe(
          data => {
            data.status
              ? this.navigateToHome()
              : this.handleError(data.message);
          },
          err => {
            this.handleError("Please Enter valid comapny name");
          }
        );
    } else {
      this.handleError("Please Enter valid comapny name");
    }
  }

  /**
   *
   * @param message
   * show error using snackbar
   */
  handleError(message: string) {
    this._loader.closeLoader();
    this._snackBar.open(message, "Error", {
      duration: 2000
    });
  }

  constructor(
    private _router: Router,
    private _companyFileHandler: SlideService,
    private _snackBar: MatSnackBar,
    private _loader: Ionloader
  ) {}
}
