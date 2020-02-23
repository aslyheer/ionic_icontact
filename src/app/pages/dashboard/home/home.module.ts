import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { CommonSharedModule } from "../../../shared/shared-modules/common-shared.module";
import { AngularMaterialModule } from "../../../shared/shared-modules/angular-material.module";
import { HomeService } from "./home.service";
import { SqliteService } from "../services/sqlite.service";
import { SyncronizerService } from "./syncronizer.service";
import { HomeListviewComponent } from "./home-listview/home-listview.component";
import { AuthService } from "../services/auth.service";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommonSharedModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, HomeListviewComponent],
  providers: [HomeService, SqliteService, SyncronizerService, AuthService]
})
export class HomePageModule {}
