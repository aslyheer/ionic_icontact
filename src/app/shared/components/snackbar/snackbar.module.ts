import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../../shared-modules/angular-material.module";
import { SnackBarService } from "./snack-bar.service";

@NgModule({
  declarations: [],
  imports: [AngularMaterialModule],
  exports: [SnackBarService]
})
export class SnackbarModule {}
