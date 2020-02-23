import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { SlidesPageRoutingModule } from "./slides-routing.module";

import { SlidesPage } from "./slides.page";
import { CommonSharedModule } from "../../../shared/shared-modules/common-shared.module";
import { SlideService } from "./slides.service";
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CommonSharedModule,
    SlidesPageRoutingModule
  ],
  declarations: [SlidesPage],
  providers: [],
  entryComponents: []
})
export class SlidesPageModule {}
