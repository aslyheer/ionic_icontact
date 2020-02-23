import { NgModule, ModuleWithProviders } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FilterPipe } from "../pipes/filter.pipe";
import { CompanyService } from "../services/company.service";
import { EmployeeService } from "../services/employee.service";
import { FirebaseModule } from "./firebase.module";
import { DownloadFileService } from "../services/download-file.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeGuard } from "../guards/home.guard";
import { SlideGuard } from "../guards/slide.guard";

const commonModule = [FormsModule, ReactiveFormsModule, HttpClientModule];
@NgModule({
  declarations: [FilterPipe],
  imports: [...commonModule, FirebaseModule],
  exports: [...commonModule, FilterPipe]
})
export class CommonSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonSharedModule,
      providers: [
        CompanyService,
        EmployeeService,
        DownloadFileService,
        HomeGuard,
        SlideGuard
      ]
    };
  }
}
