import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ViewContactPage } from "./view-contact.page";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  {
    path: "",
    component: ViewContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MatIconModule]
})
export class ViewContactPageRoutingModule {}
