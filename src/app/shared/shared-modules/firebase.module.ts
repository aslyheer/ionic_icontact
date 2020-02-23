import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

const modules = [AngularFireDatabaseModule, AngularFireAuthModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class FirebaseModule {}
