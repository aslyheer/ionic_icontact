import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouteReuseStrategy } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { IonicRouteStrategy } from "@ionic/angular";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";

@NgModule({
  declarations: [],
  imports: []
})
export class IonicPackageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IonicPackageModule,
      providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        GooglePlus,
        SQLite,
        FileTransfer,
        FileTransferObject,
        File,
        SQLitePorter
      ]
    };
  }
}
