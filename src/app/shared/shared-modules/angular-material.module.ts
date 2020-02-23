import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule
  ],
  exports: [
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class AngularMaterialModule {}
