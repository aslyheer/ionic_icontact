import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SlideGuard } from "./shared/guards/slide.guard";
import { HomeGuard } from "./shared/guards/home.guard";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/dashboard/home/home.module").then(m => m.HomePageModule),

    canActivate: [HomeGuard]
  },
  {
    path: "slides",
    loadChildren: () =>
      import("./pages/authentication/slides/slides.module").then(
        m => m.SlidesPageModule
      ),
    canActivate: [SlideGuard]
  },
  {
    path: "view-contact",
    loadChildren: () =>
      import("./pages/dashboard/view-contact/view-contact.module").then(
        m => m.ViewContactPageModule
      ),
    canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
