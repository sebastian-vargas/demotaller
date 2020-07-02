import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "register",
    pathMatch: "full",
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./pages/menu/menu.module").then((m) => m.MenuPageModule),
      canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: "**",
    redirectTo: "menu",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
