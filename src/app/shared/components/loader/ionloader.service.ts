import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LoaderComponent } from "./loader-component/loader.component";
@Injectable({
  providedIn: "root"
})
export class Ionloader {
  public dialogRef: any;
  constructor(public dialog: MatDialog) {}
  openLoader(): void {
    this.dialogRef = this.dialog.open(LoaderComponent, {
      width: "250px"
    });
  }
  closeLoader() {
    this.dialogRef.close();
  }
}
