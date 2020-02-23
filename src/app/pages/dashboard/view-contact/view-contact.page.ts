import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { Employee } from "src/app/shared/models/employee";

@Component({
  selector: "app-view-contact",
  templateUrl: "./view-contact.page.html",
  styleUrls: ["./view-contact.page.scss"]
})
export class ViewContactPage implements OnInit {
  public userData: Employee;
  constructor(
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activateRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(res => {
        this.userData = res;
      });
  }
}
