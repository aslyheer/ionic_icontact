import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { IonicPackageModule } from "./shared/shared-modules/ionic-package.module";
import { FirebaseModule } from "./shared/shared-modules/firebase.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./shared/shared-modules/angular-material.module";
import { LoaderModule } from "./shared/components/loader/loader.module";
import { CommonSharedModule } from "./shared/shared-modules/common-shared.module";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    /* shared modules */
    AngularMaterialModule,
    FirebaseModule,
    CommonSharedModule.forRoot(),
    IonicPackageModule.forRoot(),

    /*Feature modules */
    LoaderModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
