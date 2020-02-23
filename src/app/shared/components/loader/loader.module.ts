import { NgModule, ModuleWithProviders } from "@angular/core";
import { LoaderComponent } from "./loader-component/loader.component";
import { Ionloader } from "./ionloader.service";
import { AngularMaterialModule } from "../../shared-modules/angular-material.module";
@NgModule({
  declarations: [LoaderComponent],
  imports: [AngularMaterialModule],
  exports: [LoaderComponent],
  entryComponents: [LoaderComponent]
})
export class LoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoaderModule,
      providers: [Ionloader]
    };
  }
}
