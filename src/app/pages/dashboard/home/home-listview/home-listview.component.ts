import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home-listview",
  templateUrl: "./home-listview.component.html",
  styleUrls: ["./home-listview.component.scss"]
})
export class HomeListviewComponent implements OnInit {
  @Input() users;
  constructor(private _router: Router) {}

  ngOnInit() {}
}
